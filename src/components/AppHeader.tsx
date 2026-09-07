import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Hexagon, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemoAuth } from "@/lib/demo-auth";

export function AppHeader() {
  const { user, signOut, ready } = useDemoAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const tab = (to: string, label: string) => {
    const active = to === "/" ? pathname === "/" || pathname.startsWith("/trace") : pathname.startsWith(to);
    return (
      <Link
        to={to}
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
          active
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Hexagon className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">HiveTrace</span>
          <span className="hidden rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground sm:inline">
            Honey Chain · SIH 2026
          </span>
        </Link>
        <nav className="order-3 flex w-full gap-1 rounded-full bg-secondary p-1 sm:order-none sm:ml-auto sm:w-auto">
          {tab("/", "Trace a Batch")}
          {tab("/log", "Supply Chain Log")}
        </nav>
        <div className="ml-auto flex items-center gap-2 sm:ml-0">
          {ready && user ? (
            <>
              <span className="hidden text-xs text-muted-foreground md:block">
                {user.name}{user.beekeeperId ? ` (${user.beekeeperId})` : ""} · {user.roleLabel}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5"
                onClick={() => {
                  signOut();
                  navigate({ to: "/auth" });
                }}
              >
                <LogOut className="h-4 w-4" /> Sign out
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={() => navigate({ to: "/auth" })}>
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
