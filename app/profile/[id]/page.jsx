"use client";
import { notFound } from "next/navigation";
import { MOCK_PROFILES, ageFromDOB } from "@/lib/mockProfiles";
import { loadCreatedProfiles } from "@/lib/profiles";
import { COLORS } from "@/lib/colors";

export default function ProfileDetail({ params }) {
  const { id } = params;
  let p = MOCK_PROFILES.find((x) => x.id === id);
  if (!p && typeof window !== "undefined") {
    p = loadCreatedProfiles().find((x) => x.id === id);
  }
  if (!p) return notFound();
  const img = p.photos?.[0] || "/demo/placeholder.jpg";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr,360px] gap-6">
      <section className="rounded-xl border bg-white overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={p.name}
          className="w-full max-h-[520px] object-cover"
        />
        <div className="p-5 space-y-2">
          <h1 className="text-2xl font-semibold">{p.name}</h1>
          <div className="text-gray-600">
            {ageFromDOB(p.dob)} • {p.community} • {p.city}
          </div>
          <div className="text-sm">
            {p.education} • {p.occupation}
          </div>
        </div>
      </section>

      {/* Contact box */}
      <aside className="rounded-xl border bg-white p-5 h-fit sticky top-24">
        <h2 className="font-semibold mb-3">Contact Details</h2>

        {/* Locked state (MVP) */}
        <div className="rounded-lg border bg-gray-50 p-4 text-center">
          <p className="text-sm text-gray-600">Contact details are locked 🔒</p>
          <button
            disabled
            className="mt-3 w-full rounded-xl py-2.5 font-semibold text-white opacity-70 cursor-not-allowed"
            style={{ backgroundColor: COLORS.teal }}
            title="Payments coming soon"
          >
            Unlock Contact (₹49)
          </button>
          <p className="mt-2 text-xs text-gray-500">
            Pay to view phone/email for 7 days. Privacy add-on may restrict
            access.
          </p>
        </div>
      </aside>
    </div>
  );
}
