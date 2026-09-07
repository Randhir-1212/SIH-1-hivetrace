import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Hexagon, LogIn } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDemoAuth } from "@/lib/demo-auth";
import { DEMO_USERS } from "@/lib/hivetrace";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — HiveTrace" },
      { name: "description", content: "Sign in to the HiveTrace supply chain log with a demo role." },
      { property: "og:title", content: "Sign in — HiveTrace" },
      { property: "og:description", content: "Role-based access to the honey supply chain log." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

const ROLE_ICONS: Record<string, string> = {
  beekeeper: "🧑‍🌾",
  tester: "🧪",
  processing: "⚙️",
  distribution: "📦",
  admin: "🛡️",
};

function AuthPage() {
  const { user, signIn, ready } = useDemoAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && user) navigate({ to: "/log" });
  }, [ready, user, navigate]);

  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center px-4 py-14">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
        <Hexagon className="h-8 w-8" />
      </span>
      <h1 className="font-display mt-5 text-3xl font-bold tracking-tight">Supply Chain Log</h1>
      <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
        Prototype sign-in: pick a demo role to see exactly what that actor in the honey supply
        chain can view and edit. In production this is backed by real accounts and permissions.
      </p>

      <div className="mt-8 grid w-full gap-3 sm:grid-cols-2">
        {DEMO_USERS.map((u) => (
          <Card key={u.id} className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <span className="text-xl">{ROLE_ICONS[u.role]}</span> {u.roleLabel}
              </CardTitle>
              <CardDescription>
                {u.name} · {u.email}
                {u.beekeeperId ? ` · ID ${u.beekeeperId}` : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full gap-2"
                variant="outline"
                onClick={() => {
                  signIn(u.id);
                  navigate({ to: "/log" });
                }}
              >
                <LogIn className="h-4 w-4" /> Continue as {u.name.split(" ")[0]}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
