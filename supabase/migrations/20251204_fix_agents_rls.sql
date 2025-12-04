-- Enable RLS on the table (ensure it is enabled)
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

-- 1. INSERT Policy
DROP POLICY IF EXISTS "Users can insert their own agents" ON public.agents;
CREATE POLICY "Users can insert their own agents"
ON public.agents
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 2. UPDATE Policy
DROP POLICY IF EXISTS "Users can update their own agents" ON public.agents;
CREATE POLICY "Users can update their own agents"
ON public.agents
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- 3. DELETE Policy
DROP POLICY IF EXISTS "Users can delete their own agents" ON public.agents;
CREATE POLICY "Users can delete their own agents"
ON public.agents
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- 4. SELECT Policy
DROP POLICY IF EXISTS "Users can view their own agents" ON public.agents;
CREATE POLICY "Users can view their own agents"
ON public.agents
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
