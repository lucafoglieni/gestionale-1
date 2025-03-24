-- Add product categories
CREATE TABLE IF NOT EXISTS product_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES product_categories(id),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) DEFAULT 0.00,
  unit_of_measure TEXT NOT NULL,
  properties JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert product categories
INSERT INTO product_categories (name, description) VALUES
('Tapparelle in acciaio', 'Tapparelle in acciaio coibentato'),
('Tapparelle in PVC', 'Tapparelle in PVC di vari pesi'),
('Tapparelle in alluminio', 'Tapparelle in alluminio coibentato e orientabili'),
('Kit accessori tapparelle', 'Kit per movimentazione tapparelle'),
('Guide per avvolgibili', 'Guide per avvolgibili in vari materiali'),
('Avvolgitore', 'Avvolgitori per tapparelle'),
('Accessori per serramenti', 'Accessori vari per serramenti'),
('Pannelli sottoporta', 'Pannelli per sottoporta'),
('Coprifili e aggiuntivi', 'Coprifili e componenti aggiuntivi'),
('Coprifili e aggiuntivi esterni', 'Coprifili e componenti aggiuntivi per esterni'),
('Luci aggiuntive', 'Componenti per luci aggiuntive'),
('Telo aggiuntivo cassonetto', 'Telai aggiuntivi per cassonetti'),
('Telai e alette', 'Telai e alette per serramenti'),
('Accessori Avvolgibili', 'Accessori per avvolgibili'),
('Accessori Portoncino', 'Accessori per portoncini'),
('Serrature Portone', 'Serrature per portoni'),
('Scuretto', 'Scuretti interni'),
('Complementi', 'Complementi per serramenti'),
('Aggiuntivi e accoppiamenti', 'Componenti aggiuntivi e accoppiamenti'),
('Zanzariera', 'Zanzariere di vari tipi'),
('Accessori zanzariera', 'Accessori per zanzariere'),
('Forme serramento', 'Forme speciali per serramenti'),
('Forme particolari oblò', 'Forme oblò per serramenti'),
('Cartella Alluminio', 'Cartelle in alluminio'),
('Pannelli portone', 'Pannelli per portoni'),
('Monoblocco', 'Monoblocchi da restauro e nuova costruzione'),
('Maniglioni portoncino', 'Maniglioni per portoncini'),
('Maniglia', 'Maniglie standard'),
('Maniglie Portoncino', 'Maniglie per portoncini'),
('Maniglie Sekur', 'Maniglie di sicurezza'),
('Varianti generiche', 'Varianti generiche per serramenti'),
('Posa zanzariere', 'Servizi di posa zanzariere'),
('Sistema posa clima', 'Sistemi di posa clima'),
('Posa persiane', 'Servizi di posa persiane'),
('Posa porte', 'Servizi di posa porte'),
('Optional zanzariere', 'Optional per zanzariere'),
('Zanzariere modello Giulia', 'Zanzariere modello Giulia'),
('Trasporto', 'Servizi di trasporto'),
('Servizi vari', 'Servizi vari'),
('Spese di incasso', 'Spese amministrative'),
('Ricambi', 'Ricambi vari'),
('Maggiorazioni e supplementi', 'Maggiorazioni e supplementi'),
('Extra', 'Extra vari'),
('Maggiorazioni Blindati', 'Maggiorazioni per blindati'),
('Maggiorazioni Pannelli', 'Maggiorazioni per pannelli'),
('Ricambi Pannelli', 'Ricambi per pannelli'),
('Falso telaio', 'Falsi telai'),
('Vetrocamera', 'Vetrocamere di vari tipi'),
('Alluminio', 'Serramenti in alluminio'),
('PVC', 'Serramenti in PVC'),
('Persiane', 'Persiane di vari tipi'),
('Legno', 'Serramenti in legno'),
('RAL', 'Colori RAL'),
('Kit copertura', 'Kit di copertura'),
('Cornici interne', 'Cornici interne'),
('Cassonetto', 'Cassonetti'),
('Distanziatore Vetro', 'Distanziatori per vetri'),
('Essenza', 'Essenze legnose'),
('Fermavetro', 'Fermavetri'),
('Lavorazioni serramento', 'Lavorazioni speciali per serramenti'),
('Tipo gocciolatoio', 'Tipi di gocciolatoio'),
('Inglesina', 'Inglesine'),
('Specie legnosa e finitura', 'Specie legnose e finiture'),
('Trasporto e posa', 'Servizi di trasporto e posa'),
('Profilo serramenti', 'Profili per serramenti'),
('Sicurezza chiusura', 'Sistemi di sicurezza per chiusure'),
('Movimentazione telo', 'Sistemi di movimentazione telo'),
('Telo', 'Teli');

