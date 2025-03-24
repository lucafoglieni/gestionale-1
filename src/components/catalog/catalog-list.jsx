"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Filter } from "lucide-react";
import {
  getAllCategories,
  getItemsByCategory,
  searchItems,
} from "@/lib/catalog-data";
import { searchItemsInCatalog } from "@/lib/full-catalog-data";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CatalogList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryItems, setCategoryItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState("categories");
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        // Import catalog data directly from full-catalog-data.js
        const {
          ListinoTapparelle,
          ListinoAccessoriVariabili,
          ListinoPosa,
          ListinoZanzariere,
          ListinoServizi,
          ListinoProdotti,
        } = await import("@/lib/full-catalog-data");

        // Combine all catalogs
        const fullCatalog = {
          ...ListinoTapparelle,
          ...ListinoAccessoriVariabili,
          ...ListinoPosa,
          ...ListinoZanzariere,
          ...ListinoServizi,
          ...ListinoProdotti,
        };

        // Create categories from the full catalog
        const catalogCategories = Object.keys(fullCatalog)
          .filter((key) => Array.isArray(fullCatalog[key]))
          .map((name) => ({
            name: name,
            source: "ListinoCompleto",
            itemCount: fullCatalog[name].length,
          }));

        setCategories(catalogCategories);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function performSearch() {
      if (searchQuery.trim() !== "") {
        try {
          // Import searchItemsInCatalog function
          const { searchItemsInCatalog } = await import(
            "@/lib/searchItemsInCatalog"
          );

          // Search directly in the full catalog
          const completeResults = searchItemsInCatalog(searchQuery);
          setSearchResults(completeResults);
          setActiveTab("search");
        } catch (error) {
          console.error("Error searching catalog:", error);
        }
      } else {
        setSearchResults([]);
        if (activeTab === "search") {
          setActiveTab("categories");
        }
      }
    }

    performSearch();
  }, [searchQuery]);

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    try {
      // Import full catalog data directly
      const {
        ListinoTapparelle,
        ListinoAccessoriVariabili,
        ListinoPosa,
        ListinoZanzariere,
        ListinoServizi,
        ListinoProdotti,
      } = await import("@/lib/full-catalog-data");

      // Combine all catalogs
      const fullCatalog = {
        ...ListinoTapparelle,
        ...ListinoAccessoriVariabili,
        ...ListinoPosa,
        ...ListinoZanzariere,
        ...ListinoServizi,
        ...ListinoProdotti,
      };

      // Get items for the selected category
      const items = fullCatalog[category.name] || [];
      setCategoryItems(items);
      setActiveTab("items");
    } catch (error) {
      console.error("Error loading category items:", error);
      setCategoryItems([]);
      setActiveTab("items");
    }
  };

  const handleBackToCategories = () => {
    setActiveTab("categories");
    setSelectedCategory(null);
  };

  const handleAddItem = (item) => {
    // Check if item is already in the list
    const existingItem = selectedItems.find(
      (i) =>
        i.nomeArticolo === item.nomeArticolo &&
        i.category === (selectedCategory?.name || item.category),
    );

    if (existingItem) {
      // Update quantity if already exists
      setSelectedItems(
        selectedItems.map((i) =>
          i.nomeArticolo === item.nomeArticolo &&
          i.category === (selectedCategory?.name || item.category)
            ? { ...i, quantity: (i.quantity || 1) + 1 }
            : i,
        ),
      );
    } else {
      // Add new item with quantity 1
      setSelectedItems([
        ...selectedItems,
        {
          ...item,
          quantity: 1,
          category: selectedCategory?.name || item.category,
          source: selectedCategory?.source || item.source,
        },
      ]);
    }
  };

  const handleRemoveItem = (index) => {
    const newItems = [...selectedItems];
    newItems.splice(index, 1);
    setSelectedItems(newItems);
  };

  const handleUpdateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;

    const newItems = [...selectedItems];
    newItems[index].quantity = newQuantity;
    setSelectedItems(newItems);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Cerca articoli..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="categories">Categorie</TabsTrigger>
          <TabsTrigger
            value="items"
            disabled={!selectedCategory && searchResults.length === 0}
          >
            {selectedCategory
              ? `Articoli (${categoryItems.length})`
              : "Articoli"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="flex-1 overflow-hidden">
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-1">
              {categories.map((category, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">{category.name}</CardTitle>
                    <CardDescription>
                      {category.itemCount} articoli
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0 flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCategorySelect(category)}
                    >
                      Visualizza
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="items" className="flex-1 overflow-hidden">
          {selectedCategory && (
            <div className="flex items-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToCategories}
              >
                ← Indietro
              </Button>
              <h3 className="text-lg font-medium ml-2">
                {selectedCategory.name}
              </h3>
            </div>
          )}

          <ScrollArea className="h-[calc(100vh-350px)]">
            <div className="space-y-3">
              {(activeTab === "search" ? searchResults : categoryItems).map(
                (item, index) => (
                  <Card key={index}>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-sm">
                          {item.nomeArticolo}
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleAddItem(item)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      {activeTab === "search" && (
                        <Badge variant="outline" className="mt-1">
                          {item.category}
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Prezzo:{" "}
                          {item.prezzo === "0.00"
                            ? "Da definire"
                            : `€${item.prezzo}`}
                        </span>
                        <span className="text-muted-foreground">
                          UM: {item.UM}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ),
              )}

              {(activeTab === "search" ? searchResults : categoryItems)
                .length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  {activeTab === "search"
                    ? "Nessun risultato trovato"
                    : "Nessun articolo in questa categoria"}
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="search" className="flex-1 overflow-hidden">
          <ScrollArea className="h-[calc(100vh-350px)]">
            <div className="space-y-3">
              {searchResults.map((item, index) => (
                <Card key={index}>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-sm">
                        {item.nomeArticolo}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleAddItem(item)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Badge variant="outline" className="mt-1">
                      {item.category}
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Prezzo:{" "}
                        {item.prezzo === "0.00"
                          ? "Da definire"
                          : `€${item.prezzo}`}
                      </span>
                      <span className="text-muted-foreground">
                        UM: {item.UM}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {searchResults.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Nessun risultato trovato
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {selectedItems.length > 0 && (
        <Card className="mt-4">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm">
              Articoli selezionati ({selectedItems.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <ScrollArea className="h-[150px]">
              <div className="space-y-2">
                {selectedItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm">
                        {item.nomeArticolo}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.category}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() =>
                          handleUpdateQuantity(index, (item.quantity || 1) - 1)
                        }
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">
                        {item.quantity || 1}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() =>
                          handleUpdateQuantity(index, (item.quantity || 1) + 1)
                        }
                      >
                        +
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-destructive"
                        onClick={() => handleRemoveItem(index)}
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-end">
            <Button>Aggiungi al preventivo</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
