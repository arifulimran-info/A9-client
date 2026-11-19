"use client";
import { Library, BadgeCheck, Users, Crown } from "lucide-react";
import { PageHeader, StatCard } from "@/components/dashboard/ui";
import { useFetch } from "@/lib/hooks";
import { useAuth } from "@/context/AuthContext";

export default function TutorOverview() {
  const { user } = useAuth();
  const s = useFetch("/api/stats/tutor");
  const d = s.data;
  return (
    <>
      <PageHeader title={`Welcome, ${user.name.split(" ")[0]}`} subtitle="How your tuitions are doing." />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Library} label="Total tuitions posted" value={d?.totalTuitions} loading={s.loading} />
        <StatCard icon={BadgeCheck} label="Active and approved" value={d?.activeApproved} loading={s.loading} />
        <StatCard icon={Users} label="Total applicants" value={d?.totalApplicants} loading={s.loading} />
        <StatCard icon={Crown} label="Current plan" value={d?.plan} loading={s.loading} />
      </div>
    </>
  );
}
