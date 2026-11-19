import { cn } from "@/lib/utils";

export const Card = ({ className, ...p }) => <div className={cn("rounded-xl border border-border bg-card", className)} {...p} />;
export const Skeleton = ({ className }) => <div className={cn("animate-pulse rounded-lg bg-muted", className)} />;

const tones = {
  neutral: "bg-muted text-foreground",
  primary: "bg-primary/15 text-primary",
  success: "bg-success/15 text-success",
  danger: "bg-danger/15 text-danger",
  accent: "bg-accent text-accent-foreground",
};
export const Badge = ({ tone = "neutral", className, ...p }) => (
  <span className={cn("inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold", tones[tone], className)} {...p} />
);

export const statusTone = { pending: "accent", approved: "success", accepted: "success", rejected: "danger" };
