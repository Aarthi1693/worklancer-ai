"use client";

import { Bot, User, Copy, Check } from "lucide-react";
import { useState } from "react";

interface MessageBubbleProps {
  role: "user" | "assistant";
  message: string;
  timestamp?: string;
}

export default function MessageBubble({
  role,
  message,
  timestamp,
}: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);

  const copyMessage = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const isUser = role === "user";

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex max-w-[85%] gap-3 ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        {/* Avatar */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            isUser
              ? "bg-blue-600"
              : "bg-gradient-to-br from-indigo-600 to-cyan-500"
          }`}
        >
          {isUser ? (
            <User className="h-5 w-5 text-white" />
          ) : (
            <Bot className="h-5 w-5 text-white" />
          )}
        </div>

        {/* Message */}
        <div
          className={`rounded-3xl px-5 py-4 shadow-sm ${
            isUser
              ? "bg-blue-600 text-white"
              : "border border-slate-200 bg-white text-slate-800"
          }`}
        >
          <div className="whitespace-pre-wrap text-[15px] leading-7">
            {message}
          </div>

          <div className="mt-4 flex items-center justify-between gap-5">
            <span
              className={`text-xs ${
                isUser ? "text-blue-100" : "text-slate-400"
              }`}
            >
              {timestamp}
            </span>

            {!isUser && (
              <button
                onClick={copyMessage}
                className="rounded-lg p-1 transition hover:bg-slate-100"
              >
                {copied ? (
                  <Check
                    className="h-4 w-4 text-green-600"
                  />
                ) : (
                  <Copy
                    className="h-4 w-4 text-slate-500"
                  />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}