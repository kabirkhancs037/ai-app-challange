import { useState } from "react";
import ClusterMap from "../components/ClusterMap";
import StatCard from "../components/StatCard";
import MiniBars from "../components/MiniBars";
import AIStrategistPanel from "../components/AIStrategistPanel";
import { archetypes } from "../data/mockData";
import { Share2 } from "lucide-react";
import AIInsightCard from "../components/AIInsightCard";
import { useNavigate } from "react-router-dom";
import { getArchetypeProfileById } from "../data/archetypeProfiles";
import CompareArchetypeModal from "../components/CompareArchetypeModal";


export default function BehavioralMap() {
  const savedId = localStorage.getItem("selectedArchetypeId");
  const navigate = useNavigate();

  const [selectedArchetype, setSelectedArchetype] = useState(
    archetypes.find((a) => a.id === savedId) || archetypes[0]
  );

  const [showCompareModal, setShowCompareModal] = useState(false);

  const [filters, setFilters] = useState({
    region: "All States",
    demographic: "All Demographics",
    income: "All Incomes",
    ethnicity: "All Ethnicities",
  });

  const selectedProfile = getArchetypeProfileById(selectedArchetype.id);

  const filteredArchetypes = archetypes.filter((archetype) => {
    const profile = getArchetypeProfileById(archetype.id);

    if (!profile?.filters) return true;

    const regionMatch =
      filters.region === "All States" ||
      profile.filters.regions.includes(filters.region);

    const demographicMatch =
      filters.demographic === "All Demographics" ||
      profile.filters.demographics.includes(filters.demographic);

    const incomeMatch =
      filters.income === "All Incomes" ||
      profile.filters.incomes.includes(filters.income);

    const ethnicityMatch =
      filters.ethnicity === "All Ethnicities" ||
      profile.filters.ethnicities.includes(filters.ethnicity);

    return regionMatch && demographicMatch && incomeMatch && ethnicityMatch;
  });

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
          <button
              onClick={() => setShowCompareModal(true)}
              className="card px-5 py-2 text-sm"
            >
              Compare Prototype
            </button>
          <button className="card px-5 py-2 text-sm flex gap-2 items-center">
            <Share2 size={16} /> Share
          </button>
        </div>
      </header>

      <div className="flex gap-3 mb-5">
        <select
            className="bg-[#071322] border border-border rounded-lg px-4 py-3 text-sm"
            value={filters.region}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                region: e.target.value,
              }))
            }
          >
            <option value="All States">All States</option>
            <option value="East Coast">East Coast</option>
            <option value="West Coast">West Coast</option>
            <option value="Midwest">Midwest</option>
            <option value="South">South</option>
            <option value="Central">Central</option>
        </select>

        <select
            className="bg-[#071322] border border-border rounded-lg px-4 py-3 text-sm"
            value={filters.demographic}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                demographic: e.target.value,
              }))
            }
          >
             <option value="All Demographics">All Demographics</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
        </select>

        <select
            className="bg-[#071322] border border-border rounded-lg px-4 py-3 text-sm"
            value={filters.income}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                income: e.target.value,
              }))
            }
          >
            <option value="All Incomes">All Incomes</option>
            <option value="0-50K">0-50K</option>
            <option value="50-100K">50-100K</option>
            <option value="100-150K">100-150K</option>
            <option value="150-200K">150-200K</option>
            <option value="Above 200K">Above 200K</option>
        </select>

        <select
            className="bg-[#071322] border border-border rounded-lg px-4 py-3 text-sm"
            value={filters.ethnicity}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                ethnicity: e.target.value,
              }))
            }
          >
            <option value="All Ethnicities">All Ethnicities</option>
            <option value="White">White</option>
            <option value="Asian">Asian</option>
            <option value="Hispanic">Hispanic</option>
            <option value="African American">African American</option>
            <option value="Other">Other</option>
        </select>

        <button
            onClick={() =>
              setFilters({
                region: "All States",
                demographic: "All Demographics",
                income: "All Incomes",
                ethnicity: "All Ethnicities",
              })
            }
            className="bg-[#071322] border border-border rounded-lg px-4 py-3 text-sm"
          >
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

         <ClusterMap
            filteredArchetypes={filteredArchetypes}
            onSelectArchetype={handleSelectArchetype}
          />
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
                  {selectedProfile?.politicalLean || selectedArchetype.lean || "Competitive"}
                </span>
              </div>
            </div>

            <div className="text-sm space-y-3">
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Population</span>
                <span>
                  {selectedProfile?.population || selectedArchetype.population}
                  {selectedArchetype.percent
                    ? `(${selectedArchetype.percent})`
                    : ""}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Political Lean</span>
                <span className="text-fuchsia-400">
                  {selectedProfile?.politicalLean || selectedArchetype.lean || "Competitive"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Persuadability</span>
                <span className="text-green">
                  {selectedProfile?.persuadability || selectedArchetype.persuadability || "High"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Median Income</span>
                <span>{selectedProfile?.medianIncome || selectedArchetype.income || "$82K"}</span>
              </div>
            </div>
          </div>

           <AIInsightCard selectedArchetype={selectedArchetype} />

          <div className="card p-5">
            <h3 className="font-bold text-slate-300 mb-4">
              TOP DEMOGRAPHICS
            </h3>
            <MiniBars
              data={selectedProfile?.ageDistribution || []}
              color="bg-blue"
            />
          </div>

          <div className="card p-5">
            <h3 className="font-bold text-slate-300 mb-4">TOP FEATURES</h3>
            <MiniBars
              data={selectedProfile?.behavioralDNA?.overIndex || []}
              color="bg-green"
            />
          </div>

          <button
            onClick={() => navigate(`/archetype/${selectedArchetype.id}`)}
            className="mt-5 w-full rounded-xl border border-blue/50 px-4 py-3 text-blue font-bold hover:bg-blue/10 transition"
          >
            View Full Archetype Profile →
          </button>

        </aside>

        <AIStrategistPanel
            selectedArchetype={{
              ...selectedArchetype,
              profile: selectedProfile,
            }}
          />

          <CompareArchetypeModal
            open={showCompareModal}
            onClose={() => setShowCompareModal(false)}
            onCompare={(selectedIds) => {
              navigate(`/compare?left=${selectedIds[0]}&right=${selectedIds[1]}`);
            }}
          />
      </div>
    </div>
  );
}