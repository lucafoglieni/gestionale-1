-- Fix product catalog migration issues

-- First, ensure the product_categories table exists
CREATE TABLE IF NOT EXISTS product_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add category_id column to products table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'category_id') THEN
    ALTER TABLE products ADD COLUMN category_id UUID REFERENCES product_categories(id);
  END IF;

  -- Add unit_of_measure column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'unit_of_measure') THEN
    ALTER TABLE products ADD COLUMN unit_of_measure TEXT DEFAULT 'pz';
  END IF;
END
$$;

-- Insert categories if they don't exist
DO $$
DECLARE
  windows_id UUID;
  doors_id UUID;
  accessories_id UUID;
  hardware_id UUID;
  glass_id UUID;
  profiles_id UUID;
  gaskets_id UUID;
  other_id UUID;
BEGIN
  -- Insert categories only if they don't exist
  INSERT INTO product_categories (name, description)
  VALUES ('Finestre', 'Finestre e infissi di varie tipologie')
  ON CONFLICT (name) DO NOTHING
  RETURNING id INTO windows_id;
  
  INSERT INTO product_categories (name, description)
  VALUES ('Porte', 'Porte interne ed esterne')
  ON CONFLICT (name) DO NOTHING
  RETURNING id INTO doors_id;
  
  INSERT INTO product_categories (name, description)
  VALUES ('Accessori', 'Accessori vari per serramenti')
  ON CONFLICT (name) DO NOTHING
  RETURNING id INTO accessories_id;
  
  INSERT INTO product_categories (name, description)
  VALUES ('Ferramenta', 'Componenti di ferramenta')
  ON CONFLICT (name) DO NOTHING
  RETURNING id INTO hardware_id;
  
  INSERT INTO product_categories (name, description)
  VALUES ('Vetri', 'Vetri e vetrocamere')
  ON CONFLICT (name) DO NOTHING
  RETURNING id INTO glass_id;
  
  INSERT INTO product_categories (name, description)
  VALUES ('Profili', 'Profili in alluminio, PVC e legno')
  ON CONFLICT (name) DO NOTHING
  RETURNING id INTO profiles_id;
  
  INSERT INTO product_categories (name, description)
  VALUES ('Guarnizioni', 'Guarnizioni e sigillanti')
  ON CONFLICT (name) DO NOTHING
  RETURNING id INTO gaskets_id;
  
  INSERT INTO product_categories (name, description)
  VALUES ('Altro', 'Altri prodotti')
  ON CONFLICT (name) DO NOTHING
  RETURNING id INTO other_id;
  
  -- If we couldn't get the IDs from the RETURNING clause, fetch them
  IF windows_id IS NULL THEN
    SELECT id INTO windows_id FROM product_categories WHERE name = 'Finestre';
  END IF;
  
  IF doors_id IS NULL THEN
    SELECT id INTO doors_id FROM product_categories WHERE name = 'Porte';
  END IF;
  
  IF accessories_id IS NULL THEN
    SELECT id INTO accessories_id FROM product_categories WHERE name = 'Accessori';
  END IF;
  
  IF hardware_id IS NULL THEN
    SELECT id INTO hardware_id FROM product_categories WHERE name = 'Ferramenta';
  END IF;
  
  IF glass_id IS NULL THEN
    SELECT id INTO glass_id FROM product_categories WHERE name = 'Vetri';
  END IF;
  
  IF profiles_id IS NULL THEN
    SELECT id INTO profiles_id FROM product_categories WHERE name = 'Profili';
  END IF;
  
  IF gaskets_id IS NULL THEN
    SELECT id INTO gaskets_id FROM product_categories WHERE name = 'Guarnizioni';
  END IF;
  
  IF other_id IS NULL THEN
    SELECT id INTO other_id FROM product_categories WHERE name = 'Altro';
  END IF;
  
  -- Insert sample products
  -- Windows
  INSERT INTO products (name, description, price, type, category_id, unit_of_measure)
  VALUES ('Finestra Standard', 'Finestra in alluminio a battente', 350, 'window', windows_id, 'pz')
  ON CONFLICT (name) DO NOTHING;
  
  INSERT INTO products (name, description, price, type, category_id, unit_of_measure)
  VALUES ('Finestra Scorrevole', 'Finestra scorrevole in PVC', 450, 'window', windows_id, 'pz')
  ON CONFLICT (name) DO NOTHING;
  
  INSERT INTO products (name, description, price, type, category_id, unit_of_measure)
  VALUES ('Finestra a Vasistas', 'Finestra a vasistas in legno', 380, 'window', windows_id, 'pz')
  ON CONFLICT (name) DO NOTHING;
  
  -- Doors
  INSERT INTO products (name, description, price, type, category_id, unit_of_measure)
  VALUES ('Porta d''Ingresso', 'Porta d''ingresso in legno massello', 850, 'door', doors_id, 'pz')
  ON CONFLICT (name) DO NOTHING;
  
  INSERT INTO products (name, description, price, type, category_id, unit_of_measure)
  VALUES ('Porta Scorrevole', 'Porta scorrevole in vetro e alluminio', 750, 'door', doors_id, 'pz')
  ON CONFLICT (name) DO NOTHING;
  
  INSERT INTO products (name, description, price, type, category_id, unit_of_measure)
  VALUES ('Porta Interna', 'Porta interna in legno laccato', 450, 'door', doors_id, 'pz')
  ON CONFLICT (name) DO NOTHING;
  
  -- Accessories
  INSERT INTO products (name, description, price, type, category_id, unit_of_measure)
  VALUES ('Maniglia Standard', 'Maniglia in alluminio satinato', 45, 'accessory', accessories_id, 'pz')
  ON CONFLICT (name) DO NOTHING;
  
  INSERT INTO products (name, description, price, type, category_id, unit_of_measure)
  VALUES ('Zanzariera', 'Zanzariera a rullo per finestre', 120, 'accessory', accessories_id, 'pz')
  ON CONFLICT (name) DO NOTHING;
  
  INSERT INTO products (name, description, price, type, category_id, unit_of_measure)
  VALUES ('Persiana', 'Persiana in alluminio regolabile', 280, 'accessory', accessories_id, 'pz')
  ON CONFLICT (name) DO NOTHING;
  
  -- Hardware
  INSERT INTO products (name, description, price, type, category_id, unit_of_measure)
  VALUES ('Cerniera Standard', 'Cerniera in acciaio per porte', 15, 'hardware', hardware_id, 'pz')
  ON CONFLICT (name) DO NOTHING;
  
  INSERT INTO products (name, description, price, type, category_id, unit_of_measure)
  VALUES ('Serratura di Sicurezza', 'Serratura a cilindro europeo', 85, 'hardware', hardware_id, 'pz')
  ON CONFLICT (name) DO NOTHING;
  
  -- Glass
  INSERT INTO products (name, description, price, type, category_id, unit_of_measure)
  VALUES ('Vetrocamera Standard', 'Vetrocamera 4-16-4 basso emissivo', 120, 'glass', glass_id, 'm²')
  ON CONFLICT (name) DO NOTHING;
  
  INSERT INTO products (name, description, price, type, category_id, unit_of_measure)
  VALUES ('Vetro Temperato', 'Vetro temperato di sicurezza 10mm', 180, 'glass', glass_id, 'm²')
  ON CONFLICT (name) DO NOTHING;
  
  -- Profiles
  INSERT INTO products (name, description, price, type, category_id, unit_of_measure)
  VALUES ('Profilo Alluminio', 'Profilo in alluminio con taglio termico', 45, 'profile', profiles_id, 'm')
  ON CONFLICT (name) DO NOTHING;
  
  INSERT INTO products (name, description, price, type, category_id, unit_of_measure)
  VALUES ('Profilo PVC', 'Profilo in PVC a 5 camere', 35, 'profile', profiles_id, 'm')
  ON CONFLICT (name) DO NOTHING;
  
  -- Gaskets
  INSERT INTO products (name, description, price, type, category_id, unit_of_measure)
  VALUES ('Guarnizione Perimetrale', 'Guarnizione in EPDM per finestre', 3.5, 'gasket', gaskets_id, 'm')
  ON CONFLICT (name) DO NOTHING;
  
  INSERT INTO products (name, description, price, type, category_id, unit_of_measure)
  VALUES ('Silicone Neutro', 'Silicone neutro per serramenti', 8.5, 'gasket', gaskets_id, 'pz')
  ON CONFLICT (name) DO NOTHING;
  
END
$$;

-- Add unique constraint on name for product_categories if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'product_categories_name_key' AND conrelid = 'product_categories'::regclass
  ) THEN
    ALTER TABLE product_categories ADD CONSTRAINT product_categories_name_key UNIQUE (name);
  END IF;
END
$$;

-- Enable row level security
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies
DROP POLICY IF EXISTS "Allow all access to product_categories" ON product_categories;
CREATE POLICY "Allow all access to product_categories"
  ON product_categories
  FOR ALL
  USING (true);

DROP POLICY IF EXISTS "Allow all access to products" ON products;
CREATE POLICY "Allow all access to products"
  ON products
  FOR ALL
  USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE product_categories;
ALTER PUBLICATION supabase_realtime ADD TABLE products;
