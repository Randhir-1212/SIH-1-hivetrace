import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { h as Slot, v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as supabase } from "./client-Bl8cKTSz.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-BTEn-cEJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STAGES = [
	"beekeeper",
	"harvesting",
	"testing",
	"processing",
	"packaging",
	"distribution"
];
var STAGE_META = [
	{
		key: "beekeeper",
		label: "Beekeeper",
		icon: "🧑‍🌾",
		editableBy: ["beekeeper"],
		editableByLabel: "Beekeeper",
		fields: [
			{
				key: "beekeeperId",
				label: "Beekeeper ID",
				placeholder: "BK001"
			},
			{
				key: "beekeeperName",
				label: "Beekeeper name"
			},
			{
				key: "hiveId",
				label: "Hive ID",
				placeholder: "H-042"
			},
			{
				key: "apiaryLocation",
				label: "Apiary location"
			}
		]
	},
	{
		key: "harvesting",
		label: "Harvesting",
		icon: "🍯",
		editableBy: ["beekeeper"],
		editableByLabel: "Beekeeper",
		fields: [
			{
				key: "harvestDate",
				label: "Date of harvesting",
				placeholder: "2026-03-12"
			},
			{
				key: "quantityKg",
				label: "Quantity (kg)"
			},
			{
				key: "hiveInfo",
				label: "Hive info"
			}
		]
	},
	{
		key: "testing",
		label: "Testing",
		icon: "🧪",
		editableBy: ["tester"],
		editableByLabel: "Lab / Tester",
		fields: [
			{
				key: "testingDate",
				label: "Testing date",
				placeholder: "2026-09-06"
			},
			{
				key: "moisturePct",
				label: "Moisture (%)"
			},
			{
				key: "purityPct",
				label: "Purity (%)"
			},
			{
				key: "testResult",
				label: "Test result",
				placeholder: "Pass / Fail / Pending"
			}
		]
	},
	{
		key: "processing",
		label: "Processing / Extraction",
		icon: "⚙️",
		editableBy: ["processing"],
		editableByLabel: "Processing Facility",
		fields: [{
			key: "processingDate",
			label: "Processing date"
		}, {
			key: "facility",
			label: "Facility"
		}]
	},
	{
		key: "packaging",
		label: "Packaging",
		icon: "📦",
		editableBy: ["distribution"],
		editableByLabel: "Packaging & Distribution",
		fields: [{
			key: "packagingDate",
			label: "Packaging date"
		}]
	},
	{
		key: "distribution",
		label: "Distribution",
		icon: "🚚",
		editableBy: ["distribution"],
		editableByLabel: "Packaging & Distribution",
		fields: [{
			key: "shipment",
			label: "Shipment / courier"
		}, {
			key: "destination",
			label: "Destination"
		}]
	}
];
var DEMO_USERS = [
	{
		id: "u-bee",
		name: "Maya Deori",
		email: "maya@honeychain.in",
		role: "beekeeper",
		roleLabel: "Beekeeper / Field Staff",
		beekeeperId: "BK001"
	},
	{
		id: "u-lab",
		name: "Dr. Arjun Rao",
		email: "arjun@honeylab.in",
		role: "tester",
		roleLabel: "Lab / Tester"
	},
	{
		id: "u-proc",
		name: "Sunita Kashyap",
		email: "sunita@purehive.in",
		role: "processing",
		roleLabel: "Processing Facility"
	},
	{
		id: "u-dist",
		name: "Rohan Baruah",
		email: "rohan@hivedist.in",
		role: "distribution",
		roleLabel: "Packaging & Distribution"
	},
	{
		id: "u-admin",
		name: "HiveTrace Admin",
		email: "admin@honeychain.in",
		role: "admin",
		roleLabel: "Admin (view only)"
	}
];
function stableStringify(value) {
	if (value === null || typeof value !== "object") return JSON.stringify(value);
	if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
	const obj = value;
	return `{${Object.keys(obj).sort().map((k) => `${JSON.stringify(k)}:${stableStringify(obj[k])}`).join(",")}}`;
}
async function sha256Hex(input) {
	const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
	return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function computeRecordHash(r) {
	const ts = Number.isNaN(Date.parse(r.createdAt)) ? r.createdAt : new Date(r.createdAt).toISOString();
	return sha256Hex(r.prevHash + "|" + r.batchId + "|" + r.stage + "|" + stableStringify(r.data) + "|" + ts);
}
async function loadBatches() {
	const [batchRes, recordRes] = await Promise.all([supabase.from("batches").select("id, code, hive_id, apiary_location, created_by_name, created_at, batch_no").order("created_at", { ascending: true }), supabase.from("chain_records").select("id, batch_id, stage, data, prev_hash, hash, created_by_name, created_at").order("created_at", { ascending: true })]);
	if (batchRes.error) throw batchRes.error;
	if (recordRes.error) throw recordRes.error;
	const records = recordRes.data ?? [];
	return (batchRes.data ?? []).map((b) => ({
		uuid: b.id,
		id: b.code,
		hiveId: b.hive_id,
		apiaryLocation: b.apiary_location,
		createdBy: b.created_by_name,
		createdAt: b.created_at,
		batchNo: b.batch_no,
		records: records.filter((r) => r.batch_id === b.id).map((r) => ({
			id: r.id,
			batchId: b.code,
			stage: r.stage,
			data: r.data ?? {},
			prevHash: r.prev_hash,
			hash: r.hash,
			createdBy: r.created_by_name,
			createdAt: r.created_at
		}))
	}));
}
/** Creates a batch; the database assigns the batch code (HC1028, HC1029, …). */
async function createBatchRow(hiveId, apiaryLocation, createdByName) {
	const { data, error } = await supabase.rpc("create_batch", {
		_hive_id: hiveId,
		_apiary_location: apiaryLocation,
		_created_by_name: createdByName
	});
	if (error) throw error;
	const row = data;
	return {
		uuid: row.id,
		id: row.code,
		hiveId: row.hive_id,
		apiaryLocation: row.apiary_location,
		createdBy: row.created_by_name,
		createdAt: row.created_at,
		batchNo: row.batch_no,
		records: []
	};
}
/** Appends a stage entry to the batch's hash chain in the database. */
async function appendChainRecord(batch, entry) {
	const prevHash = batch.records.at(-1)?.hash ?? "GENESIS";
	const hash = await computeRecordHash({
		batchId: batch.id,
		stage: entry.stage,
		data: entry.data,
		prevHash,
		createdAt: entry.createdAt
	});
	const { data, error } = await supabase.from("chain_records").insert({
		batch_id: batch.uuid,
		stage: entry.stage,
		data: entry.data,
		prev_hash: prevHash,
		hash,
		created_by_name: entry.createdBy,
		created_at: entry.createdAt
	}).select("id").single();
	if (error) throw error;
	return {
		id: data.id,
		batchId: batch.id,
		stage: entry.stage,
		data: entry.data,
		prevHash,
		hash,
		createdBy: entry.createdBy,
		createdAt: entry.createdAt
	};
}
/** Arrival confirmations, keyed as `${batchCode}:${stage}`. */
async function loadArrivals() {
	const { data, error } = await supabase.from("batch_arrivals").select("stage, created_at, batches(code)");
	if (error) throw error;
	const out = {};
	for (const row of data ?? []) {
		const code = row.batches?.code;
		if (code) out[`${code}:${row.stage}`] = row.created_at;
	}
	return out;
}
async function confirmArrival(batch, stage, confirmedByName) {
	const { data, error } = await supabase.from("batch_arrivals").insert({
		batch_id: batch.uuid,
		stage,
		confirmed_by_name: confirmedByName
	}).select("created_at").single();
	if (error) throw error;
	return data.created_at;
}
function stageComplete(batch, stage) {
	const meta = STAGE_META.find((m) => m.key === stage);
	const latest = latestRecord(batch, stage);
	if (!latest) return false;
	return meta.fields.every((f) => (latest.data[f.key] ?? "").trim() !== "");
}
function latestRecord(batch, stage) {
	const recs = batch.records.filter((r) => r.stage === stage && !r.superseded);
	return recs[recs.length - 1];
}
function completedStageCount(batch) {
	return STAGES.filter((s) => stageComplete(batch, s)).length;
}
async function verifyChain(batch) {
	let prevHash = "GENESIS";
	for (const r of batch.records) {
		const expected = await computeRecordHash({
			batchId: r.batchId,
			stage: r.stage,
			data: r.data,
			prevHash,
			createdAt: r.createdAt
		});
		if (r.prevHash !== prevHash || expected !== r.hash) return {
			intact: false,
			checked: batch.records.length,
			brokenAt: {
				stage: r.stage,
				recordId: r.id
			}
		};
		prevHash = r.hash;
	}
	return {
		intact: true,
		checked: batch.records.length
	};
}
function shortHash(hash) {
	return hash === "GENESIS" ? "GENESIS" : hash.slice(0, 10) + "…" + hash.slice(-6);
}
function formatDate(iso) {
	return new Date(iso).toLocaleString("en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	});
}
/** Asks the database to generate + store the production batch number for a harvested batch. */
async function assignBatchNo(batch) {
	const bee = latestRecord(batch, "beekeeper");
	const harvest = latestRecord(batch, "harvesting");
	const { data, error } = await supabase.rpc("assign_batch_no", {
		_batch_id: batch.uuid,
		_hive_id: bee?.data["hiveId"] || batch.hiveId,
		_beekeeper_id: bee?.data["beekeeperId"] || "BK000",
		_harvest_date: harvest?.data["harvestDate"] || ""
	});
	if (error) throw error;
	return data;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
export { verifyChain as _, appendChainRecord as a, completedStageCount as c, formatDate as d, latestRecord as f, stageComplete as g, shortHash as h, STAGE_META as i, confirmArrival as l, loadBatches as m, DEMO_USERS as n, assignBatchNo as o, loadArrivals as p, STAGES as r, cn as s, Button as t, createBatchRow as u };
