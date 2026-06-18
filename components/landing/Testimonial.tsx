import React from "react";

export default function Testimonial() {
  return (
    <section id="customers" className="max-w-[820px] mx-auto pt-14 pb-6 px-8 text-center flex flex-col items-center">
      {/* 5-Star Rating */}
      <div 
        className="font-mono text-accent text-[28px] tracking-[2px] leading-none mb-5 select-none"
      >
        ★★★★★
      </div>

      {/* Quote */}
      <p className="text-[24px] sm:text-[28px] leading-[1.45] font-semibold text-foreground tracking-[-0.02em] mb-7 max-w-[760px]">
        &quot;We replaced four tools with Lumen in a week. Our team ships faster, the data is finally trustworthy, and onboarding new hires takes an afternoon.&quot;
      </p>

      {/* Profile Info */}
      <div className="flex items-center gap-3">
        {/* Avatar placeholder with striped gradient pattern */}
        <div 
          className="w-11 h-11 rounded-full flex-shrink-0 border border-muted/20"
          style={{
            backgroundImage: "repeating-linear-gradient(135deg, var(--background), var(--background) 6px, var(--background-card) 6px, var(--background-card) 12px)"
          }}
        ></div>
        <div className="text-left">
          <p className="font-bold text-[15px] text-foreground leading-tight">Jordan Avery</p>
          <p className="text-sm text-muted mt-1">VP Operations, Northwind</p>
        </div>
      </div>
    </section>
  );
}
