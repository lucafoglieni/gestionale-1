// Function to search items in the catalog
export function searchItemsInCatalog(query) {
  if (!query || query.trim() === "") return [];

  const lowerQuery = query.toLowerCase();
  const results = [];

  // Import data from full-catalog-data.js
  const { ListinoCompleto } = require("./full-catalog-data");

  // Search in ListinoCompleto
  Object.keys(ListinoCompleto).forEach((category) => {
    if (Array.isArray(ListinoCompleto[category])) {
      ListinoCompleto[category].forEach((item) => {
        if (
          item.nomeArticolo &&
          item.nomeArticolo.toLowerCase().includes(lowerQuery)
        ) {
          results.push({
            ...item,
            category,
            source: "ListinoCompleto",
          });
        }
      });
    }
  });

  return results;
}
