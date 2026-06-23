import { ServiceCardType } from "@/types/services";
import ServicesCard from "./ServicesCard";

const serviceCards: ServiceCardType[] = [
  {
    logo: () => (
      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "High Fidelity Streaming",
    description:
      "Buffer-free HLS streaming preserves the highest quality of your digitized family sports footage, scaled instantly to any device screen.",
    iconBg: "bg-blue-500/10",
  },
  {
    logo: () => (
      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Interactive Highlights",
    description:
      "Pin timeline markers with custom descriptions and seek the video player playhead to the exact second of game-winning goals.",
    iconBg: "bg-blue-500/10",
  },
  {
    logo: () => (
      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Private Vault Security",
    description:
      "Strict auth gates ensure only family members can access, search, and view your family legacy. No public links, no exposure.",
    iconBg: "bg-blue-500/10",
  },
  {
    logo: () => (
      <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Era & Season Browsing",
    description:
      "Organized horizontal carousels sort footage contextually by Sport Type, Era, Season, or specific Teams in an instant.",
    iconBg: "bg-amber-500/10",
  },
  {
    logo: () => (
      <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: "Nostalgic Format Support",
    description:
      "Engineered to cleanly deliver tape transfers from classic formats, including VHS, Betamax, Super 8, Hi8, and digital camcorders.",
    iconBg: "bg-amber-500/10",
  },
  {
    logo: () => (
      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "Archivist Control Grid",
    description:
      "A powerful, spreadsheet-style admin table lets you easily upload footage, modify game details, and build timeline markers in seconds.",
    iconBg: "bg-blue-500/10",
  },
];

export default function Services() {
  return (
    <section id="features" className="max-w-300 mx-auto px-8 py-8 pb-10">
      {/* Header */}
      <div className="text-center max-w-180 mx-auto mb-14">
        <span className="text-[14px] font-semibold text-blue-600 uppercase tracking-widest">
          Preserve History
        </span>
        <h2 className="text-[36px] sm:text-[42px] font-extrabold tracking-tight text-foreground mt-3.5 mb-0">
          Everything you need for your family archives
        </h2>
        <p className="text-lg text-muted mt-4 leading-[1.55]">
          A customized digital vault with streaming layout and granular admin controls. Modern technology built to preserve old memories.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {serviceCards.map((service) => (
          <ServicesCard key={service.title} service={service} />
        ))}
      </div>
    </section>
  );
}
