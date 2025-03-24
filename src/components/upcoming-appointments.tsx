"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Calendar, Clock, MapPin, User, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UpcomingAppointments() {
  const router = useRouter();

  // Dati di esempio per gli appuntamenti
  const appointments = [
    {
      id: 1,
      client: "Mario Rossi",
      date: "15 Ottobre 2023",
      time: "10:00 - 11:30",
      location: "Via Roma 123, Milano",
      type: "Sopralluogo",
    },
    {
      id: 2,
      client: "Laura Bianchi",
      date: "16 Ottobre 2023",
      time: "14:30 - 15:30",
      location: "Via Garibaldi 45, Roma",
      type: "Installazione",
    },
    {
      id: 3,
      client: "Giuseppe Verdi",
      date: "18 Ottobre 2023",
      time: "09:00 - 10:00",
      location: "Via Dante 67, Firenze",
      type: "Consulenza",
    },
  ];

  return (
    <Card className="hover:border-primary hover:shadow-md transition-all">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Prossimi Appuntamenti</CardTitle>
        <Link
          href="/dashboard/appointments"
          className="text-sm text-blue-600 flex items-center hover:underline"
        >
          Vedi tutti <ArrowUpRight className="ml-1 h-4 w-4" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex flex-col space-y-2 rounded-md border p-4 hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() =>
                router.push(`/dashboard/appointments/${appointment.id}`)
              }
            >
              <div className="font-medium">{appointment.client}</div>
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{appointment.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{appointment.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{appointment.location}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {appointment.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
