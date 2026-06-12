import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { X } from "lucide-react";
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
            className="card px-5 py-2 text-sm"
          >
            Change Archetypes
          </button>
          <button className="card px-5 py-2 text-sm">Share</button>
        </div>
      </div>

      <h1 className="text-4xl font-black">COMPARE ARCHETYPES</h1>
      <p className="text-zetaGray mb-5">
        Select two archetypes to compare side-by-side.
      </p>

      {left && right ? (
        <>
          <div className="grid grid-cols-[1fr_1fr_330px] gap-5">
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
              <div className="card p-5">
                <h3 className="font-bold mb-5">KEY TAKEAWAYS</h3>

                <Takeaway
                  color="bg-zetaBlue"
                  text={`${left.name} has a ${
                    leftProfile?.politicalLean || left.lean
                  } profile.`}
                />

                <Takeaway
                  color="bg-blue"
                  text={`${right.name} has a ${
                    rightProfile?.politicalLean || right.lean
                  } profile.`}
                />

                <Takeaway
                  color="bg-green"
                  text="Compare persuadability, income, issue priorities, and behavioral patterns side-by-side."
                />
              </div>
            </aside>
          </div>

          <div className="card p-5 mt-5 grid grid-cols-5 gap-4 text-sm">
            <div>
              <div className="font-bold">OVERLAP SNAPSHOT</div>
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

  return (
    <div className="space-y-4">
      <div className="card p-5 relative" style={{ borderColor: item.color }}>
        <button
          onClick={onRemove}
          className="absolute right-4 top-4 w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-[#10233b]"
          title="Remove archetype"
        >
          <X size={16} />
        </button>

        <div className="pr-10">
          <div className="text-xs uppercase font-bold" style={{ color: item.color }}>
            Archetype
          </div>

          <h2 className="text-2xl font-bold">{item.name}</h2>

          <p className="text-sm text-zetaGray mt-1">{item.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
          <Metric label="Population" value={profile?.population || item.population} />
          <Metric label="Political Lean" value={profile?.politicalLean || item.lean} />
          <Metric label="Median Income" value={profile?.medianIncome || item.income} />
          <Metric label="Persuadability" value={profile?.persuadability || item.persuadability} />
        </div>
      </div>

      <div className="card p-5">
        <h3 className="font-bold mb-4">DEMOGRAPHICS</h3>
        <MiniBars data={profile?.ageDistribution || []} color={barColor} />
      </div>

      <div className="card p-5">
        <h3 className="font-bold mb-4">POLITICAL PROFILE</h3>
        <MiniBars data={profile?.politicalProfile || []} color={barColor} />
      </div>

      <div className="card p-5">
        <h3 className="font-bold mb-4">TOP BEHAVIORAL FEATURES</h3>
        <MiniBars data={profile?.behavioralDNA?.overIndex || []} color={barColor} />
      </div>
    </div>
  );
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
      <div className="text-xs uppercase text-slate-500">{label}</div>
      <div className="font-bold text-lg mt-1">{value}</div>
    </div>
  );
}

function Takeaway({ color, text }) {
  return (
    <div className="flex gap-4 mb-5 text-sm text-[#334155]">
      <div className={`w-10 h-10 rounded-full ${color} shrink-0`} />
      <p>{text}</p>
    </div>
  );
}