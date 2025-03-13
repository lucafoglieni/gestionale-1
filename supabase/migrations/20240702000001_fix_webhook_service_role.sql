-- This migration ensures the webhook_events table exists and has the correct permissions

-- First, make sure the webhook_events table exists
CREATE TABLE IF NOT EXISTS webhook_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    type TEXT NOT NULL,
    polar_event_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    modified_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    data JSONB,
    error TEXT
);

-- Enable row level security
ALTER TABLE webhook_events ENABLE ROW LEVEL SECURITY;

-- Create policy for service role to insert
DROP POLICY IF EXISTS "Service role can insert webhook events" ON webhook_events;
CREATE POLICY "Service role can insert webhook events"
    ON webhook_events FOR INSERT
    TO service_role
    USING (true);

-- Create policy for service role to select
DROP POLICY IF EXISTS "Service role can select webhook events" ON webhook_events;
CREATE POLICY "Service role can select webhook events"
    ON webhook_events FOR SELECT
    TO service_role
    USING (true);

-- Create policy for service role to update
DROP POLICY IF EXISTS "Service role can update webhook events" ON webhook_events;
CREATE POLICY "Service role can update webhook events"
    ON webhook_events FOR UPDATE
    TO service_role
    USING (true);

-- Make sure the subscriptions table has the correct permissions
ALTER TABLE IF EXISTS subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy for service role to insert subscriptions
DROP POLICY IF EXISTS "Service role can insert subscriptions" ON subscriptions;
CREATE POLICY "Service role can insert subscriptions"
    ON subscriptions FOR INSERT
    TO service_role
    USING (true);

-- Create policy for service role to select subscriptions
DROP POLICY IF EXISTS "Service role can select subscriptions" ON subscriptions;
CREATE POLICY "Service role can select subscriptions"
    ON subscriptions FOR SELECT
    TO service_role
    USING (true);

-- Create policy for service role to update subscriptions
DROP POLICY IF EXISTS "Service role can update subscriptions" ON subscriptions;
CREATE POLICY "Service role can update subscriptions"
    ON subscriptions FOR UPDATE
    TO service_role
    USING (true);
