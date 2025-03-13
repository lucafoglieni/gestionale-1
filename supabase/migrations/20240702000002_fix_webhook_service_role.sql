-- Disable RLS for webhook_events table
ALTER TABLE webhook_events DISABLE ROW LEVEL SECURITY;

-- Disable RLS for subscriptions table
ALTER TABLE subscriptions DISABLE ROW LEVEL SECURITY;

-- Create policies for webhook_events table
DROP POLICY IF EXISTS "Allow service role full access to webhook_events" ON webhook_events;
CREATE POLICY "Allow service role full access to webhook_events"
ON webhook_events
FOR ALL
TO service_role
USING (true);

-- Create policies for subscriptions table
DROP POLICY IF EXISTS "Allow service role full access to subscriptions" ON subscriptions;
CREATE POLICY "Allow service role full access to subscriptions"
ON subscriptions
FOR ALL
TO service_role
USING (true);

-- Allow users to read their own subscriptions
DROP POLICY IF EXISTS "Allow users to read their own subscriptions" ON subscriptions;
CREATE POLICY "Allow users to read their own subscriptions"
ON subscriptions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Enable realtime for webhook_events
ALTER PUBLICATION supabase_realtime ADD TABLE webhook_events;

-- Enable realtime for subscriptions
ALTER PUBLICATION supabase_realtime ADD TABLE subscriptions;
