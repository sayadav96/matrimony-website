"use client";
import { useEffect, useState } from "react";
import { loadShortlist } from "@/lib/profiles";
import { MOCK_PROFILES } from "@/lib/mockProfiles";
import { loadCreatedProfiles } from "@/lib/profiles";
import ProfileCard from "@/app/components/ProfileCard";
import { COLORS } from "@/lib/colors";
import Guard from "@/app/components/Guard";

export default function ShortlistPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const ids = loadShortlist();
    // combine mock + created profiles
    const all = [...MOCK_PROFILES, ...loadCreatedProfiles()];
    setItems(all.filter((p) => ids.includes(p.id)));
  }, []);

  return (
    <Guard>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-xl font-semibold mb-4">My Shortlisted Profiles</h1>
        {items.length === 0 ? (
          <div className="rounded-xl border bg-white p-8 text-center text-sm text-gray-600">
            You haven’t shortlisted any profiles yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((p) => (
              <ProfileCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>
    </Guard>
  );
}
