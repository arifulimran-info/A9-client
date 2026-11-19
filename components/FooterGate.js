"use client";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

// The dashboard is full-width and has no marketing footer
export default function FooterGate() {
  const pathname = usePathname();
  return pathname.startsWith("/dashboard") ? null : <Footer />;
}
