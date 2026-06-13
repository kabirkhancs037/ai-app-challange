import { useEffect, useState } from "react";
import { Sparkles, RefreshCw } from "lucide-react";

export default function AIInsightCard({ selectedArchetype }) {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  async function generateInsight() {
    if (!selectedArchetype) return;

    setLoading(true);
    setInsight("");
    setHasLoaded(true);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || "";

      const res = await fetch(`${apiBaseUrl}/api/strategist-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedArchetype,
          chatHistory: [],
          message: `
Generate an AI Archetype Summary for ${selectedArchetype.name}.

Use this exact structure:

Who they are:
Why they matter:
What persuades them:
Best message angle:
Risk factors:

Keep each section short, practical, and strategic.
Use only the provided dashboard/mock data.
`,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "AI request failed");
      }

      setInsight(data.reply);
    } catch (error) {
      console.log(error);
      setInsight(
        "AI insight is temporarily unavailable. Please try again in a moment."
      );
    } finally {
      setLoading(false);
    }
  }

useEffect(() => {
  const resetInsight = () => {
    setInsight("");
    setLoading(false);
    setHasLoaded(false);
  };

  resetInsight();
}, [selectedArchetype?.id]);

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-purple" />
            <h3 className="font-black text-lg">AI ARCHETYPE INSIGHT</h3>
          </div>

          <p className="text-sm text-zetaGray mt-1">
            Discover what drives this audience
          </p>
        </div>

        {hasLoaded && (
          <button
            onClick={generateInsight}
            disabled={loading}
            className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-[#10233b] disabled:opacity-50"
            title="Regenerate insight"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          </button>
        )}
      </div>

      {!hasLoaded ? (
        <button
          onClick={generateInsight}
          disabled={!selectedArchetype || loading}
          className="w-full rounded-xl border border-zetaBlue/50 px-4 py-3 text-sm font-bold text-zetaBlue hover:bg-zetaBlue/10 transition disabled:opacity-50"
        >
          Load AI Insight
        </button>
      ) : loading ? (
        <div className="space-y-3">
          <div className="h-3 bg-[#142239] rounded w-5/6 animate-pulse" />
          <div className="h-3 bg-[#142239] rounded w-full animate-pulse" />
          <div className="h-3 bg-[#142239] rounded w-4/6 animate-pulse" />
          <div className="h-3 bg-[#142239] rounded w-5/6 animate-pulse" />
        </div>
      ) : (
        <div className="text-sm text-[#334155] whitespace-pre-wrap leading-relaxed">
          {insight}
        </div>
      )}
    </div>
  );
}