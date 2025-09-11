"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

const COLORS = {
  mint: "#7ADAA5",
  teal: "#30a7b1",
  light: "#F6F6E0",
  mustard: "#E1AA36",
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { user, logout } = useAuth();
  const isAuthed = !!user;

  const NavLink = ({ href, children }) => (
    <Link
      href={href}
      className="px-3 py-2 rounded-md text-sm font-medium hover:underline underline-offset-4"
      onClick={() => setOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <header
      className="w-full sticky top-0 z-40 border-b"
      style={{ backgroundColor: COLORS.light, borderColor: "#e5e7eb" }}
    >
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            {/* replace with your <Image src="/logo.svg" .../> */}
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <img src="/images/logo.png" className="w-18" alt="Logo" />
              <span className="text-base sm:text-lg pt-2">Matrimony</span>
            </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/upload">Upload</NavLink>
            <NavLink href="/my-profiles">My Profiles</NavLink>
          </div>

          {/* Right: CTA / Auth */}
          <div className="hidden md:flex items-center gap-3">
            {!isAuthed ? (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium px-3 py-2 rounded-md"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-medium px-3 py-2 rounded-xl text-white shadow"
                  style={{ backgroundColor: COLORS.teal }}
                >
                  Register
                </Link>
                <NavLink href="/shortlist">Shortlist</NavLink>
              </>
            ) : (
              <>
                {/* <Link
                  href="/upload"
                  className="text-sm font-semibold px-3 py-2 rounded-xl text-black"
                  style={{ backgroundColor: COLORS.mustard }}
                >
                  + Upload Profile
                </Link> */}
                <Link
                  href="/settings"
                  className="text-sm font-medium px-3 py-2 rounded-md"
                >
                  Account
                </Link>
                <button
                  onClick={logout}
                  className="text-sm font-medium px-3 py-2 rounded-md hover:underline underline-offset-4"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 focus:outline-none"
            aria-label="Toggle menu"
            onClick={() => setOpen((s) => !s)}
            style={{ backgroundColor: COLORS.teal }}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke={COLORS.light}
              strokeWidth={2}
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 6h18M3 12h18M3 18h18"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile panel */}
        {open && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col gap-1">
              <NavLink href="/dashboard">Dashboard</NavLink>
              <NavLink href="/upload">Upload</NavLink>
              <NavLink href="/my-profiles">My Profiles</NavLink>
              <div
                className="h-px my-2"
                style={{ backgroundColor: "#e5e7eb" }}
              />
              {!isAuthed ? (
                <>
                  <NavLink href="/login">Login</NavLink>
                  <Link
                    href="/register"
                    className="px-3 py-2 rounded-lg text-sm font-medium text-white text-center"
                    style={{ backgroundColor: COLORS.teal }}
                    onClick={() => setOpen(false)}
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  {/* <Link
                    href="/upload"
                    className="px-3 py-2 rounded-lg text-sm font-semibold text-black text-center"
                    style={{ backgroundColor: COLORS.mustard }}
                    onClick={() => setOpen(false)}
                  >
                    + Upload Profile
                  </Link> */}
                  <NavLink href="/settings">Account</NavLink>
                  <NavLink href="/logout">Logout</NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* subtle color bar accent */}
      <div className="h-1 w-full flex">
        <div className="flex-1" style={{ backgroundColor: COLORS.teal }} />
      </div>
    </header>
  );
}
