import Navbar from "@/components/navbar";
import PricingCard from "@/components/pricing-card";
import Footer from "@/components/footer";
import { createClient } from "../../supabase/server";
import {
  ArrowUpRight,
  CheckCircle2,
  LayoutGrid,
  Ruler,
  Palette,
  FileText,
} from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: plans, error } = await supabase.functions.invoke(
    "supabase-functions-get-plans",
  );

  const result = plans?.items;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 opacity-70" />

        <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
                Gestionale{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                  Preventivi
                </span>{" "}
                Serramenti
              </h1>

              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Crea preventivi professionali per serramenti e accessori in modo
                semplice e veloce. Gestisci il tuo catalogo e offri ai tuoi
                clienti un servizio di qualità.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-8 py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
                >
                  Inizia Subito
                  <ArrowUpRight className="ml-2 w-5 h-5" />
                </Link>

                <Link
                  href="#pricing"
                  className="inline-flex items-center px-8 py-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-lg font-medium"
                >
                  Vedi i Piani
                </Link>
              </div>

              <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Facile da usare</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Preventivi professionali</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Esportazione in PDF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Funzionalità Principali</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tutto ciò di cui hai bisogno per gestire i tuoi preventivi in
              un'unica piattaforma.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <LayoutGrid className="w-6 h-6" />,
                title: "Catalogo Completo",
                description:
                  "Gestisci serramenti e accessori in categorie personalizzate",
              },
              {
                icon: <Ruler className="w-6 h-6" />,
                title: "Configurazione Precisa",
                description: "Personalizza dimensioni, materiali e finiture",
              },
              {
                icon: <Palette className="w-6 h-6" />,
                title: "Personalizzazione",
                description: "Aggiungi accessori e opzioni per ogni serramento",
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: "Preventivi Professionali",
                description: "Genera ed esporta preventivi in PDF",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Preventivi Generati</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-blue-100">Clienti Soddisfatti</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Tipi di Serramenti</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Come Funziona</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Crea preventivi professionali in pochi semplici passaggi.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-6 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Seleziona i Prodotti
              </h3>
              <p className="text-gray-600">
                Scegli dal catalogo i serramenti e gli accessori che desideri
                includere nel preventivo.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-6 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalizza</h3>
              <p className="text-gray-600">
                Configura dimensioni, materiali, finiture e aggiungi accessori
                opzionali.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-6 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Genera Preventivo</h3>
              <p className="text-gray-600">
                Visualizza l'anteprima, apporta modifiche se necessario ed
                esporta il preventivo in PDF.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gray-50" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Piani e Prezzi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Scegli il piano più adatto alle tue esigenze. Nessun costo
              nascosto.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {result?.map((item: any) => (
              <PricingCard key={item.id} item={item} user={user} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto a Iniziare?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Unisciti a centinaia di aziende che utilizzano il nostro sistema per
            creare preventivi professionali.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Inizia Ora
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
