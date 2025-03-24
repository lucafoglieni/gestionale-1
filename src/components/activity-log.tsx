"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  FileText,
  User,
  Package,
  Calendar,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ActivityLog() {
  const router = useRouter();

  // Dati di esempio per le attività recenti
  const activities = [
    {
      id: 1,
      type: "quote",
      description: "Nuovo preventivo creato per Mario Rossi",
      time: "Oggi, 10:30",
      icon: <FileText className="h-4 w-4 text-blue-500" />,
      href: "/dashboard/quotes/Q-2023-001",
    },
    {
      id: 2,
      type: "client",
      description: "Nuovo cliente aggiunto: Laura Bianchi",
      time: "Oggi, 09:15",
      icon: <User className="h-4 w-4 text-green-500" />,
      href: "/dashboard/customers",
    },
    {
      id: 3,
      type: "product",
      description: "Prodotto aggiornato: Finestra Standard",
      time: "Ieri, 16:45",
      icon: <Package className="h-4 w-4 text-purple-500" />,
      href: "/dashboard/catalog",
    },
    {
      id: 4,
      type: "appointment",
      description: "Appuntamento fissato con Giuseppe Verdi",
      time: "Ieri, 14:20",
      icon: <Calendar className="h-4 w-4 text-orange-500" />,
      href: "/dashboard/appointments",
    },
    {
      id: 5,
      type: "call",
      description: "Chiamata effettuata a Anna Neri",
      time: "2 giorni fa, 11:10",
      icon: <Phone className="h-4 w-4 text-red-500" />,
      href: "/dashboard/customers",
    },
  ];

  return (
    <Card className="hover:border-primary hover:shadow-md transition-all">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Registro Attività</CardTitle>
        <Link
          href="/dashboard/activities"
          className="text-sm text-blue-600 flex items-center hover:underline"
        >
          Vedi tutte <ArrowUpRight className="ml-1 h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
              onClick={() => router.push(activity.href)}
            >
              <div className="mt-0.5 rounded-full bg-muted p-1">
                {activity.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
