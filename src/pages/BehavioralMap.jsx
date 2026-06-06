import { useState } from "react";
import ClusterMap from "../components/ClusterMap";
import StatCard from "../components/StatCard";
import MiniBars from "../components/MiniBars";
import AIStrategistPanel from "../components/AIStrategistPanel";
import { archetypes, demographics, behaviorBars } from "../data/mockData";
import { Share2 } from "lucide-react";
import AIInsightCard from "../components/AIInsightCard";
import { useNavigate } from "react-router-dom";

export default function BehavioralMap() {
  const savedId = localStorage.getItem("selectedArchetypeId");
  const navigate = useNavigate();

  const [selectedArchetype, setSelectedArchetype] = useState(
    archetypes.find((a) => a.id === savedId) || archetypes[0]
  );

    function handleSelectArchetype(archetype) {
      setSelectedArchetype(archetype);
      localStorage.setItem("selectedArchetypeId", archetype.id);

      window.dispatchEvent(
        new CustomEvent("archetype-selected", {
          detail: archetype.id,
        })
      );
    }

  return (
    <div>
      <header className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-4xl font-black tracking-tight">
            AMERICA&apos;S BEHAVIORAL POLITICAL MAP
          </h1>
          <p className="text-slate-400 mt-2">
            How America Lives, Behaves &amp; Leans Politically in 2026
          </p>
        </div>

        <div className="flex gap-3">
          <button className="card px-5 py-2 text-sm">
            2026 MIDTERM OUTLOOK
          </button>
          <button className="card px-5 py-2 text-sm flex gap-2 items-center">
            <Share2 size={16} /> Share
          </button>
        </div>
      </header>

      <div className="flex gap-3 mb-5">
        <select
          className="bg-[#071322] border border-border rounded-lg px-4 py-3 text-sm"
          defaultValue="All States"
        >
          <option>All States</option>
          <option>East Coast</option>
          <option>West Coast</option>
          <option>Midwest</option>
          <option>South</option>
          <option>Central</option>
        </select>

        <select
          className="bg-[#071322] border border-border rounded-lg px-4 py-3 text-sm"
          defaultValue="All Demographics"
        >
          <option>All Demographics</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <select
          className="bg-[#071322] border border-border rounded-lg px-4 py-3 text-sm"
          defaultValue="All Incomes"
        >
          <option>All Incomes</option>
          <option>0-50K</option>
          <option>50-100K</option>
          <option>100-150K</option>
          <option>150-200K</option>
          <option>Above 200K</option>
        </select>

        <select
          className="bg-[#071322] border border-border rounded-lg px-4 py-3 text-sm"
          defaultValue="All Ethnicities"
        >
          <option>All Ethnicities</option>
          <option>White</option>
          <option>Asian</option>
          <option>Hispanic</option>
          <option>African American</option>
          <option>Other</option>
        </select>

        <button className="bg-[#000] border border-border rounded-lg px-4 py-3 text-sm">
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-[1fr_360px] gap-5">
        <div>
          <div className="card mb-4 p-4 flex justify-between">
            <StatCard label="Total Adult Population" value="258.4M" />
            <StatCard label="Archetypes" value="15" />
            <StatCard
              label="Avg. Persuadability"
              value="47%"
              color="text-green"
            />
            <StatCard
              label="Highly Competed Voters"
              value="68.7M"
              color="text-fuchsia-400"
            />
          </div>

         <ClusterMap onSelectArchetype={handleSelectArchetype} />
        </div>

        <aside className="space-y-4">
          <div className="card p-5">
            <h3 className="font-bold text-slate-300 mb-4">
              SELECT AN ARCHETYPE
            </h3>

            <div className="flex gap-4 items-center mb-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                style={{
                  background: selectedArchetype.color || "#8b3ff6",
                  boxShadow: `0 0 18px ${
                    selectedArchetype.color || "#8b3ff6"
                  }`,
                }}
              >
                👥
              </div>

              <div>
                <div className="text-xl font-bold">
                  {selectedArchetype.name}
                </div>
                <span className="bg-purple/60 px-3 py-1 rounded text-xs">
                  {selectedArchetype.lean || "Competitive"}
                </span>
              </div>
            </div>

            <div className="text-sm space-y-3">
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Population</span>
                <span>
                  {selectedArchetype.population}{" "}
                  {selectedArchetype.percent
                    ? `(${selectedArchetype.percent})`
                    : ""}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Political Lean</span>
                <span className="text-fuchsia-400">
                  {selectedArchetype.lean || "Competitive"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Persuadability</span>
                <span className="text-green">
                  {selectedArchetype.persuadability || "High"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Median Income</span>
                <span>{selectedArchetype.income || "$82K"}</span>
              </div>
            </div>
          </div>

           <AIInsightCard selectedArchetype={selectedArchetype} />

          <div className="card p-5">
            <h3 className="font-bold text-slate-300 mb-4">
              TOP DEMOGRAPHICS
            </h3>
            <MiniBars
              data={demographics.map((d) => [d.label, d.value])}
              color="bg-blue"
            />
          </div>

          <div className="card p-5">
            <h3 className="font-bold text-slate-300 mb-4">TOP FEATURES</h3>
            <MiniBars data={behaviorBars} color="bg-green" />
          </div>

          <button
            onClick={() => navigate(`/archetype/${selectedArchetype.id}`)}
            className="mt-5 w-full rounded-xl border border-blue/50 px-4 py-3 text-blue font-bold hover:bg-blue/10 transition"
          >
            View Full Archetype Profile →
          </button>

        </aside>

        <AIStrategistPanel selectedArchetype={selectedArchetype} />
      </div>
    </div>
  );
}