-- Insert products from Tapparelle in acciaio
DO $$
DECLARE
  category_id UUID;
BEGIN
  SELECT id INTO category_id FROM product_categories WHERE name = 'Tapparelle in acciaio';
  
  INSERT INTO products (category_id, name, price, unit_of_measure)
  VALUES (category_id, 'Tapparella in Acciaio coibentato CS55', 0.00, 'mq');
END $$;

-- Insert products from Tapparelle in PVC
DO $$
DECLARE
  category_id UUID;
BEGIN
  SELECT id INTO category_id FROM product_categories WHERE name = 'Tapparelle in PVC';
  
  INSERT INTO products (category_id, name, price, unit_of_measure)
  VALUES 
    (category_id, 'Profilo in Pvc per avvolgibile 6,5 kg/mq Antigrandine', 0.00, 'mq'),
    (category_id, 'Profilo in Pvc per avvolgibile 5,0 kg/mq', 0.00, 'mq');
END $$;

-- Insert products from Tapparelle in alluminio
DO $$
DECLARE
  category_id UUID;
BEGIN
  SELECT id INTO category_id FROM product_categories WHERE name = 'Tapparelle in alluminio';
  
  INSERT INTO products (category_id, name, price, unit_of_measure)
  VALUES 
    (category_id, 'Profilo in Alluminio coibentato Maxi A77 - Telo completo', 0.00, 'mq'),
    (category_id, 'Profilo in Alluminio a stecche orientabili Inklina', 0.00, 'mq'),
    (category_id, 'Profilo Autobloccante', 0.00, 'mq');
END $$;

-- Insert products from Kit accessori tapparelle
DO $$
DECLARE
  category_id UUID;
BEGIN
  SELECT id INTO category_id FROM product_categories WHERE name = 'Kit accessori tapparelle';
  
  INSERT INTO products (category_id, name, price, unit_of_measure)
  VALUES 
    (category_id, 'KIT 2 MOVIMENTAZIONE A MOTORE', 0.00, 'pz'),
    (category_id, 'KIT 1 MOVIMENTAZIONE MANUALE', 0.00, 'pz');
END $$;

-- Insert products from Guide per avvolgibili
DO $$
DECLARE
  category_id UUID;
BEGIN
  SELECT id INTO category_id FROM product_categories WHERE name = 'Guide per avvolgibili';
  
  INSERT INTO products (category_id, name, price, unit_of_measure)
  VALUES 
    (category_id, 'Guida in ferro zincato 22x19x07 a misura, spaccata e forata', 0.00, 'ml'),
    (category_id, 'Guida in alluminio 25x20', 0.00, 'ml'),
    (category_id, 'Guida in acciaio inox 22x19x07mm a misura', 0.00, 'ml');
END $$;

-- Insert products from Avvolgitore
DO $$
DECLARE
  category_id UUID;
BEGIN
  SELECT id INTO category_id FROM product_categories WHERE name = 'Avvolgitore';
  
  INSERT INTO products (category_id, name, price, unit_of_measure)
  VALUES 
    (category_id, 'Avvolgitore esterno orientabile 6 mt', 0.00, 'nr'),
    (category_id, 'Avvolgitore da 12 mt interasse 165mm', 0.00, 'nr'),
    (category_id, 'Avvolgitore "shell" con 5 mt cintino 14x1,2 mm', 0.00, 'nr');
END $$;

-- Insert products from Maniglia
DO $$
DECLARE
  category_id UUID;
