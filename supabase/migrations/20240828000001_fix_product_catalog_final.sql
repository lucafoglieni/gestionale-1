-- First check if quote_items table exists and drop it if it does (to remove dependencies)
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'quote_items') THEN
        DROP TABLE IF EXISTS public.quote_items;
    END IF;
END $$;

-- Drop products table if it exists
DROP TABLE IF EXISTS public.products;

-- Drop product_categories table if it exists
DROP TABLE IF EXISTS public.product_categories;

-- Create product_categories table
CREATE TABLE IF NOT EXISTS public.product_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT product_categories_name_key UNIQUE (name)
);

-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    unit_of_measure TEXT NOT NULL DEFAULT 'pz',
    type TEXT NOT NULL DEFAULT 'product',
    category_id UUID REFERENCES public.product_categories(id),
    properties JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Recreate quote_items table with proper references
CREATE TABLE IF NOT EXISTS public.quote_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id UUID REFERENCES public.quotes(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id),
    name TEXT NOT NULL,
    description TEXT,
    unit_price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER DEFAULT 1,
    total_price DECIMAL(10, 2) NOT NULL,
    width DECIMAL(10, 2),
    height DECIMAL(10, 2),
    material TEXT,
    finish TEXT,
    accessories JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_items ENABLE ROW LEVEL SECURITY;

-- Create policies for product_categories
CREATE POLICY "Users can view their own product_categories"
    ON public.product_categories
    FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own product_categories"
    ON public.product_categories
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Users can update their own product_categories"
    ON public.product_categories
    FOR UPDATE
    USING (true);

CREATE POLICY "Users can delete their own product_categories"
    ON public.product_categories
    FOR DELETE
    USING (true);

-- Create policies for products
CREATE POLICY "Users can view their own products"
    ON public.products
    FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own products"
    ON public.products
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Users can update their own products"
    ON public.products
    FOR UPDATE
    USING (true);

CREATE POLICY "Users can delete their own products"
    ON public.products
    FOR DELETE
    USING (true);

-- Create policies for quote_items
CREATE POLICY "Users can view their own quote_items"
    ON public.quote_items
    FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own quote_items"
    ON public.quote_items
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Users can update their own quote_items"
    ON public.quote_items
    FOR UPDATE
    USING (true);

CREATE POLICY "Users can delete their own quote_items"
    ON public.quote_items
    FOR DELETE
    USING (true);

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.product_categories;
ALTER PUBLICATION supabase_realtime ADD TABLE public.products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.quote_items;
