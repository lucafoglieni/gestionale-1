"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function SettingsPage() {
  const [companyInfo, setCompanyInfo] = useState({
    name: "Preventivi Serramenti",
    email: "info@preventiviSerramenti.it",
    phone: "+39 123 456 7890",
    address: "Via Roma, 123, Milano, 20100",
    vatNumber: "IT12345678901",
    website: "www.preventiviSerramenti.it",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    automaticPriceCalculation: true,
    defaultVat: 22,
    defaultCurrency: "EUR",
    pdfFooterText: "Grazie per aver scelto Preventivi Serramenti",
  });

  const handleCompanyInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setCompanyInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreferencesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setPreferences((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        heading="Impostazioni"
        text="Gestisci le impostazioni del tuo account"
      />

      <Tabs defaultValue="company" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="company">Informazioni Azienda</TabsTrigger>
          <TabsTrigger value="preferences">Preferenze</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Informazioni Azienda</CardTitle>
              <CardDescription>
                Queste informazioni appariranno sui preventivi e sulle fatture
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Azienda</Label>
                <Input
                  id="name"
                  name="name"
                  value={companyInfo.name}
                  onChange={handleCompanyInfoChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={companyInfo.email}
                    onChange={handleCompanyInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefono</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={companyInfo.phone}
                    onChange={handleCompanyInfoChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Indirizzo</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={companyInfo.address}
                  onChange={handleCompanyInfoChange}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vatNumber">Partita IVA</Label>
                  <Input
                    id="vatNumber"
                    name="vatNumber"
                    value={companyInfo.vatNumber}
                    onChange={handleCompanyInfoChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Sito Web</Label>
                  <Input
                    id="website"
                    name="website"
                    value={companyInfo.website}
                    onChange={handleCompanyInfoChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salva Modifiche</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferenze</CardTitle>
              <CardDescription>
                Personalizza il comportamento dell'applicazione
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">Notifiche Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Ricevi notifiche via email quando viene creato un nuovo
                    preventivo
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={preferences.emailNotifications}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("emailNotifications", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="automaticPriceCalculation">
                    Calcolo Automatico Prezzi
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Calcola automaticamente i prezzi in base alle dimensioni e
                    ai materiali
                  </p>
                </div>
                <Switch
                  id="automaticPriceCalculation"
                  checked={preferences.automaticPriceCalculation}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("automaticPriceCalculation", checked)
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultVat">IVA Predefinita (%)</Label>
                  <Input
                    id="defaultVat"
                    name="defaultVat"
                    type="number"
                    value={preferences.defaultVat}
                    onChange={handlePreferencesChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultCurrency">Valuta Predefinita</Label>
                  <Input
                    id="defaultCurrency"
                    name="defaultCurrency"
                    value={preferences.defaultCurrency}
                    onChange={handlePreferencesChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pdfFooterText">Testo Piè di Pagina PDF</Label>
                <Textarea
                  id="pdfFooterText"
                  name="pdfFooterText"
                  value={preferences.pdfFooterText}
                  onChange={handlePreferencesChange}
                  rows={2}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salva Preferenze</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Impostazioni Account</CardTitle>
              <CardDescription>
                Gestisci le impostazioni del tuo account utente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Password Attuale</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="Inserisci la password attuale"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nuova Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Inserisci la nuova password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Conferma Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Conferma la nuova password"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                Elimina Account
              </Button>
              <Button>Aggiorna Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
