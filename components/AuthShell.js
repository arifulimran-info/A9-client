import Logo from "@/components/Logo";

export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="ruled grid min-h-[calc(100vh-4rem)] place-items-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-background p-8 shadow-lg">
        <Logo />
        <h1 className="mt-6 text-2xl font-bold">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
