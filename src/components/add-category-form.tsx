"use client";

import { useState } from "react";
import { createClient } from "@/supabase/client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { toast } from "./ui/use-toast";

interface AddCategoryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCategoryAdded: () => void;
}

export default function AddCategoryForm({
  open,
  onOpenChange,
  onCategoryAdded,
}: AddCategoryFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const supabase = createClient();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.name.trim()) {
        throw new Error("Il nome della categoria è obbligatorio");
      }

      const { data, error } = await supabase.from("product_categories").insert([
        {
          name: formData.name.trim(),
          description: formData.description.trim() || null,
        },
      ]);

      if (error) {
        if (error.code === "23505") {
          // Unique violation
          throw new Error("Esiste già una categoria con questo nome");
        }
        throw error;
      }

      toast({
        title: "Categoria aggiunta",
        description: "La categoria è stata aggiunta con successo",
      });

      // Reset form and close dialog
      setFormData({
        name: "",
        description: "",
      });
      onOpenChange(false);
      onCategoryAdded();
    } catch (error: any) {
      console.error("Error adding category:", error);
      toast({
        title: "Errore",
        description:
          error.message ||
          "Si è verificato un errore durante l'aggiunta della categoria",
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
            <DialogTitle>Aggiungi Nuova Categoria</DialogTitle>
            <DialogDescription>
              Inserisci i dettagli della nuova categoria da aggiungere al
              catalogo.
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
              {loading ? "Salvataggio..." : "Salva Categoria"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
