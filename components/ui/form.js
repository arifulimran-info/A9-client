import { cn } from "@/lib/utils";

const field = "w-full rounded-lg border border-border bg-card px-3.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-primary";

export const Input = ({ className, ...p }) => <input className={cn(field, "h-11", className)} {...p} />;
export const Textarea = ({ className, ...p }) => <textarea className={cn(field, "py-2.5 min-h-24", className)} {...p} />;
export const Select = ({ className, children, ...p }) => (
  <select className={cn(field, "h-11 pr-8", className)} {...p}>{children}</select>
);
export const Label = ({ className, ...p }) => <label className={cn("mb-1.5 block text-sm font-medium", className)} {...p} />;
export const FieldError = ({ children }) => (children ? <p className="mt-1 text-sm text-danger">{children}</p> : null);
