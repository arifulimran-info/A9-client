"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, LayoutDashboard, UserCog, LogOut } from "lucide-react";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/misc";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/tuitions", label: "Browse Tuitions" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "How It Works" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setMenu(false);
    setOpen(false);
    toast.success("Signed out");
    router.push("/");
  };

  const avatar = user?.image ? (
    <img src={user.image} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
  ) : (
    <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground font-bold">
      {user?.name?.[0]?.toUpperCase()}
    </span>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-sm font-medium hover:bg-muted",
                  pathname === l.href && "bg-muted text-primary"
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          {loading ? (
            <div className="h-10 w-32 animate-pulse rounded-lg bg-muted" />
          ) : user ? (
            <div className="relative">
              <button onClick={() => setMenu(!menu)} className="flex items-center gap-3 rounded-lg p-1 pr-3 hover:bg-muted cursor-pointer">
                {avatar}
                <span className="text-left leading-tight">
                  <span className="block text-sm font-semibold">{user.name}</span>
                  <Badge tone="primary" className="capitalize">{user.role}</Badge>
                </span>
              </button>
              {menu && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-card p-2 shadow-lg" onMouseLeave={() => setMenu(false)}>
                  <Link onClick={() => setMenu(false)} href="/dashboard" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted"><LayoutDashboard size={16} /> Dashboard</Link>
                  <Link onClick={() => setMenu(false)} href="/dashboard/profile" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted"><UserCog size={16} /> Update Profile</Link>
                  <button onClick={handleSignOut} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-danger hover:bg-muted cursor-pointer"><LogOut size={16} /> Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/sign-in" className={buttonVariants({ variant: "outline" })}>Sign In</Link>
              <Link href="/sign-up" className={buttonVariants()}>Sign Up</Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button aria-label="Open menu" onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-card cursor-pointer">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-4 pb-5 pt-3 lg:hidden">
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className={cn("block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted", pathname === l.href && "bg-muted text-primary")}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-border pt-4">
            {user ? (
              <div className="space-y-1">
                <div className="mb-2 flex items-center gap-3 px-3">{avatar}<div><p className="text-sm font-semibold">{user.name}</p><Badge tone="primary" className="capitalize">{user.role}</Badge></div></div>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm hover:bg-muted">Dashboard</Link>
                <Link href="/dashboard/profile" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm hover:bg-muted">Update Profile</Link>
                <button onClick={handleSignOut} className="block w-full rounded-lg px-3 py-2.5 text-left text-sm text-danger hover:bg-muted cursor-pointer">Sign Out</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link href="/sign-in" onClick={() => setOpen(false)} className={buttonVariants({ variant: "outline" })}>Sign In</Link>
                <Link href="/sign-up" onClick={() => setOpen(false)} className={buttonVariants()}>Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
