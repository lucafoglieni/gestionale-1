"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, Plus, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Textarea } from "@/components/ui/textarea";
import UpcomingAppointments from "@/components/upcoming-appointments";

export function AppointmentsContent() {
  const [appointmentType, setAppointmentType] = useState("all");
  const [showNewAppointmentForm, setShowNewAppointmentForm] = useState(false);

  // Dati di esempio per gli appuntamenti
  const appointments = [
    {
      id: 1,
      client: "Mario Rossi",
      date: "15 Ottobre 2023",
      time: "10:00 - 11:30",
      location: "Via Roma 123, Milano",
      type: "Sopralluogo",
      notes: "Verificare misure finestre soggiorno",
    },
    {
      id: 2,
      client: "Laura Bianchi",
      date: "16 Ottobre 2023",
      time: "14:30 - 15:30",
      location: "Via Garibaldi 45, Roma",
      type: "Installazione",
      notes: "Installazione porte interne",
    },
    {
      id: 3,
      client: "Giuseppe Verdi",
      date: "18 Ottobre 2023",
      time: "09:00 - 10:00",
      location: "Via Dante 67, Firenze",
      type: "Consulenza",
      notes: "Consulenza per sostituzione serramenti",
    },
    {
      id: 4,
      client: "Anna Neri",
      date: "20 Ottobre 2023",
      time: "11:00 - 12:00",
      location: "Via Mazzini 89, Torino",
      type: "Sopralluogo",
      notes: "Verificare misure finestre bagno",
    },
    {
      id: 5,
      client: "Marco Gialli",
      date: "22 Ottobre 2023",
      time: "15:00 - 16:00",
      location: "Via Cavour 12, Bologna",
      type: "Installazione",
      notes: "Installazione porta d'ingresso",
    },
    {
      id: 6,
      client: "Francesca Blu",
      date: "25 Ottobre 2023",
      time: "10:30 - 11:30",
      location: "Via Vittorio Emanuele 34, Napoli",
      type: "Manutenzione",
      notes: "Manutenzione serramenti esistenti",
    },
  ];

  // Filtra gli appuntamenti in base al tipo
  const filteredAppointments =
    appointmentType === "all"
      ? appointments
      : appointments.filter(
          (app) => app.type.toLowerCase() === appointmentType,
        );

  // Handler functions
  const handleNewAppointmentClick = () => {
    setShowNewAppointmentForm(true);
    // Scroll to the form
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleCancelClick = () => {
    setShowNewAppointmentForm(false);
  };

  const handleSaveClick = () => {
    // Here you would typically save the appointment to your database
    console.log("Appuntamento salvato");
    setShowNewAppointmentForm(false);

    // Show a success message (in a real app, you'd use a toast notification)
    alert("Appuntamento salvato con successo!");
  };

  const handleAppointmentTypeChange = (value) => {
    setAppointmentType(value);
  };

  return (
    <>
      <div className="flex justify-end">
        <Button
          onClick={handleNewAppointmentClick}
          className="bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="mr-2 h-4 w-4" /> Nuovo Appuntamento
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtri</CardTitle>
          <CardDescription>Filtra gli appuntamenti per tipo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="appointmentType">Tipo di Appuntamento</Label>
              <Select
                value={appointmentType}
                onValueChange={handleAppointmentTypeChange}
              >
                <SelectTrigger id="appointmentType">
                  <SelectValue placeholder="Seleziona tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tutti i tipi</SelectItem>
                  <SelectItem value="sopralluogo">Sopralluogo</SelectItem>
                  <SelectItem value="installazione">Installazione</SelectItem>
                  <SelectItem value="consulenza">Consulenza</SelectItem>
                  <SelectItem value="manutenzione">Manutenzione</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UpcomingAppointments />

        <Card>
          <CardHeader>
            <CardTitle>Appuntamenti Filtrati</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex flex-col space-y-2 rounded-md border p-4 hover:bg-muted/50 transition-colors"
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
                    <div className="mt-2">
                      <p className="text-sm italic">{appointment.notes}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {showNewAppointmentForm && (
        <Card>
          <CardHeader>
            <CardTitle>Nuovo Appuntamento</CardTitle>
            <CardDescription>
              Inserisci i dettagli del nuovo appuntamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client">Cliente</Label>
                <Select>
                  <SelectTrigger id="client">
                    <SelectValue placeholder="Seleziona cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mario">Mario Rossi</SelectItem>
                    <SelectItem value="laura">Laura Bianchi</SelectItem>
                    <SelectItem value="giuseppe">Giuseppe Verdi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipo di Appuntamento</Label>
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Seleziona tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sopralluogo">Sopralluogo</SelectItem>
                    <SelectItem value="installazione">Installazione</SelectItem>
                    <SelectItem value="consulenza">Consulenza</SelectItem>
                    <SelectItem value="manutenzione">Manutenzione</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input type="date" id="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Orario</Label>
                <Input type="time" id="time" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Durata (minuti)</Label>
                <Input type="number" id="duration" placeholder="60" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Luogo</Label>
                <Input id="location" placeholder="Indirizzo completo" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Note</Label>
                <Textarea
                  id="notes"
                  placeholder="Inserisci eventuali note sull'appuntamento"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleCancelClick}>
              Annulla
            </Button>
            <Button onClick={handleSaveClick}>Salva Appuntamento</Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
