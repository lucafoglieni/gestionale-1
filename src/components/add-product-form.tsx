"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/supabase/client";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { toast } from "./ui/use-toast";

interface Category {
  id: string;
  name: string;
}

interface AddProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductAdded: () => void;
}

export default function AddProductForm({
  open,
  onOpenChange,
  onProductAdded,
}: AddProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    unit_of_measure: "pz",
    category_id: "",
    type: "product",
    description: "",
  });

  const supabase = createClient();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from("product_categories")
          .select("id, name")
          .order("name");

        if (error) throw error;
        setCategories(data || []);
        if (data && data.length > 0 && !formData.category_id) {
          setFormData((prev) => ({ ...prev, category_id: data[0].id }));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    if (open) {
      fetchCategories();
    }
  }, [open, formData.category_id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert price to number
      const priceValue = parseFloat(formData.price);
      if (isNaN(priceValue)) {
        throw new Error("Il prezzo deve essere un numero valido");
      }

      const { data, error } = await supabase.from("products").insert([
        {
          name: formData.name,
          price: priceValue,
          unit_of_measure: formData.unit_of_measure,
          category_id: formData.category_id,
          type: formData.type,
          description: formData.description || null,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Prodotto aggiunto",
        description: "Il prodotto è stato aggiunto con successo",
      });

      // Reset form and close dialog
      setFormData({
        name: "",
        price: "",
        unit_of_measure: "pz",
        category_id: categories[0]?.id || "",
        type: "product",
        description: "",
      });
      onOpenChange(false);
      onProductAdded();
    } catch (error: any) {
      console.error("Error adding product:", error);
      toast({
        title: "Errore",
        description:
          error.message ||
          "Si è verificato un errore durante l'aggiunta del prodotto",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Aggiungi Nuovo Prodotto</DialogTitle>
            <DialogDescription>
              Inserisci i dettagli del nuovo prodotto da aggiungere al catalogo.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Prezzo (€)
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unit_of_measure" className="text-right">
                Unità di Misura
              </Label>
              <Select
                value={formData.unit_of_measure}
                onValueChange={(value) =>
                  handleSelectChange("unit_of_measure", value)
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleziona unità di misura" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pz">Pezzo</SelectItem>
                  <SelectItem value="m">Metro</SelectItem>
                  <SelectItem value="m2">Metro Quadro</SelectItem>
                  <SelectItem value="kg">Kilogrammo</SelectItem>
                  <SelectItem value="set">Set</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Categoria
              </Label>
              <Select
                value={formData.category_id}
                onValueChange={(value) =>
                  handleSelectChange("category_id", value)
                }
              >
                <SelectTrigger className="col-span-3">
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

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Tipo
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Seleziona tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product">Prodotto</SelectItem>
                  <SelectItem value="accessory">Accessorio</SelectItem>
                  <SelectItem value="service">Servizio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrizione
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-3"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annulla
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Salvataggio..." : "Salva Prodotto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
