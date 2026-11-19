"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, BookOpen } from "lucide-react";
import { toast } from "sonner";
import AuthShell from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label } from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const roles = [
  { value: "student", label: "Student", icon: BookOpen, text: "Find and apply for tuitions" },
  { value: "tutor", label: "Tutor", icon: GraduationCap, text: "Post batches and mentor" },
];

export default function SignUp() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Full name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email address";
    if (form.password.length < 6) err.password = "Password must be at least 6 characters";
    setErrors(err);
    if (Object.keys(err).length) return;
    setBusy(true);
    const { error } = await authClient.signUp.email({ ...form, name: form.name.trim() });
    setBusy(false);
    if (error) return toast.error(error.message || "Could not create your account");
    toast.success("Account created. Welcome to MentorLagbe!");
    refresh();
    router.push("/dashboard");
  };

  return (
    <AuthShell title="Create your account" subtitle="Join as a student or a tutor. It is free to start.">
      <form onSubmit={submit} className="space-y-4" noValidate>
        <div className="grid grid-cols-2 gap-3">
          {roles.map((r) => (
            <button type="button" key={r.value} onClick={() => setForm({ ...form, role: r.value })}
              className={cn("rounded-lg border p-3 text-left cursor-pointer", form.role === r.value ? "border-primary bg-primary/10" : "border-border hover:bg-muted")}>
              <r.icon size={20} className="text-primary" />
              <p className="mt-1 text-sm font-semibold">{r.label}</p>
              <p className="text-xs text-muted-foreground">{r.text}</p>
            </button>
          ))}
        </div>
        <div><Label htmlFor="name">Full name</Label><Input id="name" value={form.name} onChange={set("name")} /><FieldError>{errors.name}</FieldError></div>
        <div><Label htmlFor="email">Email</Label><Input id="email" type="email" value={form.email} onChange={set("email")} /><FieldError>{errors.email}</FieldError></div>
        <div><Label htmlFor="password">Password</Label><Input id="password" type="password" value={form.password} onChange={set("password")} /><FieldError>{errors.password}</FieldError></div>
        <Button type="submit" className="w-full" disabled={busy}>{busy ? "Creating account..." : "Create account"}</Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">Already have an account? <Link href="/sign-in" className="font-semibold text-primary">Sign in</Link></p>
    </AuthShell>
  );
}
