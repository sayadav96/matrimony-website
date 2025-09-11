"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function LogoutPage() {
  const { logout } = useAuth();
  const router = useRouter();
  useEffect(() => {
    logout();
    router.replace("/login");
  }, [logout, router]);
  return <div className="p-6 text-sm text-gray-600">Logging out…</div>;
}
