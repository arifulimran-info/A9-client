"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import AuthShell from "@/components/AuthShell";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label } from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/context/AuthContext";

function SignInForm() {
  const router = useRouter();
  const redirect = useSearchParams().get("redirect") || "/dashboard";
  const { refresh } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email address";
    if (form.password.length < 6) err.password = "Password must be at least 6 characters";
    setErrors(err);
    if (Object.keys(err).length) return;
    setBusy(true);
    const { error } = await authClient.signIn.email(form);
    setBusy(false);
    if (error) return toast.error(error.message || "Wrong email or password");
    toast.success("Signed in");
    refresh();
    router.push(redirect);
  };

  const google = () => authClient.signIn.social({ provider: "google", callbackURL: `${window.location.origin}${redirect}` });

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to manage your applications and tuitions.">
      <form onSubmit={submit} className="space-y-4" noValidate>
        <div><Label htmlFor="email">Email</Label><Input id="email" type="email" value={form.email} onChange={set("email")} /><FieldError>{errors.email}</FieldError></div>
        <div><Label htmlFor="password">Password</Label><Input id="password" type="password" value={form.password} onChange={set("password")} /><FieldError>{errors.password}</FieldError></div>
        <Button type="submit" className="w-full" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</Button>
      </form>
      <Button variant="outline" className="mt-3 w-full" onClick={google}>Continue with Google</Button>
      <p className="mt-6 text-center text-sm text-muted-foreground">New here? <Link href="/sign-up" className="font-semibold text-primary">Create an account</Link></p>
    </AuthShell>
  );
}

export default function SignIn() {
  return <Suspense><SignInForm /></Suspense>;
}
