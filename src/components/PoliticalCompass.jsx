export default function PoliticalCompass({
  liberalConservative = 0,
  progressiveTraditional = 0,
}) {
  const x = 50 + liberalConservative * 35;
  const y = 50 + progressiveTraditional * 35;

  return (
    <div className="relative h-[240px] w-full flex items-center justify-center">
      <div className="relative w-[220px] h-[220px]">
        <div className="absolute top-1 left-1/2 -translate-x-1/2 text-sm text-slate-300">
          Progressive
        </div>

        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-sm text-slate-300">
          Traditional
        </div>

        <div className="absolute left-0 top-1/2 -translate-y-1/2 text-sm text-slate-300">
          Liberal
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-sm text-slate-300">
          Conservative
        </div>

        <div className="absolute left-1/2 top-[42px] bottom-[42px] w-px bg-slate-600/50" />
        <div className="absolute top-1/2 left-[42px] right-[42px] h-px bg-slate-600/50" />

        <div
          className="absolute w-12 h-12 rounded-full bg-purple/40 blur-md"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: "translate(-50%, -50%)",
          }}
        />

        <div
          className="absolute w-8 h-8 rounded-full bg-purple flex items-center justify-center shadow-[0_0_25px_rgba(139,63,246,.9)]"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-3 h-3 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}