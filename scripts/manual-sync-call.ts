import { createClient } from '@supabase/supabase-js';

// Hardcoded credentials for this manual operation
const SUPABASE_URL = 'https://udqgkcsqhnujzceznnxr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkcWdrY3NxaG51anpjZXpubnhyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDUyNTI5OSwiZXhwIjoyMDgwMTAxMjk5fQ.OqaRzRTGFDm5qUQ0TlktMbyNeAH7M4ivTxAct1rG72U';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const CALL_DATA = {
    id: "019ad688-9fc1-7aaf-a63d-0ba3b34cd69d",
    phoneNumber: "+19044101733",
    customerNumber: "+33613444226",
    startedAt: "2025-11-30T20:51:11.306Z",
    endedAt: "2025-11-30T20:53:54.918Z",
    transcript: `AI: Hello. Welcome to the Grand Hotel. How may I assist you today?
User: I typed to make a reservation.
AI: Thank you for choosing the Grand Hotel. I'd be happy to assist you with making a reservation. May I please have the following details to proceed? Check-in and check out dates. Number of guests, room preference, for example, single double suite, any special requests or requirements. Once I have this information, I can check availability and assist you with your booking.
User: Yes. A a room for today for 2 people with the king bed, please.
AI: Thank you for your request. To complete your reservation, may I please have your name and a contact phone number or email address? If you have any special requests, such as a late check-in or dietary requirements, please let me know. Once I have your details, I will confirm availability and finalize your booking for a king room for 2 guests starting today.
User: Yes. So that's my name, and my number is a plus 3 3 6 1 3 4 4 4 2 2 6.
AI: Thank you for providing your contact number. For clarity, could you please confirm your full name as it should appear on the reservation? Once I have your name, I'll proceed to secure a king room for 2 guests for tonight. I'll also provide you with the reservation details and confirmation if you have any additional requests such as a quiet room, airport transfer, or breakfast included, please let me know.
User: Yes. Sebastian Chairman. It spells c a m o n.
AI: Thank you, mister Sebastian I have noted your name and phone number. Plus 33 6 13 44 42 26. To confirm, you are requesting a king bedroom for 2 guests tonight. May I ask if you would like breakfast included with your stay or have any other special requests such as a late check-in or a quiet room. Once you've confirmed any preferences, I will reserve your room and send you the confirmation details.
User: Boxes included. And please go ahead and make the booking.
AI: Thank you, mister Cayman. I have noted that breakfast is included in your reservation. I am now proceeding with booking a king room for 2 guests for tonight with breakfast. Once your reservation is confirmed, you will receive a confirmation message to the phone number you provided. Upon arrival, please present a valid ID and your confirmation details at the front desk. If you need anything else such as directions, transportation, or additional amenities, please let me know. Otherwise, we look forward to welcoming you to the Grand Hotel this evening.
User: Thank you very much.
AI: You're most welcome, mister Cayman. It's our pleasure to assist you. If you have any further questions or need assistance before your arrival, please don't hesitate to reach out. We look forward to welcoming you to the Grand Hotel, and hope you have a wonderful stay. Safe travels.`,
    summary: "The user called the Grand Hotel to make a reservation for a king room for two people, checking in today. They provided their name and contact number, and requested breakfast to be included with their stay. The AI confirmed the booking details and informed the user that a confirmation message would be sent.",
    recordingUrl: "https://storage.vapi.ai/019ad688-9fc1-7aaf-a63d-0ba3b34cd69d-1764536037713-91c83913-d5d9-46ea-b86b-0819ba182233-mono.wav"
};

async function syncCall() {
    console.log("Syncing call:", CALL_DATA.id);

    // 1. Find Agent
    const { data: phoneData, error: phoneError } = await supabase
        .from('phone_numbers')
        .select('agent_id')
        .eq('phone_number', CALL_DATA.phoneNumber)
        .single();

    if (phoneError || !phoneData) {
        console.error("Failed to find agent for number:", CALL_DATA.phoneNumber, phoneError);
        return;
    }

    console.log("Found Agent ID:", phoneData.agent_id);

    // 2. Insert Call
    const { data: callData, error: callError } = await supabase.from('calls').insert({
        agent_id: phoneData.agent_id,
        vapi_call_id: CALL_DATA.id,
        caller_number: CALL_DATA.customerNumber,
        status: 'completed',
        transcript: CALL_DATA.transcript,
        recording_url: CALL_DATA.recordingUrl,
        summary: CALL_DATA.summary,
        started_at: CALL_DATA.startedAt,
        ended_at: CALL_DATA.endedAt
    }).select().single();

    if (callError) {
        console.error("Failed to insert call:", callError);
        return;
    }

    console.log("Call inserted successfully:", callData.id);

    // 3. Create Reservation (Logic from webhook)
    const lowerSummary = (CALL_DATA.summary || "").toLowerCase();
    if (lowerSummary.includes("reservation") || lowerSummary.includes("booked") || lowerSummary.includes("table") || lowerSummary.includes("bed")) {
        console.log("Creating reservation...");

        const { error: resError } = await supabase.from('reservations').insert({
            agent_id: phoneData.agent_id,
            call_id: callData.id,
            customer_phone: CALL_DATA.customerNumber,
            notes: CALL_DATA.summary,
            status: 'pending'
        });

        if (resError) {
            console.error("Failed to create reservation:", resError);
        } else {
            console.log("Reservation created successfully.");
        }
    }
}

syncCall();
