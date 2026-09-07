import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Hexagon, QrCode, Search, ShieldCheck, Link2, Boxes } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loadBatches } from "@/lib/hivetrace";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trace a Batch — HiveTrace" },
      {
        name: "description",
        content:
          "Enter a honey batch code or scan a jar's QR code to see its full verified journey from hive to shelf.",
      },
      { property: "og:title", content: "Trace a Batch — HiveTrace" },
      {
        property: "og:description",
        content: "Every jar of honey, traced from hive to jar on a tamper-evident ledger.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: () => loadBatches().catch(() => []),
  component: TraceSearch,
});

function TraceSearch() {
  const batches = Route.useLoaderData();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const trace = (raw: string) => {
    const id = raw.trim().toUpperCase();
    if (!id) return;
    const found = batches.find((b) => b.id.toUpperCase() === id);
    if (found) {
      setError("");
      navigate({ to: "/trace/$batchId", params: { batchId: found.id } });
    } else {
      setError(`No batch found for "${id}". Try one of the demo batches below.`);
    }
  };

  return (
    <main className="honeycomb-bg">
      <section className="mx-auto max-w-5xl px-4 pb-16 pt-14 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
          <Hexagon className="h-9 w-9" />
        </div>
        <h1 className="font-display mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          Know exactly where
          <br />
          your honey comes from
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Every jar carries a batch code. Trace it across all six stages — hive, harvest, lab,
          processing, packaging and delivery — on a tamper-evident ledger no one can quietly edit.
        </p>

        <form
          className="mx-auto mt-8 flex max-w-md gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            trace(code);
          }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter batch code, e.g. HC1025"
              className="h-12 bg-card pl-9 text-base"
              aria-label="Batch code"
            />
          </div>
          <Button type="submit" size="lg" className="h-12 px-6">
            Trace
          </Button>
        </form>
        {error && (
          <p className="mx-auto mt-3 max-w-md rounded-lg bg-[#F3E2DE] px-3 py-2 text-sm text-[#B0463A]">
            {error}
          </p>
        )}
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <QrCode className="h-3.5 w-3.5" /> Scanning a jar's QR code opens this trace automatically.
        </p>

        <div className="mx-auto mt-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Try a demo batch
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {batches.map((b) => (
              <button
                key={b.id}
                onClick={() => trace(b.id)}
                className="rounded-full border bg-card px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent"
              >
                {b.batchNo ?? b.id} · {b.apiaryLocation}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-card/60">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 py-12 sm:grid-cols-3">
          {[
            {
              icon: Link2,
              title: "Hash-chained records",
              body: "Each supply-chain entry links to the one before it. Alter history and the chain breaks — visibly.",
            },
            {
              icon: Boxes,
              title: "Six stages, one journey",
              body: "Beekeeper, harvesting, testing, processing, packaging, distribution — each logged by the right role.",
            },
            {
              icon: ShieldCheck,
              title: "Anyone can verify",
              body: "No login needed to trace a batch. Consumers check authenticity straight from the QR on the jar.",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border bg-card p-5 shadow-sm">
              <f.icon className="h-6 w-6 text-primary" />
              <h2 className="font-display mt-3 text-lg font-semibold">{f.title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
