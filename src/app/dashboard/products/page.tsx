import { DashboardHeader } from "@/components/dashboard-header";
import ProductCatalog from "@/components/product-catalog";

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        heading="Catalogo Prodotti"
        text="Gestisci il tuo catalogo di prodotti e accessori"
      />
      <ProductCatalog />
    </div>
  );
}
