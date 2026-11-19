"use client";
import { useState } from "react";
import { ImagePlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldError, Input, Label, Select, Textarea } from "@/components/ui/form";
import { uploadToImgBB } from "@/lib/api";

export const SUBJECTS = ["Math", "Physics", "Chemistry", "Biology", "English", "Programming", "IELTS"];
export const CLASS_LEVELS = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12", "Undergraduate"];

const blank = { title: "", subject: SUBJECTS[0], classLevel: CLASS_LEVELS[4], mode: "Online", location: "", monthlyFee: "", daysPerWeek: "", description: "", bannerImage: "" };

export default function TuitionForm({ initial, onSubmit, submitLabel }) {
  const [f, setF] = useState({ ...blank, ...initial });
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
      setF((p) => ({ ...p, bannerImage: url }));
      toast.success("Banner uploaded");
    } catch (err) { toast.error(err.message); }
    setUploading(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    if (f.title.trim().length < 5) err.title = "Title must be at least 5 characters";
    if (!f.location.trim()) err.location = "Location is required";
    if (!(Number(f.monthlyFee) > 0)) err.monthlyFee = "Enter a fee greater than 0";
    if (!(Number(f.daysPerWeek) >= 1 && Number(f.daysPerWeek) <= 7)) err.daysPerWeek = "Days per week must be 1 to 7";
    if (f.description.trim().length < 20) err.description = "Description must be at least 20 characters";
    if (!f.bannerImage) err.bannerImage = "Upload a banner image";
    setErrors(err);
    if (Object.keys(err).length) return;
    setBusy(true);
    await onSubmit({ ...f, title: f.title.trim() });
    setBusy(false);
  };

  return (
    <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2"><Label htmlFor="title">Title</Label><Input id="title" value={f.title} onChange={set("title")} /><FieldError>{errors.title}</FieldError></div>
      <div><Label htmlFor="subject">Subject</Label><Select id="subject" value={f.subject} onChange={set("subject")}>{SUBJECTS.map((s) => <option key={s}>{s}</option>)}</Select></div>
      <div><Label htmlFor="class">Class level</Label><Select id="class" value={f.classLevel} onChange={set("classLevel")}>{CLASS_LEVELS.map((s) => <option key={s}>{s}</option>)}</Select></div>
      <div><Label htmlFor="mode">Mode</Label><Select id="mode" value={f.mode} onChange={set("mode")}><option>Online</option><option>Offline</option></Select></div>
      <div><Label htmlFor="loc">Location</Label><Input id="loc" value={f.location} onChange={set("location")} placeholder="Remote or area name" /><FieldError>{errors.location}</FieldError></div>
      <div><Label htmlFor="fee">Monthly fee (BDT)</Label><Input id="fee" type="number" min="1" value={f.monthlyFee} onChange={set("monthlyFee")} /><FieldError>{errors.monthlyFee}</FieldError></div>
      <div><Label htmlFor="days">Days per week</Label><Input id="days" type="number" min="1" max="7" value={f.daysPerWeek} onChange={set("daysPerWeek")} /><FieldError>{errors.daysPerWeek}</FieldError></div>
      <div className="sm:col-span-2"><Label htmlFor="desc">Description</Label><Textarea id="desc" value={f.description} onChange={set("description")} /><FieldError>{errors.description}</FieldError></div>
      <div className="sm:col-span-2">
        <Label>Banner image</Label>
        <div className="flex flex-wrap items-center gap-4">
          {f.bannerImage ? <img src={f.bannerImage} alt="Banner preview" className="h-24 w-40 rounded-lg border border-border object-cover" /> : <span className="grid h-24 w-40 place-items-center rounded-lg border border-dashed border-border text-muted-foreground"><ImagePlus /></span>}
          <label className="cursor-pointer rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold hover:bg-muted">
            {uploading ? "Uploading..." : f.bannerImage ? "Change image" : "Choose image"}
            <input type="file" accept="image/*" className="sr-only" onChange={pickImage} disabled={uploading} />
          </label>
        </div>
        <FieldError>{errors.bannerImage}</FieldError>
      </div>
      <div className="sm:col-span-2"><Button type="submit" disabled={busy || uploading}>{busy ? "Saving..." : submitLabel}</Button></div>
    </form>
  );
}
