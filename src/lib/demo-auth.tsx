import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEMO_USERS, type DemoUser } from "./hivetrace";

const KEY = "hivetrace-demo-user";

interface DemoAuth {
  user: DemoUser | null;
  signIn: (userId: string) => void;
  signOut: () => void;
  ready: boolean;
}

const Ctx = createContext<DemoAuth>({
  user: null,
  signIn: () => {},
  signOut: () => {},
  ready: false,
});

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const id = localStorage.getItem(KEY);
      const found = DEMO_USERS.find((u) => u.id === id);
      if (found) setUser(found);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const signIn = (userId: string) => {
    const found = DEMO_USERS.find((u) => u.id === userId);
    if (!found) return;
    localStorage.setItem(KEY, found.id);
    setUser(found);
  };

  const signOut = () => {
    localStorage.removeItem(KEY);
    setUser(null);
  };

  return <Ctx.Provider value={{ user, signIn, signOut, ready }}>{children}</Ctx.Provider>;
}

export function useDemoAuth() {
  return useContext(Ctx);
}
