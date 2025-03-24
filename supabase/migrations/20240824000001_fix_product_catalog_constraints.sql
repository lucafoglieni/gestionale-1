-- Add unique constraint to product_categories table if it doesn't exist already
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'product_categories_name_key' AND conrelid = 'product_categories'::regclass
    ) THEN
        ALTER TABLE product_categories ADD CONSTRAINT product_categories_name_key UNIQUE (name);
    END IF;
EXCEPT
    WHEN undefined_table THEN
        -- Table doesn't exist yet, create it with the constraint
        CREATE TABLE IF NOT EXISTS product_categories (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            name TEXT NOT NULL UNIQUE,
            description TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
END;
$$;

-- Add unique constraint to products table if it doesn't exist already
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'products_name_key' AND conrelid = 'products'::regclass
    ) THEN
        ALTER TABLE products ADD CONSTRAINT products_name_key UNIQUE (name);
    END IF;
EXCEPT
    WHEN undefined_table THEN
        -- Handle case where table doesn't exist yet
        NULL;
END;
$$;

-- Add unit_of_measure column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'unit_of_measure'
    ) THEN
        ALTER TABLE products ADD COLUMN unit_of_measure TEXT DEFAULT 'pz';
    END IF;
EXCEPT
    WHEN undefined_table THEN
        -- Handle case where table doesn't exist yet
        NULL;
END;
$$;

-- Add category_id column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'category_id'
    ) THEN
        ALTER TABLE products ADD COLUMN category_id UUID REFERENCES product_categories(id);
    END IF;
EXCEPT
    WHEN undefined_table THEN
        -- Handle case where table doesn't exist yet
        NULL;
END;
$$;

-- Enable RLS on product_categories
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;

-- Enable RLS on products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create or replace policies for product_categories
DROP POLICY IF EXISTS "Allow full access to authenticated users" ON product_categories;
CREATE POLICY "Allow full access to authenticated users"
    ON product_categories
    USING (auth.role() = 'authenticated');

-- Create or replace policies for products
DROP POLICY IF EXISTS "Allow full access to authenticated users" ON products;
CREATE POLICY "Allow full access to authenticated users"
    ON products
    USING (auth.role() = 'authenticated');

-- Enable realtime for both tables
ALTER PUBLICATION supabase_realtime ADD TABLE product_categories;
ALTER PUBLICATION supabase_realtime ADD TABLE products;
