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
    price: 50,
    cta: "Contact sales",
    features: ["SSO & SCIM", "Audit logs", "Dedicated manager"],
    isMostPopular: false,
  },
];

export default function Pricing() {
  return (
    <section>
      <div className="max-w-6xl mx-auto flex flex-col gap-8 items-center">
        {/* Top */}
        <div className="flex flex-col items-center text-center gap-8">
          {/* Title */}
          <h3 className="text-5xl font-black leading-[1.05]">
            Simple, honest pricing
          </h3>

          {/* Description */}
          <p className="text-lg text-muted leading-[1.55]">
            Start free. Upgrade when your team grows. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Card */}
          {pricingCards.map((card) => (
            <PricingCard key={card.tier} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
