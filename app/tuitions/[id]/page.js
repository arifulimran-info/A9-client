"use client";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, MapPin, Monitor, Wallet, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Badge, Card, Skeleton } from "@/components/ui/misc";
import { Button, buttonVariants } from "@/components/ui/button";
import { FieldError, Input, Label, Textarea } from "@/components/ui/form";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { money } from "@/lib/utils";

export default function TuitionDetails({ params }) {
  const { id } = use(params);
  const { user, token, loading } = useAuth();
  const [t, setT] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [applied, setApplied] = useState(false);
  const [form, setForm] = useState({ studentPhone: "", preferredSchedule: "", studentNote: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    apiFetch(`/api/tuitions/${id}`).then(setT).catch(() => setNotFound(true));
  }, [id]);

  useEffect(() => {
    if (user?.role === "student" && token) {
      apiFetch(`/api/applications/check/${id}`, { token }).then((r) => setApplied(r.applied)).catch(() => {});
    }
  }, [user, token, id]);

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    if (!/^(\+?88)?01[3-9]\d{8}$/.test(form.studentPhone.replace(/[\s-]/g, ""))) err.studentPhone = "Enter a valid Bangladeshi mobile number";
    if (!form.preferredSchedule.trim()) err.preferredSchedule = "Preferred schedule is required";
    setErrors(err);
    if (Object.keys(err).length) return;
    setBusy(true);
    try {
      await apiFetch("/api/applications", { token, method: "POST", body: { tuitionId: id, ...form } });
      toast.success("Application sent");
      setApplied(true);
    } catch (e) {
      toast.error(e.message);
      if (e.status === 409) setApplied(true);
    } finally { setBusy(false); }
  };

  if (notFound) return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="section-title">Tuition not found</h1>
      <p className="section-sub mx-auto mt-3">This listing may have been removed or is not available.</p>
      <Link href="/tuitions" className={buttonVariants({ className: "mt-6" })}>Browse tuitions</Link>
    </div>
  );
  if (!t) return <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6"><Skeleton className="h-[32rem]" /></div>;

  const info = [
    [Wallet, "Monthly fee", money(t.monthlyFee)],
    [Calendar, "Schedule", `${t.daysPerWeek} days per week`],
    [t.mode === "Online" ? Monitor : MapPin, "Mode and location", `${t.mode} - ${t.location}`],
  ];

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.6fr_1fr]">
      <article>
        <img src={t.bannerImage} alt={t.title} className="aspect-[16/8] w-full rounded-2xl border border-border object-cover" />
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge tone="primary">{t.subject}</Badge><Badge>{t.classLevel}</Badge>
          <Badge tone={t.mode === "Online" ? "success" : "accent"}>{t.mode}</Badge>
        </div>
        <h1 className="section-title mt-4">{t.title}</h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {info.map(([Icon, label, value]) => (
            <Card key={label} className="p-4">
              <Icon size={20} className="text-primary" />
              <p className="mt-2 text-sm text-muted-foreground">{label}</p>
              <p className="font-semibold">{value}</p>
            </Card>
          ))}
        </div>
        <h2 className="mt-10 text-xl font-semibold">About this tuition</h2>
        <p className="mt-3 max-w-prose whitespace-pre-line leading-relaxed text-muted-foreground">{t.description}</p>
        <Card className="mt-10 flex items-center gap-4 p-5">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground"><UserRound /></span>
          <div><p className="text-sm text-muted-foreground">Tutor</p><p className="font-semibold">{t.tutorName}</p><p className="text-sm text-muted-foreground">{t.tutorEmail}</p></div>
        </Card>
      </article>

      <aside>
        <Card className="sticky top-24 p-6">
          <p className="font-display text-3xl font-bold">{money(t.monthlyFee)}<span className="text-base font-normal text-muted-foreground"> /month</span></p>
          <div className="mt-5">
            {loading ? <Skeleton className="h-40" />
              : !user ? (
                <>
                  <p className="text-sm text-muted-foreground">Sign in as a student to apply for this tuition.</p>
                  <Link href={`/sign-in?redirect=/tuitions/${id}`} className={buttonVariants({ className: "mt-4 w-full" })}>Sign in to apply</Link>
                </>
              ) : user.role !== "student" ? (
                <>
                  <p className="rounded-lg bg-muted p-3 text-sm">Only students can apply. You are signed in as a {user.role}.</p>
                  <Button disabled className="mt-4 w-full">Apply Now</Button>
                </>
              ) : applied ? (
                <p className="rounded-lg bg-success/15 p-4 text-sm font-medium text-success">You have applied for this tuition. Track it in My Applications.</p>
              ) : (
                <form onSubmit={submit} className="space-y-4" noValidate>
                  <div><Label htmlFor="phone">Phone</Label><Input id="phone" value={form.studentPhone} onChange={(e) => setForm({ ...form, studentPhone: e.target.value })} placeholder="01XXXXXXXXX" /><FieldError>{errors.studentPhone}</FieldError></div>
                  <div><Label htmlFor="sched">Preferred schedule</Label><Input id="sched" value={form.preferredSchedule} onChange={(e) => setForm({ ...form, preferredSchedule: e.target.value })} placeholder="Sat, Mon, Wed - 6 PM" /><FieldError>{errors.preferredSchedule}</FieldError></div>
                  <div><Label htmlFor="note">Learning note</Label><Textarea id="note" value={form.studentNote} onChange={(e) => setForm({ ...form, studentNote: e.target.value })} placeholder="What do you want to improve?" /></div>
                  <Button type="submit" variant="accent" className="w-full" disabled={busy}>{busy ? "Sending..." : "Apply for tuition"}</Button>
                </form>
              )}
          </div>
        </Card>
      </aside>
    </div>
  );
}
