import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as loadBatches } from "./button-BTEn-cEJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BbA8hQOL.js
var $$splitComponentImporter = () => import("./routes-koBiM6im.mjs");
var Route = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Trace a Batch — HiveTrace" },
		{
			name: "description",
			content: "Enter a honey batch code or scan a jar's QR code to see its full verified journey from hive to shelf."
		},
		{
			property: "og:title",
			content: "Trace a Batch — HiveTrace"
		},
		{
			property: "og:description",
			content: "Every jar of honey, traced from hive to jar on a tamper-evident ledger."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	loader: () => loadBatches().catch(() => []),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
