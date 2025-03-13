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
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
