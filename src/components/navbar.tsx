import Link from "next/link";
import { createClient } from "../../supabase/server";
import { Button } from "./ui/button";
import { FileText, UserCircle } from "lucide-react";
import UserProfile from "./user-profile";

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          href="/"
          prefetch
          className="text-xl font-bold text-blue-600 flex items-center"
        >
          <FileText className="mr-2" />
          <span>Preventivi Serramenti</span>
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link
            href="/#features"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Funzionalità
          </Link>
          <Link
            href="/#how-it-works"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Come Funziona
          </Link>
          <Link
            href="/#pricing"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Prezzi
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <Button>Dashboard</Button>
              </Link>
              <UserProfile />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Accedi
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Registrati
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
