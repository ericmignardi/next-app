import React from "react";

export default function Statistics() {
  return (
    <section>
      <div className="max-w-6xl mx-auto rounded-2xl bg-primary grid grid-cols-4 gap-8 items-center py-14 px-10">
        {/* Stat 1 */}
        <div className="flex flex-col gap-4 text-center">
          <h4 className="text-5xl font-black text-background dark:text-foreground">
            12k+
          </h4>
          <p className="text-muted">Teams onboarded</p>
        </div>

        {/* Stat 2 */}
        <div className="flex flex-col gap-4 text-center">
          <h4 className="text-5xl font-black text-background dark:text-foreground">
            99.99%
          </h4>
          <p className="text-muted">Uptime SLA</p>
        </div>

        {/* Stat 3 */}
        <div className="flex flex-col gap-4 text-center">
          <h4 className="text-5xl font-black text-background dark:text-foreground">
            48ms
          </h4>
          <p className="text-muted">Median response</p>
        </div>

        {/* Stat 4 */}
        <div className="flex flex-col gap-4 text-center">
          <h4 className="text-5xl font-black text-background dark:text-foreground">
            4.9/5
          </h4>
          <p className="text-muted">Average rating</p>
        </div>
      </div>
    </section>
  );
}
