"use client";

import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

interface DashboardHeaderProps {
  heading: string;
  text?: string;
  buttonLabel?: string;
  buttonAction?: string | (() => void);
  className?: string;
}

export function DashboardHeader({
  heading,
  text,
  buttonLabel,
  buttonAction,
  className,
}: DashboardHeaderProps) {
  return (
    <div
      className={`flex items-center justify-between px-2 ${className || ""}`}
    >
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {buttonLabel &&
        buttonAction &&
        (typeof buttonAction === "string" ? (
          <Button asChild className="flex items-center gap-2">
            <Link href={buttonAction}>
              <PlusCircle className="h-4 w-4" />
              {buttonLabel}
            </Link>
          </Button>
        ) : (
          <Button onClick={buttonAction} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            {buttonLabel}
          </Button>
        ))}
    </div>
  );
}
