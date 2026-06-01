import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

function buildPrompt({ message, selectedArchetype, chatHistory = [] }) {
  const archetypeContext = selectedArchetype
    ? `
Selected archetype:
Name: ${selectedArchetype.name}
Population: ${selectedArchetype.population}
Political lean: ${selectedArchetype.lean || "Unknown"}
Persuadability: ${selectedArchetype.persuadability || "Unknown"}
Income: ${selectedArchetype.income || "Unknown"}
Description: ${selectedArchetype.description || "No description available"}
`
    : "No archetype selected.";

  return `
You are an expert political strategy assistant for a dashboard called "Behavioral Electorate / Archetypes of America".

Help strategists understand voter archetypes, persuadability, messaging, economics, issue affinity, media channels, and audience activation.

Rules:
- Be practical and concise.
- Do not invent real polling numbers.
- Use only the provided dashboard/mock data.
- Format answers with short sections.

${archetypeContext}

Previous conversation:
${chatHistory.map((m) => `${m.role}: ${m.content}`).join("\n")}

Current strategist question:
${message}
`;
}

export default async function handler(req, res) {
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

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-3.5-flash",
      contents: prompt,
    });

    return res.status(200).json({
      provider: "gemini",
      reply: response.text,
    });
  } catch (error) {
    console.error("Gemini API error:", error);

    return res.status(500).json({
      error: error.message || "Gemini request failed.",
    });
  }
}