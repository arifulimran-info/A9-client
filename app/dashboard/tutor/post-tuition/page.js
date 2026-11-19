"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PageHeader } from "@/components/dashboard/ui";
import TuitionForm from "@/components/dashboard/TuitionForm";
import { Card } from "@/components/ui/misc";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";

export default function PostTuition() {
  const { token, user } = useAuth();
  const router = useRouter();

  const submit = async (data) => {
    try {
      await apiFetch("/api/tuitions", { token, method: "POST", body: data });
      toast.success("Tuition submitted. It will appear after admin approval.");
      router.push("/dashboard/tutor/my-tuitions");
    } catch (e) {
      if (e.code === "LIMIT_REACHED") {
        toast.error(e.message, { action: { label: "Upgrade", onClick: () => router.push("/pricing") } });
      } else toast.error(e.message);
    }
  };

  return (
    <>
      <PageHeader title="Post a tuition" subtitle={user.plan === "pro" ? "Pro plan: unlimited posts." : "Free plan: up to 2 tuition posts."} />
      <Card className="max-w-3xl p-6"><TuitionForm onSubmit={submit} submitLabel="Submit for approval" /></Card>
    </>
  );
}
