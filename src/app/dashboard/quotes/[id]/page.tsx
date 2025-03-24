import { DashboardHeader } from "@/components/dashboard-header";
import QuoteDetail from "@/components/quote-detail";

export default function QuoteDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader
        heading="Dettaglio Preventivo"
        text="Visualizza i dettagli del preventivo"
      />
      <QuoteDetail quoteId={params.id} />
    </div>
  );
}
