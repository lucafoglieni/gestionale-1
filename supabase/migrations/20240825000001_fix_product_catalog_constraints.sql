-- Drop existing constraints if they exist
ALTER TABLE IF EXISTS product_categories DROP CONSTRAINT IF EXISTS product_categories_name_key;
ALTER TABLE IF EXISTS products DROP CONSTRAINT IF EXISTS products_name_category_id_key;

-- Add unique constraint to product_categories
ALTER TABLE product_categories ADD CONSTRAINT product_categories_name_key UNIQUE (name);

-- Add unique constraint to products (name + category_id)
ALTER TABLE products ADD CONSTRAINT products_name_category_id_key UNIQUE (name, category_id);

-- Enable realtime for these tables
ALTER PUBLICATION supabase_realtime ADD TABLE product_categories;
ALTER PUBLICATION supabase_realtime ADD TABLE products;
