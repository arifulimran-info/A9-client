"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Sigma, Atom, Code2, Languages, FlaskConical, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/misc";
import { apiFetch } from "@/lib/api";

const subjects = [
  { name: "Math", icon: Sigma }, { name: "Physics", icon: Atom }, { name: "Programming", icon: Code2 },
  { name: "IELTS", icon: Languages }, { name: "Chemistry", icon: FlaskConical }, { name: "English", icon: BookOpen },
];
const reviews = [
  { name: "Ayesha S.", role: "HSC student", text: "I found a Physics batch within my budget and the tutor replied the same evening." },
  { name: "Rahim U.", role: "Math tutor", text: "My batch got verified quickly and I now manage every applicant from one place." },
  { name: "Mahmud H.", role: "IELTS learner", text: "Filtering by online mode saved me hours. Applying took less than a minute." },
];

export default function Subjects() {
  const [stats, setStats] = useState(null);
  useEffect(() => { apiFetch("/api/stats/public").then(setStats).catch(() => {}); }, []);
  const counters = [
    ["Verified tutors", stats?.tutors], ["Students", stats?.students],
    ["Live tuitions", stats?.tuitions], ["Subjects", stats?.subjects],
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
      <h2 className="section-title">Popular subjects</h2>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {subjects.map((s) => (
          <Link key={s.name} href={`/tuitions?subject=${s.name}`}>
            <Card className="flex h-full flex-col items-center gap-3 p-5 text-center hover:border-primary">
              <s.icon className="text-primary" size={28} />
              <span className="font-semibold">{s.name}</span>
            </Card>
          </Link>
        ))}
      </div>
      <dl className="mt-10 grid grid-cols-2 gap-4 rounded-xl bg-primary p-8 text-primary-foreground lg:grid-cols-4">
        {counters.map(([label, v]) => (
          <div key={label} className="text-center">
            <dd className="font-display text-4xl font-bold">{v ?? "-"}</dd>
            <dt className="mt-1 text-sm opacity-80">{label}</dt>
          </div>
        ))}
      </dl>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {reviews.map((r) => (
          <Card key={r.name} className="flex h-full flex-col p-6">
            <p className="flex-1 leading-relaxed">"{r.text}"</p>
            <p className="mt-5 text-sm"><span className="font-semibold">{r.name}</span> <span className="text-muted-foreground">- {r.role}</span></p>
          </Card>
        ))}
      </div>
    </section>
  );
}
