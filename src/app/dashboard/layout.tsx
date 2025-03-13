import { DashboardSidebar } from "@/components/dashboard-sidebar";
import DashboardNavbar from "@/components/dashboard-navbar";
import { SubscriptionCheck } from "@/components/subscription-check";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SubscriptionCheck>
      <div className="flex min-h-screen flex-col">
        <DashboardNavbar />
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
            <DashboardSidebar className="border-r py-6 pr-2" />
          </aside>
          <main className="flex w-full flex-col overflow-hidden py-6">
            {children}
          </main>
        </div>
      </div>
    </SubscriptionCheck>
  );
}
