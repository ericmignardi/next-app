export default function Statistics() {
  return (
    <section className="max-w-300 mx-auto my-12 px-8">
      <div
        className="bg-primary rounded-[20px] py-14 px-10 grid grid-cols-2 md:grid-cols-4 gap-8 relative overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(255,255,255,0.12), transparent 45%)",
        }}
      >
        {/* Stat 1 */}
        <div className="flex flex-col items-center text-center">
          <h4 className="text-[46px] font-extrabold text-white tracking-[-0.02em] leading-none">
            100%
          </h4>
          <p className="text-[15px] text-white/80 mt-1.5 font-medium">
            Private Access
          </p>
        </div>

        {/* Stat 2 */}
        <div className="flex flex-col items-center text-center">
          <h4 className="text-[46px] font-extrabold text-white tracking-[-0.02em] leading-none">
            240+ Hrs
          </h4>
          <p className="text-[15px] text-white/80 mt-1.5 font-medium">
            Tapes Digitized
          </p>
        </div>

        {/* Stat 3 */}
        <div className="flex flex-col items-center text-center">
          <h4 className="text-[46px] font-extrabold text-white tracking-[-0.02em] leading-none">
            &lt; 50ms
          </h4>
          <p className="text-[15px] text-white/80 mt-1.5 font-medium">
            Highlight Seek
          </p>
        </div>

        {/* Stat 4 */}
        <div className="flex flex-col items-center text-center">
          <h4 className="text-[46px] font-extrabold text-white tracking-[-0.02em] leading-none">
            1080p
          </h4>
          <p className="text-[15px] text-white/80 mt-1.5 font-medium">
            Preserved Quality
          </p>
        </div>
      </div>
    </section>
  );
}
