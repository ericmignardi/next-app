import React from "react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="max-w-300 mx-auto px-8 pb-20">
      <div
        className="bg-slate-900 rounded-[20px] py-16 px-10 text-center relative overflow-hidden flex flex-col items-center select-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 100%, rgba(79,70,229,0.4), transparent 50%), radial-gradient(circle at 90% 10%, rgba(245,158,11,0.18), transparent 45%)",
        }}
      >
        {/* Title */}
        <h2 className="text-[32px] sm:text-[42px] font-extrabold tracking-tight text-white max-w-150 mx-auto leading-tight">
          Ready to preserve your family&apos;s sports legacy?
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg text-slate-400 mt-4.5 mb-8 max-w-130 mx-auto leading-[1.55]">
          Create your private vault today. Easily upload tapes and securely share the stream with family members.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3.5 justify-center w-full sm:w-auto z-10">
          <Link href="/sign-up" className="w-full sm:w-auto">
            <button className="btn-brand-secondary border-none px-7 w-full shadow-lg shadow-white/5 hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer">
              Create Free Account
            </button>
          </Link>
          <Link href="/sign-in" className="w-full sm:w-auto">
            <button className="btn-brand-dark px-7 hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer">Sign In</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
