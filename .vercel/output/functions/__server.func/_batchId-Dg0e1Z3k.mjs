import { M as notFound, m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
import { m as loadBatches } from "./_ssr/button-BTEn-cEJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_batchId-Dg0e1Z3k.js
var $$splitNotFoundComponentImporter = () => import("./_batchId-BG82LW_U.mjs");
var $$splitComponentImporter = () => import("./_batchId-BgCj4vHh.mjs");
var Route = createFileRoute("/trace/$batchId")({
	head: ({ params }) => ({ meta: [
		{ title: `Batch ${params.batchId} — HiveTrace` },
		{
			name: "description",
			content: `Verified supply-chain journey for honey batch ${params.batchId}: hive, harvest, lab test, processing, packaging and delivery.`
		},
		{
			property: "og:title",
			content: `Batch ${params.batchId} — HiveTrace`
		},
		{
			property: "og:description",
			content: "Follow this honey batch across all six verified stages, from hive to jar."
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
	loader: async ({ params }) => {
		const batch = (await loadBatches().catch(() => [])).find((b) => b.id.toUpperCase() === params.batchId.toUpperCase());
		if (!batch) throw notFound();
		return batch;
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
