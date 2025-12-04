
-- Fix RLS policies for calls table
DROP POLICY IF EXISTS "Users can view calls for their agents" ON "public"."calls";
DROP POLICY IF EXISTS "Users can view calls for their agents or example agents" ON "public"."calls";

CREATE POLICY "Users can view calls for their agents or example agents" ON "public"."calls"
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM agents
    WHERE agents.id = calls.agent_id
    AND (
      agents.user_id = auth.uid()
      OR agents.user_id = '7cba02cf-66d1-4321-a987-0e43ac304aae' -- EXAMPLE_AGENT_USER_ID
    )
  )
);

-- Fix RLS policies for reservations table
DROP POLICY IF EXISTS "Users can view reservations for their agents" ON "public"."reservations";
DROP POLICY IF EXISTS "Users can view reservations for their agents or example agents" ON "public"."reservations";

CREATE POLICY "Users can view reservations for their agents or example agents" ON "public"."reservations"
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM agents
    WHERE agents.id = reservations.agent_id
    AND (
      agents.user_id = auth.uid()
      OR agents.user_id = '7cba02cf-66d1-4321-a987-0e43ac304aae' -- EXAMPLE_AGENT_USER_ID
    )
  )
);
