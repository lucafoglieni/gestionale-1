"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import ActivityLog from "@/components/activity-log";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Calendar, Clock, FileText, Package, Phone, User } from "lucide-react";

export default function ActivitiesPage() {
  const [activityType, setActivityType] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  // Dati di esempio per le attività
  const allActivities = [
    {
      id: 1,
      type: "quote",
      description: "Nuovo preventivo creato per Mario Rossi",
      time: "Oggi, 10:30",
      icon: <FileText className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 2,
      type: "client",
      description: "Nuovo cliente aggiunto: Laura Bianchi",
      time: "Oggi, 09:15",
      icon: <User className="h-4 w-4 text-green-500" />,
    },
    {
      id: 3,
      type: "product",
      description: "Prodotto aggiornato: Finestra Standard",
      time: "Ieri, 16:45",
      icon: <Package className="h-4 w-4 text-purple-500" />,
    },
    {
      id: 4,
      type: "appointment",
      description: "Appuntamento fissato con Giuseppe Verdi",
      time: "Ieri, 14:20",
      icon: <Calendar className="h-4 w-4 text-orange-500" />,
    },
    {
      id: 5,
      type: "call",
      description: "Chiamata effettuata a Anna Neri",
      time: "2 giorni fa, 11:10",
      icon: <Phone className="h-4 w-4 text-red-500" />,
    },
    {
      id: 6,
      type: "quote",
      description: "Preventivo modificato per Marco Gialli",
      time: "2 giorni fa, 09:30",
      icon: <FileText className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 7,
      type: "client",
      description: "Dati cliente aggiornati: Francesca Blu",
      time: "3 giorni fa, 15:20",
      icon: <User className="h-4 w-4 text-green-500" />,
    },
    {
      id: 8,
      type: "appointment",
      description: "Appuntamento riprogrammato con Roberto Verdi",
      time: "3 giorni fa, 14:10",
      icon: <Calendar className="h-4 w-4 text-orange-500" />,
    },
    {
      id: 9,
      type: "call",
      description: "Chiamata ricevuta da Claudia Rosa",
      time: "4 giorni fa, 10:45",
      icon: <Phone className="h-4 w-4 text-red-500" />,
    },
    {
      id: 10,
      type: "product",
      description: "Nuovo prodotto aggiunto: Porta Scorrevole Premium",
      time: "5 giorni fa, 11:30",
      icon: <Package className="h-4 w-4 text-purple-500" />,
    },
  ];

  // Filtra le attività in base al tipo e all'intervallo di date
  const filteredActivities = allActivities.filter((activity) => {
    if (activityType !== "all" && activity.type !== activityType) {
      return false;
    }

    // Filtraggio per data semplificato (in un'app reale useremmo date effettive)
    if (dateRange === "today" && !activity.time.includes("Oggi")) {
      return false;
    }
    if (dateRange === "yesterday" && !activity.time.includes("Ieri")) {
      return false;
    }
    if (dateRange === "week" && activity.time.includes("giorni fa")) {
      // Assumiamo che "giorni fa" sia entro la settimana
      const days = parseInt(activity.time.split(" ")[0]);
      if (isNaN(days) || days > 7) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        heading="Registro Attività"
        text="Monitora tutte le attività del tuo account"
      />

      <Card>
        <CardHeader>
          <CardTitle>Filtri</CardTitle>
          <CardDescription>
            Filtra le attività per tipo e periodo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="activityType">Tipo di Attività</Label>
              <Select value={activityType} onValueChange={setActivityType}>
                <SelectTrigger id="activityType">
                  <SelectValue placeholder="Seleziona tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutte le attività</SelectItem>
                  <SelectItem value="quote">Preventivi</SelectItem>
                  <SelectItem value="client">Clienti</SelectItem>
                  <SelectItem value="product">Prodotti</SelectItem>
                  <SelectItem value="appointment">Appuntamenti</SelectItem>
                  <SelectItem value="call">Chiamate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateRange">Periodo</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger id="dateRange">
                  <SelectValue placeholder="Seleziona periodo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutto</SelectItem>
                  <SelectItem value="today">Oggi</SelectItem>
                  <SelectItem value="yesterday">Ieri</SelectItem>
                  <SelectItem value="week">Ultimi 7 giorni</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Attività Recenti</CardTitle>
          <CardDescription>
            {filteredActivities.length} attività trovate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredActivities.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nessuna attività trovata con i filtri selezionati
              </div>
            ) : (
              filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 border rounded-md hover:bg-muted/50 transition-colors"
                >
                  <div className="mt-0.5 rounded-full bg-muted p-1">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
