"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/api";
import { money } from "@/lib/utils";

function Verify() {
  const sessionId = useSearchParams().get("session_id");
  const { token, loading, refresh } = useAuth();
  const [state, setState] = useState({ status: "loading" });
  const ran = useRef(false);

  useEffect(() => {
    if (loading || ran.current) return;
    if (!token || !sessionId) return setState({ status: "error", message: "We could not find your payment session." });
    ran.current = true;
    apiFetch("/api/payments/verify", { token, method: "POST", body: { sessionId } })
      .then((r) => { setState({ status: "ok", payment: r.payment }); refresh(); })
      .catch((e) => setState({ status: "error", message: e.message }));
  }, [loading, token, sessionId, refresh]);

  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      {state.status === "loading" && <><Loader2 className="mx-auto animate-spin text-primary" size={44} /><h1 className="section-title mt-5">Confirming your payment</h1></>}
      {state.status === "ok" && (
        <>
          <CheckCircle2 className="mx-auto text-success" size={52} />
          <h1 className="section-title mt-5">You are now on Pro</h1>
          <p className="section-sub mx-auto mt-3">{state.payment?.planName} plan activated. Paid {money(state.payment?.amount ?? 0).replace("৳", "$")}. Transaction: {state.payment?.transactionId}</p>
          <Link href="/dashboard" className={buttonVariants({ className: "mt-8" })}>Go to dashboard</Link>
        </>
      )}
      {state.status === "error" && (
        <>
          <XCircle className="mx-auto text-danger" size={52} />
          <h1 className="section-title mt-5">Payment not confirmed</h1>
          <p className="section-sub mx-auto mt-3">{state.message}</p>
          <Link href="/pricing" className={buttonVariants({ className: "mt-8" })}>Back to pricing</Link>
        </>
      )}
    </div>
  );
}

export default function PaymentSuccess() {
  return <Suspense><Verify /></Suspense>;
}
