import Link from "next/link";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free Viewer",
    price: "$0",
    description: "Perfect for family members who only need to stream content.",
    cta: "Start Streaming",
    href: "/sign-up",
    popular: false,
    features: [
      "Access shared family video vaults",
      "Interactive play highlight seek player",
      "Responsive video streaming on mobile",
      "Secure invite authentication code access",
    ],
  },
  {
    name: "Family Archivist",
    price: "$9",
    description: "Ideal for the family leader digitizing VHS and digital assets.",
    cta: "Create Family Vault",
    href: "/sign-up",
    popular: true,
    features: [
      "Everything in Free Viewer plan",
      "Store up to 100 hours of video archives",
      "Interactive highlight pin manager tool",
      "High speed direct Mux uploads",
      "Admin workspace catalog access",
    ],
  },
  {
    name: "Grand Historian",
    price: "$29",
    description: "For deep archival indexing of historic clubs or vast family vaults.",
    cta: "Unlock Grand Vault",
    href: "/sign-up",
    popular: false,
    features: [
      "Everything in Family Archivist plan",
      "Unlimited hours of high fidelity streams",
      "White-labeled custom domains",
      "Priority customer digitizing support",
      "Advanced bulk meta CSV imports",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-[#070a13] border-t border-slate-900/60 py-20 px-6 sm:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Simple plans for families
          </h2>
          <p className="text-sm text-slate-400">
            Choose a plan that fits your archive scale. Start small and upgrade whenever you digitize more home records.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-[#090d19] border rounded-3xl p-8 flex flex-col justify-between hover:border-slate-800 transition-all select-none ${
                tier.popular
                  ? "border-blue-600 shadow-2xl shadow-blue-500/5 ring-1 ring-blue-600"
                  : "border-slate-900"
              }`}
            >
              {tier.popular && (
                <span className="absolute top-0 right-6 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow">
                  Most Popular
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{tier.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{tier.description}</p>
                </div>

                <div className="flex items-baseline text-white">
                  <span className="text-4xl font-extrabold tracking-tight">{tier.price}</span>
                  <span className="text-xs text-slate-500 font-semibold ml-1">/month</span>
                </div>

                {/* Features List */}
                <ul className="space-y-3.5 border-t border-slate-900 pt-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-xs text-slate-400 leading-normal">
                      <Check className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link href={tier.href}>
                  <button
                    className={`w-full font-bold text-xs py-3.5 px-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                      tier.popular
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/10"
                        : "bg-[#111726] hover:bg-[#182238] text-white border border-slate-850"
                    }`}
                  >
                    {tier.cta}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
