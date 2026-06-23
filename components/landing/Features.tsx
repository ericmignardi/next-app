import { Sparkles, Video, ShieldCheck, Archive } from "lucide-react";

const features = [
  {
    name: "HLS Streaming",
    description: "Smooth, adaptive streaming for any device.",
    icon: Video,
  },
  {
    name: "Highlight Markers",
    description: "Jump to key moments instantly.",
    icon: Sparkles,
  },
  {
    name: "Private Vault",
    description: "Family‑only access, no public listings.",
    icon: ShieldCheck,
  },
  {
    name: "Archive Any Format",
    description: "Upload full‑length games, practices, and more.",
    icon: Archive,
  },
];

export default function Features() {
  return (
    <section className="bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature) => (
          <div key={feature.name} className="flex flex-col items-center text-center text-white">
            <feature.icon className="h-12 w-12 mb-4 text-indigo-400" />
            <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
            <p className="text-sm text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
