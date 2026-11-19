import { Suspense } from "react";
import BrowseTuitions from "./BrowseTuitions";
import { Skeleton } from "@/components/ui/misc";

export const metadata = { title: "Browse Tuitions - MentorLagbe" };

export default function TuitionsPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="section-title">Browse tuitions</h1>
      <p className="section-sub mt-3">Only admin-approved, active listings appear here.</p>
      <Suspense fallback={<Skeleton className="mt-8 h-96" />}>
        <BrowseTuitions />
      </Suspense>
    </section>
  );
}
