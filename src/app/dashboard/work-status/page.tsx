"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import WorkStatusChart from "@/components/work-status-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Calendar, Clock, Eye, FileText } from "lucide-react";
import Link from "next/link";

export default function WorkStatusPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Dati di esempio per i lavori
  const allWorks = [
    {
      id: "W-2023-001",
      customer: "Mario Rossi",
      description: "Installazione finestre soggiorno",
      startDate: "10/10/2023",
      endDate: "15/10/2023",
      status: "completed",
      progress: 100,
    },
    {
      id: "W-2023-002",
      customer: "Laura Bianchi",
      description: "Sostituzione porte interne",
      startDate: "12/10/2023",
      endDate: "18/10/2023",
      status: "completed",
      progress: 100,
    },
    {
      id: "W-2023-003",
      customer: "Giuseppe Verdi",
      description: "Installazione zanzariere",
      startDate: "15/10/2023",
      endDate: "16/10/2023",
      status: "completed",
      progress: 100,
    },
    {
      id: "W-2023-004",
      customer: "Anna Neri",
      description: "Installazione finestre camera da letto",
      startDate: "18/10/2023",
      endDate: "22/10/2023",
      status: "in_progress",
      progress: 75,
    },
    {
      id: "W-2023-005",
      customer: "Marco Gialli",
      description: "Sostituzione porta d'ingresso",
      startDate: "20/10/2023",
      endDate: "25/10/2023",
      status: "in_progress",
      progress: 50,
    },
    {
      id: "W-2023-006",
      customer: "Francesca Blu",
      description: "Installazione persiane",
      startDate: "22/10/2023",
      endDate: "28/10/2023",
      status: "in_progress",
      progress: 30,
    },
    {
      id: "W-2023-007",
      customer: "Roberto Verdi",
      description: "Installazione finestre bagno",
      startDate: "25/10/2023",
      endDate: "30/10/2023",
      status: "pending",
      progress: 0,
    },
    {
      id: "W-2023-008",
      customer: "Claudia Rosa",
      description: "Sostituzione finestre cucina",
      startDate: "28/10/2023",
      endDate: "02/11/2023",
      status: "pending",
      progress: 0,
    },
    {
      id: "W-2023-009",
      customer: "Paolo Arancio",
      description: "Riparazione serramenti",
      startDate: "15/10/2023",
      endDate: "16/10/2023",
      status: "issue",
      progress: 40,
    },
    {
      id: "W-2023-010",
      customer: "Giovanna Viola",
      description: "Installazione porte scorrevoli",
      startDate: "18/10/2023",
      endDate: "22/10/2023",
      status: "issue",
      progress: 60,
    },
  ];

  // Filtra i lavori in base allo stato e al termine di ricerca
  const filteredWorks = allWorks.filter((work) => {
    if (statusFilter !== "all" && work.status !== statusFilter) {
      return false;
    }

    if (
      searchTerm &&
      !work.customer.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !work.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !work.id.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completato";
      case "in_progress":
        return "In Corso";
      case "pending":
        return "In Attesa";
      case "issue":
        return "Problematico";
      default:
        return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-amber-100 text-amber-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "issue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddNewWork = () => {
    // In futuro, questa funzione potrebbe aprire un modale o navigare a una pagina di creazione
    alert("Funzionalità di aggiunta nuovo lavoro in fase di sviluppo");
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <DashboardHeader
          heading="Stato Lavori"
          text="Monitora lo stato di avanzamento dei lavori"
        />
        <Button
          onClick={handleAddNewWork}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Nuovo Lavoro
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <WorkStatusChart />

        <Card>
          <CardHeader>
            <CardTitle>Riepilogo Lavori</CardTitle>
            <CardDescription>Panoramica dello stato dei lavori</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-md border p-4">
                  <div className="text-sm text-muted-foreground">
                    Completati
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {allWorks.filter((w) => w.status === "completed").length}
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="text-sm text-muted-foreground">In Corso</div>
                  <div className="mt-1 text-2xl font-bold">
                    {allWorks.filter((w) => w.status === "in_progress").length}
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="text-sm text-muted-foreground">In Attesa</div>
                  <div className="mt-1 text-2xl font-bold">
                    {allWorks.filter((w) => w.status === "pending").length}
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="text-sm text-muted-foreground">
                    Problematici
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {allWorks.filter((w) => w.status === "issue").length}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtri</CardTitle>
          <CardDescription>Filtra i lavori per stato</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="statusFilter">Stato</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="statusFilter">
                  <SelectValue placeholder="Seleziona stato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti gli stati</SelectItem>
                  <SelectItem value="completed">Completati</SelectItem>
                  <SelectItem value="in_progress">In Corso</SelectItem>
                  <SelectItem value="pending">In Attesa</SelectItem>
                  <SelectItem value="issue">Problematici</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="search">Cerca</Label>
              <Input
                id="search"
                placeholder="Cerca per cliente, descrizione o ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista Lavori</CardTitle>
          <CardDescription>
            {filteredWorks.length} lavori trovati
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Descrizione</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead>Progresso</TableHead>
                  <TableHead className="text-right">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorks.map((work) => (
                  <TableRow key={work.id}>
                    <TableCell className="font-medium">{work.id}</TableCell>
                    <TableCell>{work.customer}</TableCell>
                    <TableCell>{work.description}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">
                          Inizio: {work.startDate}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Fine: {work.endDate}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                          work.status,
                        )}`}
                      >
                        {getStatusLabel(work.status)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${work.status === "issue" ? "bg-red-500" : "bg-blue-600"}`}
                          style={{ width: `${work.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">
                        {work.progress}%
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" /> Dettagli
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
