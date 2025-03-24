"use client";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
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
import { Download, Printer, Edit } from "lucide-react";
import { QuoteData } from "./quote-form";

interface QuotePreviewProps {
  quoteData: QuoteData;
  customerName: string;
  quoteNumber: string;
  date: string;
  onEdit: () => void;
  onPrint: () => void;
  onDownload: () => void;
}

const materialMap: Record<string, string> = {
  aluminum: "Alluminio",
  wood: "Legno",
  pvc: "PVC",
  "wood-aluminum": "Legno-Alluminio",
};

const finishMap: Record<string, string> = {
  white: "Bianco",
  natural: "Naturale",
  walnut: "Noce",
  "dark-brown": "Marrone Scuro",
  custom: "Personalizzata",
};

const productTypeMap: Record<string, string> = {
  window: "Finestra",
  door: "Porta",
  "sliding-door": "Porta Scorrevole",
  "french-window": "Portafinestra",
};

const accessoriesMap: Record<string, string> = {
  none: "Nessuno",
  handle: "Maniglia",
  "mosquito-net": "Zanzariera",
  shutter: "Persiana",
  multiple: "Multipli",
};

export default function QuotePreview({
  quoteData,
  customerName,
  quoteNumber,
  date,
  onEdit,
  onPrint,
  onDownload,
}: QuotePreviewProps) {
  // Calcolo prezzo di esempio
  const basePrice = 100;
  const areaSurcharge = ((quoteData.width * quoteData.height) / 10000) * 200;
  const materialSurcharge =
    quoteData.material === "wood-aluminum"
      ? 150
      : quoteData.material === "wood"
        ? 100
        : 50;
  const accessoriesSurcharge = quoteData.accessories !== "none" ? 75 : 0;

  // Calcolo maggiorazione percentuale
  const percentageSurcharge = quoteData.percentageSurcharge
    ? (basePrice + areaSurcharge + materialSurcharge + accessoriesSurcharge) *
      (quoteData.percentageSurcharge / 100)
    : 0;

  // Calcolo sconto in fattura
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

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="border-b">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">
              Preventivo #{quoteNumber}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Data: {date}</p>
            <p className="text-sm mt-2">Cliente: {customerName}</p>
            {quoteData.orderNumber && (
              <p className="text-sm mt-1">
                Numero d'Ordine: {quoteData.orderNumber}
              </p>
            )}
            {quoteData.technician && (
              <p className="text-sm mt-1">Tecnico: {quoteData.technician}</p>
            )}
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
        <h3 className="font-semibold text-lg mb-4">Dettagli Serramento</h3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descrizione</TableHead>
              <TableHead>Specifiche</TableHead>
              <TableHead className="text-right">Prezzo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                {productTypeMap[quoteData.productType] || quoteData.productType}
              </TableCell>
              <TableCell>
                <ul className="list-disc list-inside text-sm">
                  <li>
                    Dimensioni: {quoteData.width} x {quoteData.height} cm
                  </li>
                  <li>
                    Materiale:{" "}
                    {materialMap[quoteData.material] || quoteData.material}
                  </li>
                  <li>
                    Finitura: {finishMap[quoteData.finish] || quoteData.finish}
                  </li>
                  <li>
                    Accessori:{" "}
                    {accessoriesMap[quoteData.accessories] ||
                      quoteData.accessories}
                  </li>
                </ul>
              </TableCell>
              <TableCell className="text-right">
                € {totalPrice.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Dati Catastali e altre informazioni */}
        <div className="mt-6 border p-4 rounded-md">
          <h3 className="font-semibold mb-3">Informazioni Aggiuntive</h3>

          {quoteData.invoiceObject && (
            <div className="mb-3">
              <h4 className="text-sm font-medium">Oggetto Fattura</h4>
              <p className="text-sm">{quoteData.invoiceObject}</p>
            </div>
          )}

          {quoteData.constructionSite && (
            <div className="mb-3">
              <h4 className="text-sm font-medium">Cantiere</h4>
              <p className="text-sm">{quoteData.constructionSite}</p>
            </div>
          )}

          {quoteData.discountDescription && (
            <div className="mb-3">
              <h4 className="text-sm font-medium">Scontistica</h4>
              <p className="text-sm">{quoteData.discountDescription}</p>
            </div>
          )}

          <h4 className="text-sm font-medium mt-4 mb-2">Dati Catastali</h4>
          <div className="grid grid-cols-3 gap-x-4 gap-y-2 text-sm">
            {quoteData.cadastralData.sheet && (
              <div>
                <span className="font-medium">Foglio:</span>{" "}
                {quoteData.cadastralData.sheet}
              </div>
            )}
            {quoteData.cadastralData.particle && (
              <div>
                <span className="font-medium">Particella:</span>{" "}
                {quoteData.cadastralData.particle}
              </div>
            )}
            {quoteData.cadastralData.cc && (
              <div>
                <span className="font-medium">C.C.:</span>{" "}
                {quoteData.cadastralData.cc}
              </div>
            )}
            {quoteData.cadastralData.urbanSection && (
              <div>
                <span className="font-medium">Sez. Urbana:</span>{" "}
                {quoteData.cadastralData.urbanSection}
              </div>
            )}
            {quoteData.cadastralData.installationZone && (
              <div>
                <span className="font-medium">Zona Posa:</span>{" "}
                {quoteData.cadastralData.installationZone}
              </div>
            )}
            {quoteData.cadastralData.denomination && (
              <div>
                <span className="font-medium">Denominazione:</span>{" "}
                {quoteData.cadastralData.denomination}
              </div>
            )}
          </div>

          {(quoteData.cadastralData.address ||
            quoteData.cadastralData.municipality ||
            quoteData.cadastralData.postalCode) && (
            <div className="mt-2 mb-2">
              <h4 className="text-sm font-medium">Ubicazione</h4>
              <p className="text-sm">
                {quoteData.cadastralData.address}
                {quoteData.cadastralData.address &&
                quoteData.cadastralData.municipality
                  ? ", "
                  : ""}
                {quoteData.cadastralData.municipality}
                {quoteData.cadastralData.municipality &&
                quoteData.cadastralData.postalCode
                  ? " "
                  : ""}
                {quoteData.cadastralData.postalCode}
                {quoteData.cadastralData.floorStaircase && (
                  <span>
                    {" "}
                    - Piano/Scala: {quoteData.cadastralData.floorStaircase}
                  </span>
                )}
              </p>
            </div>
          )}

          {(quoteData.cadastralData.map ||
            quoteData.cadastralData.path ||
            quoteData.cadastralData.changeDestination) && (
            <div className="grid grid-cols-3 gap-x-4 gap-y-2 text-sm mt-2">
              {quoteData.cadastralData.map && (
                <div>
                  <span className="font-medium">Mappa:</span>{" "}
                  {quoteData.cadastralData.map}
                </div>
              )}
              {quoteData.cadastralData.path && (
                <div>
                  <span className="font-medium">Percorso:</span>{" "}
                  {quoteData.cadastralData.path}
                </div>
              )}
              {quoteData.cadastralData.changeDestination && (
                <div>
                  <span className="font-medium">Cambia Destinazione:</span>{" "}
                  {quoteData.cadastralData.changeDestination}
                </div>
              )}
            </div>
          )}

          {(quoteData.cadastralData.actualHours > 0 ||
            quoteData.cadastralData.estimatedHours > 0) && (
            <div className="grid grid-cols-2 gap-4 text-sm mt-2">
              {quoteData.cadastralData.actualHours > 0 && (
                <div>
                  <span className="font-medium">Ore Effettive:</span>{" "}
                  {quoteData.cadastralData.actualHours}
                </div>
              )}
              {quoteData.cadastralData.estimatedHours > 0 && (
                <div>
                  <span className="font-medium">Ore Previste:</span>{" "}
                  {quoteData.cadastralData.estimatedHours}
                </div>
              )}
            </div>
          )}
        </div>

        {quoteData.notes && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Note</h4>
            <p className="text-sm bg-muted p-3 rounded">{quoteData.notes}</p>
          </div>
        )}

        <div className="mt-8 border-t pt-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotale</span>
              <span>
                €{" "}
                {(
                  basePrice +
                  areaSurcharge +
                  materialSurcharge +
                  accessoriesSurcharge
                ).toFixed(2)}
              </span>
            </div>

            {quoteData.percentageSurcharge > 0 && (
              <div className="flex justify-between">
                <span>Maggiorazione ({quoteData.percentageSurcharge}%)</span>
                <span>€ {percentageSurcharge.toFixed(2)}</span>
              </div>
            )}

            {quoteData.invoiceDiscount > 0 && (
              <div className="flex justify-between text-red-500">
                <span>Sconto in Fattura ({quoteData.invoiceDiscount}%)</span>
                <span>-€ {invoiceDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between text-lg font-semibold pt-2 border-t">
              <span>Totale</span>
              <span>€ {totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">IVA inclusa</p>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>Preventivo valido per 30 giorni dalla data di emissione.</p>
          <p className="mt-1">
            Tempi di consegna: 4-6 settimane dall'approvazione.
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="outline" onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" /> Modifica
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onPrint}>
            <Printer className="mr-2 h-4 w-4" /> Stampa
          </Button>
          <Button onClick={onDownload}>
            <Download className="mr-2 h-4 w-4" /> Scarica PDF
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
