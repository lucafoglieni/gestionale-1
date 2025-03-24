"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  FileText,
  Package,
  Users,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function DashboardStats() {
  // Dati di esempio per la dashboard
  const stats = [
    {
      title: "Preventivi Totali",
      value: "24",
      icon: <FileText className="h-5 w-5 text-blue-500" />,
      href: "/dashboard/quotes",
    },
    {
      title: "Prodotti in Catalogo",
      value: "48",
      icon: <Package className="h-5 w-5 text-green-500" />,
      href: "/dashboard/catalog",
    },
    {
      title: "Clienti",
      value: "12",
      icon: <Users className="h-5 w-5 text-purple-500" />,
      href: "/dashboard/customers",
    },
    {
      title: "Appuntamenti",
      value: "8",
      icon: <Calendar className="h-5 w-5 text-orange-500" />,
      href: "/dashboard/appointments",
    },
    {
      title: "Lavori Completati",
      value: "18",
      icon: <CheckCircle className="h-5 w-5 text-emerald-500" />,
      href: "/dashboard/work-status",
    },
    {
      title: "Lavori in Corso",
      value: "6",
      icon: <Clock className="h-5 w-5 text-amber-500" />,
      href: "/dashboard/work-status",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat, i) => (
        <Link
          key={i}
          href={stat.href}
          className="block transition-transform hover:scale-105"
        >
          <Card className="cursor-pointer hover:border-primary hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
