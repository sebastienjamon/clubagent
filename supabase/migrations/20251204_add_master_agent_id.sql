
-- Add master_agent_id column to agents table
ALTER TABLE "public"."agents" 
ADD COLUMN "master_agent_id" uuid REFERENCES "public"."agents"("id") ON DELETE SET NULL;

-- Add index for performance
CREATE INDEX "agents_master_agent_id_idx" ON "public"."agents"("master_agent_id");
