const ETHNICITY_COLORS = {
  White: "#8b3ff6",
  Hispanic: "#3498db",
  Asian: "#38bdf8",
  "African American": "#f59e0b",
  Other: "#14b8a6",
};

function SmallBar({ label, value, color = "bg-zetaBlue" }) {
  return (
    <div className="grid grid-cols-[95px_1fr_42px] items-center gap-3 text-sm">
      <span className="text-[#334155]">{label}</span>

      <div className="h-2.5 bg-[#d3d3d3] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{
            width: `${Math.max(value, 5)}%`,
            boxShadow: "0 0 8px rgba(139,63,246,0.65)",
          }}
        />
      </div>

      <span className="text-[#334155] text-right">{value}%</span>
    </div>
  );
}

function DonutChart({ data }) {
  const gradient = data
    .reduce(
      (acc, [label, value]) => {
        const color = ETHNICITY_COLORS[label] || "#64748b";
        const start = acc.current;
        const end = start + value;

        acc.parts.push(`${color} ${start}% ${end}%`);

        return {
          current: end,
          parts: acc.parts,
        };
      },
      { current: 0, parts: [] }
    )
    .parts.join(", ");

  return (
    <div
      className="w-36 h-36 rounded-full relative shrink-0"
      style={{ background: `conic-gradient(${gradient})` }}
    >
      <div className="absolute inset-[24px] rounded-full bg-[#ffffff]" />
    </div>
  );
}

export default function WhoTheyAreCard({ profile }) {
  if (!profile) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-8 border-b border-border pb-6">
        <div>
          <h3 className="text-sm font-bold text-zetaDark mb-4">AGE</h3>

          <div className="space-y-3">
            {profile.ageDistribution.map(([label, value]) => (
              <SmallBar key={label} label={label} value={value} />
            ))}
          </div>
        </div>

        <div className="border-l border-border pl-8">
          <h3 className="text-sm font-bold text-zetaDark mb-4">INCOME</h3>

          <div className="space-y-3">
            {profile.incomeDistribution.map(([label, value]) => (
              <SmallBar key={label} label={label} value={value} />
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-zetaDark mb-4">ETHNICITY</h3>

        <div className="grid grid-cols-[220px_1fr] gap-10 items-center max-w-[500px]">
                <DonutChart data={profile.ethnicityMix} />

                <div className="grid grid-cols-1 gap-y-3">
            {profile.ethnicityMix.map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[14px_1fr_42px] items-center gap-3 text-sm"
              >
                <span
                  className="w-3.5 h-3.5 rounded-full"
                  style={{
                    background: ETHNICITY_COLORS[label] || "#64748b",
                  }}
                />

                <span className="text-[#334155]">{label}</span>

                <span className="text-[#334155] text-right">{value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}