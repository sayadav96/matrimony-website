"use client";
import { useState } from "react";
import Link from "next/link";
import { COLORS } from "@/lib/colors";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    if (!email) return;
    // 🔒 later: call API to send reset email/OTP
    setSent(true);
  }

  return (
    <div className="min-h-[70vh] grid place-items-center">
      <div className="w-full max-w-md rounded-2xl border shadow-sm bg-white overflow-hidden">
        <div className="h-2 w-full" style={{ backgroundColor: COLORS.mustard }} />
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-semibold mb-2">Forgot password</h1>
          <p className="text-sm text-gray-600 mb-6">
            Enter your account email and we’ll send a reset link.
          </p>

          {!sent ? (
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl py-2.5 font-semibold text-white"
                style={{ backgroundColor: COLORS.mustard }}
              >
                Send reset link
              </button>
            </form>
          ) : (
            <div className="rounded-lg bg-gray-50 p-4 text-sm">
              If an account exists for <b>{email}</b>, we’ve sent a reset link.
              Please check your inbox and spam folder.
            </div>
          )}

          <div className="mt-6 text-sm">
            <Link
              href="/login"
              className="underline underline-offset-4"
              style={{ color: COLORS.teal }}
            >
              Back to login
            </Link>
          </div>
        </div>
        <div className="h-2 w-full" style={{ backgroundColor: COLORS.light }} />
      </div>
    </div>
  );
}
