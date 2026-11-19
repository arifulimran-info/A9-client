import Link from "next/link";
import { XCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function PaymentCancel() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <XCircle className="mx-auto text-danger" size={52} />
      <h1 className="section-title mt-5">Payment cancelled</h1>
      <p className="section-sub mx-auto mt-3">You were not charged. You can upgrade any time from the pricing page.</p>
      <Link href="/pricing" className={buttonVariants({ className: "mt-8" })}>Back to pricing</Link>
    </div>
  );
}
