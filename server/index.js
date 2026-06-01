import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

const AI_PROVIDER = process.env.AI_PROVIDER || "ollama";
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.2";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5.5-pro";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "AI server running",
    provider: AI_PROVIDER,
    openaiKeyLoaded: Boolean(process.env.OPENAI_API_KEY),
    ollamaUrl: OLLAMA_BASE_URL,
  });
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
- Use the provided mock dashboard data as context.
- Format answers with short sections.

${archetypeContext}

Previous conversation:
${chatHistory.map((m) => `${m.role}: ${m.content}`).join("\n")}

Current strategist question:
${message}
`;
}

async function askOpenAI(prompt) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing.");
  }

  const response = await openai.responses.create({
    model: OPENAI_MODEL,
    input: prompt,
  });

  return response.output_text;
}

async function askOllama(prompt) {
  const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      prompt,
      stream: false,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Ollama request failed: ${text}`);
  }

  const data = await response.json();
  return data.response;
}

app.post("/api/strategist-chat", async (req, res) => {
  try {
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

    let reply;

    if (AI_PROVIDER === "openai") {
      reply = await askOpenAI(prompt);
    } else {
      reply = await askOllama(prompt);
    }

    res.json({
      provider: AI_PROVIDER,
      reply,
    });
  } catch (error) {
    console.error("AI ERROR:");
    console.error(error);

    res.status(500).json({
      error: error.message || "AI request failed.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`AI server running on http://localhost:${PORT}`);
  console.log(`AI provider: ${AI_PROVIDER}`);
});