// Database of all catalog items

export const ListinoTapparelle = {
  "Tapparelle in acciao": [
    {
      nomeArticolo: "Tapparella in Acciaio coibentato CS55",
      prezzo: "0.00",
      UM: "mq",
    },
  ],

  "Tapparelle in PVC": [
    {
      nomeArticolo: "Profilo in Pvc per avvolgibile 6,5 kg/mq Antigrandine",
      prezzo: "0.00",
      UM: "mq",
    },
    {
      nomeArticolo: "Profilo in Pvc per avvolgibile 5,0 kg/mq",
      prezzo: "0.00",
      UM: "mq",
    },
  ],

  "Tapparelle in alluminio": [
    {
      nomeArticolo: "Profilo in Alluminio coibentato Maxi A77 - Telo completo",
      prezzo: "0.00",
      UM: "mq",
    },
    {
      nomeArticolo: "Profilo in Alluminio a stecche orientabili Inklina",
      prezzo: "0.00",
      UM: "mq",
    },
    { nomeArticolo: "Profilo Autobloccante", prezzo: "0.00", UM: "mq" },
  ],

  "Kit accessori tapparelle": [
    { nomeArticolo: "KIT 2 MOVIMENTAZIONE A MOTORE", prezzo: "0.00", UM: "pz" },
    { nomeArticolo: "KIT 1 MOVIMENTAZIONE MANUALE", prezzo: "0.00", UM: "pz" },
  ],

  "Guide per avvolgibili": [
    {
      nomeArticolo:
        "Guida in ferro zincato 22x19x07 a misura, spaccata e forata",
      prezzo: "0.00",
      UM: "ml",
    },
    { nomeArticolo: "Guida in alluminio 25x20", prezzo: "0.00", UM: "ml" },
    {
      nomeArticolo: "Guida in acciaio inox 22x19x07mm a misura",
      prezzo: "0.00",
      UM: "ml",
    },
  ],

  Avvolgitore: [
    {
      nomeArticolo: "Avvolgitore esterno orientabile 6 mt",
      prezzo: "0.00",
      UM: "nr",
    },
    {
      nomeArticolo: "Avvolgitore da 12 mt interasse 165mm",
      prezzo: "0.00",
      UM: "nr",
    },
    {
      nomeArticolo: 'Avvolgitore "shell" con 5 mt cintino 14x1,2 mm',
      prezzo: "0.00",
      UM: "nr",
    },
  ],
};

export const ListinoAccessoriVariabili = {
  "Accessori per serramenti": [
    { nomeArticolo: "Zanzariera", prezzo: "0.00", UM: "mq" },
    { nomeArticolo: "Tapparella", prezzo: "0.00", UM: "mq" },
    { nomeArticolo: "Inglesina 6 campi", prezzo: "0.00", UM: "ml" },
    { nomeArticolo: "Cassonetto in legno", prezzo: "0.00", UM: "ml" },
  ],

  "Pannelli sottoporta": [
    { nomeArticolo: "Vetro come sopra", prezzo: "0.00", UM: "mq" },
    {
      nomeArticolo: "Pannello sottoporta diamantato in HDF rivestito",
      prezzo: "0.00",
      UM: "mq",
    },
    {
      nomeArticolo: "Pannello sottoporta bugnato in HDF rivestito",
      prezzo: "0.00",
      UM: "mq",
    },
    {
      nomeArticolo: "Pannello sandwich liscio HPL spessore 28mm",
      prezzo: "0.00",
      UM: "mq",
    },
  ],

  "Coprifili e aggiuntivi": [
    { nomeArticolo: "Tubolare 38x16", prezzo: "0.00", UM: "pz" },
    { nomeArticolo: "Piatto 45 adesivo", prezzo: "0.00", UM: "pz" },
    { nomeArticolo: "Piatto 45", prezzo: "0.00", UM: "pz" },
    { nomeArticolo: "Piatto 30 mm", prezzo: "50.00", UM: "pz" },
    { nomeArticolo: "Piatto 25 mm", prezzo: "50.00", UM: "pz" },
    { nomeArticolo: "Piatto 25", prezzo: "0.00", UM: "pz" },
    {
      nomeArticolo: "Piatto 100 (MODELLO CREMA IN MASSA LARGO 96mm)",
      prezzo: "0.00",
      UM: "pz",
    },
    { nomeArticolo: "Piatto 150", prezzo: "0.00", UM: "pz" },
    { nomeArticolo: "Guida celino (barra 6m)", prezzo: "0.00", UM: "pz" },
    { nomeArticolo: "Coprifilo piatto 70x3", prezzo: "0.00", UM: "pz" },
    { nomeArticolo: "Coprifilo a scatto 45mm", prezzo: "0.00", UM: "pz" },
    { nomeArticolo: "Coprifilo 60x8 adesivo", prezzo: "0.00", UM: "pz" },
    { nomeArticolo: "Coprifilo 30x8 adesivo", prezzo: "0.00", UM: "pz" },
    { nomeArticolo: "Angolare semiscatolato 80x50", prezzo: "0.00", UM: "pz" },
    { nomeArticolo: "Angolare 60x40", prezzo: "0.00", UM: "pz" },
    {
      nomeArticolo: "Angolare 40x20 pellicolato lato interno",
      prezzo: "0.00",
      UM: "pz",
    },
    { nomeArticolo: "Angolare 25x25", prezzo: "0.00", UM: "pz" },
    { nomeArticolo: "Angolare 100x80", prezzo: "0.00", UM: "pz" },
    {
      nomeArticolo: "Adattatore telaio Z per ristrutturazione (barra 6m)",
      prezzo: "0.00",
      UM: "pz",
    },
  ],
};

