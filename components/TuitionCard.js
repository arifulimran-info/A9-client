import Link from "next/link";
import { Clock, MapPin, Monitor } from "lucide-react";
import { Badge, Card } from "@/components/ui/misc";
import { buttonVariants } from "@/components/ui/button";
import { money } from "@/lib/utils";

export default function TuitionCard({ t }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <img src={t.bannerImage} alt={t.title} className="h-44 w-full object-cover" loading="lazy" />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge tone="primary">{t.subject}</Badge>
          <Badge>{t.classLevel}</Badge>
          <Badge tone={t.mode === "Online" ? "success" : "accent"}>{t.mode}</Badge>
        </div>
        <h3 className="line-clamp-2 min-h-[3.25rem] text-lg font-semibold leading-snug">{t.title}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          {t.mode === "Online" ? <Monitor size={15} /> : <MapPin size={15} />} {t.location}
          <span className="mx-1">|</span><Clock size={15} /> {t.daysPerWeek} days/week
        </p>
        <p className="mt-1 text-sm text-muted-foreground">by <span className="font-medium text-foreground">{t.tutorName}</span></p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <p className="font-display text-xl font-bold">{money(t.monthlyFee)}<span className="text-sm font-normal text-muted-foreground"> /month</span></p>
          <Link href={`/tuitions/${t._id}`} className={buttonVariants({ size: "sm" })}>View Details</Link>
        </div>
      </div>
    </Card>
  );
}
