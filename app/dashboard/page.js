"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

// Sends each role to its own dashboard. Waits for auth so a reload never bounces a signed-in user.
export default function DashboardIndex() {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (loading) return;
    router.replace(user ? `/dashboard/${user.role}` : "/sign-in?redirect=/dashboard");
  }, [user, loading, router]);
  return <div className="grid min-h-[60vh] place-items-center"><Loader2 className="animate-spin text-primary" size={40} /></div>;
}
