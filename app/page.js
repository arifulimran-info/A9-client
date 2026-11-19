import Hero from "@/components/home/Hero";
import Featured from "@/components/home/Featured";
import HowItWorks from "@/components/home/HowItWorks";
import Subjects from "@/components/home/Subjects";
import PricingCards from "@/components/PricingCards";

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <HowItWorks />
      <Subjects />
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="section-title">Simple pricing for students and tutors</h2>
          <p className="section-sub mx-auto mt-3">Start free. Go Pro with a one-time payment through Stripe.</p>
        </div>
        <PricingCards />
      </section>
    </>
  );
}
