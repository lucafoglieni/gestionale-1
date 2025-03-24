"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function SalesSummary() {
  // Dati di esempio per il riepilogo vendite
  const monthlySales = [
    { month: "Gen", amount: 12500 },
    { month: "Feb", amount: 15800 },
    { month: "Mar", amount: 18200 },
    { month: "Apr", amount: 16500 },
    { month: "Mag", amount: 21000 },
    { month: "Giu", amount: 19800 },
    { month: "Lug", amount: 22500 },
    { month: "Ago", amount: 17800 },
    { month: "Set", amount: 24200 },
    { month: "Ott", amount: 26500 },
    { month: "Nov", amount: 28000 },
    { month: "Dic", amount: 32500 },
  ];

  const maxAmount = Math.max(...monthlySales.map((item) => item.amount));

  // Calcola il totale annuale
  const annualTotal = monthlySales.reduce((acc, item) => acc + item.amount, 0);

  // Calcola la media mensile
  const monthlyAverage = annualTotal / monthlySales.length;

  return (
    <Link
      href="/dashboard/statistics"
      className="block transition-transform hover:scale-[1.01]"
    >
      <Card className="cursor-pointer hover:border-primary hover:shadow-md transition-all">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Riepilogo Vendite</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Totale Annuale</p>
                <p className="text-2xl font-bold">
                  €{annualTotal.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Media Mensile</p>
                <p className="text-2xl font-bold">
                  €{Math.round(monthlyAverage).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex h-40 items-end gap-2">
                {monthlySales.map((item, index) => {
                  const height = (item.amount / maxAmount) * 100;
                  return (
                    <div
                      key={index}
                      className="flex flex-1 flex-col items-center"
                    >
                      <div
                        className="w-full rounded-t bg-primary"
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="mt-1 text-xs">{item.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
