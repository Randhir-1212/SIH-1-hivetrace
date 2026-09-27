import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { C as BadgeCheck, g as Hexagon, p as Lock, u as MapPin, v as Clock, w as ArrowLeft, x as Check } from "./_libs/lucide-react.mjs";
import { c as completedStageCount, d as formatDate, f as latestRecord, g as stageComplete, h as shortHash, i as STAGE_META, r as STAGES } from "./_ssr/button-BTEn-cEJ.mjs";
import { t as Route } from "./_batchId-Dg0e1Z3k.mjs";
import { n as Progress, t as IntegrityCheck } from "./_ssr/IntegrityCheck-Evw5dvq4.mjs";
import { t as QRCode } from "./_libs/react-qr-code.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_batchId-BgCj4vHh.js
var import_jsx_runtime = require_jsx_runtime();
function TraceTimeline({ batch }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "relative space-y-0",
		children: STAGE_META.map((meta, i) => {
			const stage = meta.key;
			const complete = stageComplete(batch, stage);
			const record = latestRecord(batch, stage);
			const partial = !complete && record;
			const isLast = i === STAGES.length - 1;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "relative flex gap-4 pb-6 last:pb-0",
				children: [
					!isLast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: `absolute left-[19px] top-10 h-[calc(100%-2.5rem)] w-0.5 ${complete ? "bg-[#4C7A4B]/50" : "bg-border"}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-lg ${complete ? "border-[#4C7A4B]/40 bg-[#E6EEE1] text-[#4C7A4B]" : partial ? "border-primary/40 bg-accent" : "border-border bg-muted text-muted-foreground"}`,
						children: complete ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5" }) : meta.icon
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 rounded-xl border bg-card p-4 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-display text-base font-semibold",
								children: [
									meta.icon,
									" ",
									meta.label
								]
							}), complete ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 rounded-full bg-[#E6EEE1] px-2.5 py-0.5 text-xs font-medium text-[#4C7A4B]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }), " Complete"]
							}) : partial ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), " In progress"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3 w-3" }), " Not yet recorded"]
							})]
						}), record ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
							className: "mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2",
							children: meta.fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted-foreground",
									children: f.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-sm font-medium",
									children: record.data[f.key] || "—"
								})]
							}, f.key))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t pt-2 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Logged by ", record.createdBy] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDate(record.createdAt) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono",
									title: record.hash,
									children: ["⛓ ", shortHash(record.hash)]
								})
							]
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: [
								"Awaiting entry from ",
								meta.editableByLabel,
								"."
							]
						})]
					})
				]
			}, stage);
		})
	});
}
function TracePage() {
	const batch = Route.useLoaderData();
	const done = completedStageCount(batch);
	const total = STAGES.length;
	const full = done === total;
	const traceUrl = typeof window !== "undefined" ? `${window.location.origin}/trace/${batch.id}` : `/trace/${batch.id}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Trace another batch"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: "Honey batch"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl font-bold tracking-tight",
						children: batch.batchNo ?? batch.id
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hexagon, { className: "h-4 w-4" }),
								" Hive ",
								batch.hiveId
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }),
								" ",
								batch.apiaryLocation
							]
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-2 rounded-xl border bg-card p-3 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QRCode, {
						value: traceUrl,
						size: 96,
						fgColor: "#3A2313",
						bgColor: "transparent"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] text-muted-foreground",
						children: "Scan to trace"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `mt-6 flex items-center gap-3 rounded-xl border px-4 py-3 ${full ? "border-[#4C7A4B]/30 bg-[#E6EEE1]" : "bg-accent"}`,
				children: [
					full ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-6 w-6 shrink-0 text-[#4C7A4B]" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hexagon, { className: "h-6 w-6 shrink-0 text-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `text-sm font-semibold ${full ? "text-[#4C7A4B]" : ""}`,
							children: full ? "✓ Fully traced" : `${done} / ${total} stages logged`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: done / total * 100,
							className: "mt-2 h-2"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display text-2xl font-bold",
						children: [Math.round(done / total * 100), "%"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mb-4 text-xl font-semibold",
					children: "Supply-chain journey"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TraceTimeline, { batch })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntegrityCheck, { batch })
			})
		]
	});
}
//#endregion
export { TracePage as component };
