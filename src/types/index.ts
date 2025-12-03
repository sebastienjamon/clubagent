export type Agent = {
    id: string;
    user_id: string;
    name: string;
    business_name: string | null;
    system_prompt: string | null;
    voice_id: string | null;
    first_message: string | null;
    banner_url: string | null;
    integrations: {
        web_app_enabled: boolean;
        airtable_enabled: boolean;
        airtable_config?: {
            api_key: string;
            base_id: string;
            table_name: string;
            embed_url?: string;
        };
        custom_enabled: boolean;
        salesforce_enabled: boolean;
        salesforce_config?: {
            instance_url: string;
            client_id: string;
            client_secret: string;
            object_name: string;
        };
    } | null;
    created_at: string;
};

export type PhoneNumber = {
    id: string;
    agent_id: string;
    phone_number: string;
    provider: 'twilio' | 'vonage';
};

export type Call = {
    id: string;
    agent_id: string;
    vapi_call_id: string | null;
    caller_number: string | null;
    status: string | null;
    transcript: string | null;
    recording_url: string | null;
    summary: string | null;
    started_at: string | null;
    ended_at: string | null;
    created_at: string;
};

export type Reservation = {
    id: string;
    agent_id: string;
    call_id: string | null;
    customer_phone: string | null;
    notes: string | null;
    status: string;
    created_at: string;
};
