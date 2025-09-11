// lib/mockProfiles.js
export const MOCK_PROFILES = [
  {
    id: "p1",
    name: "Aarav Sharma",
    dob: "1996-04-12",
    gender: "M",
    community: "Gawli",
    city: "Pune",
    education: "B.E.",
    occupation: "Software Engineer",
    photos: ["/demo/1.jpg"], // put a few images in /public/demo
  },
  {
    id: "p2",
    name: "Isha Patil",
    dob: "1998-09-01",
    gender: "F",
    community: "Gawli",
    city: "Mumbai",
    education: "MBA",
    occupation: "Analyst",
    photos: ["/demo/2.jpg"],
  },
  // add ~8 more for variety
];

export function ageFromDOB(dobStr) {
  const d = new Date(dobStr);
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
  return age;
}
