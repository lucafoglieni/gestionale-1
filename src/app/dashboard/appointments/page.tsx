import { DashboardHeader } from "@/components/dashboard-header";
import AppointmentsClientPage from "./client-page";

export default function AppointmentsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <DashboardHeader
          heading="Appuntamenti"
          text="Gestisci i tuoi appuntamenti con i clienti"
        />
      </div>
      <AppointmentsClientPage />
    </div>
  );
}
