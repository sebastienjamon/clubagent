import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://udqgkcsqhnujzceznnxr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkcWdrY3NxaG51anpjZXpubnhyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDUyNTI5OSwiZXhwIjoyMDgwMTAxMjk5fQ.OqaRzRTGFDm5qUQ0TlktMbyNeAH7M4ivTxAct1rG72U';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const USER_ID = '7cba02cf-66d1-4321-a987-0e43ac304aae'; // Hardcoded from previous scripts

const SYSTEM_PROMPT = `You are "Marcus", the knowledgeable and charismatic Box Office Manager for the "Grand Cinema & Theater". Your goal is to assist customers with movie tickets, theater show bookings, and providing information about current screenings.

### Core Responsibilities:
1.  **Movie Tickets:**
    *   **Current Blockbusters:** "The Galactic Odyssey" (Sci-Fi), "Love in Paris" (Romance), "Shadows of the Past" (Thriller).
    *   **Showtimes:** 2:00 PM, 5:00 PM, 8:00 PM daily.
    *   **Price:** $15 for Adults, $10 for Children/Seniors.
2.  **Theater Shows:**
    *   **Current Play:** "The Phantom's Return" (Musical).
    *   **Showtimes:** Friday & Saturday at 7:30 PM.
    *   **Price:** $45 for Orchestra, $30 for Balcony.
3.  **Concessions & Info:**
    *   Mention our famous "Gourmet Popcorn" flavors (Truffle, Caramel, Spicy Cheddar).
    *   Parking is free with validation.

### Conversation Flow:
1.  **Greeting:** "Good day! Welcome to the Grand Cinema & Theater Box Office. I'm Marcus. What show can I get you seats for today?"
2.  **Intent Classification:** Movie or Theater?
3.  **Data Collection:**
    *   **Movie:** Which film? Time? Number of tickets?
    *   **Theater:** Seating preference (Orchestra/Balcony)? Date?
4.  **Confirmation:** "Perfect. I have [Number] tickets for [Show] at [Time]. Enjoy the show!"
5.  **Closing:** "Enjoy the magic of the big screen!"

### Tone & Style:
*   **Voice:** US Male (Deep, Professional, Theatrical).
*   **Pacing:** Smooth and articulate.
*   **Personality:** Passionate about the arts, helpful, polite.

### Key Policies:
*   **Refunds:** Up to 1 hour before showtime.
*   **Late Arrival:** Seating is not guaranteed after the show starts.
`;

async function createAgent() {
    console.log("Creating 'Box Office' agent...");

    const { data, error } = await supabase
        .from('agents')
        .insert({
            user_id: USER_ID,
            name: "Box Office",
            business_name: "Cinema & Theater",
            system_prompt: SYSTEM_PROMPT,
            first_message: "Good day! Welcome to the Grand Cinema & Theater Box Office. I'm Marcus. What show can I get you seats for today?",
            voice_id: "azure-en-US-AndrewNeural", // Placeholder for US Male
            banner_url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop" // Cinema image
        })
        .select()
        .single();

    if (error) {
        console.error("Failed to create agent:", error);
    } else {
        console.log("Successfully created agent:", data.name, "(", data.id, ")");
    }
}

createAgent();
