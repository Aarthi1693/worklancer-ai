"use client";

import { Bot } from "lucide-react";

export default function TypingAnimation() {
  return (
    <div className="flex justify-start">

      <div className="flex max-w-[80%] gap-3">

        {/* AI Avatar */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-cyan-500">
          <Bot className="h-5 w-5 text-white" />
        </div>

        {/* Typing Bubble */}
        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">

          <p className="mb-3 text-sm font-medium text-slate-500">
            Qwen AI is thinking...
          </p>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]" />

            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.15s]" />

            <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-500" />
          </div>

        </div>

      </div>

    </div>
  );
}