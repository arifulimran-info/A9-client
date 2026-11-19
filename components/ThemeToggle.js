"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";
  return (
    <button
      aria-label="Toggle dark mode"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-card hover:bg-muted cursor-pointer"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
