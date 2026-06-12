import { useMemo, useState } from "react";
import { X, Search, Scale, Check } from "lucide-react";
import { archetypes } from "../data/mockData";
import { Users } from "lucide-react";
import { color } from "framer-motion";

export default function CompareArchetypeModal({
  open,
  onClose,
  onCompare,
  initialSelectedIds = [],
  forceSelection = false,
}) {
const [query, setQuery] = useState("");
const [selectedIds, setSelectedIds] = useState(
  initialSelectedIds.filter(Boolean).slice(0, 2)
);

  const filteredArchetypes = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return archetypes;

    return archetypes.filter((item) =>
      item.name.toLowerCase().includes(search) ||
      item.lean?.toLowerCase().includes(search) ||
      item.description?.toLowerCase().includes(search)
    );
  }, [query]);

  if (!open) return null;

  function toggleArchetype(id) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  }

  function handleCompare() {
    if (selectedIds.length !== 2) return;
    onCompare?.(selectedIds);
  }

  function handleClose() {
    if (forceSelection) return;
    onClose?.();
  }

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#020916]/80 backdrop-blur-sm flex items-center justify-center p-5"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-[980px] max-h-[90vh] rounded-2xl border border-border bg-white shadow-2xl overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="p-6 border-b border-border">
          <div className="flex items-start justify-between gap-5">
            <div className="flex gap-4">
              <div className="w-14 h-14 rounded-full bg-zetaBlue flex items-center justify-center">
                <Scale size={4} className="w-8 h-8 text-white"/>
              </div>

              <div>
                <h2 className="text-2xl font-black">Compare Archetypes</h2>
                <p className="text-sm text-zetaGray mt-1">
                  Select up to 2 archetypes to compare side-by-side.
                </p>
              </div>
            </div>

            <button
            onClick={handleClose}
            className={`w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-[#d3d3d3] ${
                forceSelection ? "opacity-40 cursor-not-allowed" : ""
            }`}
            title={forceSelection ? "Select 2 archetypes to continue" : "Close"}
            >
            <X size={18} />
            </button>
          </div>

          <div className="relative mt-6">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zetaGray"
            />

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search archetypes by name, keyword, or political leaning..."
              className="w-full bg-[#fff] border border-border rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-purple"
            />
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[52vh] min-h-[260px]">
            {filteredArchetypes.length > 0 ? (
                <div className="grid grid-cols-5 gap-4">
                {filteredArchetypes.map((item) => {
                    const selected = selectedIds.includes(item.id);

                    return (
                    <button
                        key={item.id}
                        onClick={() => toggleArchetype(item.id)}
                        className={`relative text-left rounded-xl border p-4 min-h-[150px] transition ${
                        selected
                            ? "border-purple bg-zetaBlue/10"
                            : "border-border bg-white/60 hover:border-purple/60"
                        }`}
                    >
                        {selected && (
                        <span className="absolute right-3 top-3 w-7 h-7 rounded-full bg-zetaBlue flex items-center justify-center">
                            <Check size={16} className="text-white" />
                        </span>
                        )}

                        <div className="flex items-center gap-3">
                        <div
                            className="w-11 h-11 rounded-full flex items-center justify-center text-lg shrink-0"
                            style={{
                            background: item.color
                            }}
                        >
                            <Users className="text-white"/>
                        </div>

                        <div className="font-semibold text-sm leading-tight pr-5">
                            {item.name}
                        </div>
                        </div>

                        <div className="mt-4 inline-block rounded bg-[#244FA1] text-white px-2 py-1 text-[11px]">
                        {item.lean || "Competitive"}
                        </div>

                        <div className="mt-4 text-xs text-zetaDark">
                        {item.population} Adults
                        </div>
                    </button>
                    );
                })}
                </div>
            ) : (
                <div className="h-full min-h-[220px] flex items-center justify-center">
                <div className="w-full rounded-2xl border border-dashed border-[#C1DAFF] bg-[#F6FAFF] py-12 px-6 text-center">
                    <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-zetaBlue/10 flex items-center justify-center">
                    <Search size={24} className="text-zetaBlue" />
                    </div>

                    <h3 className="text-xl font-black text-[#1F2937]">
                    No Matching Archetypes
                    </h3>

                    <p className="text-[#49565D] mt-2">
                    No archetypes match{" "}
                    <span className="font-bold">"{query}"</span>.
                    </p>

                    <button
                    onClick={() => setQuery("")}
                    className="mt-5 px-5 py-2 rounded-lg bg-zetaBlue text-white font-bold hover:bg-zetaBlue/90 transition"
                    >
                    Clear Search
                    </button>
                </div>
                </div>
            )}
        </div>

        <div className="p-6 border-t border-border flex items-center justify-between gap-5">
          <div>
            <div className="text-sm font-bold text-zetaBlue">
              Selected ({selectedIds.length}/2)
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {selectedIds.map((id) => {
                const item = archetypes.find((a) => a.id === id);

                if (!item) return null;

                return (
                  <button
                    key={id}
                    onClick={() => toggleArchetype(id)}
                   className="rounded-lg border border-border px-3 py-2 text-xs text-[#1F2937] hover:bg-[#F6FAFF]"
                  >
                    {item.name} <span style={{marginLeft:'6px'}}>×</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleCompare}
            disabled={selectedIds.length !== 2}
            className="rounded-xl bg-zetaBlue px-4 py-2 text-white font-semobold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zetaBlue/90"
          >
            Compare Now →
          </button>
        </div>
      </div>
    </div>
  );
}