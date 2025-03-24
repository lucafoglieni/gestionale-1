"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface QuoteFormProps {
  onSubmit: (data: QuoteData) => void;
  onCancel: () => void;
}

export interface QuoteData {
  productType: string;
  width: number;
  height: number;
  material: string;
  finish: string;
  accessories: string;
  notes: string;
  technician: string;
  percentageSurcharge: number;
  discountDescription: string;
  invoiceDiscount: number;
  constructionSite: string;
  orderNumber: string;
  invoiceObject: string;
  cadastralData: {
    sheet: string;
    particle: string;
    cc: string;
    urbanSection: string;
    installationZone: string;
    denomination: string;
    address: string;
    municipality: string;
    floorStaircase: string;
    postalCode: string;
    map: string;
    path: string;
    changeDestination: string;
    actualHours: number;
    estimatedHours: number;
  };
}

export default function QuoteForm({ onSubmit, onCancel }: QuoteFormProps) {
  const [formData, setFormData] = useState<QuoteData>({
    productType: "",
    width: 0,
    height: 0,
    material: "",
    finish: "",
    accessories: "",
    notes: "",
    technician: "",
    percentageSurcharge: 0,
    discountDescription: "",
    invoiceDiscount: 0,
    constructionSite: "",
    orderNumber: "",
    invoiceObject: "",
    cadastralData: {
      sheet: "",
      particle: "",
      cc: "",
      urbanSection: "",
      installationZone: "",
      denomination: "",
      address: "",
      municipality: "",
      floorStaircase: "",
      postalCode: "",
      map: "",
      path: "",
      changeDestination: "",
      actualHours: 0,
      estimatedHours: 0,
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    // Handle nested cadastralData fields
    if (name.startsWith("cadastralData.")) {
      const cadastralField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        cadastralData: {
          ...prev.cadastralData,
          [cadastralField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Configura Serramento</CardTitle>
        <CardDescription>
          Inserisci i dettagli per il preventivo
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productType">Tipo di Serramento</Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange("productType", value)
              }
              defaultValue={formData.productType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleziona tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="window">Finestra</SelectItem>
                <SelectItem value="door">Porta</SelectItem>
                <SelectItem value="sliding-door">Porta Scorrevole</SelectItem>
                <SelectItem value="french-window">Portafinestra</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="width">Larghezza (cm)</Label>
              <Input
                id="width"
                name="width"
                type="number"
                placeholder="Larghezza"
                value={formData.width || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Altezza (cm)</Label>
              <Input
                id="height"
                name="height"
                type="number"
                placeholder="Altezza"
                value={formData.height || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="material">Materiale</Label>
            <Select
              onValueChange={(value) => handleSelectChange("material", value)}
              defaultValue={formData.material}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleziona materiale" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aluminum">Alluminio</SelectItem>
                <SelectItem value="wood">Legno</SelectItem>
                <SelectItem value="pvc">PVC</SelectItem>
                <SelectItem value="wood-aluminum">Legno-Alluminio</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="finish">Finitura</Label>
            <Select
              onValueChange={(value) => handleSelectChange("finish", value)}
              defaultValue={formData.finish}
            >
              <SelectTrigger>
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

          <div className="space-y-2">
            <Label htmlFor="accessories">Accessori</Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange("accessories", value)
              }
              defaultValue={formData.accessories}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleziona accessori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Nessuno</SelectItem>
                <SelectItem value="handle">Maniglia</SelectItem>
                <SelectItem value="mosquito-net">Zanzariera</SelectItem>
                <SelectItem value="shutter">Persiana</SelectItem>
                <SelectItem value="multiple">Multipli</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="technician">Sezione Tecnico</Label>
            <Input
              id="technician"
              name="technician"
              placeholder="Nome del tecnico"
              value={formData.technician}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="percentageSurcharge">
                Maggiorazione in Percentuale (%)
              </Label>
              <Input
                id="percentageSurcharge"
                name="percentageSurcharge"
                type="number"
                placeholder="0"
                value={formData.percentageSurcharge || ""}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoiceDiscount">Sconto in Fattura (%)</Label>
              <Input
                id="invoiceDiscount"
                name="invoiceDiscount"
                type="number"
                placeholder="0"
                value={formData.invoiceDiscount || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="discountDescription">Scontistica</Label>
            <Input
              id="discountDescription"
              name="discountDescription"
              placeholder="Descrizione scontistica"
              value={formData.discountDescription}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="constructionSite">Cantiere</Label>
              <Input
                id="constructionSite"
                name="constructionSite"
                placeholder="Nome cantiere"
                value={formData.constructionSite}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orderNumber">Numero d'Ordine</Label>
              <Input
                id="orderNumber"
                name="orderNumber"
                placeholder="Numero d'ordine"
                value={formData.orderNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="invoiceObject">Oggetto Fattura</Label>
            <Input
              id="invoiceObject"
              name="invoiceObject"
              placeholder="Descrizione oggetto fattura"
              value={formData.invoiceObject}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-4 border p-4 rounded-md">
            <h3 className="font-medium">Dati Catastali</h3>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cadastralData.sheet">Foglio</Label>
                <Input
                  id="cadastralData.sheet"
                  name="cadastralData.sheet"
                  placeholder="Foglio"
                  value={formData.cadastralData.sheet}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cadastralData.particle">Particella</Label>
                <Input
                  id="cadastralData.particle"
                  name="cadastralData.particle"
                  placeholder="Particella"
                  value={formData.cadastralData.particle}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cadastralData.cc">C.C.</Label>
                <Input
                  id="cadastralData.cc"
                  name="cadastralData.cc"
                  placeholder="C.C."
                  value={formData.cadastralData.cc}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cadastralData.urbanSection">Sez. Urbana</Label>
                <Input
                  id="cadastralData.urbanSection"
                  name="cadastralData.urbanSection"
                  placeholder="Sezione urbana"
                  value={formData.cadastralData.urbanSection}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cadastralData.installationZone">
                  Zona Posa
                </Label>
                <Input
                  id="cadastralData.installationZone"
                  name="cadastralData.installationZone"
                  placeholder="Zona posa"
                  value={formData.cadastralData.installationZone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cadastralData.denomination">
                  Denominazione
                </Label>
                <Input
                  id="cadastralData.denomination"
                  name="cadastralData.denomination"
                  placeholder="Denominazione"
                  value={formData.cadastralData.denomination}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cadastralData.address">Indirizzo</Label>
                <Input
                  id="cadastralData.address"
                  name="cadastralData.address"
                  placeholder="Indirizzo"
                  value={formData.cadastralData.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cadastralData.municipality">Comune</Label>
                <Input
                  id="cadastralData.municipality"
                  name="cadastralData.municipality"
                  placeholder="Comune"
                  value={formData.cadastralData.municipality}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cadastralData.floorStaircase">
                  Piano Scala
                </Label>
                <Input
                  id="cadastralData.floorStaircase"
                  name="cadastralData.floorStaircase"
                  placeholder="Piano scala"
                  value={formData.cadastralData.floorStaircase}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cadastralData.postalCode">CAP</Label>
                <Input
                  id="cadastralData.postalCode"
                  name="cadastralData.postalCode"
                  placeholder="CAP"
                  value={formData.cadastralData.postalCode}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cadastralData.map">Mappa</Label>
                <Input
                  id="cadastralData.map"
                  name="cadastralData.map"
                  placeholder="Mappa"
                  value={formData.cadastralData.map}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cadastralData.path">Percorso</Label>
                <Input
                  id="cadastralData.path"
                  name="cadastralData.path"
                  placeholder="Percorso"
                  value={formData.cadastralData.path}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cadastralData.changeDestination">
                Cambia Destinazione
              </Label>
              <Input
                id="cadastralData.changeDestination"
                name="cadastralData.changeDestination"
                placeholder="Cambia destinazione"
                value={formData.cadastralData.changeDestination}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cadastralData.actualHours">Ore Effettive</Label>
                <Input
                  id="cadastralData.actualHours"
                  name="cadastralData.actualHours"
                  type="number"
                  placeholder="0"
                  value={formData.cadastralData.actualHours || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cadastralData.estimatedHours">
                  Ore Previste
                </Label>
                <Input
                  id="cadastralData.estimatedHours"
                  name="cadastralData.estimatedHours"
                  type="number"
                  placeholder="0"
                  value={formData.cadastralData.estimatedHours || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Note Aggiuntive</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Inserisci eventuali note o richieste speciali"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annulla
          </Button>
          <Button type="submit">Genera Preventivo</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