BEGIN
  SELECT id INTO category_id FROM product_categories WHERE name = 'Maniglia';
  
  INSERT INTO products (category_id, name, price, unit_of_measure)
  VALUES 
    (category_id, 'Maniglia Mod. Verona', 0.00, 'pz'),
    (category_id, 'Maniglia DK e copricerniere Titanio', 0.00, 'pz'),
    (category_id, 'Maniglia DK e copricerniere Ottone', 100.00, 'pz'),
    (category_id, 'Maniglia DK e copricerniere Cromo Satinato', 0.00, 'pz'),
    (category_id, 'Maniglia DK e copricerniere Bronzo', 0.00, 'pz'),
    (category_id, 'Maniglia DK e copricerniere Bianco', 0.00, 'pz'),
    (category_id, 'Maniglione M439', 15.00, 'cad'),
    (category_id, 'Maniglia Cannes', 20.00, 'cad'),
    (category_id, 'Maniglia Valencia', 0.00, 'cad'),
    (category_id, 'Maniglia Genova', 15.00, 'cad'),
    (category_id, 'Maniglia Montecarlo', 18.00, 'cad'),
    (category_id, 'Pomolo', 18.00, 'cad'),
    (category_id, 'Maniglia Tokyo', 15.00, 'cad'),
    (category_id, 'Maniglia Toronto', 20.00, 'cad'),
    (category_id, 'Maniglia Bruxelles', 0.00, 'cad'),
    (category_id, 'Maniglia Athinai', 15.00, 'cad'),
    (category_id, 'Maniglia Atlanta', 15.00, 'cad');
END $$;

-- Insert products from Vetrocamera
DO $$
DECLARE
  category_id UUID;
BEGIN
  SELECT id INTO category_id FROM product_categories WHERE name = 'Vetrocamera';
  
  INSERT INTO products (category_id, name, price, unit_of_measure, properties)
  VALUES 
    (category_id, 'Vetrocamera 55.1-15Gas-6/7 Basso Emissivo Planitherm ONE oppure Top ONE (Gas Argon 90%) e CANALINO A PRESTAZIONI MIGLIORATE (fattore solare < 50%)', 97.00, 'mq', '{"UG": "1.1", "Psig": "0.060", "DB": "30,000", "Spessore": "23"}'),
    (category_id, 'Vetrocamera 55.1-15Gas-6/7 Basso Emissivo Planitherm ONE oppure Top ONE (Gas Argon 90%) e CANALINO A PRESTAZIONI MIGLIORATE (fattore solare < 50%)', 145.00, 'mq', '{"UG": "1.1", "Psig": "0.060", "DB": "36,000", "Spessore": "28"}'),
    (category_id, '4/15 gas ARGON90%/4pun', 105.00, 'mq', '{"UG": "1.1", "Psig": "0.060", "DB": "36,000", "Spessore": "23"}'),
    (category_id, 'Vetrocamera 55.1-15Gas-33.1 Basso Emissivo Planitherm ONE oppure Top ONE (Gas Argon 90%) (fattore solare < 50%) SATINATO BIANCO (Madras o similare) +C', 78.00, 'mq', '{"UG": "2.9", "Psig": "0.060", "DB": "0,000", "Spessore": "20"}'),
    (category_id, 'Vetrocamera 55.1-15Gas-33.1 Basso Emissivo Planitherm ONE oppure Top ONE (Gas Argon 90%) (fattore solare < 50%) SATINATO BIANCO (Madras o similare) +C', 155.00, 'mq', '{"UG": "1.1", "Psig": "0.060", "DB": "0,000", "Spessore": "27"}'),
    (category_id, 'Vetrocamera 44.6-15Gas-33.1  Planitherm Clear classe protezione P5A  canalino a prestazioni migliorate SWISS SPACE o equivalente Gas Argon 90% (Ug=1.0', 1700.00, 'mq', '{"UG": "1.0", "Psig": "0.060", "DB": "36,000", "Spessore": "29"}'),
    (category_id, 'Vetrocamera 4/15/4/15/4 gas Argon', 97.00, 'mq', '{"UG": "1.1", "Psig": "0.060", "DB": "30,000", "Spessore": "23"}'),
    (category_id, '3+ 3 acustico/16 Ar/3+3.1  be', 97.00, 'mq', '{"UG": "1.1", "Psig": "0.060", "DB": "30,000", "Spessore": "23"}'),
    (category_id, '2 x B.E. 33.2 + 18 SSP GAS+ 4+18 SSP GAS+3/3.1 B.E. (Sp. 52mm Ug 0.5)', 97.00, 'mq', '{"UG": "1.1", "Psig": "0.060", "DB": "30,000", "Spessore": "23"}');
END $$;

-- Insert products from Varianti generiche
DO $$
DECLARE
  category_id UUID;
