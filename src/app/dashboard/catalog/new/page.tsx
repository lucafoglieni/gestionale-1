"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/catalog-data";
import { Upload, X, Check, ArrowLeft } from "lucide-react";

export default function NewProductPage() {
  const searchParams = useSearchParams();
  const typeFromUrl = searchParams.get("type");

  const [productType, setProductType] = useState(typeFromUrl || "windows");
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    unit: "",
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const categories = getAllCategories();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImagePreview("");
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulazione di invio dati
    setTimeout(() => {
      setIsSubmitting(false);
      // Qui andrebbe la logica per salvare i dati
      console.log("Form submitted:", {
        ...formData,
        type: productType,
        image: imagePreview,
      });
      // Redirect o feedback
    }, 1500);
  };

  // Gestione cambio tab con animazione
  const handleTabChange = (value) => {
    setIsLoaded(false);
    setTimeout(() => {
      setProductType(value);
      setIsLoaded(true);
    }, 200);
  };

  return (
    <div className="flex flex-col gap-8 fade-in">
      <DashboardHeader
        heading="Aggiungi Prodotto"
        text="Aggiungi un nuovo prodotto al catalogo"
        buttonLabel="Torna al Catalogo"
        buttonAction="/dashboard/catalog"
      />

      <Tabs
        value={productType}
        onValueChange={handleTabChange}
        className="w-full slide-in-bottom"
        style={{ animationDelay: "100ms" }}
      >
        <TabsList className="grid w-full grid-cols-3 rounded-full p-1 bg-muted/30 backdrop-blur-sm">
          <TabsTrigger
            value="windows"
            className="transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Finestre
          </TabsTrigger>
          <TabsTrigger
            value="doors"
            className="transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Porte
          </TabsTrigger>
          <TabsTrigger
            value="accessories"
            className="transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Accessori
          </TabsTrigger>
        </TabsList>

        <TabsContent value={productType} className="mt-6">
          <Card className="glass-card border-none overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {productType === "windows" && "Aggiungi Finestra"}
                {productType === "doors" && "Aggiungi Porta"}
                {productType === "accessories" && "Aggiungi Accessorio"}
              </CardTitle>
              <CardDescription>
                Compila il form per aggiungere un nuovo prodotto al catalogo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                className={`space-y-6 ${isLoaded ? "fade-in" : "opacity-0"}`}
                onSubmit={handleSubmit}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div
                    className="space-y-2 slide-in-bottom"
                    style={{ animationDelay: "150ms" }}
                  >
                    <Label htmlFor="name">Nome Prodotto</Label>
                    <Input
                      id="name"
                      placeholder="Nome del prodotto"
                      className="glass-input"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div
                    className="space-y-2 slide-in-bottom"
                    style={{ animationDelay: "200ms" }}
                  >
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("category", value)
                      }
                      value={formData.category}
                    >
                      <SelectTrigger className="glass-input">
                        <SelectValue placeholder="Seleziona categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories
                          .filter((cat) => {
                            if (productType === "windows")
                              return (
                                cat.name.toLowerCase().includes("finestra") ||
                                cat.name.toLowerCase().includes("tapparelle")
                              );
                            if (productType === "doors")
                              return (
                                cat.name.toLowerCase().includes("porta") ||
                                cat.name.toLowerCase().includes("pannell")
                              );
                            return true; // Show all for accessories
                          })
                          .map((category) => (
                            <SelectItem
                              key={category.name}
                              value={category.name}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div
                  className="space-y-2 slide-in-bottom"
                  style={{ animationDelay: "250ms" }}
                >
                  <Label htmlFor="description">Descrizione</Label>
                  <Textarea
                    id="description"
                    placeholder="Descrizione del prodotto"
                    rows={3}
                    className="glass-input resize-none"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div
                    className="space-y-2 slide-in-bottom"
                    style={{ animationDelay: "300ms" }}
                  >
                    <Label htmlFor="price">Prezzo</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                        €
                      </span>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        className="pl-8 glass-input"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div
                    className="space-y-2 slide-in-bottom"
                    style={{ animationDelay: "350ms" }}
                  >
                    <Label htmlFor="unit">Unità di Misura</Label>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange("unit", value)
                      }
                      value={formData.unit}
                    >
                      <SelectTrigger className="glass-input">
                        <SelectValue placeholder="Seleziona unità" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pz">Pezzo (pz)</SelectItem>
                        <SelectItem value="mq">Metro Quadro (mq)</SelectItem>
                        <SelectItem value="ml">Metro Lineare (ml)</SelectItem>
                        <SelectItem value="nr">Numero (nr)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div
                  className="space-y-2 slide-in-bottom"
                  style={{ animationDelay: "400ms" }}
                >
                  <Label>Immagine Prodotto</Label>
                  <div className="flex flex-col items-center justify-center gap-4">
                    {imagePreview ? (
                      <div className="relative h-48 w-full overflow-hidden rounded-xl border border-muted/40 shadow-md transition-all duration-300 hover:shadow-lg">
                        <img
                          src={imagePreview}
                          alt="Anteprima prodotto"
                          className="h-full w-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 rounded-full bg-background/80 hover:bg-background/90 transition-all duration-300"
                          onClick={clearImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex h-48 w-full flex-col items-center justify-center rounded-xl border border-dashed border-muted/60 bg-muted/10 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-primary/5 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <Upload className="mb-2 h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors duration-300 relative z-10 floating" />
                        <p className="text-sm text-muted-foreground relative z-10">
                          Trascina qui un'immagine o clicca per caricarla
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 cursor-pointer opacity-0 z-20"
                          onChange={handleImageChange}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className="flex justify-end gap-4 slide-in-bottom"
                  style={{ animationDelay: "450ms" }}
                >
                  <Button
                    variant="outline"
                    type="button"
                    className="rounded-full transition-all duration-300 hover:bg-muted/50"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Annulla
                  </Button>
                  <Button
                    type="submit"
                    className="gradient-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" /> Salva Prodotto
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
