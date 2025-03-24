"use client";

import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Filter, Plus, Search, Trash2, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("windows");
  const [isLoaded, setIsLoaded] = useState(false);

  // Dati di esempio per il catalogo
  const windows = [
    {
      id: 1,
      name: "Finestra Standard",
      description: "Finestra in alluminio a battente",
      price: "€350.00",
      image:
        "https://images.unsplash.com/photo-1604082787627-530fec8b9f74?w=500&q=80",
    },
    {
      id: 2,
      name: "Finestra Scorrevole",
      description: "Finestra scorrevole in PVC",
      price: "€450.00",
      image:
        "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=500&q=80",
    },
    {
      id: 3,
      name: "Finestra a Vasistas",
      description: "Finestra a vasistas in legno",
      price: "€380.00",
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=500&q=80",
    },
  ];

  const doors = [
    {
      id: 1,
      name: "Porta d'Ingresso",
      description: "Porta d'ingresso in legno massello",
      price: "€850.00",
      image:
        "https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?w=500&q=80",
    },
    {
      id: 2,
      name: "Porta Scorrevole",
      description: "Porta scorrevole in vetro e alluminio",
      price: "€750.00",
      image:
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=500&q=80",
    },
    {
      id: 3,
      name: "Porta Interna",
      description: "Porta interna in legno laccato",
      price: "€450.00",
      image:
        "https://images.unsplash.com/photo-1600566752447-f4c9fb5d1eb5?w=500&q=80",
    },
  ];

  const accessories = [
    {
      id: 1,
      name: "Maniglia Standard",
      description: "Maniglia in alluminio satinato",
      price: "€45.00",
      image:
        "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500&q=80",
    },
    {
      id: 2,
      name: "Zanzariera",
      description: "Zanzariera a rullo per finestre",
      price: "€120.00",
      image:
        "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=500&q=80",
    },
    {
      id: 3,
      name: "Persiana",
      description: "Persiana in alluminio regolabile",
      price: "€280.00",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80",
    },
  ];

  // Filtro prodotti in base al termine di ricerca
  const filterProducts = (products) => {
    if (!searchTerm) return products;
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

  // Animazione di caricamento
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Gestione cambio tab con animazione
  const handleTabChange = (value) => {
    setIsLoaded(false);
    setTimeout(() => {
      setActiveTab(value);
      setIsLoaded(true);
    }, 200);
  };

  return (
    <div className="flex flex-col gap-8 fade-in">
      <DashboardHeader
        heading="Catalogo Prodotti"
        text="Gestisci il tuo catalogo di serramenti e accessori"
        buttonLabel="Aggiungi Prodotto"
        buttonAction="/dashboard/catalog/new"
      />

      <div
        className="flex items-center gap-4 mb-4 slide-in-bottom"
        style={{ animationDelay: "100ms" }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cerca prodotti..."
            className="pl-10 glass-input rounded-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full slide-in-bottom"
        style={{ animationDelay: "200ms" }}
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

        <TabsContent value="windows" className="mt-6">
          <Card className="glass-card border-none overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Finestre</CardTitle>
              <CardDescription>
                Gestisci il catalogo delle finestre
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${isLoaded ? "fade-in" : "opacity-0"}`}
              >
                {filterProducts(windows).map((item, index) => (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-xl border border-muted/40 bg-card/80 text-card-foreground shadow-lg backdrop-blur-sm hover-card-effect group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
                        >
                          <Eye className="h-4 w-4 mr-2" /> Visualizza
                        </Button>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-medium text-primary">
                          {item.price}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Link
                  href="/dashboard/catalog/new?type=windows"
                  className="block"
                >
                  <div className="flex h-full min-h-[200px] flex-col items-center justify-center rounded-xl border border-dashed border-muted/60 p-8 transition-all hover:border-primary/40 hover:bg-primary/5 group cursor-pointer hover-card-effect">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="relative">
                        <Plus className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 pulse"></span>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                        Aggiungi Finestra
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Aggiungi una nuova finestra al catalogo
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="doors" className="mt-6">
          <Card className="glass-card border-none overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Porte</CardTitle>
              <CardDescription>
                Gestisci il catalogo delle porte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${isLoaded ? "fade-in" : "opacity-0"}`}
              >
                {filterProducts(doors).map((item, index) => (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-xl border border-muted/40 bg-card/80 text-card-foreground shadow-lg backdrop-blur-sm hover-card-effect group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
                        >
                          <Eye className="h-4 w-4 mr-2" /> Visualizza
                        </Button>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-medium text-primary">
                          {item.price}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Link
                  href="/dashboard/catalog/new?type=doors"
                  className="block"
                >
                  <div className="flex h-full min-h-[200px] flex-col items-center justify-center rounded-xl border border-dashed border-muted/60 p-8 transition-all hover:border-primary/40 hover:bg-primary/5 group cursor-pointer hover-card-effect">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="relative">
                        <Plus className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 pulse"></span>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                        Aggiungi Porta
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Aggiungi una nuova porta al catalogo
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessories" className="mt-6">
          <Card className="glass-card border-none overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Accessori</CardTitle>
              <CardDescription>
                Gestisci il catalogo degli accessori
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${isLoaded ? "fade-in" : "opacity-0"}`}
              >
                {filterProducts(accessories).map((item, index) => (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-xl border border-muted/40 bg-card/80 text-card-foreground shadow-lg backdrop-blur-sm hover-card-effect group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
                        >
                          <Eye className="h-4 w-4 mr-2" /> Visualizza
                        </Button>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-medium text-primary">
                          {item.price}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Link
                  href="/dashboard/catalog/new?type=accessories"
                  className="block"
                >
                  <div className="flex h-full min-h-[200px] flex-col items-center justify-center rounded-xl border border-dashed border-muted/60 p-8 transition-all hover:border-primary/40 hover:bg-primary/5 group cursor-pointer hover-card-effect">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="relative">
                        <Plus className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 pulse"></span>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                        Aggiungi Accessorio
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Aggiungi un nuovo accessorio al catalogo
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
