import { Link } from "react-router-dom";
import { archetypes, demographics, issueAffinity } from "../data/mockData";
import MiniBars from "../components/MiniBars";

export default function CompareArchetypes() {
  const left = archetypes[0];
  const right = archetypes[1];

  return (
    <div>
      <div className="flex justify-between mb-5">
        <Link to="/map" className="card px-5 py-2 text-sm">← Back to Pick Archetypes</Link>
        <div className="flex gap-3">
          <button className="card px-5 py-2 text-sm">Save Comparison</button>
          <button className="card px-5 py-2 text-sm">Share</button>
        </div>
      </div>

      <h1 className="text-4xl font-black">COMPARE ARCHETYPES</h1>
      <p className="text-slate-400 mb-5">
        Understand how different lifestyle archetypes think, live and lean politically.
      </p>

      <div className="grid grid-cols-[1fr_1fr_330px] gap-5">
        <CompareColumn item={left} color="purple" />
        <CompareColumn item={right} color="blue" />

        <aside className="space-y-4">
          <div className="card p-5">
            <h3 className="font-bold mb-5">KEY TAKEAWAYS</h3>
            <Takeaway color="bg-purple" text="Suburban Family First is larger and more income-stable." />
            <Takeaway color="bg-blue" text="Digital Hustlers are younger, more mobile, online, and anti-establishment." />
            <Takeaway color="bg-green" text="Both are highly persuadable but on different issues and channels." />
          </div>

          {[
            "Digital Hustlers skew younger and more diverse.",
            "Digital Hustlers over-index on gaming, delivery, and crypto.",
            "Suburban Family First consumes more family and sports content.",
            "Suburban families are more financially secure.",
          ].map((x) => (
            <div className="card p-5 text-sm text-slate-300" key={x}>{x}</div>
          ))}
        </aside>
      </div>

      <div className="card p-5 mt-5 grid grid-cols-5 gap-4 text-sm">
        <div>
          <div className="font-bold">OVERLAP SNAPSHOT</div>
          <div className="text-slate-400">Where these two archetypes intersect</div>
        </div>
        <Metric label="Population Overlap" value="6.2M" />
        <Metric label="Shared Behaviors" value="24%" />
        <Metric label="Shared Media" value="18%" />
        <Metric label="Shared Issue Priorities" value="Inflation, Schools, Healthcare" />
      </div>
    </div>
  );
}

function CompareColumn({ item, color }) {
  return (
    <div className="space-y-4">
      <div className={`card p-5 border-${color}`}>
        <div className="flex justify-between">
          <div>
            <div className={`text-xs uppercase text-${color}`}>Archetype</div>
            <h2 className="text-2xl font-bold">{item.name}</h2>
            <p className="text-sm text-slate-400 mt-1">{item.description}</p>
          </div>
          <button className={`h-10 px-5 rounded bg-${color} font-bold text-sm`}>
            Activate Audience
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6 text-sm">
          <Metric label="Population" value={item.population} />
          <Metric label="Political Lean" value={item.lean} />
          <Metric label="Median Income" value={item.income} />
          <Metric label="Persuadability" value={item.persuadability} />
        </div>
      </div>

      <div className="card p-5">
        <h3 className="font-bold mb-4">DEMOGRAPHICS</h3>
        <MiniBars data={demographics.map(d => [d.label, d.value])} color={color === "blue" ? "bg-blue" : "bg-purple"} />
      </div>

      <div className="card p-5">
        <h3 className="font-bold mb-4">POLITICAL PROFILE</h3>
        <MiniBars data={issueAffinity} color={color === "blue" ? "bg-blue" : "bg-purple"} />
      </div>

      <div className="card p-5">
        <h3 className="font-bold mb-4">OVERALL PERSUADABILITY</h3>
        <div className={`text-5xl font-black ${color === "blue" ? "text-blue" : "text-purple"}`}>
          {color === "blue" ? "78" : "68"}
          <span className="text-lg text-slate-400">/100</span>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div>
      <div className="text-xs uppercase text-slate-500">{label}</div>
      <div className="font-bold text-lg mt-1">{value}</div>
    </div>
  );
}

function Takeaway({ color, text }) {
  return (
    <div className="flex gap-4 mb-5 text-sm text-slate-300">
      <div className={`w-10 h-10 rounded-full ${color} shrink-0`} />
      <p>{text}</p>
    </div>
  );
}