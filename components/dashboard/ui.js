"use client";
import { X } from "lucide-react";
import { Card, Skeleton } from "@/components/ui/misc";

export function PageHeader({ title, subtitle, children }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export function StatCard({ icon: Icon, label, value, loading }) {
  return (
    <Card className="flex items-center gap-4 p-5">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground"><Icon size={22} /></span>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        {loading ? <Skeleton className="mt-1 h-7 w-16" /> : <p className="truncate font-display text-2xl font-bold capitalize">{value}</p>}
      </div>
    </Card>
  );
}

// Renders loading / error / empty states, then the table or content
export function Async({ state, empty = "Nothing here yet.", children }) {
  if (state.loading) return <div className="space-y-3">{[0, 1, 2, 3].map((i) => <Skeleton key={i} className="h-14" />)}</div>;
  if (state.error) return <Card className="p-8 text-center text-danger">{state.error}</Card>;
  if (Array.isArray(state.data) && state.data.length === 0) return <Card className="p-10 text-center text-muted-foreground">{empty}</Card>;
  return children(state.data);
}

export const TableWrap = ({ children }) => (
  <Card className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm">{children}</table></Card>
);
export const Th = ({ children }) => <th className="whitespace-nowrap border-b border-border bg-muted px-4 py-3 font-semibold">{children}</th>;
export const Td = ({ children, className = "" }) => <td className={`border-b border-border px-4 py-3 align-middle ${className}`}>{children}</td>;

export function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/50 p-4" role="dialog" aria-modal="true">
      <div className="my-8 w-full max-w-2xl rounded-2xl border border-border bg-background p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-lg hover:bg-muted cursor-pointer"><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
