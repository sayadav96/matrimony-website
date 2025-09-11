"use client";
import Guard from "@/app/components/Guard";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  loadCreatedProfiles,
  deleteProfile,
  toggleActive,
} from "@/lib/profiles";
import { COLORS } from "@/lib/colors";

export default function MyProfilesPage() {
  const [items, setItems] = useState([]);

  function refresh() {
    setItems(loadCreatedProfiles());
  }
  useEffect(() => {
    refresh();
  }, []);

  return (
    <Guard>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">My Profiles</h1>
          <Link
            href="/upload"
            className="rounded-lg px-3 py-2 text-sm text-white"
            style={{ backgroundColor: COLORS.teal }}
          >
            + Create New
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="rounded-xl border bg-white p-8 text-center text-sm text-gray-600">
            You haven’t created any profiles yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((p) => (
              <div
                key={p.id}
                className="rounded-xl border bg-white overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.photos?.[0] || "/demo/placeholder.jpg"}
                  alt={p.name}
                  className="aspect-[3/4] w-full object-cover"
                />
                <div className="p-3 space-y-1">
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-xs text-gray-600">
                    {new Date(p.createdAt).toLocaleDateString()} ·{" "}
                    {p.active ? "Active" : "Inactive"}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Link
                      href={`/profile/${p.id}`}
                      className="text-sm underline underline-offset-4"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => {
                        toggleActive(p.id);
                        refresh();
                      }}
                      className="text-sm"
                      style={{ color: COLORS.mustard }}
                    >
                      {p.active ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Delete this profile?")) {
                          deleteProfile(p.id);
                          refresh();
                        }
                      }}
                      className="text-sm text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Guard>
  );
}
