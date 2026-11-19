import Link from "next/link";
import { Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/components/Logo";

const XLogo = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const col = "text-sm text-muted-foreground hover:text-foreground";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Verified tutors, transparent fees and real batches. Find the right mentor in minutes.
          </p>
          <div className="mt-5 flex gap-3">
            {[{ i: XLogo, l: "X" }, { i: Facebook, l: "Facebook" }, { i: Linkedin, l: "LinkedIn" }].map(({ i: Icon, l }) => (
              <a key={l} href="#" aria-label={l} className="grid h-10 w-10 place-items-center rounded-lg border border-border hover:bg-muted">
                <Icon className="h-[18px] w-[18px]" size={18} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-semibold">Explore</h3>
          <ul className="space-y-2.5">
            <li><Link className={col} href="/tuitions">Browse Tuitions</Link></li>
            <li><Link className={col} href="/pricing">Pricing</Link></li>
            <li><Link className={col} href="/about">How It Works</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-semibold">Account</h3>
          <ul className="space-y-2.5">
            <li><Link className={col} href="/sign-up">Join as Student</Link></li>
            <li><Link className={col} href="/sign-up">Become a Tutor</Link></li>
            <li><Link className={col} href="/sign-in">Sign In</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-semibold">Contact</h3>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Mail size={16} /> support@mentorlagbe.com</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +880 1700-000000</li>
            <li className="flex items-center gap-2"><MapPin size={16} /> Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} MentorLagbe. All rights reserved.
      </div>
    </footer>
  );
}
