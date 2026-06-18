import { ServiceCardType } from "@/types/services";
import React from "react";

export default function ServicesCard({
  service,
}: {
  service: ServiceCardType;
}) {
  const Icon = service.logo;

  return (
    <div className="bg-card border border-muted/20 rounded-xl p-7 flex flex-col items-start hover:border-muted/40 transition-colors duration-200">
      <div className={`w-[44px] h-[44px] rounded-xl flex items-center justify-center mb-[18px] ${service.iconBg}`}>
        <Icon />
      </div>
      <h3 className="font-bold text-lg text-foreground mb-2">{service.title}</h3>
      <p className="text-muted text-[15px] leading-[1.55]">{service.description}</p>
    </div>
  );
}
