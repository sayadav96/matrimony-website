"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { COLORS } from "@/lib/colors";
import { useAuth } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth(); // use store hook

  const [role, setRole] = useState("SELF"); // SELF | PARENT
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    agree: false,
  });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  function validate() {
    if (!form.fullName.trim()) return "Please enter your full name.";
    if (!form.email.trim()) return "Please enter an email.";
    if (!form.password || form.password.length < 8)
      return "Password must be at least 8 characters.";
    if (form.password !== form.confirm) return "Passwords do not match.";
    if (!form.agree) return "Please accept the Terms & Privacy.";
    return "";
  }

  async function onSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (v) return setError(v);

    try {
      setLoading(true);
      setError("");

      // 🔒 later: replace with API call
      // mock: use auth store
      login({
        email: form.email,
        fullName: form.fullName,
        role,
        phone: form.phone || null,
        registeredAt: Date.now(),
      });

      // redirect: parent → upload, self → dashboard
      router.push(role === "PARENT" ? "/upload" : "/dashboard");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] grid place-items-center mt-15 mb-15">
      <div className="w-full max-w-md rounded-2xl border shadow-sm bg-white overflow-hidden">
        {/* header accent */}
        <div className="h-2 w-full" style={{ backgroundColor: COLORS.mint }} />

        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-semibold mb-2">Create your account</h1>
          <p className="text-sm text-gray-600 mb-6">
            Sign up to upload and browse community profiles.
          </p>

          {/* role toggle */}
          <div className="mb-5 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole("SELF")}
              className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                role === "SELF" ? "text-white" : ""
              }`}
              style={{
                backgroundColor: role === "SELF" ? COLORS.teal : "transparent",
                borderColor: role === "SELF" ? COLORS.teal : "#e5e7eb",
              }}
            >
              I’m creating my own profile
            </button>
            <button
              type="button"
              onClick={() => setRole("PARENT")}
              className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                role === "PARENT" ? "text-white" : ""
              }`}
              style={{
                backgroundColor:
                  role === "PARENT" ? COLORS.mustard : "transparent",
                borderColor: role === "PARENT" ? COLORS.mustard : "#e5e7eb",
              }}
            >
              I’m a parent/guardian
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Full name</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={onChange}
                placeholder="e.g., Aarav Sharma"
                className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@example.com"
                className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Phone (optional)</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={onChange}
                placeholder="+91 9XXXXXXXXX"
                className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
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
                  placeholder="At least 8 characters"
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

            <div>
              <label className="block text-sm mb-1">Confirm password</label>
              <input
                type="password"
                name="confirm"
                value={form.confirm}
                onChange={onChange}
                placeholder="Re-enter password"
                className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
              />
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={onChange}
                className="mt-0.5"
              />
              <span>
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="underline"
                  style={{ color: COLORS.teal }}
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline"
                  style={{ color: COLORS.teal }}
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-2.5 font-semibold text-white disabled:opacity-60"
              style={{ backgroundColor: COLORS.teal }}
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <div className="mt-6 text-sm text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium underline underline-offset-4"
              style={{ color: COLORS.mustard }}
            >
              Log in
            </Link>
          </div>
        </div>

        {/* footer accent */}
        <div className="h-2 w-full flex">
          <div className="flex-1" style={{ backgroundColor: COLORS.mint }} />
          <div className="flex-1" style={{ backgroundColor: COLORS.teal }} />
          <div className="flex-1" style={{ backgroundColor: COLORS.light }} />
          <div className="flex-1" style={{ backgroundColor: COLORS.mustard }} />
        </div>
      </div>
    </div>
  );
}
