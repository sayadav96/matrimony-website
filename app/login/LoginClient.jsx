"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation"; // <- single import
import { COLORS } from "@/lib/colors";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const { login } = useAuth();

  const next = search.get("next") || "/dashboard";
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    if (!form.email || !form.password) {
      setErr("Please enter email and password.");
      return;
    }
    try {
      setLoading(true);
      login({ email: form.email, loggedInAt: Date.now() }); // mock auth
      router.push(next);
    } catch {
      setErr("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-[70vh] grid place-items-center ">
      <div className="w-full max-w-md rounded-2xl border shadow-sm bg-white overflow-hidden">
        {/* Header strip */}
        <div className="h-2 w-full" style={{ backgroundColor: COLORS.teal }} />

        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-semibold mb-2">Welcome back</h1>
          <p className="text-sm text-gray-600 mb-6">
            Log in to browse profiles and manage your uploads.
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@example.com"
                className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                style={{ focusRingColor: COLORS.teal }}
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  placeholder="••••••••"
                  className="w-full rounded-lg border px-3 py-2 pr-10 outline-none focus:ring-2"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute inset-y-0 right-2 my-auto text-sm text-gray-500"
                  aria-label="Toggle password visibility"
                >
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {err ? <p className="text-sm text-red-600">{err}</p> : null}

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded" /> Remember me
              </label>
              <Link
                href="/forgot-password"
                className="text-sm underline underline-offset-4"
                style={{ color: COLORS.teal }}
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-2.5 font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: COLORS.teal }}
            >
              {loading ? "Signing in…" : "Log in"}
            </button>
          </form>

          <div className="mt-6 text-sm text-center">
            New here?{" "}
            <Link
              href="/register"
              className="font-medium underline underline-offset-4"
              style={{ color: COLORS.mustard }}
            >
              Create an account
            </Link>
          </div>
        </div>

        {/* Footer accent */}
        <div className="h-2 w-full flex">
          <div className="flex-1" style={{ backgroundColor: COLORS.mustard }} />
        </div>
      </div>
    </div>
  );
}
