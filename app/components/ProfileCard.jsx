"use client";
import Link from "next/link";
import { ageFromDOB } from "@/lib/mockProfiles";
import { loadShortlist, toggleShortlist } from "@/lib/profiles";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export default function ProfileCard({ p }) {
  const [shortlisted, setShortlisted] = useState(false);

  useEffect(() => {
    setShortlisted(loadShortlist().includes(p.id));
  }, [p.id]);

  const img = p.photos?.[0] || "/demo/placeholder.jpg";

  return (
    <div className="rounded-xl border bg-white overflow-hidden group hover:shadow-md transition">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img}
        alt={p.name}
        className="aspect-[3/4] w-full object-cover"
      />
      <div className="p-3">
        <div className="flex items-start justify-between">
          <div className="font-semibold">{p.name}</div>
          <button
            aria-label="Shortlist"
            onClick={() => {
              const list = toggleShortlist(p.id);
              setShortlisted(list.includes(p.id));
            }}
            className="p-1 hover:scale-110 transition"
            title="Shortlist"
          >
            {shortlisted ? (
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            ) : (
              <Heart className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>

        <div className="text-sm text-gray-600">
          {ageFromDOB(p.dob)} • {p.community} • {p.city}
        </div>
        <div className="mt-1 text-sm">
          {p.education} • {p.occupation}
        </div>

        <Link
          href={`/profile/${p.id}`}
          className="mt-3 inline-block text-sm font-medium underline underline-offset-4"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
