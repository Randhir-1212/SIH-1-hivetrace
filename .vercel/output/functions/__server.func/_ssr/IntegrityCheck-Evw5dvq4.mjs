import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { i as ShieldAlert, m as LoaderCircle, r as ShieldCheck } from "../_libs/lucide-react.mjs";
import { _ as verifyChain, s as cn, t as Button } from "./button-BTEn-cEJ.mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/IntegrityCheck-Evw5dvq4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = Root.displayName;
function IntegrityCheck({ batch }) {
	const [result, setResult] = (0, import_react.useState)(null);
	const [checking, setChecking] = (0, import_react.useState)(false);
	const run = async () => {
		setChecking(true);
		const res = await verifyChain(batch);
		await new Promise((r) => setTimeout(r, 450));
		setResult(res);
		setChecking(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border bg-card p-4 shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-base font-semibold",
				children: "Tamper-evident ledger"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Every stage entry is hash-chained to the previous one — editing history breaks the chain."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: run,
				disabled: checking,
				variant: "outline",
				className: "gap-2",
				children: [checking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }), "Verify integrity"]
			})]
		}), result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `mt-3 flex items-start gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${result.intact ? "bg-[#E6EEE1] text-[#4C7A4B]" : "bg-[#F3E2DE] text-[#B0463A]"}`,
			children: result.intact ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-0.5 h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				"Chain intact — ",
				result.checked,
				" record",
				result.checked === 1 ? "" : "s",
				" verified. No entry has been altered or deleted."
			] })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "mt-0.5 h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				"Chain broken at stage \"",
				result.brokenAt?.stage,
				"\" — this record does not match its stored hash. Possible tampering detected."
			] })] })
		})]
	});
}
//#endregion
export { Progress as n, IntegrityCheck as t };
