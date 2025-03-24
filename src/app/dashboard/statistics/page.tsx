"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import SalesSummary from "@/components/sales-summary";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function StatisticsPage() {
  const [yearFilter, setYearFilter] = useState("2023");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Dati di esempio per le statistiche di vendita per categoria
  const categorySales = [
    { category: "Finestre", amount: 125000, percentage: 40 },
    { category: "Porte", amount: 95000, percentage: 30 },
    { category: "Persiane", amount: 45000, percentage: 15 },
    { category: "Zanzariere", amount: 25000, percentage: 8 },
    { category: "Accessori", amount: 15000, percentage: 5 },
    { category: "Altro", amount: 6000, percentage: 2 },
  ];

  // Dati di esempio per le statistiche dei clienti
  const clientStats = {
    total: 120,
    new: 28,
    returning: 92,
    conversionRate: 65,
  };

  // Dati di esempio per le statistiche dei preventivi
  const quoteStats = {
    total: 180,
    approved: 120,
    pending: 45,
    rejected: 15,
    conversionRate: 67,
  };

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        heading="Statistiche"
        text="Analisi delle performance aziendali"
      />

      <Card>
        <CardHeader>
          <CardTitle>Filtri</CardTitle>
          <CardDescription>Filtra le statistiche per periodo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="yearFilter">Anno</Label>
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger id="yearFilter">
                  <SelectValue placeholder="Seleziona anno" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryFilter">Categoria</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger id="categoryFilter">
                  <SelectValue placeholder="Seleziona categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutte le categorie</SelectItem>
                  <SelectItem value="windows">Finestre</SelectItem>
                  <SelectItem value="doors">Porte</SelectItem>
                  <SelectItem value="shutters">Persiane</SelectItem>
                  <SelectItem value="accessories">Accessori</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <SalesSummary />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Vendite per Categoria</CardTitle>
            <CardDescription>
              Distribuzione delle vendite per categoria di prodotto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categorySales.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.category}</span>
                    <span className="text-sm font-medium">
                      €{item.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-muted-foreground text-right">
                    {item.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistiche Clienti</CardTitle>
            <CardDescription>
              Analisi della base clienti e conversioni
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-md border p-4">
                <div className="text-sm text-muted-foreground">
                  Clienti Totali
                </div>
                <div className="mt-1 text-2xl font-bold">
                  {clientStats.total}
                </div>
              </div>
              <div className="rounded-md border p-4">
                <div className="text-sm text-muted-foreground">
                  Nuovi Clienti
                </div>
                <div className="mt-1 text-2xl font-bold">{clientStats.new}</div>
              </div>
              <div className="rounded-md border p-4">
                <div className="text-sm text-muted-foreground">
                  Clienti Fidelizzati
                </div>
                <div className="mt-1 text-2xl font-bold">
                  {clientStats.returning}
                </div>
              </div>
              <div className="rounded-md border p-4">
                <div className="text-sm text-muted-foreground">
                  Tasso di Conversione
                </div>
                <div className="mt-1 text-2xl font-bold">
                  {clientStats.conversionRate}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Statistiche Preventivi</CardTitle>
          <CardDescription>
            Analisi dei preventivi e tasso di conversione
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="rounded-md border p-4">
              <div className="text-sm text-muted-foreground">
                Preventivi Totali
              </div>
              <div className="mt-1 text-2xl font-bold">{quoteStats.total}</div>
            </div>
            <div className="rounded-md border p-4">
              <div className="text-sm text-muted-foreground">
                Preventivi Approvati
              </div>
              <div className="mt-1 text-2xl font-bold text-green-600">
                {quoteStats.approved}
              </div>
            </div>
            <div className="rounded-md border p-4">
              <div className="text-sm text-muted-foreground">
                Preventivi in Attesa
              </div>
              <div className="mt-1 text-2xl font-bold text-amber-600">
                {quoteStats.pending}
              </div>
            </div>
            <div className="rounded-md border p-4">
              <div className="text-sm text-muted-foreground">
                Preventivi Rifiutati
              </div>
              <div className="mt-1 text-2xl font-bold text-red-600">
                {quoteStats.rejected}
              </div>
            </div>
            <div className="rounded-md border p-4">
              <div className="text-sm text-muted-foreground">
                Tasso di Conversione
              </div>
              <div className="mt-1 text-2xl font-bold text-blue-600">
                {quoteStats.conversionRate}%
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="h-40 flex items-end gap-2">
              <div className="flex-1 flex flex-col items-center">
                <div
                  className="w-full rounded-t bg-green-500"
                  style={{
                    height: `${(quoteStats.approved / quoteStats.total) * 100}%`,
                  }}
                ></div>
                <span className="mt-2 text-xs">Approvati</span>
                <span className="text-xs text-muted-foreground">
                  {Math.round((quoteStats.approved / quoteStats.total) * 100)}%
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div
                  className="w-full rounded-t bg-amber-500"
                  style={{
                    height: `${(quoteStats.pending / quoteStats.total) * 100}%`,
                  }}
                ></div>
                <span className="mt-2 text-xs">In Attesa</span>
                <span className="text-xs text-muted-foreground">
                  {Math.round((quoteStats.pending / quoteStats.total) * 100)}%
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div
                  className="w-full rounded-t bg-red-500"
                  style={{
                    height: `${(quoteStats.rejected / quoteStats.total) * 100}%`,
                  }}
                ></div>
                <span className="mt-2 text-xs">Rifiutati</span>
                <span className="text-xs text-muted-foreground">
                  {Math.round((quoteStats.rejected / quoteStats.total) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
