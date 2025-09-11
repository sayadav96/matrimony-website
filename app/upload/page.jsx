"use client";
import { useMemo, useState } from "react";
import { COLORS } from "@/lib/colors";
import Guard from "@/app/components/Guard";

/** Language packs */
const L = {
  en: {
    title: "Create Profile",
    step: (a, b) => `Step ${a} of ${b}`,
    basics: "Basics",
    family: "Parents' Details",
    eduWork: "Education & Work",
    photos: "Photos",
    name: "Name",
    birthName: "Birth Name",
    dob: "Date of Birth",
    birthPlace: "Place of Birth",
    birthTime: "Time of Birth",
    height: "Height (cm)",
    motherFullName: "Mother’s Full Name",
    fatherFullName: "Father’s Full Name",
    firstName: "First Name",
    middleName: "Middle Name",
    gotra: "Gotra (write gotra here)",
    education: "Highest Education",
    occupation: "Occupation",
    salary: "Salary (₹ per year)",
    about: "About (optional)",
    photosHelp: "Add up to 5 photos (paste image URLs for now; uploads later).",
    add: "Add",
    remove: "Remove",
    back: "Back",
    continue: "Continue",
    save: "Save Profile",
    lang: "हिंदी",
  },
  hi: {
    title: "प्रोफ़ाइल बनाएँ",
    step: (a, b) => `कदम ${a} / ${b}`,
    basics: "मूल जानकारी",
    family: "माता-पिता का विवरण",
    eduWork: "शिक्षा व काम",
    photos: "फ़ोटो",
    name: "नाम",
    birthName: "जन्म के समय का नाम",
    dob: "जन्म तिथि",
    birthPlace: "जन्म स्थान",
    birthTime: "जन्म का समय",
    height: "लंबाई (सेमी)",
    motherFullName: "माता का पूरा नाम",
    fatherFullName: "पिता का पूरा नाम",
    firstName: "पहला नाम",
    middleName: "मध्य नाम",
    gotra: "गोत्र (यहाँ गोत्र लिखें)",
    education: "उच्चतम शिक्षा",
    occupation: "पेशा",
    salary: "वेतन (₹ प्रति वर्ष)",
    about: "अपने बारे में (वैकल्पिक)",
    photosHelp:
      "अधिकतम 5 फ़ोटो जोड़ें (अभी के लिए URL पेस्ट करें; अपलोड बाद में)।",
    add: "जोड़ें",
    remove: "हटाएँ",
    back: "पीछे",
    continue: "आगे",
    save: "प्रोफ़ाइल सहेजें",
    lang: "English",
  },
};

const STEPS = ["basics", "family", "eduWork", "photos"];

