import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import QRCode from "react-qr-code";
import { toast } from "sonner";
import {
  Check,
  CloudOff,
  Loader2,
  Lock,
  Plus,
  RefreshCw,
  Save,
  Truck,

} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDemoAuth } from "@/lib/demo-auth";
import { IntegrityCheck } from "@/components/IntegrityCheck";
import {
  STAGES,
  STAGE_META,
  completedStageCount,
  computeRecordHash,
  loadBatches,
  shortHash,
  stageComplete,
  assignBatchNo,
  appendChainRecord,
  createBatchRow,
  loadArrivals,
  confirmArrival,

  type Batch,
  type ChainRecord,
  type StageKey,
} from "@/lib/hivetrace";

export const Route = createFileRoute("/log")({
  head: () => ({
    meta: [
      { title: "Supply Chain Log — HiveTrace" },
      {
        name: "description",
        content:
          "Role-based supply chain log: beekeepers, labs, processing and distribution each record their stage on a tamper-evident ledger.",
      },
      { property: "og:title", content: "Supply Chain Log — HiveTrace" },
      {
        property: "og:description",
        content: "Append-only, role-gated stage logging for honey batches.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LogPage,
});

const QUEUE_KEY = "hivetrace-pending-sync";

interface QueuedEntry {
  batchId: string;
  stage: StageKey;
  data: Record<string, string>;
  createdBy: string;
  createdAt: string;
}

function readQueue(): QueuedEntry[] {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) ?? "[]");
  } catch {
    return [];
  }
}


/** Index of the first stage that still needs an entry. */
function nextStageIndex(batch: Batch): number {
  const i = STAGES.findIndex((s) => !stageComplete(batch, s));
  return i === -1 ? STAGES.length : i;
}


function LogPage() {
  const { user, ready } = useDemoAuth();
  const navigate = useNavigate();
  const [batches, setBatches] = useState<Batch[] | null>(null);
  const [selectedId, setSelectedId] = useState<string>("");
  const [pending, setPending] = useState<QueuedEntry[]>([]);
  const [arrivals, setArrivals] = useState<Record<string, string>>({});
  const [online, setOnline] = useState(true);

  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (ready && !user) navigate({ to: "/auth" });
  }, [ready, user, navigate]);

  useEffect(() => {
    loadBatches()
      .then((b) => {
        setBatches(b);
        setSelectedId((prev) => prev || b[0]?.id || "");
      })
      .catch(() => {
        setBatches([]);
        toast.error("Couldn't load batches from the database.");
      });
    loadArrivals().then(setArrivals).catch(() => setArrivals({}));
    setPending(readQueue());

    setOnline(navigator.onLine);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  // Beekeepers work on fresh batches; every later role only sees batches that
  // finished harvesting and therefore carry a generated batch number.
  const visibleBatches = useMemo(() => {
    if (!batches) return [];
    return user?.role === "beekeeper" ? batches : batches.filter((b) => !!b.batchNo);
  }, [batches, user?.role]);

  // Keep the selection inside the list this role is allowed to work on.
  useEffect(() => {
    if (visibleBatches.length === 0) return;
    if (!visibleBatches.some((b) => b.id === selectedId)) {
      setSelectedId(visibleBatches[0]!.id);
    }
  }, [visibleBatches, selectedId]);

  const batch = useMemo(
    () => visibleBatches.find((b) => b.id === selectedId) ?? null,
    [visibleBatches, selectedId],
  );

  // Stages this role is responsible for — used to split batches into
  // requested / completed / history lists.
  const roleStages = useMemo(
    () => STAGE_META.filter((m) => m.editableBy.includes((user?.role ?? "admin") as never)).map((m) => m.key),
    [user?.role],
  );

  const historyBatches = useMemo(
    () => visibleBatches.filter((b) => completedStageCount(b) === STAGES.length),
    [visibleBatches],
  );

  const openBatches = useMemo(
    () => visibleBatches.filter((b) => completedStageCount(b) < STAGES.length),
    [visibleBatches],
  );

  const completedByRole = useMemo(
    () =>
      roleStages.length === 0
        ? []
        : openBatches.filter((b) => roleStages.every((s) => stageComplete(b, s))),
    [openBatches, roleStages],
  );

  const requestedBatches = useMemo(
    () =>
      roleStages.length === 0
        ? openBatches
        : openBatches.filter((b) => {
            const next = STAGES[nextStageIndex(b)];
            return !!next && roleStages.includes(next);
          }),
    [openBatches, roleStages],
  );


  const appendRecord = async (targetBatch: Batch, entry: QueuedEntry): Promise<Batch> => {
    const record = await appendChainRecord(targetBatch, entry);
    return { ...targetBatch, records: [...targetBatch.records, record] };
  };

  // Once harvesting is complete, the database generates + stores the batch number.
  useEffect(() => {
    if (!batches) return;
    const pendingBatches = batches.filter((b) => stageComplete(b, "harvesting") && !b.batchNo);
    if (pendingBatches.length === 0) return;
    (async () => {
      const assigned = new Map<string, string>();
      for (const b of pendingBatches) {
        try {
          const no = await assignBatchNo(b);
          if (no) assigned.set(b.uuid, no);
        } catch {
          /* ignore — retried on next load */
        }
      }
      if (assigned.size > 0) {
        setBatches((prev) =>
          (prev ?? []).map((b) => (assigned.has(b.uuid) ? { ...b, batchNo: assigned.get(b.uuid)! } : b)),
        );
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batches]);

  // Auto-sync queued entries when back online

  useEffect(() => {
    if (!online || pending.length === 0 || !batches || syncing) return;
    setSyncing(true);
    (async () => {
      let current = batches;
      for (const entry of pending) {
        current = await Promise.all(
          current.map(async (b) => (b.id === entry.batchId ? appendRecord(b, entry) : b)),
        );
      }
      setBatches([...current]);
      setPending([]);
      localStorage.removeItem(QUEUE_KEY);
      toast.success(`Synced ${pending.length} offline entr${pending.length === 1 ? "y" : "ies"}.`);
      setSyncing(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [online]);

  if (!ready || !user || !batches) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </main>
    );
  }

  const canCreateBatch = user.role === "beekeeper";

  const handleSave = async (stage: StageKey, data: Record<string, string>) => {
    if (!batch) return;
    const entry: QueuedEntry = {
      batchId: batch.id,
      stage,
      data,
      createdBy: user.name,
      createdAt: new Date().toISOString(),
    };
    if (!online) {
      const q = [...pending, entry];
      setPending(q);
      localStorage.setItem(QUEUE_KEY, JSON.stringify(q));
      toast.info("You're offline — entry queued and will sync automatically.");
      return;
    }
    try {
      const updated = await appendRecord(batch, entry);
      setBatches(batches.map((b) => (b.id === batch.id ? updated : b)));
      toast.success("Saved — appended to the batch ledger.", {
        description: `Hash ${shortHash(updated.records.at(-1)!.hash)}`,
      });
    } catch {
      toast.error("Couldn't save this entry to the database.");
    }
  };

  const handleDelivered = async (stage: StageKey) => {
    if (!batch) return;
    try {
      const at = await confirmArrival(batch, stage, user.name);
      setArrivals({ ...arrivals, [`${batch.id}:${stage}`]: at });
      toast.success("Arrival confirmed — you can now record this stage.");
    } catch {
      toast.error("Couldn't save the arrival confirmation.");
    }
  };


  const handleCreateBatch = async (hiveId: string, location: string) => {
    try {
      const nb = await createBatchRow(hiveId, location, user.name);
      setBatches([...batches, nb]);
      setSelectedId(nb.id);
      toast.success(`Batch ${nb.id} created.`);
    } catch {
      toast.error("Couldn't create the batch.");
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Supply Chain Log</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Signed in as <span className="font-medium text-foreground">
              {user.name}
              {user.beekeeperId ? ` (${user.beekeeperId})` : ""}
            </span>{" "}
            ·{" "}
            {user.roleLabel}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {pending.length > 0 && (
            <Badge variant="secondary" className="gap-1.5 bg-accent text-accent-foreground">
              <CloudOff className="h-3.5 w-3.5" />
              {pending.length} pending sync
            </Badge>
          )}
          {syncing && (
            <Badge variant="secondary" className="gap-1.5">
              <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Syncing…
            </Badge>
          )}
          {!online && (
            <Badge variant="secondary" className="gap-1.5 bg-[#F3E2DE] text-[#B0463A]">
              <CloudOff className="h-3.5 w-3.5" /> Offline
            </Badge>
          )}
        </div>
      </div>

      {/* Batch selectors: requested · completed · history */}
      <div className={`mt-6 grid gap-3 ${user.role === "admin" ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
        <BatchSelect
          label="Requested"
          hint="Awaiting your entry"
          batches={requestedBatches}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        {user.role !== "admin" && (
          <BatchSelect
            label="Completed"
            hint="Your stage is done"
            batches={completedByRole}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        )}
        <BatchSelect
          label="History"
          hint="All stages complete"
          batches={historyBatches}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>

      {canCreateBatch && (
        <div className="mt-3">
          <NewBatchDialog onCreate={handleCreateBatch} />
        </div>
      )}

      {visibleBatches.length === 0 && (
        <p className="mt-6 rounded-xl border bg-card p-4 text-sm text-muted-foreground shadow-sm">
          No harvested batches yet. A batch appears here with its batch number once the beekeeper
          completes harvesting.
        </p>
      )}


      {batch && (
        <>
          <BatchProgress batch={batch} />
          <StageAccordion
            key={batch.id}
            batch={batch}
            role={user.role}
            onSave={handleSave}
            arrivals={arrivals}
            onDelivered={handleDelivered}
            batchNo={batch.batchNo ?? undefined}

          />

          <div className="mt-6">
            <IntegrityCheck batch={batch} />
          </div>
        </>
      )}
    </main>
  );
}

function BatchSelect({
  label,
  hint,
  batches,
  selectedId,
  onSelect,
}: {
  label: string;
  hint: string;
  batches: Batch[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const value = batches.some((b) => b.id === selectedId) ? selectedId : "";
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">
        {label} <span className="text-muted-foreground">({batches.length})</span>
      </Label>
      <Select value={value} onValueChange={onSelect} disabled={batches.length === 0}>
        <SelectTrigger className="bg-card">
          <SelectValue placeholder={batches.length === 0 ? "None" : "Select a batch"} />
        </SelectTrigger>
        <SelectContent>
          {batches.map((b) => (
            <SelectItem key={b.id} value={b.id}>
              {b.batchNo ?? b.id} · {b.apiaryLocation}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-[11px] text-muted-foreground">{hint}</p>
    </div>
  );
}

function BatchProgress({ batch }: { batch: Batch }) {

  const done = completedStageCount(batch);
  const total = STAGES.length;
  return (
    <div className="mt-4 rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">
          Batch {batch.batchNo ?? batch.id} — {done} of {total} stages complete
        </span>
        <span className="font-display text-lg font-bold">{Math.round((done / total) * 100)}%</span>
      </div>
      <Progress value={(done / total) * 100} className="mt-2 h-2" />
    </div>
  );
}

function StageAccordion({
  batch,
  role,
  onSave,
  arrivals,
  onDelivered,
  batchNo,
}: {
  batch: Batch;
  role: string;
  onSave: (stage: StageKey, data: Record<string, string>) => Promise<void>;
  arrivals: Record<string, string>;
  onDelivered: (stage: StageKey) => void;
  batchNo?: string | undefined;
}) {

  const traceUrl =
    typeof window !== "undefined" ? `${window.location.origin}/trace/${batch.id}` : `/trace/${batch.id}`;
  const nextIdx = nextStageIndex(batch);
  return (
    <Accordion type="multiple" className="mt-6 space-y-3" defaultValue={[STAGES[Math.min(nextIdx, STAGES.length - 1)] as string]}>
      {STAGE_META.map((meta, idx) => {
        const complete = stageComplete(batch, meta.key);
        const canEdit = meta.editableBy.includes(role as never);
        const latest = batch.records.filter((r) => r.stage === meta.key && !r.superseded).at(-1);
        const isNext = idx === nextIdx;
        const arrivedAt = arrivals[`${batch.id}:${meta.key}`];
        // Stage 1 starts at the apiary — nothing has to "arrive" first.
        // The beekeeper performs both the beekeeper and harvesting stages on-site,
        // so no delivery handoff is needed between those two stages.
        // Distribution is the final stage, so it opens directly for entry.
        const beekeeperOwnsBothStages = role === "beekeeper" && (meta.key === "beekeeper" || meta.key === "harvesting");
        const needsArrival = isNext && idx > 0 && !arrivedAt && !beekeeperOwnsBothStages && meta.key !== "distribution";
        const upcoming = !complete && idx > nextIdx;
        const delivered = arrivedAt && !complete;
        const status = complete
          ? "Complete"
          : delivered
            ? canEdit
              ? "Delivered — awaiting entry"
              : "Delivered"
            : needsArrival
              ? "Pending — awaiting arrival"
              : isNext
                ? canEdit
                  ? meta.key === "harvesting"
                    ? "Ready for harvest entry"
                    : "Arrived · awaiting entry"
                  : "View only"
                : upcoming
                  ? "Not started"
                  : canEdit
                    ? "Awaiting entry"
                    : "View only";
        return (
          <AccordionItem
            key={meta.key}
            value={meta.key}
            className="rounded-xl border bg-card px-4 shadow-sm"
          >
            <AccordionTrigger className="hover:no-underline">
              <span className="flex items-center gap-3 text-left">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-base ${
                    complete || delivered ? "bg-[#E6EEE1]" : needsArrival ? "bg-accent" : "bg-muted"
                  }`}
                >
                  {complete || delivered ? <Check className="h-4 w-4 text-[#4C7A4B]" /> : meta.icon}
                </span>
                <span>
                  <span className="font-display block font-semibold">{meta.label}</span>
                  <span className="block text-xs font-normal text-muted-foreground">{status}</span>
                </span>
              </span>
              {delivered && (
                <span className="ml-auto mr-2">
                  <Badge variant="secondary" className="gap-1 bg-[#E6EEE1] text-[#4C7A4B]">
                    <Check className="h-3.5 w-3.5" /> Delivered
                  </Badge>
                </span>
              )}
              {needsArrival && (
                <span className="ml-auto mr-2">
                  <Badge variant="secondary" className="gap-1 bg-accent text-accent-foreground">
                    <Truck className="h-3.5 w-3.5" /> Pending
                  </Badge>
                </span>
              )}
              {!delivered && !needsArrival && !canEdit && (
                <span className="ml-auto mr-2">
                  <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
                </span>
              )}
            </AccordionTrigger>
            <AccordionContent>
              {meta.key === "testing" && batchNo && (
                <div className="mb-3 rounded-lg border bg-background p-3">
                  <p className="text-xs text-muted-foreground">
                    Auto-generated batch number (created at harvest)
                  </p>
                  <p className="mt-0.5 font-mono text-sm font-semibold">{batchNo}</p>
                </div>
              )}

              {needsArrival ? (
                <div className="rounded-lg border border-dashed bg-background p-4">
                  <p className="text-sm font-medium">Handoff requested from the previous stage</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Batch {batch.batchNo ?? batch.id} is on its way.
                  </p>
                  {canEdit ? (
                    <Button className="mt-3 gap-2" onClick={() => onDelivered(meta.key)}>
                      <Truck className="h-4 w-4" /> Mark as delivered
                    </Button>
                  ) : (
                    <p className="mt-3 text-xs text-muted-foreground">
                      Waiting for {meta.editableByLabel} to confirm arrival.
                    </p>
                  )}
                </div>
              ) : delivered && !canEdit ? (
                <div className="rounded-lg border border-dashed bg-background p-4">
                  <p className="text-sm font-medium">Delivered to {meta.editableByLabel}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Arrival confirmed. Entry will be recorded by {meta.editableByLabel}.
                  </p>
                </div>
              ) : canEdit && !complete ? (
                <>
                  {arrivedAt && !complete && (
                    <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#E6EEE1] px-2.5 py-0.5 text-xs font-medium text-[#4C7A4B]">
                      <Check className="h-3 w-3" /> Delivery confirmed
                    </p>
                  )}
                  <StageForm
                    meta={meta}
                    defaults={latest?.data ?? {}}
                    onSave={onSave}
                    showQr={meta.key === "packaging"}
                    traceUrl={traceUrl}
                  />
                </>
              ) : (
                <div>
                  {latest ? (
                    <>
                      {complete && (
                        <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#E6EEE1] px-2.5 py-0.5 text-xs font-medium text-[#4C7A4B]">
                          <Check className="h-3 w-3" /> Entry recorded
                        </p>
                      )}
                      <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                        {meta.fields.map((f) => (
                          <div key={f.key}>
                            <dt className="text-xs text-muted-foreground">{f.label}</dt>
                            <dd className="text-sm font-medium">{latest.data[f.key] || "—"}</dd>
                          </div>
                        ))}
                      </dl>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">No entry recorded yet.</p>
                  )}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}


function StageForm({
  meta,
  defaults,
  onSave,
  showQr,
  traceUrl,
}: {
  meta: (typeof STAGE_META)[number];
  defaults: Record<string, string>;
  onSave: (stage: StageKey, data: Record<string, string>) => Promise<void>;
  showQr?: boolean;
  traceUrl: string;
}) {
  const { user: currentUser } = useDemoAuth();
  const [values, setValues] = useState<Record<string, string>>(() => ({
    ...(meta.key === "beekeeper" && currentUser?.beekeeperId
      ? { beekeeperId: currentUser.beekeeperId, beekeeperName: currentUser.name }
      : {}),
    ...defaults,
  }));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(meta.key, values);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {meta.fields.map((f) => (
          <div key={f.key} className="space-y-1.5">
            <Label htmlFor={`${meta.key}-${f.key}`} className="text-xs">
              {f.label}
            </Label>
            <Input
              id={`${meta.key}-${f.key}`}
              value={values[f.key] ?? ""}
              placeholder={f.placeholder}
              onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
              className="bg-background"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={saving} className="gap-2">
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : saved ? (
            <Check className="h-4 w-4" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saved ? "Saved" : "Save entry"}
        </Button>
        <p className="text-xs text-muted-foreground">
          Corrections are appended as new entries — past records stay visible in the ledger.
        </p>
      </div>
      {showQr && (
        <div className="flex items-center gap-4 rounded-lg border bg-background p-3">
          <div className="rounded-md bg-white p-2">
            <QRCode value={traceUrl} size={88} fgColor="#3A2313" />
          </div>
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground">Jar label QR code</p>
            <p className="mt-1 break-all font-mono">{traceUrl}</p>
            <p className="mt-1">Print on the jar — scanning opens this batch's public trace.</p>
          </div>
        </div>
      )}
    </form>
  );
}

function NewBatchDialog({
  onCreate,
}: {
  onCreate: (hiveId: string, location: string) => void | Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [hiveId, setHiveId] = useState("");
  const [location, setLocation] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Plus className="h-4 w-4" /> New batch
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display">Create a new batch</DialogTitle>
          <DialogDescription>
            The batch ID is generated automatically. The QR code and ledger start from this moment.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="nb-hive">Hive ID</Label>
            <Input id="nb-hive" placeholder="H-021" value={hiveId} onChange={(e) => setHiveId(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="nb-loc">Apiary location</Label>
            <Input
              id="nb-loc"
              placeholder="Village, district, state"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={!hiveId.trim() || !location.trim()}
            onClick={() => {
              onCreate(hiveId.trim(), location.trim());
              setOpen(false);
              setHiveId("");
              setLocation("");
            }}
          >
            Create batch
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
