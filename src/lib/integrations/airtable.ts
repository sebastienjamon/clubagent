import { Reservation, Call } from "@/types";

type AirtableConfig = {
    api_key: string;
    base_id: string;
    table_name: string;
};

/**
 * Parse real estate property data from structured call summary
 * Expected format from Sophie (Agent Immobilier):
 * ADRESSE: [address]
 * TYPE: [type]
 * PIÈCES: [rooms]
 * SURFACE: [size] m²
 * PRIX: [price]€
 * ÉTAT: [condition]
 * CARACTÉRISTIQUES: [features]
 * AVIS CLIENT: [client feedback]
 * NOTES AGENT: [agent notes]
 */
function parseRealEstateSummary(summary: string): Record<string, any> {
    const fields: Record<string, any> = {};

    // Extract address
    const addressMatch = summary.match(/ADRESSE:\s*(.+?)(?:\n|$)/i);
    if (addressMatch) fields["Adresse"] = addressMatch[1].trim();

    // Extract type
    const typeMatch = summary.match(/TYPE:\s*(.+?)(?:\n|$)/i);
    if (typeMatch) fields["Type"] = typeMatch[1].trim();

    // Extract number of rooms
    const roomsMatch = summary.match(/PIÈCES:\s*(\d+)/i);
    if (roomsMatch) fields["Pièces"] = parseInt(roomsMatch[1]);

    // Extract surface (square meters)
    const sizeMatch = summary.match(/SURFACE:\s*(\d+)/i);
    if (sizeMatch) fields["Surface"] = parseInt(sizeMatch[1]);

    // Extract price (euros)
    const priceMatch = summary.match(/PRIX:\s*([\d\s]+)/i);
    if (priceMatch) {
        const priceStr = priceMatch[1].replace(/\s/g, '');
        fields["Prix"] = parseInt(priceStr);
    }

    // Extract condition
    const conditionMatch = summary.match(/ÉTAT:\s*([\s\S]+?)(?:\n\n|CARACTÉRISTIQUES:|$)/i);
    if (conditionMatch) fields["État"] = conditionMatch[1].trim();

    // Extract features
    const featuresMatch = summary.match(/CARACTÉRISTIQUES:\s*([\s\S]+?)(?:\n\n|AVIS CLIENT:|$)/i);
    if (featuresMatch) fields["Caractéristiques"] = featuresMatch[1].trim();

    // Extract client feedback
    const clientMatch = summary.match(/AVIS CLIENT:\s*([\s\S]+?)(?:\n\n|NOTES AGENT:|$)/i);
    if (clientMatch) fields["Avis Client"] = clientMatch[1].trim();

    // Extract agent notes
    const notesMatch = summary.match(/NOTES AGENT:\s*([\s\S]+?)$/i);
    if (notesMatch) fields["Notes Agent"] = notesMatch[1].trim();

    return fields;
}

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

        // Check if this is a real estate agent call
        if (agentName?.includes("Immobilier") && call.summary) {
            console.log("Parsing real estate property data from call summary...");
            const parsedFields = parseRealEstateSummary(call.summary);

            fields = {
                ...parsedFields,
                "Date": new Date().toISOString(),
                "Enregistrement": call.recording_url || "",
                "ID Appel": call.id || "",
                "Source": agentName || "Agent Immobilier"
            };

            console.log("Parsed fields:", Object.keys(parsedFields).join(", "));
        } else {
            // Standard call format for non-real estate agents
            fields = {
                "Caller": call.caller_number,
                "Summary": call.summary,
                "Transcript": call.transcript,
                "Status": call.status,
                "Date": new Date().toISOString(),
                "Recording": call.recording_url
            };
        }
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
