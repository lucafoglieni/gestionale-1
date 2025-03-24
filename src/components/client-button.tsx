"use client";

import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface ClientButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
}

export function ClientButton({
  onClick,
  children,
  variant,
}: ClientButtonProps) {
  return (
    <Button onClick={onClick} variant={variant}>
      {children}
    </Button>
  );
}
