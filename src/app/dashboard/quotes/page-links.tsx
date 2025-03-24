"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function QuotePageLinks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Preventivo Standard</CardTitle>
          <CardDescription>
            Crea un preventivo selezionando prodotti dal catalogo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Seleziona prodotti dal catalogo, configura dimensioni e accessori, e
            genera un preventivo standard.
          </p>
          <Link href="/dashboard/quotes/create">
            <Button className="w-full flex items-center justify-center gap-2">
              Crea Preventivo Standard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preventivo Avanzato</CardTitle>
          <CardDescription>
            Crea un preventivo dettagliato con dati catastali e specifiche
            tecniche
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Configura un serramento con dimensioni, materiali, finiture e dati
            catastali completi.
          </p>
          <Link href="/dashboard/quotes/advanced">
            <Button className="w-full flex items-center justify-center gap-2">
              Crea Preventivo Avanzato
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
