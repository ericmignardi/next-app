import Image from "next/image";

export default function Testimonial() {
  return (
    <section>
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center py-14 px-8 gap-8">
        {/* Rating */}
        <div className="flex items-center gap-1">
          <span className="text-3xl text-accent">★</span>
          <span className="text-3xl text-accent">★</span>
          <span className="text-3xl text-accent">★</span>
          <span className="text-3xl text-accent">★</span>
          <span className="text-3xl text-accent">★</span>
        </div>

        {/* Title */}
        <div className="max-w-3xl mx-auto">
          <h4 className="font-semibold text-3xl leading-[1.55]">
            &quot;We replaced four tools with next-app in a week. Our team ships
            faster, the data is finally trustworthy, and onboarding new hires
            takes an afternoon.&quot;
          </h4>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2">
          <Image
            src={"https://thispersondoesnotexist.com/"}
            alt="profile image"
            height={10}
            width={10}
            className="size-12 object-contain rounded-full"
          />
          <div className="flex flex-col items-start">
            <p className="font-semibold">Jordan Avery</p>
            <p className="text-sm text-muted">VP Operations, Northwind</p>
          </div>
        </div>
      </div>
    </section>
  );
}
