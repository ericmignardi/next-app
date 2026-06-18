import React from "react";

export default function CTA() {
  return (
    <section className="max-w-[1200px] mx-auto px-8 pb-20">
      <div 
        className="bg-slate-900 rounded-[20px] py-16 px-10 text-center relative overflow-hidden flex flex-col items-center select-none"
        style={{
          backgroundImage: "radial-gradient(circle at 15% 100%, rgba(79,70,229,0.4), transparent 50%), radial-gradient(circle at 90% 10%, rgba(245,158,11,0.18), transparent 45%)"
        }}
      >
        {/* Title */}
        <h2 className="text-[32px] sm:text-[42px] font-extrabold tracking-[-0.025em] text-white max-w-[560px] mx-auto leading-tight">
          Ready to give your team momentum?
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg text-slate-400 mt-[18px] mb-[32px] max-w-[480px] mx-auto leading-[1.55]">
          Join thousands of teams already building faster with Lumen.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3.5 justify-center w-full sm:w-auto z-10">
          <button className="btn-brand-secondary border-none px-[28px]">
            Start for free
          </button>
          <button className="btn-brand-dark px-[28px]">
            Talk to sales
          </button>
        </div>
      </div>
    </section>
  );
}
