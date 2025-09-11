"use client";
import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MOCK_PROFILES, ageFromDOB } from "@/lib/mockProfiles";
import ProfileCard from "@/app/components/ProfileCard";
import { COLORS } from "@/lib/colors";

export default function DashboardPage() {
  const search = useSearchParams();
  const router = useRouter();

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    gender: search.get("gender") || "",
    city: search.get("city") || "",
    community: search.get("community") || "",
    ageMin: search.get("ageMin") || "",
    ageMax: search.get("ageMax") || "",
  });

  function applyFilters(next) {
    const q = new URLSearchParams();
    Object.entries(next).forEach(([k, v]) => {
      if (v) q.set(k, v);
    });
    router.replace(`/dashboard${q.toString() ? "?" + q.toString() : ""}`);
    setFilters(next);
    setShowFilters(false); // 👈 auto-close after apply
  }

  const items = useMemo(() => {
    return MOCK_PROFILES.filter((p) => {
      if (filters.gender && p.gender !== filters.gender) return false;
      if (filters.city && p.city !== filters.city) return false;
      if (filters.community && p.community !== filters.community) return false;
      const age = ageFromDOB(p.dob);
      if (filters.ageMin && age < Number(filters.ageMin)) return false;
      if (filters.ageMax && age > Number(filters.ageMax)) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen py-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top bar with funnel button */}
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Browse Profiles</h1>
          <button
            onClick={() => setShowFilters(true)}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white"
            style={{ backgroundColor: COLORS.teal }}
          >
            {/* funnel icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 4h18l-7 8v6l-4 2v-8L3 4z" />
            </svg>
            Filters
          </button>
        </div>

        {/* Cards grid */}
        {items.length === 0 ? (
          <div className="rounded-xl border bg-white p-8 text-center text-sm text-gray-600">
            No profiles match your filters. Try changing them.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((p) => (
              <ProfileCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>

      {/* Slide-over Drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowFilters(false)}
          />
          {/* panel */}
          <div
            className="absolute inset-y-0 left-0 w-[90%] max-w-[360px] shadow-xl rounded-r-2xl overflow-hidden"
            style={{ backgroundColor: "#fff" }}
          >
            <div
              className="px-4 py-3 font-semibold border-b"
              style={{ backgroundColor: COLORS.light }}
            >
              Filters
            </div>
            <div className="p-4 space-y-4 text-sm">
              <Select
                label="Gender"
                value={filters.gender}
                onChange={(v) => setFilters({ ...filters, gender: v })}
                options={[
                  ["", "Any"],
                  ["M", "Male"],
                  ["F", "Female"],
                  ["OTHER", "Other"],
                ]}
              />
              <Text
                label="City"
                value={filters.city}
                onChange={(v) => setFilters({ ...filters, city: v })}
              />
              <Text
                label="Community"
                value={filters.community}
                onChange={(v) => setFilters({ ...filters, community: v })}
              />
              <div className="grid grid-cols-2 gap-2">
                <Text
                  label="Age min"
                  type="number"
                  value={filters.ageMin}
                  onChange={(v) => setFilters({ ...filters, ageMin: v })}
                />
                <Text
                  label="Age max"
                  type="number"
                  value={filters.ageMax}
                  onChange={(v) => setFilters({ ...filters, ageMax: v })}
                />
              </div>

              <div className="pt-2 grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    const cleared = {
                      gender: "",
                      city: "",
                      community: "",
                      ageMin: "",
                      ageMax: "",
                    };
                    applyFilters(cleared); // also closes
                  }}
                  className="rounded-lg px-3 py-2 text-sm border"
                >
                  Clear
                </button>
                <button
                  onClick={() => applyFilters(filters)}
                  className="rounded-lg px-3 py-2 text-sm text-white"
                  style={{ backgroundColor: COLORS.teal }}
                >
                  Apply
                </button>
              </div>
            </div>

            {/* close button */}
            <button
              onClick={() => setShowFilters(false)}
              className="absolute top-3 right-3 rounded-md p-2 bg-white/80 border"
              aria-label="Close filters"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* inputs */
function Text({ label, value, onChange, type = "text" }) {
  return (
    <label className="block text-sm">
      <span className="block mb-1">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border px-3 py-2"
      />
    </label>
  );
}
function Select({ label, value, onChange, options }) {
  return (
    <label className="block text-sm">
      <span className="block mb-1">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border px-3 py-2 bg-white"
      >
        {options.map(([v, t]) => (
          <option key={v} value={v}>
            {t}
          </option>
        ))}
      </select>
    </label>
  );
}