BEGIN
  SELECT id INTO category_id FROM product_categories WHERE name = 'Varianti generiche';
  
  INSERT INTO products (category_id, name, price, unit_of_measure)
  VALUES 
    (category_id, 'Zoccolo singolo', 0.00, 'pz'),
    (category_id, 'Soglia ribassata 3A', 0.00, 'pz'),
    (category_id, 'Soglia ribassata', 0.00, 'pz'),
    (category_id, 'Sensore allarme', 0.00, 'pz'),
    (category_id, 'Rifilatura aletta', 0.00, 'pz'),
    (category_id, 'Fuori linea serramento', 0.00, 'pz'),
    (category_id, 'Extra Scorrevole parallelo automatico + maniglione (ATTENZIONE ANTA MAGGIORATA OBBLIGATORIA NON INCLUSA SU PF)', 0.00, 'pz'),
    (category_id, 'Extra per sottomisura', 0.00, 'pz'),
    (category_id, 'Extra foro su vetro', 0.00, 'pz'),
    (category_id, 'Extra anta maggiorata', 0.00, 'pz'),
    (category_id, 'Ferramenta anticorrosione E-look', 0.00, 'pz'),
    (category_id, 'Cerniere a scomparsa', 0.00, 'pz'),
    (category_id, 'Blocco di sicurezza Marrone (permette la sola apertura a ribalta)', 0.00, 'pz'),
    (category_id, 'Blocco di sicurezza con chiave Marrone (permette la sola apertura a ribalta)', 0.00, 'pz'),
    (category_id, 'Blocco di sicurezza con chiave Bianco (permette la sola apertura a ribalta)', 0.00, 'pz'),
    (category_id, 'Blocco di sicurezza con chiave Argento (permette la sola apertura a ribalta)', 0.00, 'pz'),
    (category_id, 'Blocco di sicurezza Bianco (permette la sola apertura a ribalta)', 0.00, 'pz'),
    (category_id, 'Blocco di sicurezza Argento (permette la sola apertura a ribalta)', 0.00, 'pz'),
    (category_id, 'Areatore Gecco', 0.00, 'pz'),
    (category_id, 'Anta avvitata standard', 0.00, 'pz'),
    (category_id, 'Anta avvitata maggiorata', 0.00, 'pz'),
    (category_id, 'Montaggio guide avvolgibili su infisso', 0.00, 'pz'),
    (category_id, 'veneziana', 100.00, 'cad'),
    (category_id, 'copriprofilo a', 110.00, 'cad'),
    (category_id, 'soglia a', 120.00, 'cad'),
    (category_id, 'zoccolo triplo', 105.00, 'cad'),
    (category_id, 'bugna', 105.00, 'cad');
END $$;

-- Insert products from RAL
DO $$
DECLARE
  category_id UUID;
BEGIN
  SELECT id INTO category_id FROM product_categories WHERE name = 'RAL';
  
  INSERT INTO products (category_id, name, price, unit_of_measure)
  VALUES 
    (category_id, 'RAL 1000', 85.00, 'mq'),
    (category_id, 'RAL 1001', 90.00, 'mq'),
    (category_id, 'RAL 1002', 95.00, 'mq'),
    (category_id, 'RAL 1003', 90.00, 'mq'),
    (category_id, 'RAL 1004', 105.00, 'mq'),
    (category_id, 'RAL 1005', 85.00, 'mq'),
    (category_id, 'RAL 8000', 90.00, 'mq'),
    (category_id, 'RAL 8002', 95.00, 'mq'),
    (category_id, 'RAL 8003', 90.00, 'mq'),
    (category_id, 'RAL 9010', 105.00, 'mq'),
    (category_id, 'RAL 9011', 85.00, 'mq'),
    (category_id, 'RAL 9016', 90.00, 'mq'),
    (category_id, 'RAL 9017', 95.00, 'mq'),
    (category_id, 'RAL 9018', 90.00, 'mq');
END $$;

-- Insert products from Alluminio
DO $$
DECLARE
  category_id UUID;
