import { Reservation, Call } from "@/types";

type AirtableConfig = {
    api_key: string;
    base_id: string;
    table_name: string;
};

export async function saveToAirtable(config: AirtableConfig, data: { type: 'reservation' | 'call', payload: any }, agentName?: string) {
    if (!config.api_key || !config.base_id || !config.table_name) {
        console.error("Missing Airtable configuration");
        return false;
    }

    const url = `https://api.airtable.com/v0/${config.base_id}/${encodeURIComponent(config.table_name)}`;

    // Map data to Airtable fields
    // Note: This assumes the user has created a table with these specific field names.
    // In a real app, you might allow field mapping configuration.
    let fields = {};

    if (data.type === 'reservation') {
        const reservation = data.payload as Reservation;
        fields = {
            "Name": reservation.customer_phone || "Unknown Guest", // Using phone as name fallback
            "Phone": reservation.customer_phone,
            "Notes": reservation.notes,
            "Status": reservation.status,
            "Date": new Date().toISOString(),
            "Source": agentName ? `Club Agent - ${agentName}` : "Club Agent"
        };
    } else if (data.type === 'call') {
        const call = data.payload as Call;
        fields = {
            "Caller": call.caller_number,
            "Summary": call.summary,
            "Transcript": call.transcript,
            "Status": call.status,
            "Date": new Date().toISOString(),
            "Recording": call.recording_url
        };
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${config.api_key}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                records: [
                    {
                        fields: fields
                    }
                ]
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("Airtable API Error:", error);
            return false;
        }

        return true;
    } catch (error) {
        console.error("Failed to save to Airtable:", error);
        return false;
    }
}
