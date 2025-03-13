-- First drop the policy that's causing issues
DROP POLICY IF EXISTS "Users can view own subscriptions" ON subscriptions;

-- Then update the user_id column to be text type
ALTER TABLE subscriptions ALTER COLUMN user_id TYPE text;

-- Re-create the policy with the updated column type
CREATE POLICY "Users can view own subscriptions"
ON subscriptions FOR SELECT
USING (auth.uid()::text = user_id);

-- Add policy for users to insert their own subscriptions
CREATE POLICY "Users can insert own subscriptions"
ON subscriptions FOR INSERT
WITH CHECK (auth.uid()::text = user_id);

-- Add policy for users to update their own subscriptions
CREATE POLICY "Users can update own subscriptions"
ON subscriptions FOR UPDATE
USING (auth.uid()::text = user_id);

-- Enable RLS on subscriptions table
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Grant service role access to webhook_events table
GRANT ALL ON webhook_events TO service_role;

-- Grant service role access to subscriptions table
GRANT ALL ON subscriptions TO service_role;
