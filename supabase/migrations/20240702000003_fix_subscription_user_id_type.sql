-- Fix the type mismatch in the subscriptions table
ALTER TABLE subscriptions
ALTER COLUMN user_id TYPE uuid USING user_id::uuid;

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Users can view their own subscriptions" ON subscriptions;

-- Create policy with proper type handling
CREATE POLICY "Users can view their own subscriptions"
ON subscriptions FOR SELECT
USING (auth.uid() = user_id);

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Users can update their own subscriptions" ON subscriptions;

-- Create policy with proper type handling
CREATE POLICY "Users can update their own subscriptions"
ON subscriptions FOR UPDATE
USING (auth.uid() = user_id);
