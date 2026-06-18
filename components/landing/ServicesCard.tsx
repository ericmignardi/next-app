import { ServiceCardType } from "@/types/services";
import React from "react";

export default function ServicesCard({
  service,
}: {
  service: ServiceCardType;
}) {
  const Icon = service.logo;

  return (
    <div className="rounded-lg border border-muted/25 p-8 flex flex-col items-start gap-4">
      <Icon className="size-6 text-primary" />
      <p className="font-bold text-lg">{service.title}</p>
      <p className="text-muted text-sm">{service.description}</p>
    </div>
  );
}
