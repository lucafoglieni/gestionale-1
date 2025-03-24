-- Create tables for quote management system

-- Products table for catalog items
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL, -- 'window', 'door', 'accessory'
  category TEXT,
  price NUMERIC NOT NULL,
  image_url TEXT,
  material TEXT,
  dimensions JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customers table
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quotes table
CREATE TABLE IF NOT EXISTS public.quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_number TEXT NOT NULL,
  user_id UUID REFERENCES public.users(id),
  customer_id UUID REFERENCES public.customers(id),
  status TEXT DEFAULT 'draft', -- 'draft', 'sent', 'approved', 'rejected'
  total_amount NUMERIC DEFAULT 0,
  tax_rate NUMERIC DEFAULT 22,
  tax_amount NUMERIC DEFAULT 0,
  discount_amount NUMERIC DEFAULT 0,
  final_amount NUMERIC DEFAULT 0,
  notes TEXT,
  valid_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quote items table
CREATE TABLE IF NOT EXISTS public.quote_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id UUID REFERENCES public.quotes(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  name TEXT NOT NULL,
  description TEXT,
  quantity INTEGER DEFAULT 1,
  unit_price NUMERIC NOT NULL,
  width NUMERIC, -- in cm
  height NUMERIC, -- in cm
  material TEXT,
  finish TEXT,
  accessories JSONB,
  total_price NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable row level security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_items ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view their products" ON public.products;
CREATE POLICY "Users can view their products"
  ON public.products
  FOR ALL
  USING (true);

DROP POLICY IF EXISTS "Users can view their customers" ON public.customers;
CREATE POLICY "Users can view their customers"
  ON public.customers
  FOR ALL
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their quotes" ON public.quotes;
CREATE POLICY "Users can view their quotes"
  ON public.quotes
  FOR ALL
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their quote items" ON public.quote_items;
CREATE POLICY "Users can view their quote items"
  ON public.quote_items
  FOR ALL
  USING (quote_id IN (SELECT id FROM public.quotes WHERE user_id = auth.uid()));

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.customers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.quotes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.quote_items;

-- Insert sample products
INSERT INTO public.products (name, description, type, category, price, image_url, material)
VALUES
  ('Finestra Standard', 'Finestra in alluminio a battente', 'window', 'standard', 350, 'https://images.unsplash.com/photo-1604082787627-530fec8b9f74?w=500&q=80', 'aluminum'),
  ('Finestra Scorrevole', 'Finestra scorrevole in PVC', 'window', 'sliding', 450, 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=500&q=80', 'pvc'),
  ('Finestra a Vasistas', 'Finestra a vasistas in legno', 'window', 'tilt', 380, 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=500&q=80', 'wood'),
  ('Porta d''Ingresso', 'Porta d''ingresso in legno massello', 'door', 'entrance', 850, 'https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?w=500&q=80', 'wood'),
  ('Porta Scorrevole', 'Porta scorrevole in vetro e alluminio', 'door', 'sliding', 750, 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=500&q=80', 'aluminum'),
  ('Porta Interna', 'Porta interna in legno laccato', 'door', 'interior', 450, 'https://images.unsplash.com/photo-1600566752447-f4c9fb5d1eb5?w=500&q=80', 'wood'),
  ('Maniglia Standard', 'Maniglia in alluminio satinato', 'accessory', 'handle', 45, 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500&q=80', 'aluminum'),
  ('Zanzariera', 'Zanzariera a rullo per finestre', 'accessory', 'mosquito-net', 120, 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=500&q=80', 'aluminum'),
  ('Persiana', 'Persiana in alluminio regolabile', 'accessory', 'shutter', 280, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80', 'aluminum')
ON CONFLICT DO NOTHING;