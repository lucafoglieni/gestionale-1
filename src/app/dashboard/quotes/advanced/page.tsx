"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import QuoteForm, { QuoteData } from "@/components/quote-form";
import QuotePreview from "@/components/quote-preview";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/supabase/client";
import { useToast } from "@/components/ui/use-toast.ts";
import { useRouter } from "next/navigation";

export default function AdvancedQuotePage() {
  const [activeTab, setActiveTab] = useState("form");
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [savingQuote, setSavingQuote] = useState(false);
  const [customerName, setCustomerName] = useState("Cliente di Esempio");

  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  // Generate a random quote number and current date
  const quoteNumber = `Q-${new Date().getFullYear()}-${Math.floor(
    Math.random() * 1000,
  )
    .toString()
    .padStart(3, "0")}`;
  const currentDate = new Date().toLocaleDateString("it-IT");

  const handleFormSubmit = (data: QuoteData) => {
    setQuoteData(data);
    setActiveTab("preview");
  };

  const handleCancel = () => {
    router.push("/dashboard/quotes");
  };

  const handleEdit = () => {
    setActiveTab("form");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Logic to download as PDF
    toast({
      title: "Informazione",
      description: "Funzionalità di download PDF in implementazione",
    });
  };

  const handleSaveQuote = async () => {
    if (!quoteData) {
      toast({
        title: "Errore",
        description: "Dati del preventivo mancanti",
        variant: "destructive",
      });
      return;
    }

    setSavingQuote(true);

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Utente non autenticato");

      // Calculate price (simplified example)
      const basePrice = 100;
      const areaSurcharge =
        ((quoteData.width * quoteData.height) / 10000) * 200;
      const materialSurcharge =
        quoteData.material === "wood-aluminum"
          ? 150
          : quoteData.material === "wood"
            ? 100
            : 50;
      const accessoriesSurcharge = quoteData.accessories !== "none" ? 75 : 0;

      // Calculate percentage surcharge
      const percentageSurcharge = quoteData.percentageSurcharge
        ? (basePrice +
            areaSurcharge +
            materialSurcharge +
            accessoriesSurcharge) *
          (quoteData.percentageSurcharge / 100)
        : 0;

      // Calculate invoice discount
      const invoiceDiscount = quoteData.invoiceDiscount
        ? (basePrice +
            areaSurcharge +
            materialSurcharge +
            accessoriesSurcharge +
            percentageSurcharge) *
          (quoteData.invoiceDiscount / 100)
        : 0;

      const totalPrice =
        basePrice +
        areaSurcharge +
        materialSurcharge +
        accessoriesSurcharge +
        percentageSurcharge -
        invoiceDiscount;

      // Create quote
      const { data: quoteData_, error: quoteError } = await supabase
        .from("quotes")
        .insert({
          quote_number: quoteNumber,
          user_id: user.id,
          status: "draft",
          notes: quoteData.notes,
          total_amount: totalPrice,
          tax_rate: 22, // Default IVA
          tax_amount: totalPrice * 0.22,
          final_amount: totalPrice * 1.22,
          valid_until: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000,
          ).toISOString(), // 30 days from now
          customer_name: customerName,
          customer_email: "",
          customer_phone: "",
          metadata: {
            productType: quoteData.productType,
            width: quoteData.width,
            height: quoteData.height,
            material: quoteData.material,
            finish: quoteData.finish,
            accessories: quoteData.accessories,
            technician: quoteData.technician,
            percentageSurcharge: quoteData.percentageSurcharge,
            discountDescription: quoteData.discountDescription,
            invoiceDiscount: quoteData.invoiceDiscount,
            constructionSite: quoteData.constructionSite,
            orderNumber: quoteData.orderNumber,
            invoiceObject: quoteData.invoiceObject,
            cadastralData: quoteData.cadastralData,
          },
        })
        .select();

      if (quoteError) throw quoteError;

      toast({
        title: "Preventivo salvato",
        description: `Preventivo ${quoteNumber} creato con successo`,
      });

      // Redirect to quotes list
      router.push("/dashboard/quotes");
    } catch (error: any) {
      console.error("Error saving quote:", error);
      toast({
        title: "Errore",
        description: error.message || "Impossibile salvare il preventivo",
        variant: "destructive",
      });
    } finally {
      setSavingQuote(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <DashboardHeader
          heading="Preventivo Avanzato"
          text="Crea un preventivo dettagliato con dati catastali e specifiche tecniche"
        />
        <Link href="/dashboard/quotes">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Torna ai Preventivi
          </Button>
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="form">Configurazione</TabsTrigger>
          <TabsTrigger value="preview" disabled={!quoteData}>
            Anteprima
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="mt-6">
          <QuoteForm onSubmit={handleFormSubmit} onCancel={handleCancel} />
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          {quoteData && (
            <div className="space-y-6">
              <QuotePreview
                quoteData={quoteData}
                customerName={customerName}
                quoteNumber={quoteNumber}
                date={currentDate}
                onEdit={handleEdit}
                onPrint={handlePrint}
                onDownload={handleDownload}
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleSaveQuote}
                  disabled={savingQuote}
                  className="ml-auto"
                >
                  {savingQuote ? "Salvataggio..." : "Salva Preventivo"}
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
