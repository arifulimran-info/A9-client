"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, Badge } from "@/components/ui/misc";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { cn } from "@/lib/utils";

const PLANS = {
  tutor: {
    free: { price: 0, perks: ["Post up to 2 tuitions", "Manage applicants", "Public tutor profile"] },
    pro: { price: 15, perks: ["Unlimited tuition posts", "Verified badge", "Manage applicants", "Priority listing support"] },
  },
  student: {
    free: { price: 0, perks: ["Browse and apply to tuitions", "Track application status", "Basic profile"] },
    pro: { price: 10, perks: ["Priority booking", "Everything in Free", "Early access to new batches"] },
  },
};

export default function PricingCards() {
  const [audience, setAudience] = useState("student");
  const [busy, setBusy] = useState(false);
  const { user, token } = useAuth();
  const router = useRouter();

  const subscribe = async () => {
    if (!user) {
      toast.info("Please sign in to subscribe");
      return router.push("/sign-in?redirect=/pricing");
    }
    if (user.role === "admin") return toast.error("Admins cannot buy a plan");
    if (user.plan === "pro") return toast.info("You are already on the Pro plan");
    setBusy(true);
    try {
      const { url } = await apiFetch("/api/payments/create-checkout-session", { token, method: "POST" });
      window.location.href = url;
    } catch (e) {
      toast.error(e.message);
      setBusy(false);
    }
  };

  const plans = PLANS[audience];
  return (
    <div>
      <div className="mx-auto mb-10 flex w-fit rounded-lg border border-border bg-card p-1">
        {["student", "tutor"].map((a) => (
          <button key={a} onClick={() => setAudience(a)}
            className={cn("rounded-md px-6 py-2 text-sm font-semibold capitalize cursor-pointer", audience === a ? "bg-primary text-primary-foreground" : "hover:bg-muted")}>
            For {a}s
          </button>
        ))}
      </div>
      <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
        {[["Free", plans.free, false], ["Pro", plans.pro, true]].map(([name, p, pro]) => (
          <Card key={name} className={cn("flex flex-col p-7", pro && "border-2 border-primary")}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{name}</h3>
              {pro && <Badge tone="accent">Best value</Badge>}
            </div>
            <p className="mt-4 font-display text-4xl font-bold">${p.price}<span className="text-base font-normal text-muted-foreground"> {pro ? "one-time" : "forever"}</span></p>
            <ul className="mt-6 flex-1 space-y-3">
              {p.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-sm"><Check size={18} className="mt-0.5 shrink-0 text-success" /> {perk}</li>
              ))}
            </ul>
            {pro ? (
              <Button variant="accent" className="mt-8 w-full" onClick={subscribe} disabled={busy}>
                {busy ? "Redirecting to Stripe..." : "Subscribe with Stripe"}
              </Button>
            ) : (
              <Button variant="outline" className="mt-8 w-full" onClick={() => router.push(user ? "/dashboard" : "/sign-up")}>
                {user ? "Go to dashboard" : "Start for free"}
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
