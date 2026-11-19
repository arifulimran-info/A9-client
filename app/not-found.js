import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-28 text-center">
      <p className="font-display text-7xl font-bold text-primary">404</p>
      <h1 className="section-title mt-4">Page not found</h1>
      <p className="section-sub mx-auto mt-3">The page you are looking for does not exist or has moved.</p>
      <Link href="/" className={buttonVariants({ className: "mt-8" })}>Back to Home</Link>
    </div>
  );
}