// Import the full catalog data
import {
  ListinoTapparelle as FullListinoTapparelle,
  ListinoAccessoriVariabili as FullListinoAccessoriVariabili,
  ListinoPosa,
  ListinoZanzariere,
  ListinoServizi,
  ListinoProdotti,
} from "./full-catalog-data";

// Combine all catalogs into ListinoCompleto
export const ListinoCompleto = {
  ...FullListinoTapparelle,
  ...FullListinoAccessoriVariabili,
  ...ListinoPosa,
  ...ListinoZanzariere,
  ...ListinoServizi,
  ...ListinoProdotti,
};

// Export all catalog data
export const catalogData = {
  ListinoTapparelle,
  ListinoAccessoriVariabili,
  ListinoCompleto,
};

// Get all categories from all catalogs
export function getAllCategories() {
  const categories = [];

  // Add categories from ListinoTapparelle
  Object.keys(ListinoTapparelle).forEach((category) => {
    categories.push({
      name: category,
      source: "ListinoTapparelle",
      itemCount: ListinoTapparelle[category].length,
    });
  });

  // Add categories from ListinoAccessoriVariabili
  Object.keys(ListinoAccessoriVariabili).forEach((category) => {
    categories.push({
      name: category,
      source: "ListinoAccessoriVariabili",
      itemCount: ListinoAccessoriVariabili[category].length,
    });
  });

  // Add categories from ListinoCompleto
  Object.keys(ListinoCompleto).forEach((category) => {
    if (Array.isArray(ListinoCompleto[category])) {
      categories.push({
        name: category,
        source: "ListinoCompleto",
        itemCount: ListinoCompleto[category].length,
      });
    }
  });

  return categories;
}

// Get items for a specific category
export function getItemsByCategory(categoryName, source) {
  if (source === "ListinoTapparelle" && ListinoTapparelle[categoryName]) {
    return ListinoTapparelle[categoryName];
  } else if (
    source === "ListinoAccessoriVariabili" &&
    ListinoAccessoriVariabili[categoryName]
  ) {
    return ListinoAccessoriVariabili[categoryName];
  } else if (
    source === "ListinoCompleto" &&
    ListinoCompleto[categoryName] &&
    Array.isArray(ListinoCompleto[categoryName])
  ) {
    return ListinoCompleto[categoryName];
  }
  return [];
}

// Search items across all catalogs
export function searchItems(query) {
  if (!query || query.trim() === "") return [];

  const results = [];
  const lowerQuery = query.toLowerCase();

  // Search in ListinoTapparelle
  Object.keys(ListinoTapparelle).forEach((category) => {
    ListinoTapparelle[category].forEach((item) => {
      if (item.nomeArticolo.toLowerCase().includes(lowerQuery)) {
        results.push({
          ...item,
          category,
          source: "ListinoTapparelle",
        });
      }
    });
  });

  // Search in ListinoAccessoriVariabili
  Object.keys(ListinoAccessoriVariabili).forEach((category) => {
    ListinoAccessoriVariabili[category].forEach((item) => {
      if (item.nomeArticolo.toLowerCase().includes(lowerQuery)) {
        results.push({
          ...item,
          category,
          source: "ListinoAccessoriVariabili",
        });
      }
    });
  });

  return results;
}
