"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, Edit, Trash2, Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import AddProductForm from "./add-product-form";
import AddCategoryForm from "./add-category-form";
import { useToast } from "@/components/ui/use-toast.ts";

interface Product {
  id: string;
  name: string;
  price: number;
  unit_of_measure: string;
  category_id: string;
  type: string;
  description?: string;
  properties?: any;
}

interface Category {
  id: string;
  name: string;
  description?: string;
}

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const { toast } = useToast();
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        // Import catalog data from full-catalog-data.js
        const { ListinoCompleto } = await import("@/lib/full-catalog-data");

        // Extract categories
        const catalogCategories = Object.keys(ListinoCompleto)
          .filter((key) => Array.isArray(ListinoCompleto[key]))
          .map((name) => ({
            id: name,
            name: name,
            description: `${ListinoCompleto[name].length} articoli`,
          }));

        setCategories(catalogCategories);
        if (catalogCategories.length > 0 && !activeCategory) {
          setActiveCategory(catalogCategories[0].id);
        }

        // Extract products
        const allProducts = [];
        Object.keys(ListinoCompleto).forEach((category) => {
          if (Array.isArray(ListinoCompleto[category])) {
            ListinoCompleto[category].forEach((item) => {
              allProducts.push({
                id: `${category}-${item.nomeArticolo}`,
                name: item.nomeArticolo,
                price: parseFloat(item.prezzo) || 0,
                unit_of_measure: item.UM,
                category_id: category,
                type: "product",
                description: item.nomeArticolo,
              });
            });
          }
        });

        setProducts(allProducts);
      } catch (error) {
        console.error("Error loading product catalog:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filter products based on search term and active category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !activeCategory || product.category_id === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Catalogo Prodotti</CardTitle>
        <CardDescription>
          Gestisci il tuo catalogo di prodotti e accessori
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-6">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cerca prodotti..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => setAddProductOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Aggiungi Prodotto
          </Button>
          <AddProductForm
            open={addProductOpen}
            onOpenChange={setAddProductOpen}
            onProductAdded={() => {
              // Refresh products list
              setLoading(true);
              supabase
                .from("products")
                .select("*")
                .order("name")
                .then(({ data, error }) => {
                  if (error) {
                    console.error("Error refreshing products:", error);
                    toast({
                      title: "Errore",
                      description:
                        "Impossibile aggiornare la lista dei prodotti",
                      variant: "destructive",
                    });
                  } else {
                    setProducts(data || []);
                  }
                  setLoading(false);
                });
            }}
          />
        </div>

        <Tabs
          defaultValue={activeCategory || "all"}
          onValueChange={(value) =>
            setActiveCategory(value === "all" ? null : value)
          }
        >
          <div className="flex justify-between items-center mb-4">
            <TabsList className="flex flex-wrap h-auto">
              <TabsTrigger value="all">Tutti</TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAddCategoryOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Nuova Categoria
            </Button>
          </div>

          <AddCategoryForm
            open={addCategoryOpen}
            onOpenChange={setAddCategoryOpen}
            onCategoryAdded={() => {
              // Refresh categories list
              supabase
                .from("product_categories")
                .select("*")
                .order("name")
                .then(({ data, error }) => {
                  if (error) {
                    console.error("Error refreshing categories:", error);
                    toast({
                      title: "Errore",
                      description:
                        "Impossibile aggiornare la lista delle categorie",
                      variant: "destructive",
                    });
                  } else {
                    setCategories(data || []);
                  }
                });
            }}
          />

          <TabsContent
            value={activeCategory || "all"}
            className="border rounded-md"
          >
            {loading ? (
              <div className="py-8 text-center">Caricamento prodotti...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-8 text-center">Nessun prodotto trovato</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Prezzo</TableHead>
                    <TableHead>Unità di Misura</TableHead>
                    <TableHead className="text-right">Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>
                        {product.price
                          ? `€${product.price.toFixed(2)}`
                          : "€0.00"}
                      </TableCell>
                      <TableCell>{product.unit_of_measure}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
