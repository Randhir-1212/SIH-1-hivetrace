import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck, MapPin, Hexagon } from "lucide-react";
import QRCode from "react-qr-code";
import { Progress } from "@/components/ui/progress";
import { TraceTimeline } from "@/components/TraceTimeline";
import { IntegrityCheck } from "@/components/IntegrityCheck";
import { STAGES, completedStageCount, loadBatches, type Batch } from "@/lib/hivetrace";

export const Route = createFileRoute("/trace/$batchId")({
  head: ({ params }) => ({
    meta: [
      { title: `Batch ${params.batchId} — HiveTrace` },
      {
        name: "description",
        content: `Verified supply-chain journey for honey batch ${params.batchId}: hive, harvest, lab test, processing, packaging and delivery.`,
      },
      { property: "og:title", content: `Batch ${params.batchId} — HiveTrace` },
      {
        property: "og:description",
        content: "Follow this honey batch across all six verified stages, from hive to jar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async ({ params }) => {
    const batches = await loadBatches().catch(() => []);
    const batch = batches.find((b) => b.id.toUpperCase() === params.batchId.toUpperCase());
    if (!batch) throw notFound();
    return batch;
  },
  component: TracePage,
  notFoundComponent: () => (
    <main className="mx-auto max-w-xl px-4 py-20 text-center">
      <Hexagon className="mx-auto h-10 w-10 text-muted-foreground" />
      <h1 className="font-display mt-4 text-2xl font-bold">Batch not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        We couldn't find that batch code. Check the code on your jar and try again.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        <ArrowLeft className="h-4 w-4" /> Trace another batch
      </Link>
    </main>
  ),
});

function TracePage() {
  // Loader throws notFound() for unknown codes, so this is always a Batch here.
  const batch = Route.useLoaderData() as Batch;
  const done = completedStageCount(batch);
  const total = STAGES.length;
  const full = done === total;
  const traceUrl =
    typeof window !== "undefined" ? `${window.location.origin}/trace/${batch.id}` : `/trace/${batch.id}`;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Trace another batch
      </Link>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Honey batch
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight">{batch.batchNo ?? batch.id}</h1>
          <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Hexagon className="h-4 w-4" /> Hive {batch.hiveId}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {batch.apiaryLocation}
            </span>
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-xl border bg-card p-3 shadow-sm">
          <QRCode value={traceUrl} size={96} fgColor="#3A2313" bgColor="transparent" />
          <span className="text-[10px] text-muted-foreground">Scan to trace</span>
        </div>
      </div>

      <div
        className={`mt-6 flex items-center gap-3 rounded-xl border px-4 py-3 ${
          full ? "border-[#4C7A4B]/30 bg-[#E6EEE1]" : "bg-accent"
        }`}
      >
        {full ? (
          <BadgeCheck className="h-6 w-6 shrink-0 text-[#4C7A4B]" />
        ) : (
          <Hexagon className="h-6 w-6 shrink-0 text-primary" />
        )}
        <div className="flex-1">
          <p className={`text-sm font-semibold ${full ? "text-[#4C7A4B]" : ""}`}>
            {full ? "✓ Fully traced" : `${done} / ${total} stages logged`}
          </p>
          <Progress value={(done / total) * 100} className="mt-2 h-2" />
        </div>
        <span className="font-display text-2xl font-bold">
          {Math.round((done / total) * 100)}%
        </span>
      </div>

      <div className="mt-8">
        <h2 className="font-display mb-4 text-xl font-semibold">Supply-chain journey</h2>
        <TraceTimeline batch={batch} />
      </div>

      <div className="mt-8">
        <IntegrityCheck batch={batch} />
      </div>
    </main>
  );
}
