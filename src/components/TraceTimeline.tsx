import { Check, Clock, Lock } from "lucide-react";
import {
  STAGES,
  STAGE_META,
  latestRecord,
  stageComplete,
  shortHash,
  formatDate,
  type Batch,
  type ChainRecord,
} from "@/lib/hivetrace";

export function TraceTimeline({ batch }: { batch: Batch }) {
  return (
    <ol className="relative space-y-0">
      {STAGE_META.map((meta, i) => {
        const stage = meta.key;
        const complete = stageComplete(batch, stage);
        const record = latestRecord(batch, stage);
        const partial = !complete && record;
        const isLast = i === STAGES.length - 1;
        return (
          <li key={stage} className="relative flex gap-4 pb-6 last:pb-0">
            {/* connector line */}
            {!isLast && (
              <span
                aria-hidden
                className={`absolute left-[19px] top-10 h-[calc(100%-2.5rem)] w-0.5 ${
                  complete ? "bg-[#4C7A4B]/50" : "bg-border"
                }`}
              />
            )}
            <div
              className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-lg ${
                complete
                  ? "border-[#4C7A4B]/40 bg-[#E6EEE1] text-[#4C7A4B]"
                  : partial
                    ? "border-primary/40 bg-accent"
                    : "border-border bg-muted text-muted-foreground"
              }`}
            >
              {complete ? <Check className="h-5 w-5" /> : meta.icon}
            </div>
            <div className="flex-1 rounded-xl border bg-card p-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-base font-semibold">
                  {meta.icon} {meta.label}
                </h3>
                {complete ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#E6EEE1] px-2.5 py-0.5 text-xs font-medium text-[#4C7A4B]">
                    <Check className="h-3 w-3" /> Complete
                  </span>
                ) : partial ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                    <Clock className="h-3 w-3" /> In progress
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    <Lock className="h-3 w-3" /> Not yet recorded
                  </span>
                )}
              </div>
              {record ? (
                <>
                  <dl className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                    {meta.fields.map((f) => (
                      <div key={f.key} className="flex flex-col">
                        <dt className="text-xs text-muted-foreground">{f.label}</dt>
                        <dd className="text-sm font-medium">
                          {record.data[f.key] || "—"}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t pt-2 text-xs text-muted-foreground">
                    <span>Logged by {record.createdBy}</span>
                    <span>{formatDate(record.createdAt)}</span>
                    <span className="font-mono" title={record.hash}>
                      ⛓ {shortHash(record.hash)}
                    </span>
                  </div>
                </>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">
                  Awaiting entry from {meta.editableByLabel}.
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
