-- First drop the foreign key constraint from quote_items to products
ALTER TABLE IF EXISTS quote_items DROP CONSTRAINT IF EXISTS quote_items_product_id_fkey;

-- Now we can safely modify the products table structure
ALTER TABLE IF EXISTS products
  ADD COLUMN IF NOT EXISTS unit_of_measure TEXT DEFAULT 'pz',
  ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES product_categories(id);

-- Re-create the foreign key constraint from quote_items to products
ALTER TABLE IF EXISTS quote_items
  ADD CONSTRAINT quote_items_product_id_fkey
  FOREIGN KEY (product_id)
  REFERENCES products(id);

-- Enable RLS on product_categories table
ALTER TABLE IF EXISTS product_categories ENABLE ROW LEVEL SECURITY;

-- Create policies for product_categories
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON product_categories;
CREATE POLICY "Allow all operations for authenticated users"
  ON product_categories
  USING (auth.role() = 'authenticated');

-- Enable RLS on products table
ALTER TABLE IF EXISTS products ENABLE ROW LEVEL SECURITY;

-- Create policies for products
DROP POLICY IF EXISTS "Allow all operations for authenticated users" ON products;
CREATE POLICY "Allow all operations for authenticated users"
  ON products
  USING (auth.role() = 'authenticated');

-- Add realtime publication for both tables
ALTER PUBLICATION supabase_realtime ADD TABLE product_categories;
ALTER PUBLICATION supabase_realtime ADD TABLE products;
