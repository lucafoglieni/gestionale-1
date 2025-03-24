"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/supabase/client";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast.ts";

interface Product {
  id: string;
  name: string;
  price: number;
  unit_of_measure: string;
  category_id: string;
  type: string;
  description?: string;
}

interface Category {
  id: string;
  name: string;
}

interface QuoteItem {
  product: Product;
  quantity: number;
  accessories: Product[];
  notes?: string;
  width?: number;
  height?: number;
  material?: string;
  finish?: string;
}

export default function CreateQuotePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [currentItem, setCurrentItem] = useState<{
    quantity: number;
    notes: string;
    width?: number;
    height?: number;
    material: string;
    finish: string;
  }>({
    quantity: 1,
    notes: "",
    width: undefined,
    height: undefined,
    material: "",
    finish: "",
  });
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<"select" | "configure" | "summary">(
    "select",
  );
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [quoteNotes, setQuoteNotes] = useState("");
  const [savingQuote, setSavingQuote] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("product_categories")
          .select("*")
          .order("name");

        if (categoriesError) throw categoriesError;
        setCategories(categoriesData || []);

        // Fetch all products
        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select("*")
          .order("name");

        if (productsError) throw productsError;
        setProducts(productsData || []);

        // Set accessories (products with type "accessory")
        setAccessories(
          productsData?.filter((p) => p.type === "accessory") || [],
        );

        if (categoriesData && categoriesData.length > 0) {
          setSelectedCategory(categoriesData[0].id);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Errore",
          description: "Impossibile caricare i dati del catalogo",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredProducts = products.filter(
    (p) => p.category_id === selectedCategory && p.type !== "accessory",
  );

  const handleAddItem = () => {
    const product = products.find((p) => p.id === selectedProduct);
    if (!product) return;

    const selectedAccessoryProducts = accessories.filter((a) =>
      selectedAccessories.includes(a.id),
    );

    const newItem: QuoteItem = {
      product,
      quantity: currentItem.quantity,
      accessories: selectedAccessoryProducts,
      notes: currentItem.notes,
      width: currentItem.width,
      height: currentItem.height,
      material: currentItem.material,
      finish: currentItem.finish,
    };

    setQuoteItems([...quoteItems, newItem]);

    // Reset form for next item
    setSelectedProduct("");
    setSelectedAccessories([]);
    setCurrentItem({
      quantity: 1,
      notes: "",
      width: undefined,
      height: undefined,
      material: "",
      finish: "",
    });

    setStep("select");
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...quoteItems];
    updatedItems.splice(index, 1);
    setQuoteItems(updatedItems);
  };

  const handleAccessoryToggle = (accessoryId: string) => {
    if (selectedAccessories.includes(accessoryId)) {
      setSelectedAccessories(
        selectedAccessories.filter((id) => id !== accessoryId),
      );
    } else {
      setSelectedAccessories([...selectedAccessories, accessoryId]);
    }
  };

  const calculateTotal = () => {
    return quoteItems.reduce((total, item) => {
      const productTotal = item.product.price * item.quantity;
      const accessoriesTotal = item.accessories.reduce(
        (acc, accessory) => acc + accessory.price,
        0,
      );
      return total + productTotal + accessoriesTotal;
    }, 0);
  };

  const handleSaveQuote = async () => {
    if (quoteItems.length === 0) {
      toast({
        title: "Errore",
        description: "Aggiungi almeno un articolo al preventivo",
        variant: "destructive",
      });
      return;
    }

    setSavingQuote(true);

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Utente non autenticato");

      // Generate quote number
      const quoteNumber = `Q-${new Date().getFullYear()}-${Math.floor(
        Math.random() * 1000,
      )
        .toString()
        .padStart(3, "0")}`;

      // Create quote
      const { data: quoteData, error: quoteError } = await supabase
        .from("quotes")
        .insert({
          quote_number: quoteNumber,
          user_id: user.id,
          status: "draft",
          notes: quoteNotes,
          total_amount: calculateTotal(),
          tax_rate: 22, // Default IVA
          tax_amount: calculateTotal() * 0.22,
          final_amount: calculateTotal() * 1.22,
          valid_until: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000,
          ).toISOString(), // 30 days from now
        })
        .select();

      if (quoteError) throw quoteError;
      const quoteId = quoteData[0].id;

      // Create quote items
      for (const item of quoteItems) {
        const { error: itemError } = await supabase.from("quote_items").insert({
          quote_id: quoteId,
          product_id: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          unit_price: item.product.price,
          total_price:
            item.product.price * item.quantity +
            item.accessories.reduce((acc, a) => acc + a.price, 0),
          width: item.width,
          height: item.height,
          material: item.material,
          finish: item.finish,
          description: item.notes,
          accessories: item.accessories.map((a) => ({
            id: a.id,
            name: a.name,
            price: a.price,
          })),
        });

        if (itemError) throw itemError;
      }

      toast({
        title: "Preventivo salvato",
        description: `Preventivo ${quoteNumber} creato con successo`,
      });

      // Redirect to quotes list
      router.push("/dashboard/quotes");
    } catch (error: any) {
      console.error("Error saving quote:", error);
      toast({
        title: "Errore",
        description: error.message || "Impossibile salvare il preventivo",
        variant: "destructive",
      });
    } finally {
      setSavingQuote(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case "select":
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Prodotto</Label>
                <Select
                  value={selectedProduct}
                  onValueChange={(value) => {
                    setSelectedProduct(value);
                    setStep("configure");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona prodotto" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredProducts.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} - €{product.price.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case "configure":
        const product = products.find((p) => p.id === selectedProduct);
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">
                Configura: {product?.name}
              </h3>
              <div className="text-sm font-medium">
                Prezzo base: €{product?.price.toFixed(2)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantità</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={currentItem.quantity}
                  onChange={(e) =>
                    setCurrentItem({
                      ...currentItem,
                      quantity: parseInt(e.target.value) || 1,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="material">Materiale</Label>
                <Select
                  value={currentItem.material}
                  onValueChange={(value) =>
                    setCurrentItem({ ...currentItem, material: value })
                  }
                >
                  <SelectTrigger id="material">
                    <SelectValue placeholder="Seleziona materiale" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aluminum">Alluminio</SelectItem>
                    <SelectItem value="wood">Legno</SelectItem>
                    <SelectItem value="pvc">PVC</SelectItem>
                    <SelectItem value="wood-aluminum">
                      Legno-Alluminio
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="width">Larghezza (cm)</Label>
                <Input
                  id="width"
                  type="number"
                  value={currentItem.width || ""}
                  onChange={(e) =>
                    setCurrentItem({
                      ...currentItem,
                      width: parseFloat(e.target.value) || undefined,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Altezza (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={currentItem.height || ""}
                  onChange={(e) =>
                    setCurrentItem({
                      ...currentItem,
                      height: parseFloat(e.target.value) || undefined,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="finish">Finitura</Label>
                <Select
                  value={currentItem.finish}
                  onValueChange={(value) =>
                    setCurrentItem({ ...currentItem, finish: value })
                  }
                >
                  <SelectTrigger id="finish">
                    <SelectValue placeholder="Seleziona finitura" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="white">Bianco</SelectItem>
                    <SelectItem value="natural">Naturale</SelectItem>
                    <SelectItem value="walnut">Noce</SelectItem>
                    <SelectItem value="dark-brown">Marrone Scuro</SelectItem>
                    <SelectItem value="custom">Personalizzata</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Accessori disponibili</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {accessories.map((accessory) => (
                  <div
                    key={accessory.id}
                    className="flex items-center space-x-2 border p-2 rounded"
                  >
                    <input
                      type="checkbox"
                      id={`accessory-${accessory.id}`}
                      checked={selectedAccessories.includes(accessory.id)}
                      onChange={() => handleAccessoryToggle(accessory.id)}
                      className="h-4 w-4"
                    />
                    <label
                      htmlFor={`accessory-${accessory.id}`}
                      className="flex-1 text-sm"
                    >
                      {accessory.name} - €{accessory.price.toFixed(2)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Note</Label>
              <Textarea
                id="notes"
                value={currentItem.notes}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, notes: e.target.value })
                }
                placeholder="Note aggiuntive per questo articolo"
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep("select")}>
                Indietro
              </Button>
              <Button onClick={() => setStep("summary")}>Continua</Button>
            </div>
          </div>
        );

      case "summary":
        const selectedProductData = products.find(
          (p) => p.id === selectedProduct,
        );
        const selectedAccessoriesData = accessories.filter((a) =>
          selectedAccessories.includes(a.id),
        );

        const accessoriesTotal = selectedAccessoriesData.reduce(
          (total, acc) => total + acc.price,
          0,
        );

        const itemTotal =
          (selectedProductData?.price || 0) * currentItem.quantity +
          accessoriesTotal;

        return (
          <div className="space-y-6">
            <div className="border rounded-md p-4 space-y-4">
              <h3 className="text-lg font-medium">Riepilogo Articolo</h3>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Prodotto:</span>
                  <span>{selectedProductData?.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Quantità:</span>
                  <span>{currentItem.quantity}</span>
                </div>

                {currentItem.width && (
                  <div className="flex justify-between">
                    <span className="font-medium">Larghezza:</span>
                    <span>{currentItem.width} cm</span>
                  </div>
                )}

                {currentItem.height && (
                  <div className="flex justify-between">
                    <span className="font-medium">Altezza:</span>
                    <span>{currentItem.height} cm</span>
                  </div>
                )}

                {currentItem.material && (
                  <div className="flex justify-between">
                    <span className="font-medium">Materiale:</span>
                    <span>
                      {{
                        aluminum: "Alluminio",
                        wood: "Legno",
                        pvc: "PVC",
                        "wood-aluminum": "Legno-Alluminio",
                      }[currentItem.material] || currentItem.material}
                    </span>
                  </div>
                )}

                {currentItem.finish && (
                  <div className="flex justify-between">
                    <span className="font-medium">Finitura:</span>
                    <span>
                      {{
                        white: "Bianco",
                        natural: "Naturale",
                        walnut: "Noce",
                        "dark-brown": "Marrone Scuro",
                        custom: "Personalizzata",
                      }[currentItem.finish] || currentItem.finish}
                    </span>
                  </div>
                )}

                {selectedAccessoriesData.length > 0 && (
                  <div>
                    <span className="font-medium">Accessori:</span>
                    <ul className="list-disc list-inside pl-4 mt-1">
                      {selectedAccessoriesData.map((acc) => (
                        <li key={acc.id}>
                          {acc.name} - €{acc.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentItem.notes && (
                  <div>
                    <span className="font-medium">Note:</span>
                    <p className="text-sm mt-1">{currentItem.notes}</p>
                  </div>
                )}

                <div className="flex justify-between font-medium pt-2 border-t mt-2">
                  <span>Totale articolo:</span>
                  <span>€{itemTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep("configure")}>
                Modifica
              </Button>
              <Button onClick={handleAddItem}>Aggiungi al Preventivo</Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <DashboardHeader
          heading="Crea Preventivo"
          text="Seleziona prodotti e accessori per creare un preventivo"
        />
        <Link href="/dashboard/quotes">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Torna ai Preventivi
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Aggiungi Articoli</CardTitle>
              <CardDescription>
                Seleziona e configura gli articoli per il preventivo
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="py-8 text-center">Caricamento...</div>
              ) : (
                renderStepContent()
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Riepilogo Preventivo</CardTitle>
              <CardDescription>Articoli aggiunti al preventivo</CardDescription>
            </CardHeader>
            <CardContent>
              {quoteItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Nessun articolo aggiunto
                </div>
              ) : (
                <div className="space-y-4">
                  {quoteItems.map((item, index) => (
                    <div
                      key={index}
                      className="border rounded-md p-3 relative space-y-2"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => handleRemoveItem(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <div className="font-medium pr-6">
                        {item.product.name}
                      </div>
                      <div className="text-sm">
                        Quantità: {item.quantity} x €
                        {item.product.price.toFixed(2)}
                      </div>

                      {item.accessories.length > 0 && (
                        <div className="text-sm">
                          <div>Accessori:</div>
                          <ul className="list-disc list-inside pl-2">
                            {item.accessories.map((acc) => (
                              <li key={acc.id}>
                                {acc.name} - €{acc.price.toFixed(2)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="text-right font-medium">
                        €
                        {(
                          item.product.price * item.quantity +
                          item.accessories.reduce((acc, a) => acc + a.price, 0)
                        ).toFixed(2)}
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-4 flex justify-between font-medium">
                    <span>Totale:</span>
                    <span>€{calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <div className="w-full space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Nome Cliente</Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Nome del cliente"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerEmail">Email Cliente</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Email del cliente"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerPhone">Telefono Cliente</Label>
                  <Input
                    id="customerPhone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Telefono del cliente"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quoteNotes">Note Preventivo</Label>
                  <Textarea
                    id="quoteNotes"
                    value={quoteNotes}
                    onChange={(e) => setQuoteNotes(e.target.value)}
                    placeholder="Note aggiuntive per il preventivo"
                    rows={3}
                  />
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleSaveQuote}
                disabled={quoteItems.length === 0 || savingQuote}
              >
                {savingQuote ? "Salvataggio..." : "Salva Preventivo"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
