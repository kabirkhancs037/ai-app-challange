import { Link, useParams } from "react-router-dom";
import { archetypes, behaviorBars, demographics, issueAffinity } from "../data/mockData";
import MiniBars from "../components/MiniBars";
import StatCard from "../components/StatCard";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";
import USAMapCard from "../components/USAMapCard";
import AIStrategistPanel from "../components/AIStrategistPanel";
import PoliticalCompass from "../components/PoliticalCompass";

export default function ArchetypeExplorer() {
  const { id } = useParams();
  const savedId = localStorage.getItem("selectedArchetypeId");

  const archetypeId = id || savedId || "suburban-family-first";

  const item =
    archetypes.find((a) => a.id === archetypeId) ||
    archetypes[0];

  localStorage.setItem("selectedArchetypeId", item.id);

console.log("Explorer loaded archetype:", item.id);

  const radar = [
    { name: "Ideology", value: 60 },
    { name: "Media", value: 82 },
    { name: "Lifestyle", value: 80 },
    { name: "Spending", value: 72 },
    { name: "Mobility", value: 64 },
  ];

  return (
    <div>
      <div className="flex justify-between mb-5">
        <Link to="/map" className="card px-5 py-2 text-sm">← Back to Behavioral Political Map</Link>
        <div className="flex gap-3">
          <Link to="/compare" className="card px-5 py-2 text-sm">Compare Archetypes</Link>
          <button className="card px-5 py-2 text-sm">Download Profile</button>
        </div>
      </div>

      <section className="grid grid-cols-[220px_1fr] gap-5 mb-5">
        <div className="rounded-xl overflow-hidden bg-gradient-to-br from-orange to-blue h-36" />
        <div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-purple flex items-center justify-center text-2xl">👪</div>
            <div>
              <h1 className="text-4xl font-black uppercase">{item.name}</h1>
              <span className="bg-purple/60 px-3 py-1 rounded text-xs">{item.lean}</span>
            </div>
          </div>
          <p className="text-slate-300 max-w-xl mt-4">{item.description}</p>
        </div>
      </section>

      <div className="card p-5 flex justify-between mb-5">
        <StatCard label="Population" value={item.population} sub={`${item.percent || "8.5%"} of Adults`} />
        <StatCard label="Median Income" value={item.income || "$74K"} />
        <StatCard label="Political Lean" value={item.lean} />
        <StatCard label="Persuadability" value={item.persuadability} color="text-green" />
        <StatCard label="Growth '24-'26" value="+18%" color="text-green" />
      </div>

      <div className="grid grid-cols-4 gap-5 items-start">
        <Panel title="1 WHO THEY ARE" subtitle="Demographic Composition" className="min-h-[360px]">
          <MiniBars data={demographics.map(d => [d.label, d.value])} />
        </Panel>

        <Panel title="2 HOW THEY LIVE" subtitle="Behavioral DNA" className="min-h-[360px]">
          <MiniBars data={behaviorBars} color="bg-green" />
        </Panel>

        <Panel title="3 WHERE THEY LIVE" subtitle="Geographic Concentration" className="col-span-2 min-h-[520px]">
          <USAMapCard />
        </Panel>

        <Panel title="4 POLITICAL PROFILE" subtitle="Inferred from Behavior" className="col-span-2">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <h3 className="text-sm font-bold mb-3">POLITICAL COMPASS</h3>
              <PoliticalCompass
                liberalConservative={item.compass?.liberalConservative || 0}
                progressiveTraditional={item.compass?.progressiveTraditional || 0}
              />
            </div>

            <div>
              <h3 className="text-sm font-bold mb-3">
                ISSUE AFFINITY <span className="text-slate-400">(Probability)</span>
              </h3>
              <MiniBars data={issueAffinity} />
            </div>
          </div>
        </Panel>

        <Panel title="5 PERSUADABILITY" subtitle="Why They Can Move">
          <div className="h-64">
            <ResponsiveContainer>
              <RadarChart data={radar}>
                <PolarGrid stroke="#243954" />
                <PolarAngleAxis dataKey="name" tick={{ fill: "#9aa8bd", fontSize: 11 }} />
                <Radar dataKey="value" fill="#8b3ff6" stroke="#b46aff" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="6 COALITION OVERLAP" subtitle="Who They Align With">
          <div className="h-64 flex items-center justify-center">
            <div className="w-36 h-36 rounded-full bg-purple glow-purple flex items-center justify-center text-center font-bold">
              {item.name}
            </div>
          </div>
        </Panel>
      </div>
      <AIStrategistPanel selectedArchetype={item} />
    </div>
  );
}

function Panel({ title, subtitle, children, className = "" }) {
  return (
    <section className={`card p-6 ${className || "min-h-[360px]"}`}>
      <h2 className="font-black text-lg">{title}</h2>
      <p className="text-xs text-slate-400 mb-5">{subtitle}</p>
      {children}
    </section>
  );
}