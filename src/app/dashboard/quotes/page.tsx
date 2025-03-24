"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, FileText, Download, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function QuotesPage() {
  const router = useRouter();
  // Dati di esempio per i preventivi
  const quotes = [
    {
      id: "Q-2023-001",
      customer: "Mario Rossi",
      date: "15/05/2023",
      status: "Approvato",
      amount: "€1,250.00",
    },
    {
      id: "Q-2023-002",
      customer: "Laura Bianchi",
      date: "18/05/2023",
      status: "In attesa",
      amount: "€2,340.00",
    },
    {
      id: "Q-2023-003",
      customer: "Giuseppe Verdi",
      date: "20/05/2023",
      status: "Approvato",
      amount: "€980.00",
    },
    {
      id: "Q-2023-004",
      customer: "Anna Neri",
      date: "22/05/2023",
      status: "Rifiutato",
      amount: "€1,780.00",
    },
    {
      id: "Q-2023-005",
      customer: "Marco Gialli",
      date: "25/05/2023",
      status: "In attesa",
      amount: "€3,120.00",
    },
    {
      id: "Q-2023-006",
      customer: "Francesca Blu",
      date: "28/05/2023",
      status: "Approvato",
      amount: "€1,560.00",
    },
    {
      id: "Q-2023-007",
      customer: "Roberto Verdi",
      date: "01/06/2023",
      status: "In attesa",
      amount: "€2,780.00",
    },
    {
      id: "Q-2023-008",
      customer: "Claudia Rosa",
      date: "05/06/2023",
      status: "Approvato",
      amount: "€1,890.00",
    },
  ];

  // Navigation is now handled directly in the DashboardHeader component

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        heading="Preventivi"
        text="Gestisci i tuoi preventivi"
        buttonLabel="Nuovo Preventivo"
        buttonAction="/dashboard/quotes/create"
      />

      <Card>
        <CardHeader>
          <CardTitle>Tutti i Preventivi</CardTitle>
          <CardDescription>
            Visualizza e gestisci tutti i preventivi creati
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead className="text-right">Importo</TableHead>
                  <TableHead className="text-right">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.map((quote) => (
                  <TableRow key={quote.id}>
                    <TableCell className="font-medium">{quote.id}</TableCell>
                    <TableCell>{quote.customer}</TableCell>
                    <TableCell>{quote.date}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${quote.status === "Approvato" ? "bg-green-100 text-green-800" : quote.status === "Rifiutato" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}
                      >
                        {quote.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">{quote.amount}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/dashboard/quotes/${quote.id}`}>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Totale Preventivi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quotes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Preventivi Approvati
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {quotes.filter((q) => q.status === "Approvato").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Valore Totale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€15,700.00</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Azioni Rapide</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button className="flex items-center gap-2" asChild>
            <Link href="/dashboard/quotes/create">
              <Plus className="h-4 w-4" />
              Nuovo Preventivo
            </Link>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Esporta Tutti
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
