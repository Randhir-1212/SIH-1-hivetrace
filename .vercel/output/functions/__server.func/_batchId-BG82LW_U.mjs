import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { g as Hexagon, w as ArrowLeft } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_batchId-BG82LW_U.js
var import_jsx_runtime = require_jsx_runtime();
var SplitNotFoundComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
	className: "mx-auto max-w-xl px-4 py-20 text-center",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hexagon, { className: "mx-auto h-10 w-10 text-muted-foreground" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display mt-4 text-2xl font-bold",
			children: "Batch not found"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "We couldn't find that batch code. Check the code on your jar and try again."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/",
			className: "mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Trace another batch"]
		})
	]
});
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
