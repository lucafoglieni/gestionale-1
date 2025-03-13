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
import { Edit, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

export default function CatalogPage() {
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

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        heading="Catalogo Prodotti"
        text="Gestisci il tuo catalogo di serramenti e accessori"
        buttonLabel="Aggiungi Prodotto"
        buttonAction={() => {}}
      />

      <Tabs defaultValue="windows" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="windows">Finestre</TabsTrigger>
          <TabsTrigger value="doors">Porte</TabsTrigger>
          <TabsTrigger value="accessories">Accessori</TabsTrigger>
        </TabsList>

        <TabsContent value="windows" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Finestre</CardTitle>
              <CardDescription>
                Gestisci il catalogo delle finestre
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {windows.map((item) => (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-medium">{item.price}</span>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex h-full min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8">
                  <div className="flex flex-col items-center justify-center text-center">
                    <Plus className="h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">
                      Aggiungi Finestra
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Aggiungi una nuova finestra al catalogo
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="doors" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Porte</CardTitle>
              <CardDescription>
                Gestisci il catalogo delle porte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {doors.map((item) => (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-medium">{item.price}</span>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex h-full min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8">
                  <div className="flex flex-col items-center justify-center text-center">
                    <Plus className="h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">
                      Aggiungi Porta
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Aggiungi una nuova porta al catalogo
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessories" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Accessori</CardTitle>
              <CardDescription>
                Gestisci il catalogo degli accessori
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {accessories.map((item) => (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-medium">{item.price}</span>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex h-full min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8">
                  <div className="flex flex-col items-center justify-center text-center">
                    <Plus className="h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">
                      Aggiungi Accessorio
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Aggiungi un nuovo accessorio al catalogo
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
