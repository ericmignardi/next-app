import { ServiceCardType } from "@/types/services";
import { BarChart, Circle, Diamond, Square, Triangle } from "lucide-react";
import ServicesCard from "./ServicesCard";

const serviceCards: ServiceCardType[] = [
  {
    logo: Circle,
    title: "Lightning fast",
    description:
      "Every interaction lands in under 50ms. No spinners, no waiting - it just feels instant.",
  },
  {
    logo: Diamond,
    title: "Real-time sync",
    description:
      "See changes the moment teammates make them. Cursors, comments, and edits, live.",
  },
  {
    logo: Square,
    title: "Granular controls",
    description:
      "Role-based permissions down to the field. Give people exactly the access they need.",
  },
  {
    logo: Triangle,
    title: "Automations",
    description:
      "Trigger workflows on any event. Ship repetitive work to the background and move on.",
  },
  {
    logo: BarChart,
    title: "Insightful analytics",
    description:
      "Dashboards that answer the question before you ask it. Track what actually moves.",
  },
  {
    logo: Circle,
    title: "Enterprise security",
    description:
      "SOC 2 Type II, SSO, and audit logs out of the box. Built to pass the scariest reviews.",
  },
];

export default function Services() {
  return (
    <section>
      <div className="max-w-6xl mx-auto p-8 flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-8 items-center text-center">
          {/* Span */}
          <span className="text-primary font-semibold">
            Everything in one place
          </span>

          {/* Title */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-5xl font-black leading-[1.05]">
              Built for the way teams really work
            </h2>
          </div>

          {/* Description */}
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-muted leading-[1.55]">
              Powerful primitives that stay out of your way. No clutter, no
              learning curve - just momentum.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-4">
          {serviceCards.map((service) => (
            <ServicesCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
