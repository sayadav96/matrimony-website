"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function Guard({ children }) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user === null) {
      // user state still loading, do nothing
      return;
    }
    if (!user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [user, router, pathname]);

  if (!user) {
    // tiny placeholder while deciding/redirecting
    return <div className="p-6 text-sm text-gray-600">Checking access…</div>;
  }
  return children;
}
