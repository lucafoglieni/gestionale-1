-- Import catalog data from the full-catalog-data.js file

-- First, create a function to import products
CREATE OR REPLACE FUNCTION import_catalog_data()
RETURNS void AS $$
DECLARE
  category_id UUID;
  product_id UUID;
BEGIN
  -- Create categories for each section in the catalog
  
  -- Tapparelle
  INSERT INTO product_categories (name, description)
  VALUES ('Tapparelle', 'Tapparelle e accessori per avvolgibili')
  RETURNING id INTO category_id;
  
  -- Insert products from Tapparelle in acciaio
  INSERT INTO products (name, price, unit_of_measure, category_id, type)
  VALUES ('Tapparella in Acciaio coibentato CS55', 0.00, 'mq', category_id, 'Tapparelle in acciao');
  
  -- Insert products from Tapparelle in PVC
  INSERT INTO products (name, price, unit_of_measure, category_id, type)
  VALUES 
    ('Profilo in Pvc per avvolgibile 6,5 kg/mq Antigrandine', 0.00, 'mq', category_id, 'Tapparelle in PVC'),
    ('Profilo in Pvc per avvolgibile 5,0 kg/mq', 0.00, 'mq', category_id, 'Tapparelle in PVC');
  
  -- Insert products from Tapparelle in alluminio
  INSERT INTO products (name, price, unit_of_measure, category_id, type)
  VALUES 
    ('Profilo in Alluminio coibentato Maxi A77 - Telo completo', 0.00, 'mq', category_id, 'Tapparelle in alluminio'),
    ('Profilo in Alluminio a stecche orientabili Inklina', 0.00, 'mq', category_id, 'Tapparelle in alluminio'),
    ('Profilo Autobloccante', 0.00, 'mq', category_id, 'Tapparelle in alluminio');
  
  -- Accessori
  INSERT INTO product_categories (name, description)
  VALUES ('Accessori', 'Accessori vari per serramenti')
  RETURNING id INTO category_id;
  
  -- Insert products from Accessori per serramenti
  INSERT INTO products (name, price, unit_of_measure, category_id, type)
  VALUES 
    ('Zanzariera', 0.00, 'mq', category_id, 'Accessori per serramenti'),
    ('Tapparella', 0.00, 'mq', category_id, 'Accessori per serramenti'),
    ('Inglesina 6 campi', 0.00, 'ml', category_id, 'Accessori per serramenti'),
    ('Cassonetto in legno', 0.00, 'ml', category_id, 'Accessori per serramenti');
  
  -- Maniglie
  INSERT INTO product_categories (name, description)
  VALUES ('Maniglie', 'Maniglie e maniglioni per porte e finestre')
  RETURNING id INTO category_id;
  
  -- Insert products from Maniglia
  INSERT INTO products (name, price, unit_of_measure, category_id, type)
  VALUES 
    ('Maniglia Mod. Verona', 0.00, 'pz', category_id, 'Maniglia'),
    ('Maniglia DK e copricerniere Titanio', 0.00, 'pz', category_id, 'Maniglia'),
    ('Maniglia DK e copricerniere Ottone', 100.00, 'pz', category_id, 'Maniglia'),
    ('Maniglia DK e copricerniere Cromo Satinato', 0.00, 'pz', category_id, 'Maniglia'),
    ('Maniglia DK e copricerniere Bronzo', 0.00, 'pz', category_id, 'Maniglia'),
    ('Maniglia DK e copricerniere Bianco', 0.00, 'pz', category_id, 'Maniglia');
  
  -- Servizi
  INSERT INTO product_categories (name, description)
  VALUES ('Servizi', 'Servizi di posa e installazione')
  RETURNING id INTO category_id;
  
  -- Insert products from Servizi vari
  INSERT INTO products (name, price, unit_of_measure, category_id, type)
  VALUES 
    ('Tiro al piano compreso nei costi di posa', 0.00, 'pz', category_id, 'Servizi vari'),
    ('Smaltimento vecchi infissi e cassonetti', 0.00, 'pz', category_id, 'Servizi vari'),
    ('Pratica per detrazione fiscale ENEA', 100.00, 'pz', category_id, 'Servizi vari'),
    ('Posa in opera del cassonetto', 0.00, 'pz', category_id, 'Servizi vari'),
    ('Posa in Opera', 0.00, 'pz', category_id, 'Servizi vari');
  
  -- Zanzariere
  INSERT INTO product_categories (name, description)
  VALUES ('Zanzariere', 'Zanzariere e accessori')
  RETURNING id INTO category_id;
  
  -- Insert products from Zanzariera
  INSERT INTO products (name, price, unit_of_measure, category_id, type)
  VALUES 
    ('PLIFLEX LD 18 TN_Zanzariera plissè doppia con ingombro 18mm', 0.00, 'mq', category_id, 'Zanzariera'),
    ('PLIFLEX L 18 TN_ Zanzariera plissè con ingombro 18mm', 0.00, 'mq', category_id, 'Zanzariera'),
    ('M42 TN_Zanzariera verticale 42mm', 0.00, 'mq', category_id, 'Zanzariera'),
    ('LD42 PLUS_ Zanzariera laterale doppia 42mm plus', 0.00, 'mq', category_id, 'Zanzariera'),
    ('L42 PLUS_Zanzariera laterale 42mm plus', 0.00, 'mq', category_id, 'Zanzariera');

END;
$$ LANGUAGE plpgsql;

-- Execute the function to import data
SELECT import_catalog_data();

-- Drop the function after use
DROP FUNCTION import_catalog_data();
