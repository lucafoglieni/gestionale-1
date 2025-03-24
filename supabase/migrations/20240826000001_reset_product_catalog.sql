-- Drop existing tables if they exist to start fresh
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS product_categories;

-- Create product_categories table
CREATE TABLE IF NOT EXISTS product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  unit_of_measure TEXT NOT NULL DEFAULT 'pz',
  category_id UUID REFERENCES product_categories(id),
  type TEXT NOT NULL DEFAULT 'product',
  description TEXT,
  properties JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS products_category_id_idx ON products(category_id);
CREATE INDEX IF NOT EXISTS products_name_idx ON products(name);

-- Enable RLS
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Users can view their own categories" ON product_categories;
CREATE POLICY "Users can view their own categories"
  ON product_categories
  FOR ALL
  USING (true);

DROP POLICY IF EXISTS "Users can view their own products" ON products;
CREATE POLICY "Users can view their own products"
  ON product_categories
  FOR ALL
  USING (true);

-- Enable realtime
DROP PUBLICATION IF EXISTS supabase_realtime;
CREATE PUBLICATION supabase_realtime;

ALTER PUBLICATION supabase_realtime ADD TABLE product_categories;
ALTER PUBLICATION supabase_realtime ADD TABLE products;

-- Insert some default categories
INSERT INTO product_categories (name, description)
VALUES 
  ('Finestre', 'Finestre di vari tipi e materiali'),
  ('Porte', 'Porte interne ed esterne'),
  ('Accessori', 'Accessori per serramenti')
ON CONFLICT (name) DO NOTHING;
