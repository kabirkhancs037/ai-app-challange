export default function MiniBars({ data, color = "bg-zetaBlue" }) {
  return (
    <div className="space-y-3">
      {data.map(([label, value]) => (
        <div key={label} className="grid grid-cols-[150px_1fr_45px] items-center gap-3 text-xs">
          <span className="text-[#334155]">{label}</span>
          <div className="h-2 bg-[#d3d3d3] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${value < 0 ? "bg-red" : color}`}
              style={{ width: `${Math.min(Math.abs(value), 100)}%` }}
            />
          </div>
          <span className={value < 0 ? "text-red" : "text-green"}>
            {value > 0 ? `+${value}` : value}
          </span>
        </div>
      ))}
    </div>
  );
}