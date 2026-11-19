import { Search, FileText, MessageCircle, GraduationCap } from "lucide-react";

const steps = [
  { icon: Search, title: "Search", text: "Filter approved tuitions by subject, class level, mode and fee." },
  { icon: FileText, title: "Apply", text: "Send your phone, preferred schedule and a short learning note." },
  { icon: MessageCircle, title: "Hear back", text: "The tutor accepts or rejects. You see the status live in your dashboard." },
  { icon: GraduationCap, title: "Start learning", text: "Tutors post batches, admins verify them, and classes begin." },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
      <h2 className="section-title">How MentorLagbe works</h2>
      <p className="section-sub mt-3">Four steps for students. Tutors follow the same path in reverse: post, get verified, accept applicants.</p>
      <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className="relative rounded-xl border border-border bg-card p-6">
            <span className="absolute right-5 top-4 font-display text-4xl font-bold text-muted">{i + 1}</span>
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-accent text-accent-foreground"><s.icon size={22} /></span>
            <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