export default function UploadProfilePage() {
  const [lang, setLang] = useState("en"); // "en" | "hi"
  const t = useMemo(() => L[lang], [lang]);
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    // Basics
    name: "",
    birthName: "",
    dob: "",
    birthPlace: "",
    birthTime: "",
    heightCm: "",
    // Parents
    motherFirst: "",
    motherMiddle: "",
    motherGotra: "",
    fatherFirst: "",
    fatherMiddle: "",
    fatherGotra: "",
    // Edu & Work
    education: "",
    occupation: "",
    salary: "",
    about: "",
    // Photos
    photos: [],
  });

  function update(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  function next() {
    if (step < STEPS.length - 1) setStep(step + 1);
  }
  function back() {
    if (step > 0) setStep(step - 1);
  }

async function onSubmit(e) {
  e.preventDefault();

  // 1) Validate
  if (!form.name || !form.dob || !form.birthPlace || !form.birthTime) {
    alert(lang === "en" ? "Please fill required fields." : "कृपया आवश्यक जानकारी भरें।");
    return; // <- important
  }

  // 2) Build payload
  const id = "local-" + Date.now();
  const payload = {
    id,
    ownerEmail: user?.email || null,       // make sure: const { user } = useAuth();
    createdAt: new Date().toISOString(),
    active: true,
    name: form.name,
    dob: form.dob,
    community: form.community || "Gawli",   // ok if undefined in this form
    city: form.city || "",
    education: form.education || "",
    occupation: form.occupation || "",
    photos: Array.isArray(form.photos) && form.photos.length
      ? form.photos
      : ["/demo/placeholder.jpg"],
    _raw: form, // keep full form for future edits
  };

  // 3) Save locally and go to My Profiles
  saveCreatedProfile(payload);              // import from "@/lib/profiles"
  alert(lang === "en"
    ? "Profile saved locally. You can see it under My Profiles."
    : "प्रोफ़ाइल लोकली सेव हो गई। आप इसे 'My Profiles' में देख सकते हैं।"
  );
  router.push("/my-profiles");
}


  return (
    <Guard>
      <div className="mx-auto max-w-3xl mt-15">
        <div className="rounded-2xl border shadow-sm bg-white overflow-hidden">
          <div
            className="h-2 w-full"
            style={{ backgroundColor: COLORS.teal }}
          />
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold mb-1">{t.title}</h1>
                <p className="text-sm text-gray-600">
                  {t.step(step + 1, STEPS.length)}: <b>{t[STEPS[step]]}</b>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLang((l) => (l === "en" ? "hi" : "en"))}
                className="px-3 py-1.5 rounded-lg border text-sm"
              >
                {t.lang}
              </button>
            </div>

            <form onSubmit={onSubmit} className="mt-6 space-y-6">
              {/* BASICS */}
              {step === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Text
                    label={`${t.name} / ${L.hi.name}`}
                    value={form.name}
                    onChange={(v) => update("name", v)}
                    placeholder={
                      lang === "en" ? "e.g., Aarav Sharma" : "उदा., आरव शर्मा"
                    }
                  />
                  <Text
                    label={`${t.birthName} / ${L.hi.birthName}`}
                    value={form.birthName}
                    onChange={(v) => update("birthName", v)}
                    placeholder={
                      lang === "en"
                        ? "as on birth certificate"
                        : "जन्म प्रमाणपत्र के अनुसार"
                    }
                  />
                  <Text
                    label={`${t.dob} / ${L.hi.dob}`}
                    type="date"
                    value={form.dob}
                    onChange={(v) => update("dob", v)}
                  />
                  <Text
                    label={`${t.height} / ${L.hi.height}`}
                    type="number"
                    value={form.heightCm}
                    onChange={(v) => update("heightCm", v)}
                    placeholder={lang === "en" ? "e.g., 170" : "उदा., 170"}
                  />
                  <Text
                    label={`${t.birthPlace} / ${L.hi.birthPlace}`}
                    value={form.birthPlace}
                    onChange={(v) => update("birthPlace", v)}
                    placeholder={
                      lang === "en" ? "City / Hospital" : "शहर / अस्पताल"
                    }
                  />
                  <Text
                    label={`${t.birthTime} / ${L.hi.birthTime}`}
                    type="time"
                    value={form.birthTime}
                    onChange={(v) => update("birthTime", v)}
                  />
                  <div className="md:col-span-2">
                    <Textarea
                      label={`${t.about} / ${L.hi.about}`}
                      value={form.about}
                      onChange={(v) => update("about", v)}
                      rows={4}
                      placeholder={
                        lang === "en"
                          ? "A short introduction (family values, interests, expectations)…"
                          : "संक्षिप्त परिचय (पारिवारिक मूल्य, रुचियाँ, अपेक्षाएँ)…"
                      }
                    />
                  </div>
                </div>
              )}

              {/* PARENTS */}
              {step === 1 && (
                <div className="space-y-5">
                  <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <legend className="text-sm font-semibold mb-2">
                      {t.motherFullName} / {L.hi.motherFullName}
                    </legend>
                    <Text
                      label={`${t.firstName} / ${L.hi.firstName}`}
                      value={form.motherFirst}
                      onChange={(v) => update("motherFirst", v)}
                    />
                    <Text
                      label={`${t.middleName} / ${L.hi.middleName}`}
                      value={form.motherMiddle}
                      onChange={(v) => update("motherMiddle", v)}
                    />
                    <Text
                      label={`${t.gotra} / ${L.hi.gotra}`}
                      value={form.motherGotra}
                      onChange={(v) => update("motherGotra", v)}
                      placeholder={
                        lang === "en" ? "e.g., Kashyap" : "उदा., कश्यप"
                      }
                    />
                  </fieldset>

                  <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <legend className="text-sm font-semibold mb-2">
                      {t.fatherFullName} / {L.hi.fatherFullName}
                    </legend>
                    <Text
                      label={`${t.firstName} / ${L.hi.firstName}`}
                      value={form.fatherFirst}
                      onChange={(v) => update("fatherFirst", v)}
                    />
                    <Text
                      label={`${t.middleName} / ${L.hi.middleName}`}
                      value={form.fatherMiddle}
                      onChange={(v) => update("fatherMiddle", v)}
                    />
                    <Text
                      label={`${t.gotra} / ${L.hi.gotra}`}
                      value={form.fatherGotra}
                      onChange={(v) => update("fatherGotra", v)}
                      placeholder={
                        lang === "en" ? "e.g., Bharadwaj" : "उदा., भारद्वाज"
                      }
                    />
                  </fieldset>
                </div>
              )}

              {/* EDUCATION & WORK */}
              {step === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Text
                    label={`${t.education} / ${L.hi.education}`}
                    value={form.education}
                    onChange={(v) => update("education", v)}
                    placeholder={
                      lang === "en" ? "e.g., B.E., MBA" : "उदा., बी.ई., एमबीए"
                    }
                  />
                  <Text
                    label={`${t.occupation} / ${L.hi.occupation}`}
                    value={form.occupation}
                    onChange={(v) => update("occupation", v)}
                    placeholder={
                      lang === "en"
                        ? "e.g., Software Engineer"
                        : "उदा., सॉफ्टवेयर इंजीनियर"
                    }
                  />
                  <Text
                    label={`${t.salary} / ${L.hi.salary}`}
                    type="number"
                    value={form.salary}
                    onChange={(v) => update("salary", v)}
                    placeholder={
                      lang === "en" ? "e.g., 1200000" : "उदा., 1200000"
                    }
                  />
                </div>
              )}

              {/* PHOTOS */}
              {step === 3 && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">{t.photosHelp}</p>
                  <PhotoList
                    lang={lang}
                    t={t}
                    photos={form.photos}
                    setPhotos={(arr) => update("photos", arr)}
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className="px-4 py-2 rounded-lg border disabled:opacity-50"
                >
                  {t.back}
                </button>
                {step < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={next}
                    className="px-5 py-2.5 rounded-xl text-white font-semibold"
                    style={{ backgroundColor: COLORS.teal }}
                  >
                    {t.continue}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-white font-semibold"
                    style={{ backgroundColor: COLORS.mustard }}
                  >
                    {t.save}
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="h-2 w-full flex">
            <div className="flex-1" style={{ backgroundColor: COLORS.mint }} />
            <div className="flex-1" style={{ backgroundColor: COLORS.teal }} />
            <div className="flex-1" style={{ backgroundColor: COLORS.light }} />
            <div
              className="flex-1"
              style={{ backgroundColor: COLORS.mustard }}
            />
          </div>
        </div>
      </div>
    </Guard>
  );
}

/* ---------- Tiny reusable inputs ---------- */
function Text({ label, value, onChange, type = "text", placeholder }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
      />
    </div>
  );
}

function Textarea({ label, value, onChange, rows = 4, placeholder }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
      />
    </div>
  );
}

function PhotoList({ photos, setPhotos, t }) {
  const [url, setUrl] = useState("");
  function add() {
    if (!url.trim()) return;
    if (photos.length >= 5) return alert("Max 5 photos");
    setPhotos([...photos, url.trim()]);
    setUrl("");
  }
  function remove(i) {
    const next = photos.slice();
    next.splice(i, 1);
    setPhotos(next);
  }
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://…"
          className="flex-1 rounded-lg border px-3 py-2"
        />
        <button
          type="button"
          onClick={add}
          className="px-4 py-2 rounded-lg text-white"
          style={{ backgroundColor: COLORS.teal }}
        >
          {t.add}
        </button>
      </div>
      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {photos.map((p, i) => (
            <div key={i} className="relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p}
                alt={`photo-${i}`}
                className="h-36 w-full object-cover rounded-lg border"
              />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-2 right-2 px-2 py-1 text-xs rounded-md text-white"
                style={{ backgroundColor: COLORS.mustard }}
              >
                {t.remove}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
