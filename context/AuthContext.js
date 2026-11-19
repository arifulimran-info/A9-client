"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { API, apiFetch } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const [state, setState] = useState({ token: null, user: null, loading: true });
  const [tick, setTick] = useState(0);
  const refresh = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      setState({ token: null, user: null, loading: false });
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API}/api/jwt`, { credentials: "include" });
        if (!res.ok) throw new Error("jwt");
        const { token } = await res.json();
        const user = await apiFetch("/api/users/me", { token });
        if (!cancelled) setState({ token, user, loading: false });
      } catch {
        if (!cancelled) setState({ token: null, user: null, loading: false });
      }
    })();
    return () => { cancelled = true; };
  }, [session?.user?.id, isPending, tick]);

  const signOut = useCallback(async () => {
    await authClient.signOut();
    setState({ token: null, user: null, loading: false });
  }, []);

  return <AuthContext.Provider value={{ ...state, refresh, signOut }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
