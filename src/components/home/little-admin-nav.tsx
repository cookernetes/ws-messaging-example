import { Routes, type RoutesKey } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LittleAdminNav() {
  return (
    <nav className={"flex flex-col items-start"}>
      {Object.keys(Routes)
        .filter(
          (r) =>
            typeof Routes[r as RoutesKey] !== "function" &&
            (Routes[r as RoutesKey] as string) !== "/",
        )
        .map((r, idx) => (
          <Button key={idx} role={"link"} variant={"link"} asChild>
            <Link href={Routes[r as RoutesKey] as string} className={"capitalize"}>
              Go To: {r}
            </Link>
          </Button>
        ))}
    </nav>
  );
}
