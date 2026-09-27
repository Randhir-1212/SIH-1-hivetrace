import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Trigger2, i as Root2, n as Header, r as Item, t as Content2, v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as CloudOff, b as ChevronDown, l as Plus, m as LoaderCircle, n as Truck, o as Save, p as Lock, s as RefreshCw, t as X, x as Check, y as ChevronUp } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as appendChainRecord, c as completedStageCount, g as stageComplete, h as shortHash, i as STAGE_META, l as confirmArrival, m as loadBatches, o as assignBatchNo, p as loadArrivals, r as STAGES, s as cn, t as Button, u as createBatchRow } from "./button-BTEn-cEJ.mjs";
import { n as Progress, t as IntegrityCheck } from "./IntegrityCheck-Evw5dvq4.mjs";
import { t as QRCode } from "../_libs/react-qr-code.mjs";
import { n as useDemoAuth } from "./demo-auth-Cy030hs4.mjs";
import { t as Input } from "./input-DoV2uPrF.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { a as DialogOverlay$1, c as DialogTrigger$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/log-DQjYHupG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
var Dialog = Dialog$1;
var DialogTrigger = DialogTrigger$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var QUEUE_KEY = "hivetrace-pending-sync";
function readQueue() {
	try {
		return JSON.parse(localStorage.getItem(QUEUE_KEY) ?? "[]");
	} catch {
		return [];
	}
}
/** Index of the first stage that still needs an entry. */
function nextStageIndex(batch) {
	const i = STAGES.findIndex((s) => !stageComplete(batch, s));
	return i === -1 ? STAGES.length : i;
}
function LogPage() {
	const { user, ready } = useDemoAuth();
	const navigate = useNavigate();
	const [batches, setBatches] = (0, import_react.useState)(null);
	const [selectedId, setSelectedId] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)([]);
	const [arrivals, setArrivals] = (0, import_react.useState)({});
	const [online, setOnline] = (0, import_react.useState)(true);
	const [syncing, setSyncing] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (ready && !user) navigate({ to: "/auth" });
	}, [
		ready,
		user,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		loadBatches().then((b) => {
			setBatches(b);
			setSelectedId((prev) => prev || b[0]?.id || "");
		}).catch(() => {
			setBatches([]);
			toast.error("Couldn't load batches from the database.");
		});
		loadArrivals().then(setArrivals).catch(() => setArrivals({}));
		setPending(readQueue());
		setOnline(navigator.onLine);
		const on = () => setOnline(true);
		const off = () => setOnline(false);
		window.addEventListener("online", on);
		window.addEventListener("offline", off);
		return () => {
			window.removeEventListener("online", on);
			window.removeEventListener("offline", off);
		};
	}, []);
	const visibleBatches = (0, import_react.useMemo)(() => {
		if (!batches) return [];
		return user?.role === "beekeeper" ? batches : batches.filter((b) => !!b.batchNo);
	}, [batches, user?.role]);
	(0, import_react.useEffect)(() => {
		if (visibleBatches.length === 0) return;
		if (!visibleBatches.some((b) => b.id === selectedId)) setSelectedId(visibleBatches[0].id);
	}, [visibleBatches, selectedId]);
	const batch = (0, import_react.useMemo)(() => visibleBatches.find((b) => b.id === selectedId) ?? null, [visibleBatches, selectedId]);
	const roleStages = (0, import_react.useMemo)(() => STAGE_META.filter((m) => m.editableBy.includes(user?.role ?? "admin")).map((m) => m.key), [user?.role]);
	const historyBatches = (0, import_react.useMemo)(() => visibleBatches.filter((b) => completedStageCount(b) === STAGES.length), [visibleBatches]);
	const openBatches = (0, import_react.useMemo)(() => visibleBatches.filter((b) => completedStageCount(b) < STAGES.length), [visibleBatches]);
	const completedByRole = (0, import_react.useMemo)(() => roleStages.length === 0 ? [] : openBatches.filter((b) => roleStages.every((s) => stageComplete(b, s))), [openBatches, roleStages]);
	const requestedBatches = (0, import_react.useMemo)(() => roleStages.length === 0 ? openBatches : openBatches.filter((b) => {
		const next = STAGES[nextStageIndex(b)];
		return !!next && roleStages.includes(next);
	}), [openBatches, roleStages]);
	const appendRecord = async (targetBatch, entry) => {
		const record = await appendChainRecord(targetBatch, entry);
		return {
			...targetBatch,
			records: [...targetBatch.records, record]
		};
	};
	(0, import_react.useEffect)(() => {
		if (!batches) return;
		const pendingBatches = batches.filter((b) => stageComplete(b, "harvesting") && !b.batchNo);
		if (pendingBatches.length === 0) return;
		(async () => {
			const assigned = /* @__PURE__ */ new Map();
			for (const b of pendingBatches) try {
				const no = await assignBatchNo(b);
				if (no) assigned.set(b.uuid, no);
			} catch {}
			if (assigned.size > 0) setBatches((prev) => (prev ?? []).map((b) => assigned.has(b.uuid) ? {
				...b,
				batchNo: assigned.get(b.uuid)
			} : b));
		})();
	}, [batches]);
	(0, import_react.useEffect)(() => {
		if (!online || pending.length === 0 || !batches || syncing) return;
		setSyncing(true);
		(async () => {
			let current = batches;
			for (const entry of pending) current = await Promise.all(current.map(async (b) => b.id === entry.batchId ? appendRecord(b, entry) : b));
			setBatches([...current]);
			setPending([]);
			localStorage.removeItem(QUEUE_KEY);
			toast.success(`Synced ${pending.length} offline entr${pending.length === 1 ? "y" : "ies"}.`);
			setSyncing(false);
		})();
	}, [online]);
	if (!ready || !user || !batches) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-[60vh] items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" })
	});
	const canCreateBatch = user.role === "beekeeper";
	const handleSave = async (stage, data) => {
		if (!batch) return;
		const entry = {
			batchId: batch.id,
			stage,
			data,
			createdBy: user.name,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		if (!online) {
			const q = [...pending, entry];
			setPending(q);
			localStorage.setItem(QUEUE_KEY, JSON.stringify(q));
			toast.info("You're offline — entry queued and will sync automatically.");
			return;
		}
		try {
			const updated = await appendRecord(batch, entry);
			setBatches(batches.map((b) => b.id === batch.id ? updated : b));
			toast.success("Saved — appended to the batch ledger.", { description: `Hash ${shortHash(updated.records.at(-1).hash)}` });
		} catch {
			toast.error("Couldn't save this entry to the database.");
		}
	};
	const handleDelivered = async (stage) => {
		if (!batch) return;
		try {
			const at = await confirmArrival(batch, stage, user.name);
			setArrivals({
				...arrivals,
				[`${batch.id}:${stage}`]: at
			});
			toast.success("Arrival confirmed — you can now record this stage.");
		} catch {
			toast.error("Couldn't save the arrival confirmation.");
		}
	};
	const handleCreateBatch = async (hiveId, location) => {
		try {
			const nb = await createBatchRow(hiveId, location, user.name);
			setBatches([...batches, nb]);
			setSelectedId(nb.id);
			toast.success(`Batch ${nb.id} created.`);
		} catch {
			toast.error("Couldn't create the batch.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-bold tracking-tight",
					children: "Supply Chain Log"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						"Signed in as ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-medium text-foreground",
							children: [user.name, user.beekeeperId ? ` (${user.beekeeperId})` : ""]
						}),
						" ",
						"·",
						" ",
						user.roleLabel
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						pending.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "secondary",
							className: "gap-1.5 bg-accent text-accent-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudOff, { className: "h-3.5 w-3.5" }),
								pending.length,
								" pending sync"
							]
						}),
						syncing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "secondary",
							className: "gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5 animate-spin" }), " Syncing…"]
						}),
						!online && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "secondary",
							className: "gap-1.5 bg-[#F3E2DE] text-[#B0463A]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudOff, { className: "h-3.5 w-3.5" }), " Offline"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `mt-6 grid gap-3 ${user.role === "admin" ? "sm:grid-cols-2" : "sm:grid-cols-3"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatchSelect, {
						label: "Requested",
						hint: "Awaiting your entry",
						batches: requestedBatches,
						selectedId,
						onSelect: setSelectedId
					}),
					user.role !== "admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatchSelect, {
						label: "Completed",
						hint: "Your stage is done",
						batches: completedByRole,
						selectedId,
						onSelect: setSelectedId
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatchSelect, {
						label: "History",
						hint: "All stages complete",
						batches: historyBatches,
						selectedId,
						onSelect: setSelectedId
					})
				]
			}),
			canCreateBatch && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewBatchDialog, { onCreate: handleCreateBatch })
			}),
			visibleBatches.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 rounded-xl border bg-card p-4 text-sm text-muted-foreground shadow-sm",
				children: "No harvested batches yet. A batch appears here with its batch number once the beekeeper completes harvesting."
			}),
			batch && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatchProgress, { batch }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageAccordion, {
					batch,
					role: user.role,
					onSave: handleSave,
					arrivals,
					onDelivered: handleDelivered,
					batchNo: batch.batchNo ?? void 0
				}, batch.id),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntegrityCheck, { batch })
				})
			] })
		]
	});
}
function BatchSelect({ label, hint, batches, selectedId, onSelect }) {
	const value = batches.some((b) => b.id === selectedId) ? selectedId : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
				className: "text-xs",
				children: [
					label,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted-foreground",
						children: [
							"(",
							batches.length,
							")"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value,
				onValueChange: onSelect,
				disabled: batches.length === 0,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					className: "bg-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: batches.length === 0 ? "None" : "Select a batch" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: batches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
					value: b.id,
					children: [
						b.batchNo ?? b.id,
						" · ",
						b.apiaryLocation
					]
				}, b.id)) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-muted-foreground",
				children: hint
			})
		]
	});
}
function BatchProgress({ batch }) {
	const done = completedStageCount(batch);
	const total = STAGES.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 rounded-xl border bg-card p-4 shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-medium",
				children: [
					"Batch ",
					batch.batchNo ?? batch.id,
					" — ",
					done,
					" of ",
					total,
					" stages complete"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-display text-lg font-bold",
				children: [Math.round(done / total * 100), "%"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
			value: done / total * 100,
			className: "mt-2 h-2"
		})]
	});
}
function StageAccordion({ batch, role, onSave, arrivals, onDelivered, batchNo }) {
	const traceUrl = typeof window !== "undefined" ? `${window.location.origin}/trace/${batch.id}` : `/trace/${batch.id}`;
	const nextIdx = nextStageIndex(batch);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
		type: "multiple",
		className: "mt-6 space-y-3",
		defaultValue: [STAGES[Math.min(nextIdx, STAGES.length - 1)]],
		children: STAGE_META.map((meta, idx) => {
			const complete = stageComplete(batch, meta.key);
			const canEdit = meta.editableBy.includes(role);
			const latest = batch.records.filter((r) => r.stage === meta.key && !r.superseded).at(-1);
			const isNext = idx === nextIdx;
			const arrivedAt = arrivals[`${batch.id}:${meta.key}`];
			const beekeeperOwnsBothStages = role === "beekeeper" && (meta.key === "beekeeper" || meta.key === "harvesting");
			const needsArrival = isNext && idx > 0 && !arrivedAt && !beekeeperOwnsBothStages && meta.key !== "distribution";
			const upcoming = !complete && idx > nextIdx;
			const delivered = arrivedAt && !complete;
			const status = complete ? "Complete" : delivered ? canEdit ? "Delivered — awaiting entry" : "Delivered" : needsArrival ? "Pending — awaiting arrival" : isNext ? canEdit ? meta.key === "harvesting" ? "Ready for harvest entry" : "Arrived · awaiting entry" : "View only" : upcoming ? "Not started" : canEdit ? "Awaiting entry" : "View only";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
				value: meta.key,
				className: "rounded-xl border bg-card px-4 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionTrigger, {
					className: "hover:no-underline",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-3 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `flex h-8 w-8 items-center justify-center rounded-full text-base ${complete || delivered ? "bg-[#E6EEE1]" : needsArrival ? "bg-accent" : "bg-muted"}`,
								children: complete || delivered ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-[#4C7A4B]" }) : meta.icon
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display block font-semibold",
								children: meta.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs font-normal text-muted-foreground",
								children: status
							})] })]
						}),
						delivered && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-auto mr-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "secondary",
								className: "gap-1 bg-[#E6EEE1] text-[#4C7A4B]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }), " Delivered"]
							})
						}),
						needsArrival && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-auto mr-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "secondary",
								className: "gap-1 bg-accent text-accent-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-3.5 w-3.5" }), " Pending"]
							})
						}),
						!delivered && !needsArrival && !canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-auto mr-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4 shrink-0 text-muted-foreground" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionContent, { children: [meta.key === "testing" && batchNo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 rounded-lg border bg-background p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Auto-generated batch number (created at harvest)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 font-mono text-sm font-semibold",
						children: batchNo
					})]
				}), needsArrival ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-dashed bg-background p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: "Handoff requested from the previous stage"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [
								"Batch ",
								batch.batchNo ?? batch.id,
								" is on its way."
							]
						}),
						canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "mt-3 gap-2",
							onClick: () => onDelivered(meta.key),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-4 w-4" }), " Mark as delivered"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs text-muted-foreground",
							children: [
								"Waiting for ",
								meta.editableByLabel,
								" to confirm arrival."
							]
						})
					]
				}) : delivered && !canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-dashed bg-background p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-medium",
						children: ["Delivered to ", meta.editableByLabel]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							"Arrival confirmed. Entry will be recorded by ",
							meta.editableByLabel,
							"."
						]
					})]
				}) : canEdit && !complete ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [arrivedAt && !complete && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#E6EEE1] px-2.5 py-0.5 text-xs font-medium text-[#4C7A4B]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }), " Delivery confirmed"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageForm, {
					meta,
					defaults: latest?.data ?? {},
					onSave,
					showQr: meta.key === "packaging",
					traceUrl
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: latest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [complete && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#E6EEE1] px-2.5 py-0.5 text-xs font-medium text-[#4C7A4B]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }), " Entry recorded"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "grid gap-x-6 gap-y-2 sm:grid-cols-2",
					children: meta.fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-muted-foreground",
						children: f.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "text-sm font-medium",
						children: latest.data[f.key] || "—"
					})] }, f.key))
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "No entry recorded yet."
				}) })] })]
			}, meta.key);
		})
	});
}
function StageForm({ meta, defaults, onSave, showQr, traceUrl }) {
	const { user: currentUser } = useDemoAuth();
	const [values, setValues] = (0, import_react.useState)(() => ({
		...meta.key === "beekeeper" && currentUser?.beekeeperId ? {
			beekeeperId: currentUser.beekeeperId,
			beekeeperName: currentUser.name
		} : {},
		...defaults
	}));
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const submit = async (e) => {
		e.preventDefault();
		setSaving(true);
		await onSave(meta.key, values);
		setSaving(false);
		setSaved(true);
		setTimeout(() => setSaved(false), 2500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: submit,
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: meta.fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: `${meta.key}-${f.key}`,
						className: "text-xs",
						children: f.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: `${meta.key}-${f.key}`,
						value: values[f.key] ?? "",
						placeholder: f.placeholder,
						onChange: (e) => setValues({
							...values,
							[f.key]: e.target.value
						}),
						className: "bg-background"
					})]
				}, f.key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					disabled: saving,
					className: "gap-2",
					children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), saved ? "Saved" : "Save entry"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Corrections are appended as new entries — past records stay visible in the ledger."
				})]
			}),
			showQr && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4 rounded-lg border bg-background p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-md bg-white p-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QRCode, {
						value: traceUrl,
						size: 88,
						fgColor: "#3A2313"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-foreground",
							children: "Jar label QR code"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 break-all font-mono",
							children: traceUrl
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1",
							children: "Print on the jar — scanning opens this batch's public trace."
						})
					]
				})]
			})
		]
	});
}
function NewBatchDialog({ onCreate }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [hiveId, setHiveId] = (0, import_react.useState)("");
	const [location, setLocation] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				className: "gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New batch"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "font-display",
				children: "Create a new batch"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "The batch ID is generated automatically. The QR code and ledger start from this moment." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "nb-hive",
						children: "Hive ID"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "nb-hive",
						placeholder: "H-021",
						value: hiveId,
						onChange: (e) => setHiveId(e.target.value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "nb-loc",
						children: "Apiary location"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "nb-loc",
						placeholder: "Village, district, state",
						value: location,
						onChange: (e) => setLocation(e.target.value)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: !hiveId.trim() || !location.trim(),
				onClick: () => {
					onCreate(hiveId.trim(), location.trim());
					setOpen(false);
					setHiveId("");
					setLocation("");
				},
				children: "Create batch"
			}) })
		] })]
	});
}
//#endregion
export { LogPage as component };
