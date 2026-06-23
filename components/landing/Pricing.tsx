import { type PricingCardType } from "@/types/pricing";
import PricingCard from "./PricingCard";

const pricingCards: PricingCardType[] = [
  {
    tier: "Free Viewer",
    description: "For family members who just want to watch.",
    price: 0,
    cta: "Start Streaming",
    features: [
      "Unlimited video streaming",
      "Timeline highlight seeking",
      "Clerk guest authentication",
      "Cross-device mobile players",
    ],
    isMostPopular: false,
  },
  {
    tier: "Family Archivist",
    description: "For the primary record keeper.",
    price: 9,
    cta: "Create Family Vault",
    features: [
      "100GB secure video hosting",
      "Instant VHS-to-HLS transcoding",
      "Custom highlights editor",
      "Up to 3 admin catalogers",
      "Priority upload pipeline",
    ],
    isMostPopular: true,
  },
  {
    tier: "Grand Historian",
    description: "For extensive multi-generational tapes.",
    price: 29,
    cta: "Unlock Grand Vault",
    features: [
      "500GB secure video hosting",
      "Highest quality transcoding",
      "Unlimited admin access keys",
      "Full database export backups",
      "Dedicated support assistance",
    ],
    isMostPopular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="max-w-275 mx-auto px-8 py-16">
      {/* Top */}
      <div className="text-center max-w-140 mx-auto mb-12 flex flex-col items-center">
        <h3 className="text-[36px] sm:text-[42px] font-extrabold tracking-tight text-foreground mb-0">
          Simple plans for families
        </h3>
        <p className="text-lg text-muted mt-4 leading-[1.55]">
          Start streaming for free. Upgrade to Archivist status to upload. Cancel anytime.
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
