export default function HowTheyLiveCard({ profile }) {
  if (!profile) return null;

  const overIndex = profile.behavioralDNA?.overIndex || [];
  const underIndex = profile.behavioralDNA?.underIndex || [];

  const behaviors = [...overIndex, ...underIndex];

  return (
    <div className="space-y-4">
      {behaviors.map(([title, value]) => {
        const positive = value >= 0;
        const width = Math.min(Math.abs(value), 100);

        return (
          <div
            key={title}
            className="grid grid-cols-[1fr_120px_45px] gap-3 items-center text-sm"
          >
            <div className="min-w-0 wrapTheWord">
              <span className="text-slate-100 font-medium text-[12px]">{title}</span>
            </div>

            <div className="h-2.5 bg-[#13243a] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  positive ? "bg-green" : "bg-red"
                }`}
                style={{ width: `${width}%` }}
              />
            </div>

            <div
              className={`text-right font-bold ${
                positive ? "text-green" : "text-red"
              }`}
            >
              {positive ? `+${value}` : value}
            </div>
          </div>
        );
      })}
    </div>
  );
}