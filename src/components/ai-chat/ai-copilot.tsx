"use client";

import { useState, useEffect, useRef } from "react";
import { Bot, X, Send } from "lucide-react";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function AICopilot() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: `Hello 👋 I'm WorkLancer AI.

I can help you with:

• Career Roadmaps

• Team Suggestions

• Earnings Analysis

• Project Planning

• Profile Reviews

Try using the quick actions below 🚀`,
    },
  ]);

  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const getAIResponse = (message: string) => {
    const msg = message.toLowerCase();

    if (msg.includes("earnings")) {
      return `
📈 Earnings Analysis

• Monthly Earnings: ₹42,500
• Pending Payments: ₹8,500
• Growth Trend: +18%

Recommendation:
Focus on UI/UX projects to increase earnings.
`;
    }

    if (msg.includes("team")) {
      return `
👥 Recommended Team

Frontend: Rahul Sharma
Backend: Priya Verma
AI Engineer: Arjun Singh

Estimated Cost: ₹85,000
`;
    }

    if (msg.includes("roadmap")) {
      return `
🚀 Career Roadmap

2026 → Advanced Next.js

2027 → System Design

2028 → AI Product Architect

Expected Salary: ₹24 LPA
`;
    }

    if (msg.includes("proposal")) {
  return `
📄 Project Proposal

Phase 1 → Research

Phase 2 → UI Design

Phase 3 → Development

Phase 4 → Testing

Estimated Timeline: 8 Weeks
`;
}

if (msg.includes("skill")) {
  return `
🎯 Skill Recommendation

Recommended Skills:

• Advanced Next.js

• System Design

• AI Product Development

• Cloud Architecture

Expected Career Growth: +35%
`;
}

if (
  msg.includes("task") ||
  msg.includes("tasks")
) {
  return `
📋 Suitable Tasks

Based on your profile:

• UI/UX Design System

• Dashboard Development

• SaaS Landing Page

• AI Analytics Interface

Match Score: 94%
`;
}

if (msg.includes("profile")) {
  return `
👤 Profile Analysis

Strengths:

• UI/UX Design

• React Development

• Client Communication

Areas To Improve:

• System Design

• AI Integration

Profile Score: 94/100
`;
}

if (
  msg.includes("cost") ||
  msg.includes("estimate")
) {
  return `
💰 Project Cost Estimation

Frontend: ₹30,000

Backend: ₹35,000

AI Module: ₹20,000

Testing: ₹10,000

Estimated Total:

₹95,000
`;
}

return `
🤖 WorkLancer AI

I can help with:

• Career Roadmap

• Team Suggestions

• Earnings Analysis

• Project Planning

• Skill Recommendations

• Profile Reviews

• Cost Estimation
`;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userInput = input;

    const aiResponse = getAIResponse(userInput);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userInput,
      },
      {
        role: "ai",
        text: aiResponse,
      },
    ]);

    setInput("");
  };
    
  return (
    <>
      {/* Floating Button */}

      <button
        onClick={() => setOpen(true)}
        className="
          fixed
          bottom-6
          right-6
          z-50
          h-16
          w-16
          rounded-full
          bg-gradient-to-r
          from-blue-600
          to-purple-600
          shadow-xl
          flex
          items-center
          justify-center
          hover:scale-105
          transition
        "
      >
        <>
  <Bot className="text-white" />

  <span
    className="
      absolute
      -top-1
      -right-1
      h-6
      w-6
      rounded-full
      bg-red-500
      text-white
      text-xs
      flex
      items-center
      justify-center
    "
  >
    AI
  </span>
</>
      </button>

      {/* Chat Window */}

      {open && (
        <div
          className="
            fixed
            bottom-24
            right-6
            z-50
            w-[420px]
            h-[700px]
            rounded-3xl
            border
            border-white/[0.08]
            bg-slate-950
            flex
            flex-col
            overflow-hidden
            shadow-2xl
          "
        >
          {/* Header */}

          <div
            className="
              p-4
              border-b
              border-white/[0.08]
              flex
              justify-between
              items-center
            "
          >
            <div>
              <h2 className="font-bold text-lg text-white">
                WorkLancer AI
              </h2>

              <p className="text-xs text-slate-400">
                AI Copilot
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              <X />
            </button>
          </div>

          {/* Quick Actions */}

          <div className="p-4 border-b border-white/[0.08]">
            <div className="flex flex-wrap gap-2">
              {[
  "Generate Roadmap",
  "Suggest Team",
  "Analyze Earnings",
  "Create Proposal",
  "Skill Recommendation",
  "Find Suitable Tasks",
  "Analyze Profile",
  "Project Cost Estimation",
].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    const aiResponse = getAIResponse(item);

                    setMessages((prev) => [
                      ...prev,
                      {
                        role: "user",
                        text: item,
                      },
                      {
                        role: "ai",
                        text: aiResponse,
                      },
                    ]);
                  }}
                  className="
                    px-3
                    py-2
                    rounded-xl
                    bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-1000/10
                    text-blue-400
                    text-xs
                    hover:bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-1000/20
                    transition
                  "
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.role === "user"
                    ? "ml-auto bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)] text-white"
                    : "bg-slate-800 text-white"
                }`}
              >
                <div className="whitespace-pre-line">
                  {msg.text}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}

          <div className="p-4 border-t border-white/[0.08] flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              placeholder="Ask WorkLancer AI..."
              className="
                flex-1
                bg-slate-900
                border
                border-white/[0.08]
                rounded-xl
                px-4
                py-3
                text-white
                placeholder:text-slate-500
                outline-none
              "
            />

            <button
              onClick={handleSend}
              className="
                px-4
                rounded-xl
                bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)]
                hover:from-blue-500 hover:to-purple-500
                transition
                text-white
              "
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}