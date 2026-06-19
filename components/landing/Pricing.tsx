import { type PricingCardType } from "@/types/pricing";
import PricingCard from "./PricingCard";

const pricingCards: PricingCardType[] = [
  {
    tier: "Starter",
    description: "For individuals getting started.",
    price: 0,
    cta: "Get started",
    features: ["Up to 3 projects", "2 team members", "Community support"],
    isMostPopular: false,
  },
  {
    tier: "Team",
    description: "For growing teams that move fast.",
    price: 24,
    cta: "Start free trial",
    features: [
      "Unlimited projects",
      "Unlimited members",
      "Automations & analytics",
      "Priority support",
    ],
    isMostPopular: true,
  },
  {
    tier: "Enterprise",
    description: "For organizations at scale.",
    price: "Custom",
    cta: "Contact sales",
    features: ["SSO & SCIM", "Audit logs", "Dedicated manager"],
    isMostPopular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="max-w-275 mx-auto px-8 py-16">
      {/* Top */}
      <div className="text-center max-w-140 mx-auto mb-12 flex flex-col items-center">
        <h3 className="text-[36px] sm:text-[42px] font-extrabold tracking-tight text-foreground mb-0">
          Simple, honest pricing
        </h3>
        <p className="text-lg text-muted mt-4 leading-[1.55]">
          Start free. Upgrade when your team grows. Cancel anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        {pricingCards.map((card) => (
          <PricingCard key={card.tier} card={card} />
        ))}
      </div>
    </section>
  );
}
