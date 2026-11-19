"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import TuitionCard from "@/components/TuitionCard";
import { Skeleton } from "@/components/ui/misc";
import { buttonVariants } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";

export default function Featured() {
  const [items, setItems] = useState(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => { apiFetch("/api/tuitions/latest").then(setItems).catch(() => setFailed(true)); }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="section-title">Latest approved tuitions</h2>
          <p className="section-sub mt-3">Fresh batches from tutors who passed our moderation.</p>
        </div>
        <Link href="/tuitions" className={buttonVariants({ variant: "outline" })}>See all tuitions</Link>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {failed ? <p className="col-span-full text-muted-foreground">Could not load tuitions right now. Please refresh.</p>
          : !items ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-96" />)
          : items.map((t) => <TuitionCard key={t._id} t={t} />)}
      </div>
    </section>
  );
}
