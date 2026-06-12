import { useState } from "react";
import ClusterMap from "../components/ClusterMap";
import StatCard from "../components/StatCard";
import MiniBars from "../components/MiniBars";
import AIStrategistPanel from "../components/AIStrategistPanel";
import { archetypes } from "../data/mockData";
import AIInsightCard from "../components/AIInsightCard";
import { useNavigate } from "react-router-dom";
import { getArchetypeProfileById } from "../data/archetypeProfiles";
import CompareArchetypeModal from "../components/CompareArchetypeModal";
import {
  filterDistributions,
  archetypeFilterMultipliers,
  getFallbackMultiplier,
} from "../data/filterModel";
import { Users, ArrowRightLeft } from "lucide-react";


function parsePopulation(value) {
  if (!value) return 0;
  return Number(String(value).replace("M", "").trim()) || 0;
}

function formatPopulation(value) {
  return `${value.toFixed(1)}M`;
}

function persuadabilityScore(value) {
  if (value === "Very High") return 90;
  if (value === "High") return 70;
  if (value === "Medium") return 47;
  if (value === "Low") return 25;
  return 47;
}

function getFilteredPopulation(archetype, profile, filters) {
  const basePopulation = parsePopulation(
    profile?.population || archetype.population
  );

  const multipliers =
    archetypeFilterMultipliers[archetype.id] || getFallbackMultiplier();

  let share = 1;

  if (filters.region !== "All States") {
    share *=
      filterDistributions.region[filters.region] *
      (multipliers.region?.[filters.region] || 1);
  }

  if (filters.demographic !== "All Demographics") {
    share *=
      filterDistributions.gender[filters.demographic] *
      (multipliers.gender?.[filters.demographic] || 1);
  }

  if (filters.income !== "All Incomes") {
    share *=
      filterDistributions.income[filters.income] *
      (multipliers.income?.[filters.income] || 1);
  }

  if (filters.ethnicity !== "All Ethnicities") {
    share *=
      filterDistributions.ethnicity[filters.ethnicity] *
      (multipliers.ethnicity?.[filters.ethnicity] || 1);
  }

  return Math.min(basePopulation, basePopulation * share);
}

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

const weightedArchetypes = archetypes.map((archetype) => {
  const profile = getArchetypeProfileById(archetype.id);

  const weightedPopulation = getFilteredPopulation(
    archetype,
    profile,
    filters
  );

  return {
    archetype,
    profile,
    weightedPopulation,
    persuadabilityScore: persuadabilityScore(
      profile?.persuadability || archetype.persuadability
    ),
  };
});

const totalAdultPopulation = formatPopulation(
  weightedArchetypes.reduce((sum, item) => sum + item.weightedPopulation, 0)
);

const avgPersuadability = `${Math.round(
  weightedArchetypes.reduce(
    (sum, item) => sum + item.persuadabilityScore * item.weightedPopulation,
    0
  ) /
    Math.max(
      weightedArchetypes.reduce((sum, item) => sum + item.weightedPopulation, 0),
      1
    )
)}%`;

const highlyCompetedVoters = formatPopulation(
  weightedArchetypes.reduce((sum, item) => {
    const persuadability =
      item.profile?.persuadability || item.archetype.persuadability;

    if (persuadability === "High" || persuadability === "Very High") {
      return sum + item.weightedPopulation;
    }

    return sum;
  }, 0)
);

const clusterPopulationById = Object.fromEntries(
  weightedArchetypes.map((item) => [
    item.archetype.id,
    formatPopulation(item.weightedPopulation),
  ])
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
          <p className="text-zetaGray mt-2">
            How America Lives, Behaves &amp; Leans Politically in 2026
          </p>
        </div>

        <div className="flex gap-3">
          <button
              onClick={() => setShowCompareModal(true)}
              className="
                flex items-center gap-3
                px-6 py-1.5
                rounded-md
                border border-[#D9E1EC]
                bg-white
                text-[#1F2937]
                font-sm
                transition-all duration-200
                hover:bg-[#0091FF]
                hover:text-white
              "
            >
              <ArrowRightLeft size={18} />
              <span>Compare Archetypes</span>
            </button>
        </div>
      </header>

      <div className="flex gap-3 mb-5">
        <select
            className="bg-white border border-border rounded-lg px-3  text-sm"
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
            className="bg-white border border-border rounded-lg px-4 py-3 text-sm"
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
            className="bg-white border border-border rounded-lg px-4 py-3 text-sm"
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
            className="bg-white border border-border rounded-lg px-4 py-3 text-sm"
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
            className="bg-zetaBlue text-white bg-white rounded-md px-4 py-3 text-sm"
          >
            Reset Filters
          </button>
      </div>

      <div className="grid grid-cols-[1fr_360px] gap-5">
        <div>
          <div className="card mb-4 p-4 flex justify-between">
            <StatCard label="Total Adult Population" color="text-zetaDark" value={totalAdultPopulation} />
            <StatCard label="Archetypes" color="text-zetaDark" value="15" />
            <StatCard
              label="Avg. Persuadability"
              value={avgPersuadability}
              color="text-green"
            />
            <StatCard
              label="Highly Competed Voters"
              value={highlyCompetedVoters}
              color="text-zetaPurple"
            />
          </div>

         <ClusterMap
            populationById={clusterPopulationById}
            onSelectArchetype={handleSelectArchetype}
          />
        </div>

        <aside className="space-y-4">
          <div className="card p-5">
            <h3 className="font-bold text-[#334155] mb-4">
              SELECTED ARCHETYPE
            </h3>

            <div className="flex gap-4 items-center mb-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                style={{
                  background: selectedArchetype.color || "#8b3ff6"
                }}
              >
                <Users className="w-8 h-8 text-white" />
              </div>

              <div>
                <div className="text-xl font-bold">
                  {selectedArchetype.name}
                </div>
                <span className="bg-zetaDark text-white px-3 py-1 rounded text-xs">
                  {selectedProfile?.politicalLean || selectedArchetype.lean || "Competitive"}
                </span>
              </div>
            </div>

            <div className="text-sm space-y-3">
              <div className="flex justify-between gap-4">
                <span className="text-zetaGray">Population</span>
                <span>
                  {selectedProfile?.population || selectedArchetype.population}
                  {selectedArchetype.percent
                    ? `(${selectedArchetype.percent})`
                    : ""}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-zetaGray">Political Lean</span>
                <span className="text-fuchsia-400">
                  {selectedProfile?.politicalLean || selectedArchetype.lean || "Competitive"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-zetaGray">Persuadability</span>
                <span className="text-green">
                  {selectedProfile?.persuadability || selectedArchetype.persuadability || "High"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-zetaGray">Median Income</span>
                <span>{selectedProfile?.medianIncome || selectedArchetype.income || "$82K"}</span>
              </div>
            </div>
          </div>

           <AIInsightCard selectedArchetype={selectedArchetype} />

          <div className="card p-5">
            <h3 className="font-bold text-[#334155] mb-4">
              TOP DEMOGRAPHICS
            </h3>
            <MiniBars
              data={selectedProfile?.ageDistribution || []}
              color="bg-blue"
            />
          </div>

          <div className="card p-5">
            <h3 className="font-bold text-[#334155] mb-4">TOP FEATURES</h3>
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