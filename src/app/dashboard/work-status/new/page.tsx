"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewWorkPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    customer: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "pending",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Qui in futuro si implementerà la logica per salvare il nuovo lavoro
    alert("Lavoro creato con successo!");
    router.push("/dashboard/work-status");
  };

  const handleCancel = () => {
    router.push("/dashboard/work-status");
  };

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        heading="Nuovo Lavoro"
        text="Inserisci i dettagli per creare un nuovo lavoro"
      />

      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Dettagli Lavoro</CardTitle>
          <CardDescription>
            Compila tutti i campi per creare un nuovo lavoro
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="customer">Cliente</Label>
                <Input
                  id="customer"
                  name="customer"
                  placeholder="Nome del cliente"
                  value={formData.customer}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Stato</Label>
                <Select
                  value={formData.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Seleziona stato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">In Attesa</SelectItem>
                    <SelectItem value="in_progress">In Corso</SelectItem>
                    <SelectItem value="completed">Completato</SelectItem>
                    <SelectItem value="issue">Problematico</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Data Inizio</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">Data Fine Prevista</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Descrizione</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Descrizione del lavoro"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Annulla
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Crea Lavoro
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
