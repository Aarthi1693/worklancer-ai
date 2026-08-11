"use client";

import { Bot, SendHorizonal, User } from "lucide-react";
import { useState } from "react";
import { sendMessage } from "@/services/ai.service";
import TypingAnimation from "@/components/ai/chat/TypingAnimation";
import { useToast } from "@/components/ui/toast";
import { ChatMessage } from "@/components/ai/chat/ChatMessages";

export default function ChatWindow() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Hello! 👋 I'm your AI Assistant. I can help you improve your profile, generate proposals, recommend learning paths, and answer career-related questions.",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const { addToast } = useToast();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);

    const prompt = input;

    setInput("");

    setLoading(true);

    try {
      const result = await sendMessage(prompt);

      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: result.response,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to get a response from AI.";

      addToast(message, "error");

      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `I'm sorry, but I encountered an error:\n\n${message}`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[700px] flex-col rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 p-5">
        <h2 className="text-xl font-bold text-slate-900">
          AI Conversation
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Ask anything about freelancing, skills, career growth, or projects.
        </p>
      </div>

      {/* Messages */}

      <div className="flex-1 space-y-6 overflow-y-auto p-6">

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`flex max-w-[80%] gap-3 ${
                msg.role === "user"
                  ? "flex-row-reverse"
                  : ""
              }`}
            >
              {/* Avatar */}

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  msg.role === "user"
                    ? "bg-blue-100"
                    : "bg-violet-100"
                }`}
              >
                {msg.role === "user" ? (
                  <User className="h-5 w-5 text-blue-600" />
                ) : (
                  <Bot className="h-5 w-5 text-violet-600" />
                )}
              </div>

              {/* Bubble */}

              <div
                className={`rounded-2xl px-5 py-4 text-sm leading-7 ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                {msg.content}
              </div>
            </div>
          </div>
        ))}

        {loading && <TypingAnimation />}

      </div>

      {/* Input */}

      <div className="border-t border-slate-200 p-5">

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Ask AI anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <SendHorizonal size={18} />
            Send
          </button>

        </div>

      </div>

    </div>
  );
}