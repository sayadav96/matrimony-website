"use client";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* Banner */}
      <div className="rounded-xl overflow-hidden shadow-lg mb-8">
        <Image
          src="/images/home-banner.png" // replace with your uploaded image path
          alt="Banner"
          width={600}
          height={300}
          className="w-full object-cover"
          priority
        />
      </div>

      {/* Instructions in Hindi */}
      <section className="bg-white rounded-xl shadow p-6 space-y-4 text-lg leading-relaxed">
        <h2 className="text-2xl font-bold mb-4 text-center text-teal-700">
          वेबसाइट का उपयोग कैसे करें
        </h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>सबसे पहले अपनी प्रोफ़ाइल बनाएँ।</li>
          <li>प्रोफ़ाइल में नाम, जन्मतिथि, शिक्षा और फ़ोटो ज़रूर जोड़ें।</li>
          <li>दूसरों की प्रोफ़ाइल देखें और शॉर्टलिस्ट करें।</li>
          <li>कॉन्टैक्ट डिटेल्स देखने के लिए "Unlock" विकल्प का उपयोग करें।</li>
          <li>
            सारी जानकारी सुरक्षित रखी जाती है और केवल आपकी अनुमति पर दिखाई
            जाएगी।
          </li>
        </ol>
        <div className="text-center mt-6">
          <Link
            href="/upload"
            className="px-6 py-3 rounded-xl font-semibold text-white"
            style={{ backgroundColor: "#00897B" }}
          >
            प्रोफ़ाइल बनाएँ
          </Link>
        </div>
      </section>
    </main>
  );
}
