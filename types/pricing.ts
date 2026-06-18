export type PricingCardType = {
  tier: string;
  description: string;
  price: number | string;
  cta: string;
  features: string[];
  isMostPopular: boolean;
};
