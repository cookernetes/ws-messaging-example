import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function BaseCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex flex-col space-y-1.5",
        className,
      )}
    >
      {children}
    </div>
  );
}
