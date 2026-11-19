import Link from "next/link";
import { BookOpenCheck } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-display text-2xl font-bold text-foreground">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
        <BookOpenCheck size={20} />
      </span>
      MentorLagbe
    </Link>
  );
}
