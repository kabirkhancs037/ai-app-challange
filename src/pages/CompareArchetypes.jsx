import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  X,
  ArrowRightLeft,
  Wallet,
  Gauge,
  TrendingUp,
  Users,
} from "lucide-react";
import { archetypes } from "../data/mockData";
import { getArchetypeProfileById } from "../data/archetypeProfiles";
import MiniBars from "../components/MiniBars";
import CompareArchetypeModal from "../components/CompareArchetypeModal";

export default function CompareArchetypes() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [showCompareModal, setShowCompareModal] = useState(false);

  const leftId = searchParams.get("left");
  const rightId = searchParams.get("right");

  const selectedIds = useMemo(
    () => [leftId, rightId].filter(Boolean),
    [leftId, rightId]
  );

  const left = archetypes.find((item) => item.id === leftId);
  const right = archetypes.find((item) => item.id === rightId);

  const leftProfile = left ? getArchetypeProfileById(left.id) : null;
  const rightProfile = right ? getArchetypeProfileById(right.id) : null;

  const needsSelection = !left || !right;
  const modalOpen = showCompareModal || needsSelection;

  function handleCompare(ids) {
    navigate(`/compare?left=${ids[0]}&right=${ids[1]}`);
    setShowCompareModal(false);
  }

  function removeArchetype(side) {
    const remainingId = side === "left" ? right?.id : left?.id;

    if (remainingId) {
      navigate(`/compare?left=${remainingId}`);
    } else {
      navigate("/compare");
    }

    setShowCompareModal(true);
  }

  return (
    <div>
      <div className="flex justify-between mb-5">
        <Link to="/map" className="card px-5 py-2 text-sm">
          ← Back to Pick Archetypes
        </Link>

        <div className="flex gap-3">
          <button
            onClick={() => setShowCompareModal(true)}
            className="card px-5 py-2 text-sm flex items-center gap-2 hover:bg-[#F6FAFF]"
          >
            <ArrowRightLeft size={16} />
            Change Archetypes
          </button>
        </div>
      </div>

      <h1 className="text-4xl font-black">COMPARE ARCHETYPES</h1>
      <p className="text-zetaGray mb-5">
        Select two archetypes to compare side-by-side.
      </p>

      {left && right ? (
        <>
          <div className="grid grid-cols-[1fr_1fr_330px] gap-5 relative">
            <CompareColumn
              item={left}
              profile={leftProfile}
              color="purple"
              onRemove={() => removeArchetype("left")}
            />

            <CompareColumn
              item={right}
              profile={rightProfile}
              color="blue"
              onRemove={() => removeArchetype("right")}
            />

            <aside className="space-y-4">
              <div className="card p-5 min-h-[280px]">
                <h3 className="font-black mb-5">KEY TAKEAWAYS</h3>

                <Takeaway
                  icon={<Users size={18} />}
                  color="bg-zetaBlue"
                  text={`${left.name} has a ${
                    leftProfile?.politicalLean || left.lean
                  } profile, while ${right.name} has a ${
                    rightProfile?.politicalLean || right.lean
                  } profile.`}
                />

                <Takeaway
                  icon={<Gauge size={18} />}
                  color="bg-zetaPurple"
                  text={`Persuadability differs: ${
                    leftProfile?.persuadability || left.persuadability
                  } vs ${
                    rightProfile?.persuadability || right.persuadability
                  }.`}
                />

                <Takeaway
                  icon={<Wallet size={18} />}
                  color="bg-zetaGreen"
                  text={`Income comparison: ${
                    leftProfile?.medianIncome || left.income
                  } vs ${rightProfile?.medianIncome || right.income}.`}
                />

                <Takeaway
                  icon={<TrendingUp size={18} />}
                  color="bg-zetaOrange"
                  text={`Shared priority area: ${
                    getSharedIssue(leftProfile, rightProfile) || "Needs data"
                  }.`}
                />
              </div>

              <div className="card p-5 min-h-[220px]">
                <h3 className="font-black mb-4">STRATEGIC READ</h3>
                <p className="text-sm text-[#334155] leading-relaxed">
                  Use this comparison to identify where messaging can bridge
                  both archetypes and where persuasion strategies should split
                  by economics, lifestyle, and political priority.
                </p>
              </div>
            </aside>
          </div>

          <div className="card p-5 mt-5 grid grid-cols-5 gap-4 text-sm">
            <div>
              <div className="font-black">OVERLAP SNAPSHOT</div>
              <div className="text-zetaGray">
                Where these two archetypes intersect
              </div>
            </div>

            <Metric label="Left Archetype" value={left.name} />
            <Metric label="Right Archetype" value={right.name} />

            <Metric
              label="Shared Priority"
              value={getSharedIssue(leftProfile, rightProfile) || "Needs data"}
            />

            <Metric
              label="Persuadability Gap"
              value={`${leftProfile?.persuadability || left.persuadability} vs ${
                rightProfile?.persuadability || right.persuadability
              }`}
            />
          </div>
        </>
      ) : (
        <div className="card p-8 text-center">
          <h2 className="text-2xl font-black">Select 2 archetypes to compare</h2>
          <p className="text-zetaGray mt-2">
            Choose any two archetypes to begin comparison.
          </p>
        </div>
      )}

      <CompareArchetypeModal
        key={modalOpen ? selectedIds.join("-") || "empty" : "closed"}
        open={modalOpen}
        initialSelectedIds={selectedIds}
        forceSelection={needsSelection}
        onClose={() => setShowCompareModal(false)}
        onCompare={handleCompare}
      />
    </div>
  );
}

