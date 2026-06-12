import { useRef, useState } from "react";
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

  const [position, setPosition] = useState(() => {
  const saved = localStorage.getItem("aiStrategistPosition");

  return saved
        ? JSON.parse(saved)
        : {
            x: 0,
            y: window.innerHeight - 56,
        };
    });

    const isLeftSide = typeof window !== "undefined" && position.x < window.innerWidth / 2;

    const dragRef = useRef({
    dragging: false,
    moved: false,
    offsetX: 0,
    offsetY: 0,
    });

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

   function handleMouseDown(e) {
    dragRef.current.dragging = true;
    dragRef.current.moved = false;
    dragRef.current.offsetX = e.clientX - position.x;
    dragRef.current.offsetY = e.clientY - position.y;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    }

    function handleMouseMove(e) {
    if (!dragRef.current.dragging) return;

    dragRef.current.moved = true;

    const buttonWidth = 220;
    const buttonHeight = 56;

    const newX = Math.max(
    0,
    Math.min(window.innerWidth - buttonWidth, e.clientX - dragRef.current.offsetX)
    );

    const newY = Math.max(
    0,
    Math.min(window.innerHeight - buttonHeight, e.clientY - dragRef.current.offsetY)
    );

    setPosition({
        x: newX,
        y: newY,
    });
    }

    function handleMouseUp() {
    dragRef.current.dragging = false;

    localStorage.setItem(
        "aiStrategistPosition",
        JSON.stringify(position)
    );

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    }

    function handleFloatingButtonClick() {
    if (dragRef.current.moved) return;
    setIsOpen(true);
    }

    if (!isOpen) {
    return (
        <button
        onMouseDown={handleMouseDown}
        onClick={handleFloatingButtonClick}
        style={{
            position: "fixed",
            left: position.x,
            top: position.y,
            zIndex: 9999,
        }}
        className="flex items-center gap-3 px-6 py-3 rounded-xl bg-zetaBlue text-white font-black text-sm shadow-[0_0_35px_rgba(139,63,246,.15)] cursor-move select-none"
        >
        <Bot size={18} />
        AI Strategist
      </button>
    );
  }

  return (
    <section
        className={`fixed bottom-6 z-[9999] card shadow-2xl transition-all duration-300 overflow-hidden ${
            isMinimized ? "w-[420px] h-[74px]" : "w-[420px] h-[700px]"
        }`}
        style={{
            left: isLeftSide ? 24 : "auto",
            right: isLeftSide ? "auto" : 24,
        }}
        >
      <div className="p-4 border-b border-border flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-zetaBlue flex items-center justify-center">
            <Bot size={18} />
          </div>

          <div>
            <h3 className="font-bold text-sm">AI Strategist</h3>
            <p className="text-xs text-zetaGray">
              Campaign insights powered by AI
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-zetaGray hover:text-white"
            title={isMinimized ? "Expand" : "Collapse"}
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>

          <button
            onClick={() => setIsOpen(false)}
            className="text-zetaGray hover:text-white"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="p-4 h-[626px] flex flex-col">
          {selectedArchetype && (
            <div className="mb-3 rounded-lg border border-border bg-white p-3">
              <div className="text-xs text-zetaGray">Selected Archetype</div>
              <div className="font-bold text-sm">
                {selectedArchetype.name}
              </div>
              <div className="text-xs text-zetaGray mt-1">
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
                className="text-xs text-left rounded-lg border border-border bg-white hover:bg-[#10233b] p-2 disabled:opacity-50"
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
                    ? "bg-zetaBlue/35 ml-8"
                    : "bg-white mr-8 border border-border"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div className="bg-white border border-border rounded-lg p-3 text-sm text-zetaGray mr-8">
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
              className="flex-1 bg-white border border-border rounded-lg px-3 py-2 text-sm outline-none"
            />

            <button
              onClick={() => sendMessage()}
              disabled={loading}
              className="bg-zetaBlue hover:bg-fuchsia-600 rounded-lg px-3 disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}