"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import ManageSubscription from "@/components/manage-subscription";
import ManualSubscriptionAdd from "@/components/manual-subscription-add";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Package, Users, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/supabase/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardStats from "@/components/dashboard-stats";
import ClientFilter from "@/components/client-filter";
import WorkStatusChart from "@/components/work-status-chart";
import ClientStatusChart from "@/components/client-status-chart";
import UpcomingAppointments from "@/components/upcoming-appointments";
import ActivityLog from "@/components/activity-log";
import SalesSummary from "@/components/sales-summary";
import DashboardPerformance from "@/components/dashboard-performance";
import { useDebounce } from "@/hooks/use-debounce";
import { memoryCache } from "@/lib/cache-utils";
import { throttle } from "@/lib/performance-utils";

export default function Dashboard() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [subscriptionUrl, setSubscriptionUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/sign-in");
          return;
        }

        setUser(user);

        // Get subscription management URL
        const { data } = await supabase.functions.invoke(
          "supabase-functions-get-subscription-url",
          {
            body: { userId: user.id },
          },
        );

        if (data?.url) {
          setSubscriptionUrl(data.url);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    }

    fetchUserData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  const recentQuotes = [
    {
      id: "Q-2023-001",
      customer: "Mario Rossi",
      date: "15/05/2023",
      status: "Approvato",
      amount: "€1,250.00",
    },
    {
      id: "Q-2023-002",
      customer: "Laura Bianchi",
      date: "18/05/2023",
      status: "In attesa",
      amount: "€2,340.00",
    },
    {
      id: "Q-2023-003",
      customer: "Giuseppe Verdi",
      date: "20/05/2023",
      status: "Approvato",
      amount: "€980.00",
    },
    {
      id: "Q-2023-004",
      customer: "Anna Neri",
      date: "22/05/2023",
      status: "Rifiutato",
      amount: "€1,780.00",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <DashboardHeader
          heading="Dashboard"
          text={`Benvenuto, ${user?.user_metadata?.full_name || user?.email}`}
        />
        {subscriptionUrl && (
          <ManageSubscription redirectUrl={subscriptionUrl} />
        )}
      </div>

      {/* Temporary subscription fix - only visible in development */}
      {process.env.NODE_ENV !== "production" && user && (
        <ManualSubscriptionAdd userId={user.id} />
      )}

      {/* Stats Cards */}
      <DashboardStats />

      {/* Client Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Filtra Clienti</CardTitle>
          <CardDescription>Cerca e filtra i tuoi clienti</CardDescription>
        </CardHeader>
        <CardContent>
          <ClientFilter />
        </CardContent>
      </Card>

      {/* Performance Monitoring */}
      <DashboardPerformance />

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <WorkStatusChart />
        <ClientStatusChart />
      </div>

      {/* Recent Quotes */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Preventivi Recenti</CardTitle>
            <Link
              href="/dashboard/quotes"
              className="text-sm text-blue-600 flex items-center hover:underline"
            >
              Vedi tutti <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <CardDescription>I tuoi preventivi più recenti</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-sm text-muted-foreground">
                  <th className="text-left font-medium p-2 pl-0">ID</th>
                  <th className="text-left font-medium p-2">Cliente</th>
                  <th className="text-left font-medium p-2">Data</th>
                  <th className="text-left font-medium p-2">Stato</th>
                  <th className="text-right font-medium p-2 pr-0">Importo</th>
                </tr>
              </thead>
              <tbody>
                {recentQuotes.map((quote) => (
                  <tr
                    key={quote.id}
                    className="border-b last:border-0 hover:bg-muted/50"
                  >
                    <td className="p-2 pl-0">
                      <Link
                        href={`/dashboard/quotes/${quote.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {quote.id}
                      </Link>
                    </td>
                    <td className="p-2">{quote.customer}</td>
                    <td className="p-2">{quote.date}</td>
                    <td className="p-2">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${quote.status === "Approvato" ? "bg-green-100 text-green-800" : quote.status === "Rifiutato" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}
                      >
                        {quote.status}
                      </span>
                    </td>
                    <td className="p-2 pr-0 text-right font-medium">
                      {quote.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Activity and Appointments Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <ActivityLog />
        <UpcomingAppointments />
      </div>

      {/* Sales Summary */}
      <SalesSummary />

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Azioni Rapide</CardTitle>
          <CardDescription>
            Accedi velocemente alle funzioni principali
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Link href="/dashboard/quotes/create">
            <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <FileText className="h-8 w-8 text-blue-500 mb-2" />
              <span className="text-sm font-medium">Nuovo Preventivo</span>
            </div>
          </Link>
          <Link href="/dashboard/catalog">
            <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <Package className="h-8 w-8 text-green-500 mb-2" />
              <span className="text-sm font-medium">Gestisci Catalogo</span>
            </div>
          </Link>
          <Link href="/dashboard/customers/new">
            <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <Users className="h-8 w-8 text-purple-500 mb-2" />
              <span className="text-sm font-medium">Nuovo Cliente</span>
            </div>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
