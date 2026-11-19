"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/form";

const SUBJECTS = ["Math", "Physics", "Chemistry", "Biology", "English", "Programming", "IELTS"];

export default function Hero() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [subject, setSubject] = useState("");

  const go = (e) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (q.trim()) p.set("search", q.trim());
    if (subject) p.set("subject", subject);
    router.push(`/tuitions?${p.toString()}`);
  };

  return (
    <section className="ruled border-b border-border">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:py-24">
        <div className="lg:pl-16">
          <h1 className="font-display text-4xl font-bold leading-[1.15] sm:text-5xl lg:text-6xl">
            Find your ideal tutor or mentorship batch <span className="highlight">today</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Search tutors by subject, class level, mode and monthly budget. Apply in a minute and track every reply from one dashboard.
          </p>
          <form onSubmit={go} className="mt-8 grid gap-3 rounded-xl border border-border bg-background p-3 shadow-sm sm:grid-cols-[1fr_auto_auto]">
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try 'HSC Physics' or 'IELTS'" aria-label="Search tuitions" />
            <Select value={subject} onChange={(e) => setSubject(e.target.value)} aria-label="Subject" className="sm:w-44">
              <option value="">All subjects</option>
              {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
            </Select>
            <Button type="submit"><Search size={18} /> Find tuitions</Button>
          </form>
        </div>
        <div className="relative lg:pr-4">
          <img
            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1000&q=75"
            alt="A tutor helping a student with homework"
            className="aspect-[4/3] w-full rounded-2xl border border-border object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