BEGIN
  SELECT id INTO category_id FROM product_categories WHERE name = 'Alluminio';
  
  INSERT INTO products (category_id, name, price, unit_of_measure)
  VALUES 
    (category_id, 'Telaio fisso con vetrocamera', 0.00, 'mq'),
    (category_id, 'Finestra ad 1 anta', 0.00, 'mq'),
    (category_id, 'Finestra 2 ante', 0.00, 'mq'),
    (category_id, 'Finestra vasistas', 0.00, 'mq'),
    (category_id, 'Finestra Vasistas con doppia maniglia verticale', 0.00, 'mq'),
    (category_id, 'Finestra a tre ante', 0.00, 'mq'),
    (category_id, 'Porta Finestra ad 1 anta', 0.00, 'mq'),
    (category_id, 'Porta Finestra 2 ante', 0.00, 'mq'),
    (category_id, 'Finestra quattro ante', 0.00, 'mq'),
    (category_id, 'Porta Finestra 2 ante traverso', 0.00, 'mq'),
    (category_id, 'Porta Finestra 1 anta traverso', 0.00, 'mq'),
    (category_id, 'Finestra scorrevole traslante', 0.00, 'mq'),
    (category_id, 'Finestra 3 ante', 0.00, 'mq'),
    (category_id, 'Finestra 4 ante', 0.00, 'mq'),
    (category_id, 'Finestra 4 ante traverso', 0.00, 'mq');
END $$;

-- Insert products from PVC
DO $$
DECLARE
  category_id UUID;
BEGIN
  SELECT id INTO category_id FROM product_categories WHERE name = 'PVC';
  
  INSERT INTO products (category_id, name, price, unit_of_measure)
  VALUES 
    (category_id, 'Telaio fisso con vetrocamera Misure L > 2599 H > 500', 125.00, 'cad'),
    (category_id, 'telaio fisso vetrocamera', 108.00, 'cad'),
    (category_id, 'Porta Finestra scorrevole traslante + fisso', 125.00, 'cad'),
    (category_id, 'porta finestra 1 anta', 125.00, 'cad'),
    (category_id, 'porta finestra 2 anta', 108.00, 'cad'),
    (category_id, 'Finestra scorrevole traslante + fisso', 125.00, 'cad'),
    (category_id, 'Finestra scorrevole traslante', 125.00, 'cad'),
    (category_id, 'Finestra 1 anta', 125.00, 'cad'),
    (category_id, 'Finestra 2 ante', 125.00, 'cad'),
    (category_id, 'Porta finestra scorrevole traslante (solo parte scorrevole)', 125.00, 'cad'),
    (category_id, 'Maggiorazione per telaio da ristrutturazione', 108.00, 'cad');
END $$;

-- Insert products from Cassonetto
DO $$
DECLARE
  category_id UUID;
BEGIN
  SELECT id INTO category_id FROM product_categories WHERE name = 'Cassonetto';
  
  INSERT INTO products (category_id, name, price, unit_of_measure)
  VALUES 
    (category_id, 'cassone restauro pvc profondità 140', 125.00, 'ml'),
    (category_id, 'cassone restauro pvc profondità 240', 108.00, 'ml'),
    (category_id, 'Cassonetto in PVC a ispezione frontale, non ventilato', 125.00, 'ml'),
    (category_id, 'cover', 75.00, 'cad'),
    (category_id, 'celino', 75.00, 'mq'),
    (category_id, 'cassonetto', 75.00, 'mq');
END $$;

-- Insert products from Posa zanzariere
DO $$
DECLARE
  category_id UUID;
BEGIN
  SELECT id INTO category_id FROM product_categories WHERE name = 'Posa zanzariere';
  
  INSERT INTO products (category_id, name, price, unit_of_measure)
  VALUES 
    (category_id, 'Posa zanzariera standard', 50.00, 'pz');
END $$;

-- Insert products from Posa persiane
DO $$
DECLARE
  category_id UUID;
BEGIN
  SELECT id INTO category_id FROM product_categories WHERE name = 'Posa persiane';
  
  INSERT INTO products (category_id, name, price, unit_of_measure)
  VALUES 
    (category_id, 'Posa persiana con telaio', 50.00, 'pz'),
    (category_id, 'Posa persiana con cardini a muro', 50.00, 'pz');
END $$;

-- Enable realtime for products and categories
alter publication supabase_realtime add table product_categories;
alter publication supabase_realtime add table products;

-- Add RLS policies
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for product_categories
CREATE POLICY "Public read access for product_categories" 
ON product_categories FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Admin full access for product_categories" 
ON product_categories FOR ALL 
TO authenticated
USING (true);

-- Create policies for products
CREATE POLICY "Public read access for products" 
ON products FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Admin full access for products" 
ON products FOR ALL 
TO authenticated
USING (true);
