import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";

interface DashboardHeaderProps {
  heading: string;
  text?: string;
  buttonLabel?: string;
  buttonAction?: () => void;
}

export function DashboardHeader({
  heading,
  text,
  buttonLabel,
  buttonAction,
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {buttonLabel && (
        <Button onClick={buttonAction} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          {buttonLabel}
        </Button>
      )}
    </div>
  );
}
