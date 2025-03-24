"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/supabase/client";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Download, Printer, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast.ts";
import Link from "next/link";

interface QuoteDetailProps {
  quoteId: string;
}

export default function QuoteDetail({ quoteId }: QuoteDetailProps) {
  const [quote, setQuote] = useState<any>(null);
  const [quoteItems, setQuoteItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const supabase = createClient();

  useEffect(() => {
    async function fetchQuoteData() {
      try {
        // Fetch quote details
        const { data: quoteData, error: quoteError } = await supabase
          .from("quotes")
          .select("*")
          .eq("id", quoteId)
          .single();

        if (quoteError) throw quoteError;
        setQuote(quoteData);

        // Fetch quote items
        const { data: itemsData, error: itemsError } = await supabase
          .from("quote_items")
          .select("*")
          .eq("quote_id", quoteId);

        if (itemsError) throw itemsError;
        setQuoteItems(itemsData || []);
      } catch (error: any) {
        console.error("Error fetching quote data:", error);
        toast({
          title: "Errore",
          description: "Impossibile caricare i dati del preventivo",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    if (quoteId) {
      fetchQuoteData();
    }
  }, [quoteId]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // This would be implemented with a PDF generation library
    toast({
      title: "Funzionalità in arrivo",
      description: "Il download del PDF sarà disponibile a breve",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p>Caricamento preventivo...</p>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p>Preventivo non trovato</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("it-IT");
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "approved":
        return "Approvato";
      case "rejected":
        return "Rifiutato";
      case "pending":
        return "In attesa";
      case "draft":
        return "Bozza";
      default:
        return status || "Bozza";
    }
  };

  const getMaterialLabel = (material: string) => {
    const materials: Record<string, string> = {
      aluminum: "Alluminio",
      wood: "Legno",
      pvc: "PVC",
      "wood-aluminum": "Legno-Alluminio",
    };
    return materials[material] || material;
  };

  const getFinishLabel = (finish: string) => {
    const finishes: Record<string, string> = {
      white: "Bianco",
      natural: "Naturale",
      walnut: "Noce",
      "dark-brown": "Marrone Scuro",
      custom: "Personalizzata",
    };
    return finishes[finish] || finish;
  };

  return (
    <Card className="w-full print:shadow-none print:border-none">
      <CardHeader className="border-b print:border-b-gray-300">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">
              Preventivo #{quote.quote_number}
            </CardTitle>
            <CardDescription>
              Creato il: {formatDate(quote.created_at)}
            </CardDescription>
            <div className="mt-2">
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                  quote.status,
                )}`}
              >
                {getStatusLabel(quote.status)}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold">Preventivi Serramenti</p>
            <p className="text-sm">Via Roma, 123</p>
            <p className="text-sm">Milano, 20100</p>
            <p className="text-sm">info@preventiviSerramenti.it</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Cliente */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Informazioni Cliente</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Nome</p>
                <p>{quote.customer_name || "Cliente non specificato"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p>{quote.customer_email || "--"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Telefono</p>
                <p>{quote.customer_phone || "--"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valido fino al</p>
                <p>{formatDate(quote.valid_until) || "--"}</p>
              </div>
            </div>
          </div>

          {/* Articoli */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Articoli</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Articolo</TableHead>
                  <TableHead>Dettagli</TableHead>
                  <TableHead className="text-right">Prezzo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quoteItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <div>{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Quantità: {item.quantity}
                      </div>
                    </TableCell>
                    <TableCell>
                      <ul className="list-disc list-inside text-sm">
                        {item.width && item.height && (
                          <li>
                            Dimensioni: {item.width} x {item.height} cm
                          </li>
                        )}
                        {item.material && (
                          <li>Materiale: {getMaterialLabel(item.material)}</li>
                        )}
                        {item.finish && (
                          <li>Finitura: {getFinishLabel(item.finish)}</li>
                        )}
                        {item.accessories && item.accessories.length > 0 && (
                          <li>
                            Accessori:
                            <ul className="list-disc list-inside ml-4">
                              {item.accessories.map((acc: any) => (
                                <li key={acc.id}>
                                  {acc.name} - €{acc.price.toFixed(2)}
                                </li>
                              ))}
                            </ul>
                          </li>
                        )}
                      </ul>
                      {item.description && (
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Note: </span>
                          {item.description}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      €{item.total_price.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Totali */}
          <div className="border-t pt-4">
            <div className="flex justify-between text-sm">
              <span>Subtotale</span>
              <span>€{(quote.total_amount || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span>IVA ({quote.tax_rate || 22}%)</span>
              <span>€{(quote.tax_amount || 0).toFixed(2)}</span>
            </div>
            {quote.discount_amount > 0 && (
              <div className="flex justify-between text-sm mt-2">
                <span>Sconto</span>
                <span>-€{quote.discount_amount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold text-lg mt-4">
              <span>Totale</span>
              <span>€{(quote.final_amount || 0).toFixed(2)}</span>
            </div>
          </div>

          {/* Note */}
          {quote.notes && (
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Note</h4>
              <p className="text-sm bg-muted p-3 rounded">{quote.notes}</p>
            </div>
          )}

          <div className="mt-8 text-sm text-muted-foreground">
            <p>Preventivo valido per 30 giorni dalla data di emissione.</p>
            <p className="mt-1">
              Tempi di consegna: 4-6 settimane dall'approvazione.
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-6 print:hidden">
        <Link href="/dashboard/quotes">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Torna ai Preventivi
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" /> Stampa
          </Button>
          <Button onClick={handleDownloadPDF}>
            <Download className="mr-2 h-4 w-4" /> Scarica PDF
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
