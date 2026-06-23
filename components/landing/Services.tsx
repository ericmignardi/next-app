import { Video, Sparkles, Shield, Trophy, FileVideo, ShieldAlert } from "lucide-react";

const services = [
  {
    title: "High Fidelity Streaming",
    description: "Adaptive bitrates ensure smooth, buffer-free playback of your digitized home recordings on any modern screen.",
    icon: Video,
  },
  {
    title: "Interactive Highlights",
    description: "Navigate long athletic recordings instantly. Skip directly to match-winning scores with pinned timeline markers.",
    icon: Sparkles,
  },
  {
    title: "Private Vault Security",
    description: "Rest easy with guest authentication codes. Only authorized family members can access and browse your video vault.",
    icon: Shield,
  },
  {
    title: "Era & Season Browsing",
    description: "Sort files dynamically by athletic discipline, seasonal campaign, player numbers, or game highlights index.",
    icon: Trophy,
  },
  {
    title: "Nostalgic Format Support",
    description: "Digital transfers optimized for old physical media formats: VHS tapes, 8mm film reels, MiniDV, and Hi8 formats.",
    icon: FileVideo,
  },
  {
    title: "Archivist Control Grid",
    description: "Manage video catalog metadata, edit play highlights, and manage access parameters from an intuitive workspace.",
    icon: ShieldAlert,
  },
];

export default function Services() {
  return (
    <section id="features" className="bg-[#090d19] border-y border-slate-900/60 py-20 px-6 sm:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Everything you need for your family archives
          </h2>
          <p className="text-sm text-slate-400">
            A comprehensive, premium suite of features tailored to preserve, organize, and relive your lifetime sports accomplishments.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-[#070a13] border border-slate-800/80 hover:border-blue-900/60 p-6 rounded-2xl transition-all duration-300 group hover:shadow-xl hover:shadow-blue-500/2"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center mb-4 text-blue-400 group-hover:scale-105 transition-transform">
                <service.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