function CompareColumn({ item, profile, color, onRemove }) {
  const barColor = color === "blue" ? "bg-blue" : "bg-zetaBlue";
  const heroCardClass = "card p-5 h-[330px] relative overflow-hidden";
  const sectionClass = "card p-5 h-[300px] flex flex-col overflow-hidden";
  const summaryCardClass = "card p-5 h-[160px] overflow-hidden";
  const summaryCardClass_op = "card p-5 h-[260px] overflow-hidden";
  const score = getPersuadabilityScore(profile?.persuadability || item.persuadability);

  return (
    <div className="space-y-4">
      <div className={heroCardClass} style={{ borderColor: item.color }}>
        <button
          onClick={onRemove}
          className="absolute right-4 top-4 w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-[#F6FAFF]"
          title="Remove archetype"
        >
          <X size={16} />
        </button>

        <div className="pr-10">
          <div
            className="text-xs uppercase font-black"
            style={{ color: item.color }}
          >
            Archetype
          </div>

          <div className="flex items-center justify-between gap-4 mt-1">
            <h2 className="text-l font-black leading-tight">
              {item.name}
            </h2>

            <button
              className="shrink-0 rounded-lg bg-zetaBlue text-white px-4 py-2 text-xs font-bold hover:bg-zetaBlueDark1 transition"
              onClick={() => alert(`Activate Audience: ${item.name}`)}
            >
              Activate Audience
            </button>
          </div>

          <p className="text-sm text-zetaGray mt-2 line-clamp-3">
            {item.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
          <Metric label="Population" value={profile?.population || item.population} />
          <Metric label="Political Lean" value={profile?.politicalLean || item.lean} />
          <Metric label="Median Income" value={profile?.medianIncome || item.income} />
          <Metric label="Persuadability" value={profile?.persuadability || item.persuadability} />
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className="font-black mb-4">DEMOGRAPHICS</h3>
        <MiniBars data={profile?.ageDistribution || []} color={barColor} />
      </div>

      <div className={sectionClass}>
        <h3 className="font-black mb-4 shrink-0">
          POLITICAL PROFILE
        </h3>

        <div className="flex-1 min-h-0 overflow-y-auto pr-3">
          <MiniBars
            data={profile?.politicalProfile || []}
            color={barColor}
          />
        </div>
      </div>

      <div className={sectionClass}>
        <h3 className="font-black mb-4 shrink-0">
          TOP BEHAVIORAL FEATURES
        </h3>

        <div className="flex-1 min-h-0 overflow-y-auto pr-3">
          <MiniBars
            data={profile?.behavioralDNA?.overIndex || []}
            color={barColor}
          />
        </div>
      </div>

      <div className={summaryCardClass}>
        <h3 className="font-black mb-4">ECONOMIC PROFILE</h3>

        <div className="grid grid-cols-3 gap-3 text-sm">
          <MiniMetric
            label="Median Income"
            value={profile?.medianIncome || item.income}
          />
          <MiniMetric
            label="Homeownership"
            value={`${profile?.homeownershipRate || "—"}%`}
          />
          <MiniMetric
            label="Persuadability"
            value={profile?.persuadability || item.persuadability}
          />
        </div>
      </div>

      <div className={summaryCardClass_op}>
        <h3 className="font-black mb-4">OVERALL PERSUADABILITY</h3>

        <div className="flex items-end gap-3">
          <div
            className={`text-5xl font-black ${
              color === "blue" ? "text-blue" : "text-zetaBlue"
            }`}
          >
            {score}
          </div>

          <div className="text-zetaGray font-bold mb-2">/100</div>
        </div>

        <div className="mt-4 h-3 rounded-full bg-[#E5E7EB] overflow-hidden">
          <div
            className={`h-full rounded-full ${
              color === "blue" ? "bg-blue" : "bg-zetaBlue"
            }`}
            style={{ width: `${score}%` }}
          />
        </div>

        <div className="mt-3 text-sm text-zetaGray">
          Most persuadable on:
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {(profile?.persuadabilityTopics || [])
            .slice(0, 3)
            .map((topic) => (
              <span
                key={topic}
                className="rounded-lg bg-[#F6FAFF] border border-[#C1DAFF] px-3 py-1 text-xs font-bold text-[#1F2937]"
              >
                {topic}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}

function getPersuadabilityScore(value) {
  if (value === "Very High") return 85;
  if (value === "High") return 72;
  if (value === "Medium") return 55;
  if (value === "Low") return 35;
  return 50;
}

function getSharedIssue(leftProfile, rightProfile) {
  if (!leftProfile?.politicalProfile || !rightProfile?.politicalProfile) {
    return null;
  }

  const leftTop = leftProfile.politicalProfile[0]?.[0];
  const rightTop = rightProfile.politicalProfile[0]?.[0];

  if (leftTop === rightTop) return leftTop;

  return `${leftTop || "Unknown"} / ${rightTop || "Unknown"}`;
}

function Metric({ label, value }) {
  return (
    <div>
      <div className="text-xs uppercase text-zetaGray font-bold">{label}</div>
      <div className="font-black text-lg mt-1 text-[#1F2937]">{value}</div>
    </div>
  );
}

function MiniMetric({ label, value }) {
  return (
    <div className="rounded-xl border border-border bg-[#F6FAFF] p-3">
      <div className="text-[11px] uppercase text-zetaGray font-bold">
        {label}
      </div>
      <div className="font-black text-lg mt-1 text-[#1F2937]">
        {value}
      </div>
    </div>
  );
}

function Takeaway({ color, text, icon }) {
  return (
    <div className="flex gap-4 mb-5 text-sm text-[#334155]">
      <div
        className={`w-10 h-10 rounded-full ${color} shrink-0 flex items-center justify-center text-white`}
      >
        {icon}
      </div>
      <p>{text}</p>
    </div>
  );
}