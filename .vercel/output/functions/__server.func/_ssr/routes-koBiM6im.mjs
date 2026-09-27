import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { S as Boxes, a as Search, c as QrCode, g as Hexagon, h as Link2, r as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-BTEn-cEJ.mjs";
import { t as Input } from "./input-DoV2uPrF.mjs";
import { t as Route } from "./routes-BbA8hQOL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-koBiM6im.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TraceSearch() {
	const batches = Route.useLoaderData();
	const navigate = useNavigate();
	const [code, setCode] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const trace = (raw) => {
		const id = raw.trim().toUpperCase();
		if (!id) return;
		const found = batches.find((b) => b.id.toUpperCase() === id);
		if (found) {
			setError("");
			navigate({
				to: "/trace/$batchId",
				params: { batchId: found.id }
			});
		} else setError(`No batch found for "${id}". Try one of the demo batches below.`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "honeycomb-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-5xl px-4 pb-16 pt-14 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hexagon, { className: "h-9 w-9" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display mt-6 text-4xl font-bold tracking-tight sm:text-5xl",
					children: [
						"Know exactly where",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"your honey comes from"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-4 max-w-xl text-muted-foreground",
					children: "Every jar carries a batch code. Trace it across all six stages — hive, harvest, lab, processing, packaging and delivery — on a tamper-evident ledger no one can quietly edit."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mx-auto mt-8 flex max-w-md gap-2",
					onSubmit: (e) => {
						e.preventDefault();
						trace(code);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: code,
							onChange: (e) => setCode(e.target.value),
							placeholder: "Enter batch code, e.g. HC1025",
							className: "h-12 bg-card pl-9 text-base",
							"aria-label": "Batch code"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "lg",
						className: "h-12 px-6",
						children: "Trace"
					})]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-3 max-w-md rounded-lg bg-[#F3E2DE] px-3 py-2 text-sm text-[#B0463A]",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "h-3.5 w-3.5" }), " Scanning a jar's QR code opens this trace automatically."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto mt-10 max-w-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: "Try a demo batch"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap justify-center gap-2",
						children: batches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => trace(b.id),
							className: "rounded-full border bg-card px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent",
							children: [
								b.batchNo ?? b.id,
								" · ",
								b.apiaryLocation
							]
						}, b.id))
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-t bg-card/60",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-5xl gap-6 px-4 py-12 sm:grid-cols-3",
				children: [
					{
						icon: Link2,
						title: "Hash-chained records",
						body: "Each supply-chain entry links to the one before it. Alter history and the chain breaks — visibly."
					},
					{
						icon: Boxes,
						title: "Six stages, one journey",
						body: "Beekeeper, harvesting, testing, processing, packaging, distribution — each logged by the right role."
					},
					{
						icon: ShieldCheck,
						title: "Anyone can verify",
						body: "No login needed to trace a batch. Consumers check authenticity straight from the QR on the jar."
					}
				].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border bg-card p-5 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-6 w-6 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display mt-3 text-lg font-semibold",
							children: f.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-sm text-muted-foreground",
							children: f.body
						})
					]
				}, f.title))
			})
		})]
	});
}
//#endregion
export { TraceSearch as component };
