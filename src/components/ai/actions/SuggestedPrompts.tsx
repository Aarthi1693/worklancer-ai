"use client";

import { Sparkles } from "lucide-react";

const prompts = [
  "Create a roadmap for an E-Commerce website",
  "Recommend a team for a React + Node.js project",
  "Estimate the budget for a Healthcare Management System",
  "Generate a professional project proposal",
  "Improve my project requirements",
  "Predict project completion timeline",
];

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
}

export default function SuggestedPrompts({
  onSelect,
}: SuggestedPromptsProps) {
  return (
    <div className="px-6 pt-6">

      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-blue-600" />

        <h3 className="text-lg font-semibold text-slate-900">
          Suggested Prompts
        </h3>
      </div>

      <div className="flex flex-wrap gap-3">

        {prompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onSelect(prompt)}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"
          >
            {prompt}
          </button>
        ))}

      </div>

    </div>
  );
}