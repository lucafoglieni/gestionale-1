"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { FileText, Grid, Home, Package, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardSidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const routes = [
    {
      label: "Dashboard",
      icon: <Home className="mr-2 h-4 w-4" />,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Catalogo",
      icon: <Package className="mr-2 h-4 w-4" />,
      href: "/dashboard/catalog",
      active: pathname === "/dashboard/catalog",
    },
    {
      label: "Preventivi",
      icon: <FileText className="mr-2 h-4 w-4" />,
      href: "/dashboard/quotes",
      active: pathname === "/dashboard/quotes",
    },
    {
      label: "Clienti",
      icon: <Users className="mr-2 h-4 w-4" />,
      href: "/dashboard/customers",
      active: pathname === "/dashboard/customers",
    },
    {
      label: "Impostazioni",
      icon: <Settings className="mr-2 h-4 w-4" />,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ];

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Gestione Preventivi
          </h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  route.active ? "bg-secondary font-medium" : "font-normal",
                )}
                asChild
              >
                <Link href={route.href}>
                  {route.icon}
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
