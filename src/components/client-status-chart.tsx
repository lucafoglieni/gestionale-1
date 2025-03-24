"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ClientStatusChart() {
  // Dati di esempio per lo stato dei clienti
  const clientStatus = [
    { status: "Attivi", count: 8, color: "bg-green-500" },
    { status: "Potenziali", count: 15, color: "bg-blue-500" },
    { status: "Inattivi", count: 5, color: "bg-gray-500" },
    { status: "Fidelizzati", count: 4, color: "bg-purple-500" },
  ];

  const total = clientStatus.reduce((acc, item) => acc + item.count, 0);

  return (
    <Link
      href="/dashboard/customers"
      className="block transition-transform hover:scale-[1.01]"
    >
      <Card className="cursor-pointer hover:border-primary hover:shadow-md transition-all">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Stato Clientela</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <div className="relative h-40 w-40">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                {clientStatus.map((item, i) => {
                  const percentage = (item.count / total) * 100;
                  // Calcola l'angolo di inizio per ogni segmento
                  let startAngle = clientStatus
                    .slice(0, i)
                    .reduce((acc, curr) => acc + (curr.count / total) * 360, 0);
                  let endAngle = startAngle + (percentage * 360) / 100;

                  // Converti gli angoli in coordinate per l'arco SVG
                  const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                  const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                  const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                  const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);

                  // Flag per determinare se l'arco è maggiore di 180 gradi
                  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

                  return (
                    <path
                      key={i}
                      d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      fill={item.color.replace("bg-", "var(--").concat("-500)")}
                      stroke="white"
                      strokeWidth="1"
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {clientStatus.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
                <div className="flex-1 text-sm">
                  <div className="font-medium">{item.status}</div>
                  <div className="text-muted-foreground">
                    {Math.round((item.count / total) * 100)}% ({item.count})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
