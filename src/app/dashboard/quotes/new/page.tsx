"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import QuoteForm, { QuoteData } from "@/components/quote-form";
import QuotePreview from "@/components/quote-preview";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NewQuotePage() {
  const [activeTab, setActiveTab] = useState("form");
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);

  const handleFormSubmit = (data: QuoteData) => {
    setQuoteData(data);
    setActiveTab("preview");
  };

  const handleCancel = () => {
    // Redirect back to quotes page
  };

  const handleEdit = () => {
    setActiveTab("form");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Logic to download as PDF
    alert("Funzionalità di download PDF in implementazione");
  };

  // Generate a random quote number and current date
  const quoteNumber = `Q-${new Date().getFullYear()}-${Math.floor(
    Math.random() * 1000,
  )
    .toString()
    .padStart(3, "0")}`;
  const currentDate = new Date().toLocaleDateString("it-IT");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <DashboardHeader
          heading="Nuovo Preventivo"
          text="Crea un nuovo preventivo per un cliente"
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
            <QuotePreview
              quoteData={quoteData}
              customerName="Cliente di Esempio"
              quoteNumber={quoteNumber}
              date={currentDate}
              onEdit={handleEdit}
              onPrint={handlePrint}
              onDownload={handleDownload}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
