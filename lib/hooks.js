"use client";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

export function useFetch(path) {
  const { token } = useAuth();
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const load = useCallback(async () => {
    if (!token) return;
    try {
      const data = await apiFetch(path, { token });
      setState({ data, loading: false, error: null });
    } catch (e) {
      setState({ data: null, loading: false, error: e.message });
    }
  }, [path, token]);
  useEffect(() => { load(); }, [load]);
  return { ...state, reload: load };
}
