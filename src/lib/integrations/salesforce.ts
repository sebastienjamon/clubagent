import { Reservation, Call } from "@/types";

type SalesforceConfig = {
    instance_url: string;
    client_id: string;
    client_secret: string;
    object_name: string;
};

export async function authenticateSalesforce(config: SalesforceConfig) {
    const clientId = config.client_id || process.env.SALESFORCE_CLIENT_ID;
    const clientSecret = config.client_secret || process.env.SALESFORCE_CLIENT_SECRET;
    const instanceUrl = config.instance_url || process.env.SALESFORCE_INSTANCE_URL;

    if (!clientId || !clientSecret || !instanceUrl) {
        console.error("Salesforce Auth Error: Missing configuration (checked config and env vars)");
        return null;
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);

    try {
        const response = await fetch(`${instanceUrl}/services/oauth2/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("Salesforce Auth Error:", error);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Salesforce Auth Network Error:", error);
        return null;
    }
}

export async function saveToSalesforce(config: SalesforceConfig, data: { type: 'reservation' | 'call', payload: any }, agentName?: string) {
    const auth = await authenticateSalesforce(config);
    if (!auth || !auth.access_token) {
        return { success: false, error: "Authentication failed" };
    }

    const url = `${auth.instance_url}/services/data/v60.0/sobjects/${config.object_name}`;

    let body: any = {};
    const description = [];
    description.push(`Source: Club Agent - ${agentName || 'Unknown'}`);

    if (data.type === 'reservation') {
        const reservation = data.payload as Reservation;
        body.Subject = `Reservation: ${reservation.customer_phone || 'Unknown Guest'}`;
        body.LastName = reservation.customer_phone || 'Unknown Guest';
        body.Company = 'Club Agent Guest';
        body.Phone = reservation.customer_phone;

        description.push(`Customer Phone: ${reservation.customer_phone}`);
        description.push(`Notes: ${reservation.notes}`);
        description.push(`Status: ${reservation.status}`);

    } else if (data.type === 'call') {
        const call = data.payload as Call;
        body.Subject = `Call from ${call.caller_number || 'Unknown'}`;
        body.LastName = call.caller_number || 'Unknown Caller';
        body.Company = 'Club Agent Caller';
        body.Phone = call.caller_number;

        description.push(`Caller: ${call.caller_number}`);
        description.push(`Summary: ${call.summary}`);
        description.push(`Transcript: ${call.transcript}`);
        description.push(`Recording: ${call.recording_url}`);
    }

    body.Description = description.join('\n');

    // Object-specific mapping
    const obj = config.object_name.toLowerCase();
    let finalBody: any = {};

    if (obj === 'lead') {
        finalBody = {
            LastName: body.LastName,
            Company: body.Company,
            Phone: body.Phone,
            Description: body.Description,
            LeadSource: 'Club Agent'
        };
    } else if (obj === 'case') {
        // Use summary for Subject if available, otherwise fallback to generic
        const subject = (data.type === 'call' && (data.payload as Call).summary)
            ? (data.payload as Call).summary
            : body.Subject;

        finalBody = {
            Subject: subject.substring(0, 255),
            Description: body.Description,
            Origin: 'Phone',
            Status: 'New',
            Priority: 'Medium'
        };
    } else {
        // Fallback for custom objects: Try 'Name' and 'Description'
        // This is a best-guess for custom objects
        finalBody = {
            Name: body.Subject,
            // We can't safely guess other field names for custom objects
        };
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${auth.access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalBody)
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("Salesforce Create Error:", error);
            return { success: false, error: JSON.stringify(error) };
        }

        const resData = await response.json();
        return { success: true, id: resData.id };
    } catch (error) {
        console.error("Salesforce Network Error:", error);
        return { success: false, error: "Network error" };
    }
}

export async function fetchFromSalesforce(config: SalesforceConfig) {
    const auth = await authenticateSalesforce(config);
    if (!auth || !auth.access_token) {
        return { success: false, error: "Authentication failed" };
    }

    // Construct query based on object type
    const obj = config.object_name;
    let query = `SELECT Id, CreatedDate, `;

    if (obj.toLowerCase() === 'case') {
        query += `Subject, Description, Status, Priority, Origin, CaseNumber FROM Case`;
    } else if (obj.toLowerCase() === 'lead') {
        query += `Name, Company, Phone, Description, Status FROM Lead`;
    } else {
        query += `Name, CreatedDate FROM ${obj}`;
    }

    query += ` ORDER BY CreatedDate DESC LIMIT 20`;

    const url = `${auth.instance_url}/services/data/v60.0/query?q=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${auth.access_token}`,
                'Content-Type': 'application/json'
            },
            next: { revalidate: 0 }
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("Salesforce Query Error:", error);
            return { success: false, error: JSON.stringify(error) };
        }

        const data = await response.json();
        return { success: true, records: data.records };
    } catch (error) {
        console.error("Salesforce Query Network Error:", error);
        return { success: false, error: "Network error" };
    }
}
