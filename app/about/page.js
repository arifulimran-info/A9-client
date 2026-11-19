import HowItWorks from "@/components/home/HowItWorks";

export const metadata = { title: "How It Works - MentorLagbe" };

export default function About() {
  return (
    <div className="pb-6 pt-6">
      <HowItWorks />
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
        <h2 className="section-title">Why MentorLagbe</h2>
        <p className="section-sub mt-3">
          Students and parents struggle to find verified tutors by subject, class level, mode and budget, while skilled tutors lack a structured place to show their batches.
          MentorLagbe puts both sides in one platform, with admins reviewing every listing before it goes public.
        </p>
      </section>
    </div>
  );
}
