import { type PricingCardType } from "@/types/pricing";
import React from "react";

export default function PricingCard({ card }: { card: PricingCardType }) {
  return (
    <div
      key={card.tier}
      className={`relative border p-8 flex flex-col gap-8 rounded-lg ${card.isMostPopular ? "border-primary border-2" : "border-muted/25"}`}
    >
      {card.isMostPopular && (
        <span className="absolute -top-5 self-center bg-primary rounded-full text-background dark:text-foreground text-sm p-2">
          Most popular
        </span>
      )}

      <div className="flex flex-col gap-2">
        <h4 className="font-semibold">{card.tier}</h4>
        <p className="text-muted text-sm">{card.description}</p>
      </div>
      <span className="font-black text-5xl">
        ${card.price}{" "}
        <span className="text-muted text-sm font-normal">/mo</span>
      </span>
      <button
        className={`${card.isMostPopular ? "btnSecondary border border-muted/25" : "btnPrimary"}`}
      >
        {card.cta}
      </button>
      <ul className="flex flex-col gap-2 text-muted text-sm">
        {card.features.map((feat) => (
          <li key={feat} className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            {feat}
          </li>
        ))}
      </ul>
    </div>
  );
}
