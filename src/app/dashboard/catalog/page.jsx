"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CatalogList from "@/components/catalog/catalog-list";

export default function CatalogPage() {
  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        heading="Catalogo"
        text="Gestisci il catalogo dei prodotti e accessori"
      />

      <Card>
        <CardHeader>
          <CardTitle>Catalogo Prodotti</CardTitle>
          <CardDescription>
            Sfoglia e seleziona articoli dal catalogo per i tuoi preventivi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="browse">Sfoglia Catalogo</TabsTrigger>
              <TabsTrigger value="manage">Gestione Catalogo</TabsTrigger>
            </TabsList>
            <TabsContent value="browse" className="pt-4">
              <CatalogList />
            </TabsContent>
            <TabsContent value="manage" className="pt-4">
              <div className="text-center py-8 text-muted-foreground">
                Funzionalità di gestione catalogo in fase di sviluppo
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
