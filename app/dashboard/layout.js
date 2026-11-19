"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BarChart3, ClipboardList, FilePlus2, Library, Users, ShieldCheck, Receipt, UserCog, PanelLeftClose, PanelLeftOpen, Menu, Loader2, Crown, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/misc";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const NAV = {
  student: [
    { href: "/dashboard/student", label: "Overview", icon: BarChart3 },
    { href: "/dashboard/student/my-applications", label: "My Applications", icon: ClipboardList },
  ],
  tutor: [
    { href: "/dashboard/tutor", label: "Overview", icon: BarChart3 },
    { href: "/dashboard/tutor/post-tuition", label: "Post Tuition", icon: FilePlus2 },
    { href: "/dashboard/tutor/my-tuitions", label: "My Tuitions", icon: Library },
    { href: "/dashboard/tutor/applicants", label: "Applicants", icon: UserCheck },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Overview", icon: BarChart3 },
    { href: "/dashboard/admin/users", label: "Users", icon: Users },
    { href: "/dashboard/admin/tuitions", label: "Tuition Approval", icon: ShieldCheck },
    { href: "/dashboard/admin/transactions", label: "Transactions", icon: Receipt },
  ],
};

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const section = pathname.split("/")[2];
  const roleSection = ["student", "tutor", "admin"].includes(section);

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace(`/sign-in?redirect=${pathname}`);
    else if (roleSection && section !== user.role) router.replace(`/dashboard/${user.role}`);
  }, [loading, user, pathname, section, roleSection, router]);

  useEffect(() => setDrawer(false), [pathname]);

  if (loading || !user || (roleSection && section !== user.role)) {
    return <div className="grid min-h-[70vh] place-items-center"><Loader2 className="animate-spin text-primary" size={40} /></div>;
  }

  const items = [...NAV[user.role], { href: "/dashboard/profile", label: "Update Profile", icon: UserCog }];
  if (user.role !== "admin" && user.plan !== "pro") items.push({ href: "/pricing", label: "Upgrade to Pro", icon: Crown });

  const sidebar = (compact) => (
    <nav className="flex flex-col gap-1 p-3">
      {items.map((it) => {
        const active = pathname === it.href;
        return (
          <Link key={it.href} href={it.href} title={it.label}
            className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted", active && "bg-primary text-primary-foreground hover:bg-primary", compact && "justify-center px-0")}>
            <it.icon size={20} className="shrink-0" />
            {!compact && <span className="truncate">{it.label}</span>}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full">
      <aside className={cn("hidden shrink-0 border-r border-border bg-card transition-[width] lg:block", collapsed ? "w-[68px]" : "w-64")}>{sidebar(collapsed)}</aside>

      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawer(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-card pt-16">{sidebar(false)}</aside>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex h-14 items-center justify-between border-b border-border bg-card px-4">
          <div className="flex items-center gap-2">
            <button aria-label="Toggle sidebar" onClick={() => setCollapsed(!collapsed)} className="hidden h-9 w-9 place-items-center rounded-lg hover:bg-muted lg:grid cursor-pointer">
              {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
            </button>
            <button aria-label="Open menu" onClick={() => setDrawer(true)} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-muted lg:hidden cursor-pointer"><Menu size={20} /></button>
            <span className="font-semibold capitalize">{user.role} dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="flex items-center gap-2.5">
              {user.image ? <img src={user.image} alt="" className="h-9 w-9 rounded-full object-cover" /> :
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary font-bold text-primary-foreground">{user.name[0].toUpperCase()}</span>}
              <div className="hidden leading-tight sm:block">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="flex gap-1.5"><Badge tone="primary" className="capitalize">{user.role}</Badge>{user.role !== "admin" && <Badge tone={user.plan === "pro" ? "accent" : "neutral"} className="uppercase">{user.plan}</Badge>}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
