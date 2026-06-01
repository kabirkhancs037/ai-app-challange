import { useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  X,
  Minimize2,
  Maximize2,
} from "lucide-react";

const suggestedPrompts = [
  "Summarize this archetype",
  "What message would persuade them?",
  "Best channels to reach this group?",
  "Create an activation plan",
];

export default function AIStrategistPanel({ selectedArchetype }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi, I’m your AI Strategist. Select an archetype or ask me what audience to target.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(customMessage) {
    const messageToSend = customMessage || input;

    if (!messageToSend.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: messageToSend,
    };

    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${apiBaseUrl}/api/strategist-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageToSend,
          selectedArchetype,
          chatHistory: messages,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "AI request failed");
      }

      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
        console.log(error);
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "The AI service is temporarily unavailable or busy. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-4 rounded-2xl bg-purple hover:bg-fuchsia-600 shadow-2xl text-white font-bold"
      >
        <Bot size={20} />
        AI Strategist
      </button>
    );
  }

  return (
    <section
      className={`fixed right-6 bottom-6 z-[9999] card shadow-2xl transition-all duration-300 overflow-hidden ${
        isMinimized ? "w-[420px] h-[74px]" : "w-[420px] h-[700px]"
      }`}
    >
      <div className="p-4 border-b border-border flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-purple flex items-center justify-center">
            <Bot size={18} />
          </div>

          <div>
            <h3 className="font-bold text-sm">AI Strategist</h3>
            <p className="text-xs text-slate-400">
              Campaign insights powered by AI
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-slate-400 hover:text-white"
            title={isMinimized ? "Expand" : "Collapse"}
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>

          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="p-4 h-[626px] flex flex-col">
          {selectedArchetype && (
            <div className="mb-3 rounded-lg border border-border bg-[#071322] p-3">
              <div className="text-xs text-slate-400">Selected Archetype</div>
              <div className="font-bold text-sm">
                {selectedArchetype.name}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {selectedArchetype.population} ·{" "}
                {selectedArchetype.lean || "Competitive"}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 mb-3">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                disabled={loading}
                className="text-xs text-left rounded-lg border border-border bg-[#071322] hover:bg-[#10233b] p-2 disabled:opacity-50"
              >
                <Sparkles size={12} className="inline mr-1" />
                {prompt}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`rounded-lg p-3 text-sm whitespace-pre-wrap leading-relaxed ${
                  msg.role === "user"
                    ? "bg-purple/35 ml-8"
                    : "bg-[#071322] mr-8 border border-border"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div className="bg-[#071322] border border-border rounded-lg p-3 text-sm text-slate-400 mr-8">
                Thinking...
              </div>
            )}
          </div>

          <div className="mt-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Ask about messaging, audiences, issues..."
              className="flex-1 bg-[#071322] border border-border rounded-lg px-3 py-2 text-sm outline-none"
            />

            <button
              onClick={() => sendMessage()}
              disabled={loading}
              className="bg-purple hover:bg-fuchsia-600 rounded-lg px-3 disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}