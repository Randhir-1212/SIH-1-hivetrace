import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { f as LogIn, g as Hexagon } from "../_libs/lucide-react.mjs";
import { n as DEMO_USERS, s as cn, t as Button } from "./button-BTEn-cEJ.mjs";
import { n as useDemoAuth } from "./demo-auth-Cy030hs4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CvL3HwBU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Card = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
	...props
}));
Card.displayName = "Card";
var CardHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex flex-col space-y-1.5 p-6", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("font-semibold leading-none tracking-tight", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("p-6 pt-0", className),
	...props
}));
CardContent.displayName = "CardContent";
var CardFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex items-center p-6 pt-0", className),
	...props
}));
CardFooter.displayName = "CardFooter";
var ROLE_ICONS = {
	beekeeper: "🧑‍🌾",
	tester: "🧪",
	processing: "⚙️",
	distribution: "📦",
	admin: "🛡️"
};
function AuthPage() {
	const { user, signIn, ready } = useDemoAuth();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (ready && user) navigate({ to: "/log" });
	}, [
		ready,
		user,
		navigate
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex max-w-2xl flex-col items-center px-4 py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hexagon, { className: "h-8 w-8" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-5 text-3xl font-bold tracking-tight",
				children: "Supply Chain Log"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-md text-center text-sm text-muted-foreground",
				children: "Prototype sign-in: pick a demo role to see exactly what that actor in the honey supply chain can view and edit. In production this is backed by real accounts and permissions."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid w-full gap-3 sm:grid-cols-2",
				children: DEMO_USERS.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "transition-shadow hover:shadow-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						className: "pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardTitle, {
							className: "flex items-center gap-2 text-base",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xl",
									children: ROLE_ICONS[u.role]
								}),
								" ",
								u.roleLabel
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [
							u.name,
							" · ",
							u.email,
							u.beekeeperId ? ` · ID ${u.beekeeperId}` : ""
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "w-full gap-2",
						variant: "outline",
						onClick: () => {
							signIn(u.id);
							navigate({ to: "/log" });
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-4 w-4" }),
							" Continue as ",
							u.name.split(" ")[0]
						]
					}) })]
				}, u.id))
			})
		]
	});
}
//#endregion
export { AuthPage as component };
