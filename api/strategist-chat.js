import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function buildPrompt({ message, selectedArchetype, chatHistory = [] }) {
  const recentHistory = chatHistory.slice(-6);

  const archetypeContext = selectedArchetype
    ? `
Selected archetype:
Name: ${selectedArchetype.name}
Population: ${selectedArchetype.profile?.population || selectedArchetype.population}
Political lean: ${selectedArchetype.profile?.politicalLean || selectedArchetype.lean || "Unknown"}
Median income: ${selectedArchetype.profile?.medianIncome || selectedArchetype.income || "Unknown"}
Persuadability: ${selectedArchetype.profile?.persuadability || selectedArchetype.persuadability || "Unknown"}
Median age: ${selectedArchetype.profile?.medianAge || "Unknown"}
Homeownership: ${selectedArchetype.profile?.homeownershipRate || "Unknown"}%

Age distribution:
${JSON.stringify(selectedArchetype.profile?.ageDistribution || [])}

Ethnicity mix:
${JSON.stringify(selectedArchetype.profile?.ethnicityMix || [])}

Income distribution:
${JSON.stringify(selectedArchetype.profile?.incomeDistribution || [])}

Behavioral DNA:
${JSON.stringify(selectedArchetype.profile?.behavioralDNA || {})}

Economic profile:
${JSON.stringify(selectedArchetype.profile?.economicProfile || [])}

Political profile:
${JSON.stringify(selectedArchetype.profile?.politicalProfile || [])}

Geography:
${JSON.stringify(selectedArchetype.profile?.geography || [])}

Urbanicity:
${JSON.stringify(selectedArchetype.profile?.urbanicity || [])}

Persuadability topics:
${JSON.stringify(selectedArchetype.profile?.persuadabilityTopics || [])}

Coalition overlap:
${JSON.stringify(selectedArchetype.profile?.coalitionOverlap || [])}
`
    : "No archetype selected.";

  return `
You are an expert political strategy assistant for a dashboard called "Behavioral Electorate / Archetypes of America".

Rules:
- Be practical and concise.
- Do not invent real polling numbers.
- Use only the provided dashboard/mock data.
- Format answers with short sections.

${archetypeContext}

Recent conversation:
${recentHistory.map((m) => `${m.role}: ${m.content}`).join("\n")}

Current strategist question:
${message}
`;
}

async function generateWithFallback(prompt) {
  const models = [
    process.env.GEMINI_MODEL,
    "gemini-2.5-flash",
    "gemini-3.5-flash",
    "gemini-3.1-flash-lite",
  ].filter(Boolean);

  let lastError;

  for (const model of [...new Set(models)]) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
        });

        return {
          text: response.text,
          model,
        };
      } catch (error) {
        lastError = error;

        const message = String(error?.message || "");
        const isTemporary =
          message.includes("503") ||
          message.includes("UNAVAILABLE") ||
          message.includes("high demand") ||
          message.includes("429");

        if (!isTemporary) {
          throw error;
        }

        await sleep(900 * attempt);
      }
    }
  }

  throw lastError;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        error: "Method not allowed",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is missing in Vercel environment variables.",
      });
    }

    const { message, selectedArchetype, chatHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required.",
      });
    }

    const prompt = buildPrompt({
      message,
      selectedArchetype,
      chatHistory,
    });

    const result = await generateWithFallback(prompt);

    return res.status(200).json({
      provider: "gemini",
      model: result.model,
      reply: result.text,
    });
  } catch (error) {
    console.error("Gemini API error:", error);

    return res.status(500).json({
      error:
        error?.message ||
        "Gemini request failed. The model may be temporarily overloaded.",
    });
  }
}