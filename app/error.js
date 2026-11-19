"use client";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
export default function Error({ reset }) {
  return (
    <div className="mx-auto max-w-md px-4 py-28 text-center">
      <h1 className="section-title">Something went wrong</h1>
      <p className="section-sub mx-auto mt-3">An unexpected error happened. Try again, or go back to the home page.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button variant="outline" onClick={reset}>Try again</Button>
        <Link href="/" className={buttonVariants()}>Back to Home</Link>
      </div>
    </div>
  );
}
