"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Search, Filter, X, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ClientFilter() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    city: "",
    type: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      status: "",
      city: "",
      type: "",
    });
  };

  const handleSearch = () => {
    // Costruisci i parametri di query basati sui filtri
    const queryParams = new URLSearchParams();
    if (filters.search) queryParams.append("search", filters.search);
    if (filters.status) queryParams.append("status", filters.status);
    if (filters.city) queryParams.append("city", filters.city);
    if (filters.type) queryParams.append("type", filters.type);

    // Naviga alla pagina dei clienti con i filtri applicati
    router.push(`/dashboard/customers?${queryParams.toString()}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cerca clienti per nome, email o telefono..."
            className="pl-8"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
        </Button>
        {(filters.status || filters.city || filters.type || filters.search) && (
          <Button
            variant="default"
            size="sm"
            onClick={handleSearch}
            className="gap-1"
          >
            Cerca <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        )}
        {(filters.status || filters.city || filters.type) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="gap-1 text-xs"
          >
            <X className="h-3 w-3" /> Cancella filtri
          </Button>
        )}
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-md bg-muted/20">
          <div className="space-y-2">
            <Label htmlFor="status">Stato Cliente</Label>
            <Select
              value={filters.status}
              onValueChange={(value) => handleFilterChange("status", value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Tutti gli stati" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tutti gli stati</SelectItem>
                <SelectItem value="active">Attivo</SelectItem>
                <SelectItem value="inactive">Inattivo</SelectItem>
                <SelectItem value="lead">Potenziale</SelectItem>
                <SelectItem value="completed">Completato</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Città</Label>
            <Select
              value={filters.city}
              onValueChange={(value) => handleFilterChange("city", value)}
            >
              <SelectTrigger id="city">
                <SelectValue placeholder="Tutte le città" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tutte le città</SelectItem>
                <SelectItem value="milano">Milano</SelectItem>
                <SelectItem value="roma">Roma</SelectItem>
                <SelectItem value="napoli">Napoli</SelectItem>
                <SelectItem value="torino">Torino</SelectItem>
                <SelectItem value="firenze">Firenze</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo Cliente</Label>
            <Select
              value={filters.type}
              onValueChange={(value) => handleFilterChange("type", value)}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Tutti i tipi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tutti i tipi</SelectItem>
                <SelectItem value="private">Privato</SelectItem>
                <SelectItem value="business">Azienda</SelectItem>
                <SelectItem value="contractor">Appaltatore</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}
