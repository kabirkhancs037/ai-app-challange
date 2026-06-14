import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { archetypes } from "../data/mockData";
import { getArchetypeProfileById } from "../data/archetypeProfiles";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import USAMapCard from "../components/USAMapCard";
import AIStrategistPanel from "../components/AIStrategistPanel";
import PoliticalCompass from "../components/PoliticalCompass";
import WhoTheyAreCard from "../components/WhoTheyAreCard";
import HowTheyLiveCard from "../components/HowTheyLiveCard";
import CoalitionOverlapMap from "../components/CoalitionOverlapMap";
import { ArrowRightLeft, Users } from "lucide-react";
import CompareArchetypeModal from "../components/CompareArchetypeModal";

export default function ArchetypeExplorer() {
  const navigate = useNavigate();
  const [showCompareModal, setShowCompareModal] = useState(false);
  const { id } = useParams();
  const savedId = localStorage.getItem("selectedArchetypeId");
  const [surpriseInsight, setSurpriseInsight] = useState("");
  const [surpriseLoading, setSurpriseLoading] = useState(false);

  const archetypeId = id || savedId || "suburban-family-first";

  const item =
    archetypes.find((a) => a.id === archetypeId) || archetypes[0];

  const profile = getArchetypeProfileById(item.id);

  if (!profile) {
    return (
      <div className="card p-8">
        <h1 className="text-2xl font-black">Archetype profile not found</h1>
        <p className="text-zetaGray mt-2">
          Please go back to Behavioral Map and select another archetype.
        </p>
      </div>
    );
  }

  localStorage.setItem("selectedArchetypeId", item.id);

  const radar = [
    {
      name: "Persuadability",
      value:
        profile.persuadability === "Very High"
          ? 90
          : profile.persuadability === "High"
          ? 75
          : profile.persuadability === "Medium"
          ? 55
          : 35,
    },
    {
      name: "Economics",
      value: Math.min(
        100,
        Math.round(
          profile.politicalProfile
            .filter(
              ([issue]) =>
                issue.toLowerCase().includes("inflation") ||
                issue.toLowerCase().includes("cost") ||
                issue.toLowerCase().includes("jobs") ||
                issue.toLowerCase().includes("economic")
            )
            .reduce((sum, [, value]) => sum + value, 0) / 2
        )
      ),
    },
    {
      name: "Culture",
      value: Math.min(
        100,
        Math.round(
          profile.politicalProfile
            .filter(
              ([issue]) =>
                issue.toLowerCase().includes("crime") ||
                issue.toLowerCase().includes("gun") ||
                issue.toLowerCase().includes("immigration") ||
                issue.toLowerCase().includes("religious")
            )
            .reduce((sum, [, value]) => sum + value, 0) / 2
        )
      ),
    },
    {
      name: "Lifestyle",
      value: Math.min(
        100,
        Math.round(
          profile.behavioralDNA.overIndex
            .slice(0, 4)
            .reduce((sum, [, value]) => sum + value, 0) / 4
        )
      ),
    },
    {
      name: "Community",
      value: Math.min(100, Math.round(profile.homeownershipRate)),
    },
  ];

async function generateSurprisingInsight() {
  if (surpriseLoading) return;

  setSurpriseLoading(true);
  setSurpriseInsight("");

  try {
    const apiBaseUrl = import.meta.env.VITE_API_URL || "";

    const res = await fetch(`${apiBaseUrl}/api/strategist-chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `
Generate ONE surprising, memorable insight about this archetype.

Use the provided archetype/profile data only.
Do not invent numbers.
Focus on something unexpected, counterintuitive, or strategically useful.
Write only 1-2 sentences. 
Search internet if needed to provide the very interesting insight.
`,
        selectedArchetype: {
          ...item,
          profile,
        },
        chatHistory: [],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to generate insight");
    }

    setSurpriseInsight(data.reply);
  } catch (error) {
    console.error(error);
    setSurpriseInsight(
      "AI could not generate a surprising insight right now. Please try again."
    );
  } finally {
    setSurpriseLoading(false);
  }
}

  return (
    <div>
      <div className="flex justify-between mb-5">
        <Link to="/map" className="card px-5 py-2 text-sm">
          ← Back to Behavioral Political Map
        </Link>

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
      </div>

      <section className="grid grid-cols-[220px_1fr] gap-5 mb-5">
        <div className="relative h-40 rounded-xl overflow-hidden">
            <img
              src={`/images/archetypes/${item.id}.jpg`}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(event) => {
                event.currentTarget.src = "/images/archetype-hero.jpg";
              }}
            />

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,145,255,.25), rgba(154,114,189,.18), rgba(237,85,194,.14))",
              }}
            />
          </div>

        <div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-zetaBlue flex items-center justify-center text-2xl">
              <Users className="w-8 h-8 text-white" />
            </div>

            <div>
              <h1 className="text-4xl font-black uppercase">{item.name}</h1>

              <span className="bg-zetaDark px-3 py-1 rounded text-xs text-white">
                {item.lean}
              </span>
            </div>
          </div>

          <p className="text-[#334155] max-w-xl mt-4">{item.description}</p>
        </div>
      </section>

      <div className="card grid grid-cols-5 gap-0 overflow-hidden mb-5">
        <StatBlock label="Population" value={profile.population} sub="Adult Population" />
        <StatBlock label="Median Income" value={profile.medianIncome} />
        <StatBlock label="POLITICAL ALIGNMENT " value={profile.politicalLean} />
        <StatBlock label="Persuadability" value={profile.persuadability} green />
        <div className="p-6">
          <div className="text-xs text-zetaGray uppercase">Homeownership</div>
          <div className="text-2xl font-black mt-2 text-green">
            {profile.homeownershipRate}%
          </div>
        </div>
      </div>

      <div className="card mb-5 overflow-hidden border border-[#C1DAFF]">
        <div className="bg-gradient-to-r from-zetaBlue to-zetaPurple px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white/80 text-xs font-bold tracking-widest uppercase">
                AI DISCOVERY
              </div>

              <h2 className="text-white text-2xl font-black mt-1">
                What Surprised Me?
              </h2>
            </div>

            <button
              onClick={generateSurprisingInsight}
              disabled={surpriseLoading}
              className="bg-white text-zetaBlue font-normal px-5 py-2 rounded-xl hover:bg-zetaBlue-light-5 transition"
            >
              {surpriseLoading
                ? "Analyzing..."
                : "Show Surprising Insights"}
            </button>
          </div>
        </div>

        <div className="p-6">
            {surpriseLoading ? (
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-zetaBlue mb-4">
                  AI analyzing audience...
                </div>

                <div className="space-y-3 animate-pulse">
                  <div className="h-5 rounded bg-[#DCE7F8] w-full" />
                  <div className="h-5 rounded bg-[#DCE7F8] w-[92%]" />
                  <div className="h-5 rounded bg-[#DCE7F8] w-[85%]" />
                  <div className="h-5 rounded bg-[#DCE7F8] w-[70%]" />
                </div>
              </div>
            ) : surpriseInsight ? (
              <>
                <div className="inline-flex items-center gap-2 bg-zetaBlueLight4 text-zetaBlue px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4">
                  ✨ Unexpected Finding
                </div>

                <p className="text-l leading-relaxed text-[#1F2937]">
                  {surpriseInsight}
                </p>
              </>
            ) : (
              <div className="text-[#49565D] text-base">
                Click <strong>Surprising Insight</strong> to uncover an unexpected finding
                about this audience.
              </div>
            )}
          </div>
      </div>

      <div className="grid grid-cols-4 gap-5 items-stretch">
        <Panel
          title="1. WHO THEY ARE"
          subtitle="Demographic Composition"
          className="col-span-2 h-[560px] overflow-hidden"
        >
          <WhoTheyAreCard profile={profile} />
        </Panel>

        <Panel
          title="2. HOW THEY LIVE"
          subtitle="Behavioral DNA"
          className="h-[560px] overflow-hidden"
        >
          <div className="h-[445px] overflow-y-auto pr-2">
            <HowTheyLiveCard profile={profile} />
          </div>
        </Panel>

        <Panel
          title="3. WHERE THEY LIVE"
          subtitle="Geographic Concentration"
          className="h-[560px] overflow-hidden"
        >
          <USAMapCard profile={profile} />
        </Panel>

        <Panel
          title="4. POLITICAL PROFILE"
          subtitle="Inferred from Behavior"
          className="col-span-2 h-full overflow-hidden"
        >
          <div className="grid grid-cols-2 gap-5">
            <div>
              <h3 className="text-sm font-bold mb-3">POLITICAL COMPASS</h3>
              <PoliticalCompass
                liberalConservative={profile.compass?.liberalConservative ?? 0}
                progressiveTraditional={
                  profile.compass?.progressiveTraditional ?? 0
                }
              />
            </div>

            <div>
              <h3 className="text-sm font-bold mb-3">
                TOP ISSUES 
              </h3>

              <div className="space-y-4">
                {profile.politicalProfile.map(([issue, value]) => (
                  <div
                    key={issue}
                    className="grid grid-cols-[1fr_140px_50px] items-center gap-4"
                  >
                    <div className="text-zetaDark text-sm">{issue}</div>

                    <div className="h-2.5 bg-[#d3d3d3] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-zetaBlue"
                        style={{ width: `${value}%` }}
                      />
                    </div>

                    <div className="text-right text-zetaDark font-bold text-sm">
                      {value}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Panel>

        <Panel
          title="5. PERSUADABILITY"
          subtitle="Why They Can Move"
          className="h-full overflow-hidden"
        >
          <div className="h-full overflow-y-auto pr-2 coalition-scrollbar">
            <div className="h-[260px] -mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  data={radar}
                  margin={{ top: 20, right: 45, bottom: 20, left: 45 }}
                >
                  <PolarGrid stroke="#050761" />

                  <PolarAngleAxis
                    dataKey="name"
                    tick={{
                      fill: "#000",
                      fontSize: 9,
                      fontWeight: 600,
                    }}
                  />

                  <Radar
                    dataKey="value"
                    fill="#6CA2F3"
                    stroke="#9AC3FF"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-2 rounded-2xl border border-border bg-white/70 p-4">
              <h3 className="text-xs font-black text-[#334155] mb-3">
               KEY MOTIVATORS 
              </h3>

              <div className="flex flex-wrap gap-2">
                {(profile.persuadabilityTopics || []).slice(0, 5).map((topic) => (
                  <span
                    key={topic}
                    className="rounded-lg bg-zetaBlue/30 px-3 py-2 text-xs font-semibold text-[#112681]"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Panel>

        <Panel
          title="6. COALITION OVERLAP"
          subtitle="Who They Align With"
          className="h-full overflow-hidden"
        >
          <CoalitionOverlapMap profile={profile} />
        </Panel>
      </div>

      

      <AIStrategistPanel
        selectedArchetype={{
          ...item,
          profile,
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
  );
}

function StatBlock({ label, value, sub, green = false }) {
  return (
    <div className="p-6 border-r border-border">
      <div className="text-xs text-zetaGray uppercase">{label}</div>
      <div className={`text-2xl font-black mt-2 ${green ? "text-green" : ""}`}>
        {value}
      </div>
      {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
    </div>
  );
}

function Panel({ title, subtitle, children, className = "" }) {
  return (
    <section className={`card p-6 ${className || "min-h-[360px]"}`}>
      <h2 className="font-black text-lg">{title}</h2>
      <p className="text-xs text-zetaGray mb-5">{subtitle}</p>
      {children}
    </section>
  );
}