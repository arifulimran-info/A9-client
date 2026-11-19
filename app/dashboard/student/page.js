"use client";
import { ClipboardList, CheckCircle2, Hourglass, Crown } from "lucide-react";
import { PageHeader, StatCard } from "@/components/dashboard/ui";
import { useFetch } from "@/lib/hooks";
import { useAuth } from "@/context/AuthContext";

export default function StudentOverview() {
  const { user } = useAuth();
  const s = useFetch("/api/stats/student");
  const d = s.data;
  return (
    <>
      <PageHeader title={`Welcome, ${user.name.split(" ")[0]}`} subtitle="Your tuition applications at a glance." />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={ClipboardList} label="Total applied tuitions" value={d?.total} loading={s.loading} />
        <StatCard icon={CheckCircle2} label="Accepted applications" value={d?.accepted} loading={s.loading} />
        <StatCard icon={Hourglass} label="Pending applications" value={d?.pending} loading={s.loading} />
        <StatCard icon={Crown} label="Current plan" value={d?.plan} loading={s.loading} />
      </div>
    </>
  );
}
