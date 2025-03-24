"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

export default function DashboardPerformance() {
  const [loading, setLoading] = useState(true);
  const [performanceData, setPerformanceData] = useState({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0,
  });

  useEffect(() => {
    // Simulazione di caricamento dati
    const loadData = () => {
      setLoading(true);
      setTimeout(() => {
        setPerformanceData({
          cpu: Math.floor(Math.random() * 100),
          memory: Math.floor(Math.random() * 100),
          disk: Math.floor(Math.random() * 100),
          network: Math.floor(Math.random() * 100),
        });
        setLoading(false);
      }, 1000);
    };

    loadData();

    // Aggiorna i dati ogni 5 secondi
    const interval = setInterval(loadData, 5000);

    return () => clearInterval(interval);
  }, []);

  const getColorClass = (value: number) => {
    if (value < 50) return "text-green-500";
    if (value < 80) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Sistema</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="cpu">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cpu">CPU</TabsTrigger>
            <TabsTrigger value="memory">Memoria</TabsTrigger>
            <TabsTrigger value="disk">Disco</TabsTrigger>
            <TabsTrigger value="network">Rete</TabsTrigger>
          </TabsList>

          <TabsContent value="cpu" className="mt-4">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Utilizzo CPU</span>
                  <span
                    className={`font-bold ${getColorClass(performanceData.cpu)}`}
                  >
                    {performanceData.cpu}%
                  </span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${performanceData.cpu < 50 ? "bg-green-500" : performanceData.cpu < 80 ? "bg-amber-500" : "bg-red-500"}`}
                    style={{ width: `${performanceData.cpu}%` }}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  {performanceData.cpu < 50
                    ? "Utilizzo CPU ottimale"
                    : performanceData.cpu < 80
                      ? "Utilizzo CPU moderato"
                      : "Utilizzo CPU elevato"}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="memory" className="mt-4">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Utilizzo Memoria</span>
                  <span
                    className={`font-bold ${getColorClass(performanceData.memory)}`}
                  >
                    {performanceData.memory}%
                  </span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${performanceData.memory < 50 ? "bg-green-500" : performanceData.memory < 80 ? "bg-amber-500" : "bg-red-500"}`}
                    style={{ width: `${performanceData.memory}%` }}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  {performanceData.memory < 50
                    ? "Utilizzo memoria ottimale"
                    : performanceData.memory < 80
                      ? "Utilizzo memoria moderato"
                      : "Utilizzo memoria elevato"}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="disk" className="mt-4">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Utilizzo Disco</span>
                  <span
                    className={`font-bold ${getColorClass(performanceData.disk)}`}
                  >
                    {performanceData.disk}%
                  </span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${performanceData.disk < 50 ? "bg-green-500" : performanceData.disk < 80 ? "bg-amber-500" : "bg-red-500"}`}
                    style={{ width: `${performanceData.disk}%` }}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  {performanceData.disk < 50
                    ? "Spazio disco disponibile"
                    : performanceData.disk < 80
                      ? "Spazio disco limitato"
                      : "Spazio disco quasi esaurito"}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="network" className="mt-4">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Utilizzo Rete</span>
                  <span
                    className={`font-bold ${getColorClass(performanceData.network)}`}
                  >
                    {performanceData.network}%
                  </span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${performanceData.network < 50 ? "bg-green-500" : performanceData.network < 80 ? "bg-amber-500" : "bg-red-500"}`}
                    style={{ width: `${performanceData.network}%` }}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  {performanceData.network < 50
                    ? "Utilizzo rete ottimale"
                    : performanceData.network < 80
                      ? "Utilizzo rete moderato"
                      : "Utilizzo rete elevato"}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
