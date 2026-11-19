"use client";
import { useState } from "react";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/ui";
import { Badge, Card } from "@/components/ui/misc";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Textarea } from "@/components/ui/form";
import { useAuth } from "@/context/AuthContext";
import { apiFetch, uploadToImgBB } from "@/lib/api";

export default function ProfilePage() {
  const { user, token, refresh } = useAuth();
  const [f, setF] = useState({ name: user.name, phone: user.phone || "", bio: user.bio || "", image: user.image || "" });
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const pickImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast.error("Please choose an image file");
    if (file.size > 5 * 1024 * 1024) return toast.error("Image must be under 5 MB");
    setUploading(true);
    try {
      const url = await uploadToImgBB(file);
      setF((p) => ({ ...p, image: url }));
      toast.success("Photo uploaded. Press Save to keep it.");
    } catch (err) { toast.error(err.message); }
    setUploading(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    if (f.name.trim().length < 2) err.name = "Name must be at least 2 characters";
    if (f.phone && !/^(\+?88)?01[3-9]\d{8}$/.test(f.phone.replace(/[\s-]/g, ""))) err.phone = "Enter a valid Bangladeshi mobile number";
    setErrors(err);
    if (Object.keys(err).length) return;
    setBusy(true);
    try {
      await apiFetch("/api/users/me", { token, method: "PATCH", body: f });
      toast.success("Profile updated");
      refresh();
    } catch (e) { toast.error(e.message); }
    setBusy(false);
  };

  return (
    <>
      <PageHeader title="Update profile" subtitle="Your name, phone, bio and photo." />
      <Card className="max-w-2xl p-6">
        <form onSubmit={submit} noValidate className="space-y-5">
          <div className="flex items-center gap-5">
            {f.image ? <img src={f.image} alt="Profile" className="h-24 w-24 rounded-full border border-border object-cover" />
              : <span className="grid h-24 w-24 place-items-center rounded-full bg-primary text-3xl font-bold text-primary-foreground">{f.name[0]?.toUpperCase()}</span>}
            <div>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:bg-muted">
                <Camera size={16} /> {uploading ? "Uploading..." : "Upload photo"}
                <input type="file" accept="image/*" className="sr-only" onChange={pickImage} disabled={uploading} />
              </label>
              <p className="mt-2 text-xs text-muted-foreground">JPG or PNG, up to 5 MB. Uploaded through ImgBB.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><Label htmlFor="name">Full name</Label><Input id="name" value={f.name} onChange={set("name")} /><FieldError>{errors.name}</FieldError></div>
            <div><Label htmlFor="email">Email</Label><Input id="email" value={user.email} disabled /></div>
            <div><Label htmlFor="phone">Phone</Label><Input id="phone" value={f.phone} onChange={set("phone")} placeholder="01XXXXXXXXX" /><FieldError>{errors.phone}</FieldError></div>
            <div><Label>Role and plan</Label><div className="flex h-11 items-center gap-2"><Badge tone="primary" className="capitalize">{user.role}</Badge><Badge tone={user.plan === "pro" ? "accent" : "neutral"} className="uppercase">{user.plan}</Badge></div></div>
          </div>
          <div><Label htmlFor="bio">Bio</Label><Textarea id="bio" value={f.bio} onChange={set("bio")} placeholder="Tell students or tutors about yourself" /></div>
          <Button type="submit" disabled={busy || uploading}>{busy ? "Saving..." : "Save changes"}</Button>
        </form>
      </Card>
    </>
  );
}
