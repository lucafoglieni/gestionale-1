"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function WorkStatusChart() {
  // Dati di esempio per lo stato dei lavori
  const workStatus = [
    { status: "Completati", count: 18, color: "bg-emerald-500" },
    { status: "In Corso", count: 6, color: "bg-amber-500" },
    { status: "In Attesa", count: 4, color: "bg-blue-500" },
    { status: "Problematici", count: 2, color: "bg-red-500" },
  ];

  const total = workStatus.reduce((acc, item) => acc + item.count, 0);

  return (
    <Link
      href="/dashboard/work-status"
      className="block transition-transform hover:scale-[1.01]"
    >
      <Card className="cursor-pointer hover:border-primary hover:shadow-md transition-all">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Stato Lavori</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workStatus.map((item, index) => {
              const percentage = Math.round((item.count / total) * 100);
              return (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{item.status}</span>
                    <span className="font-medium">
                      {item.count} ({percentage}%)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
