export default function StatCard({ label, value, sub, color = "text-[#49565D]" }) {
  return (
    <div className="border-r border-border last:border-r-0 px-6">
      <div className="text-xs text-zetaGray uppercase">{label}</div>
      <div className={`text-2xl font-bold mt-2 ${color}`}>{value}</div>
      {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
    </div>
  );
}