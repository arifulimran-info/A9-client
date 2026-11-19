"use client";
import { Users, GraduationCap, Hourglass, DollarSign } from "lucide-react";
import { PageHeader, StatCard } from "@/components/dashboard/ui";
import { useFetch } from "@/lib/hooks";

export default function AdminOverview() {
  const s = useFetch("/api/admin/stats");
  const d = s.data;
  return (
    <>
      <PageHeader title="Platform overview" subtitle="Live statistics across MentorLagbe." />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Users} label="Total users" value={d?.totalUsers} loading={s.loading} />
        <StatCard icon={GraduationCap} label="Total tutors" value={d?.totalTutors} loading={s.loading} />
        <StatCard icon={Hourglass} label="Pending vs approved" value={d && `${d.pending} / ${d.approved}`} loading={s.loading} />
        <StatCard icon={DollarSign} label="Total Stripe revenue" value={d && `$${d.revenue}`} loading={s.loading} />
      </div>
    </>
  );
}
