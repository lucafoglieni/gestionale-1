-- Create tables
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  name TEXT,
  avatar_url TEXT,
  image TEXT,
  subscription TEXT,
  credits TEXT,
  user_id UUID,
  token_identifier TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id),
  polar_id TEXT,
  polar_price_id TEXT,
  currency TEXT,
  interval TEXT,
  status TEXT,
  current_period_start BIGINT,
  current_period_end BIGINT,
  cancel_at_period_end BOOLEAN,
  amount NUMERIC,
  started_at BIGINT,
  ended_at BIGINT,
  canceled_at BIGINT,
  customer_cancellation_reason TEXT,
  customer_cancellation_comment TEXT,
  metadata JSONB,
  custom_field_data JSONB,
  customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.webhook_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL,
  type TEXT NOT NULL,
  polar_event_id TEXT,
  data JSONB,
  error TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  modified_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable row level security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Public users access" ON public.users;
CREATE POLICY "Public users access"
  ON public.users
  FOR ALL
  USING (true);

DROP POLICY IF EXISTS "Public subscriptions access" ON public.subscriptions;
CREATE POLICY "Public subscriptions access"
  ON public.subscriptions
  FOR ALL
  USING (true);

DROP POLICY IF EXISTS "Public webhook_events access" ON public.webhook_events;
CREATE POLICY "Public webhook_events access"
  ON public.webhook_events
  FOR ALL
  USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.users;
ALTER PUBLICATION supabase_realtime ADD TABLE public.subscriptions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.webhook_events;