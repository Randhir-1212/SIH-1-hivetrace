import { useState } from "react";
import { ShieldCheck, ShieldAlert, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { verifyChain, type Batch, type VerifyResult } from "@/lib/hivetrace";

export function IntegrityCheck({ batch }: { batch: Batch }) {
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [checking, setChecking] = useState(false);

  const run = async () => {
    setChecking(true);
    // Small delay so the verification feels like a real check in the demo
    const res = await verifyChain(batch);
    await new Promise((r) => setTimeout(r, 450));
    setResult(res);
    setChecking(false);
  };

  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-base font-semibold">Tamper-evident ledger</h3>
          <p className="text-sm text-muted-foreground">
            Every stage entry is hash-chained to the previous one — editing history breaks the chain.
          </p>
        </div>
        <Button onClick={run} disabled={checking} variant="outline" className="gap-2">
          {checking ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
          Verify integrity
        </Button>
      </div>
      {result && (
        <div
          className={`mt-3 flex items-start gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${
            result.intact
              ? "bg-[#E6EEE1] text-[#4C7A4B]"
              : "bg-[#F3E2DE] text-[#B0463A]"
          }`}
        >
          {result.intact ? (
            <>
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                Chain intact — {result.checked} record{result.checked === 1 ? "" : "s"} verified.
                No entry has been altered or deleted.
              </span>
            </>
          ) : (
            <>
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                Chain broken at stage "{result.brokenAt?.stage}" — this record does not match its
                stored hash. Possible tampering detected.
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
