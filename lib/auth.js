// lib/auth.js
"use client";

const STORAGE_KEY = "auth_user";

// ---- raw storage helpers ----
export function getUser() {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); }
  catch { return null; }
}
export function setUser(user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("auth-changed")); // custom signal
}
export function clearUser() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("auth-changed"));
}

// ---- tiny hook ----
import { useEffect, useState } from "react";
export function useAuth() {
  const [user, setUserState] = useState(null);

  useEffect(() => {
    setUserState(getUser());
    const onStorage = (e) => {
      if (e.type === "storage" && e.key && e.key !== STORAGE_KEY) return;
      setUserState(getUser());
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("auth-changed", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("auth-changed", onStorage);
    };
  }, []);

  return {
    user,
    login: (u) => setUser(u),
    logout: () => clearUser(),
  };
}
