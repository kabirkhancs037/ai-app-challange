export default function PoliticalCompass({
  liberalConservative = 0,
  progressiveTraditional = 0,
}) {
  const x = 50 + liberalConservative * 32;
  const y = 50 + progressiveTraditional * 32;

  return (
    <div className="relative h-[300px] w-full flex items-center justify-center">
      <div className="relative w-[300px] h-[300px]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-sm font-medium text-[#334155]">
          Progressive
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm font-medium text-[#334155]">
          Traditional
        </div>

        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-sm font-medium text-[#334155]">
          Liberal
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-sm font-medium text-[#334155]">
          Conservative
        </div>

        <div className="absolute left-1/2 top-[58px] bottom-[58px] w-px bg-[#94A3B8]/70" />

        <div className="absolute top-1/2 left-[74px] right-[92px] h-px bg-[#94A3B8]/70" />

        <div
          className="absolute w-16 h-16 rounded-full bg-zetaBlue/20 blur-xl"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: "translate(-50%, -50%)",
          }}
        />

        <div
          className="absolute w-6 h-6 rounded-full bg-zetaBlue flex items-center justify-center shadow-[0_0_25px_rgba(0,145,255,.25)]"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-2 h-2 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}