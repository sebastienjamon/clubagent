"use server";

import { saveToAirtable } from "@/lib/integrations/airtable";
import { fetchFromSalesforce } from "@/lib/integrations/salesforce";

export async function testAirtableConnection(config: { api_key: string; base_id: string; table_name: string }) {
    if (!config.api_key || !config.base_id || !config.table_name) {
        return { success: false, message: "Missing configuration" };
    }

    const url = `https://api.airtable.com/v0/${config.base_id}/${encodeURIComponent(config.table_name)}?maxRecords=1`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${config.api_key}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            return { success: false, message: error.error?.message || "Failed to connect to Airtable" };
        }

        return { success: true, message: "Connection successful!" };
    } catch (error) {
        return { success: false, message: "Network error connecting to Airtable" };
    }
}

export async function fetchAirtableRecords(config: { api_key: string; base_id: string; table_name: string }, agentName?: string) {
    if (!config.api_key || !config.base_id || !config.table_name) {
        return { success: false, records: [] };
    }

    let url = `https://api.airtable.com/v0/${config.base_id}/${encodeURIComponent(config.table_name)}?maxRecords=20&sort%5B0%5D%5Bfield%5D=Date&sort%5B0%5D%5Bdirection%5D=desc`;

    if (agentName) {
        // Filter where Source contains the agent name
        const filterFormula = `FIND("${agentName}", {Source})`;
        url += `&filterByFormula=${encodeURIComponent(filterFormula)}`;
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${config.api_key}`,
                'Content-Type': 'application/json'
            },
            next: { revalidate: 0 } // Disable caching for real-time updates
        });

        if (!response.ok) {
            console.error("Airtable fetch error:", await response.text());
            return { success: false, records: [] };
        }

        const data = await response.json();
        return { success: true, records: data.records || [] };
    } catch (error) {
        console.error("Airtable network error:", error);
        return { success: false, records: [] };
    }
}

export async function testSalesforceConnection(config: { instance_url: string; client_id: string; client_secret: string }) {
    if (!config.instance_url || !config.client_id || !config.client_secret) {
        return { success: false, message: "Missing configuration details" };
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', config.client_id);
    params.append('client_secret', config.client_secret);

    console.log("Testing Salesforce Connection (Client Credentials)...");
    console.log("Instance URL:", config.instance_url);

    try {
        const response = await fetch(`${config.instance_url}/services/oauth2/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("Salesforce Auth Failed:", error);
            return { success: false, message: "Salesforce: " + (error.error_description || "Authentication failed") };
        }

        const data = await response.json();
        console.log("Salesforce Auth Success:", data.instance_url);
        return { success: true, message: "Salesforce: Connection successful!" };
    } catch (error) {
        console.error("Salesforce Network Error:", error);
        return { success: false, message: "Salesforce: Network error connecting to Salesforce" };
    }
}

export async function fetchSalesforceRecords(config: { instance_url: string; client_id: string; client_secret: string; object_name: string }) {
    if (!config.instance_url || !config.client_id || !config.client_secret) {
        return { success: false, records: [] };
    }

    const result = await fetchFromSalesforce(config);

    if (!result.success) {
        return { success: false, records: [], error: result.error };
    }

    return { success: true, records: result.records };
}
