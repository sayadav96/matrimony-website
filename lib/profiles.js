// lib/profiles.js
"use client";

const KEY = "created_profiles";
const SHORTLIST_KEY = "shortlist_ids";

export function loadCreatedProfiles() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
export function saveCreatedProfile(p) {
  const all = loadCreatedProfiles();
  all.unshift(p);
  localStorage.setItem(KEY, JSON.stringify(all));
  return p;
}
export function deleteProfile(id) {
  const all = loadCreatedProfiles().filter((p) => p.id !== id);
  localStorage.setItem(KEY, JSON.stringify(all));
}
export function toggleActive(id) {
  const all = loadCreatedProfiles().map((p) =>
    p.id === id ? { ...p, active: !p.active } : p
  );
  localStorage.setItem(KEY, JSON.stringify(all));
}

export function loadShortlist() {
  try {
    return JSON.parse(localStorage.getItem(SHORTLIST_KEY) || "[]");
  } catch {
    return [];
  }
}
export function toggleShortlist(id) {
  const set = new Set(loadShortlist());
  set.has(id) ? set.delete(id) : set.add(id);
  localStorage.setItem(SHORTLIST_KEY, JSON.stringify([...set]));
  return [...set];
}
