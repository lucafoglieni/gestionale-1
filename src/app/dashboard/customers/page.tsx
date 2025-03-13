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
import { Eye, FileText, Download, Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CustomersPage() {
  // Dati di esempio per i clienti
  const customers = [
    {
      id: "C-001",
      name: "Mario Rossi",
      email: "mario.rossi@example.com",
      phone: "+39 123 456 7890",
      address: "Via Roma 123, Milano",
      quotes: 3,
    },
    {
      id: "C-002",
      name: "Laura Bianchi",
      email: "laura.bianchi@example.com",
      phone: "+39 234 567 8901",
      address: "Via Garibaldi 45, Roma",
      quotes: 2,
    },
    {
      id: "C-003",
      name: "Giuseppe Verdi",
      email: "giuseppe.verdi@example.com",
      phone: "+39 345 678 9012",
      address: "Via Dante 67, Firenze",
      quotes: 1,
    },
    {
      id: "C-004",
      name: "Anna Neri",
      email: "anna.neri@example.com",
      phone: "+39 456 789 0123",
      address: "Via Mazzini 89, Torino",
      quotes: 4,
    },
    {
      id: "C-005",
      name: "Marco Gialli",
      email: "marco.gialli@example.com",
      phone: "+39 567 890 1234",
      address: "Via Cavour 12, Bologna",
      quotes: 2,
    },
    {
      id: "C-006",
      name: "Francesca Blu",
      email: "francesca.blu@example.com",
      phone: "+39 678 901 2345",
      address: "Via Vittorio Emanuele 34, Napoli",
      quotes: 3,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        heading="Clienti"
        text="Gestisci i tuoi clienti"
        buttonLabel="Nuovo Cliente"
        buttonAction={() => {}}
      />

      <Card>
        <CardHeader>
          <CardTitle>Tutti i Clienti</CardTitle>
          <CardDescription>
            Visualizza e gestisci tutti i clienti registrati
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefono</TableHead>
                  <TableHead>Preventivi</TableHead>
                  <TableHead className="text-right">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.id}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.quotes}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
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
              Totale Clienti
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Preventivi Totali
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customers.reduce((acc, customer) => acc + customer.quotes, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Media Preventivi per Cliente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                customers.reduce((acc, customer) => acc + customer.quotes, 0) /
                customers.length
              ).toFixed(1)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Azioni Rapide</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Link href="/dashboard/customers/new">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nuovo Cliente
            </Button>
          </Link>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Esporta Tutti
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
