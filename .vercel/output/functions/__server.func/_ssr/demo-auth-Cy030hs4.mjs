import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as DEMO_USERS } from "./button-BTEn-cEJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/demo-auth-Cy030hs4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "hivetrace-demo-user";
var Ctx = (0, import_react.createContext)({
	user: null,
	signIn: () => {},
	signOut: () => {},
	ready: false
});
function DemoAuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const id = localStorage.getItem(KEY);
			const found = DEMO_USERS.find((u) => u.id === id);
			if (found) setUser(found);
		} catch {}
		setReady(true);
	}, []);
	const signIn = (userId) => {
		const found = DEMO_USERS.find((u) => u.id === userId);
		if (!found) return;
		localStorage.setItem(KEY, found.id);
		setUser(found);
	};
	const signOut = () => {
		localStorage.removeItem(KEY);
		setUser(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value: {
			user,
			signIn,
			signOut,
			ready
		},
		children
	});
}
function useDemoAuth() {
	return (0, import_react.useContext)(Ctx);
}
//#endregion
export { useDemoAuth as n, DemoAuthProvider as t };
