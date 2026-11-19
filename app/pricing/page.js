import PricingCards from "@/components/PricingCards";

export const metadata = { title: "Pricing - MentorLagbe" };

export default function PricingPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-10 text-center">
        <h1 className="section-title">Choose your plan</h1>
        <p className="section-sub mx-auto mt-3">Tutors pay $15 for unlimited posts and a verified badge. Students pay $10 for priority booking.</p>
      </div>
      <PricingCards />
    </section>
  );
}
