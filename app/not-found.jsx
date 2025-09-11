// app/not-found.jsx
"use client";
import Link from "next/link";
import { COLORS } from "@/lib/colors";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold mb-4" style={{ color: COLORS.teal }}>
        404
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Sorry, this page could not be found.
      </p>
      <Link
        href="/"
        className="px-5 py-2 rounded-xl text-white font-semibold"
        style={{ backgroundColor: COLORS.mustard }}
      >
        Go back home
      </Link>
    </div>
  );
}
