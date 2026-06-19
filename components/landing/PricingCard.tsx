import { type PricingCardType } from "@/types/pricing";
import Link from "next/link";

export default function PricingCard({ card }: { card: PricingCardType }) {
  const isCustom = card.price === "Custom";

  return (
    <div
      className={`bg-card rounded-2xl p-8 flex flex-col border transition-all duration-200 ${
        card.isMostPopular
          ? "border-2 border-primary shadow-[0_20px_40px_-16px_rgba(79,70,229,0.35)] relative"
          : "border-muted/20 hover:border-muted/40"
      }`}
    >
      {card.isMostPopular && (
        <span className="absolute -top-3.25 left-1/2 -translate-x-1/2 bg-primary text-white text-[12px] font-semibold px-3 py-1.25 rounded-full select-none leading-none">
          Most popular
        </span>
      )}

      <div>
        <h4 className="text-[17px] font-bold text-foreground">{card.tier}</h4>
        <p className="text-muted text-[14px] mt-1.5 mb-5">{card.description}</p>
      </div>

      <div className="flex items-baseline gap-1 mb-6">
        <span className="font-extrabold text-[44px] tracking-[-0.02em] text-foreground leading-none">
          {isCustom ? "" : "$"}
          {card.price}
        </span>
        {!isCustom && (
          <span className="text-muted text-[15px]">
            {card.tier === "Team" ? "/user/mo" : "/mo"}
          </span>
        )}
      </div>

      {card.tier === "Enterprise" ? (
        <Link href="#contact" className="w-full">
          <button className="btn-brand-secondary w-full mb-6">
            {card.cta}
          </button>
        </Link>
      ) : (
        <Link href="/sign-up" className="w-full">
          <button
            className={`w-full mb-6 ${
              card.isMostPopular ? "btn-brand-primary" : "btn-brand-secondary"
            }`}
          >
            {card.cta}
          </button>
        </Link>
      )}

      <ul className="flex flex-col gap-3 text-[14px] text-secondary mt-auto">
        {card.features.map((feat) => (
          <li key={feat} className="flex items-start gap-2.5">
            <span className="text-primary font-bold shrink-0 select-none">
              ✓
            </span>
            <span>{feat}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
