import { ServiceCardType } from "@/types/services";
import ServicesCard from "./ServicesCard";

const serviceCards: ServiceCardType[] = [
  {
    logo: () => (
      <div className="w-4 h-4 rounded-full border-[3px] border-primary"></div>
    ),
    title: "Lightning fast",
    description:
      "Every interaction lands in under 50ms. No spinners, no waiting — it just feels instant.",
    iconBg: "bg-primary/10",
  },
  {
    logo: () => (
      <div className="w-3.75 h-3.75 bg-primary rotate-45 rounded-[3px]"></div>
    ),
    title: "Real-time sync",
    description:
      "See changes the moment teammates make them. Cursors, comments, and edits, live.",
    iconBg: "bg-primary/10",
  },
  {
    logo: () => <div className="w-4 h-4 rounded-sm bg-primary"></div>,
    title: "Granular controls",
    description:
      "Role-based permissions down to the field. Give people exactly the access they need.",
    iconBg: "bg-primary/10",
  },
  {
    logo: () => (
      <div className="w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-b-15 border-b-accent"></div>
    ),
    title: "Automations",
    description:
      "Trigger workflows on any event. Ship repetitive work to the background and move on.",
    iconBg: "bg-accent/10",
  },
  {
    logo: () => (
      <div className="flex gap-0.75">
        <span className="w-1 h-4 bg-accent rounded-xs"></span>
        <span className="w-1 h-2.75 bg-accent rounded-xs self-end"></span>
        <span className="w-1 h-4 bg-accent rounded-xs"></span>
      </div>
    ),
    title: "Insightful analytics",
    description:
      "Dashboards that answer the question before you ask it. Track what actually moves.",
    iconBg: "bg-accent/10",
  },
  {
    logo: () => (
      <div className="w-4 h-4 rounded-full bg-primary relative">
        <span className="absolute inset-1.25 bg-primary/10 rounded-full"></span>
      </div>
    ),
    title: "Enterprise security",
    description:
      "SOC 2 Type II, SSO, and audit logs out of the box. Built to pass the scariest reviews.",
    iconBg: "bg-primary/10",
  },
];

export default function Services() {
  return (
    <section id="features" className="max-w-300 mx-auto px-8 py-8 pb-10">
      {/* Header */}
      <div className="text-center max-w-160 mx-auto mb-14">
        <span className="text-[14px] font-semibold text-primary">
          Everything in one place
        </span>
        <h2 className="text-[36px] sm:text-[42px] font-extrabold tracking-tight text-foreground mt-3.5 mb-0">
          Built for the way teams really work
        </h2>
        <p className="text-lg text-muted mt-4 leading-[1.55]">
          Powerful primitives that stay out of your way. No clutter, no learning
          curve — just momentum.
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
