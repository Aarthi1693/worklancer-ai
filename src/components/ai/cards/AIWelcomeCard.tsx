"use client";

import {
  CheckCircle2,
  Sparkles,
  BrainCircuit,
} from "lucide-react";

const capabilities = [
  "Project Planning",
  "Team Recommendation",
  "Budget Estimation",
  "Proposal Generation",
  "Risk Analysis",
  "Timeline Prediction",
];

export default function AIWelcomeCard() {
  return (
    <div className="mx-6 mt-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6 shadow-sm">

      <div className="flex items-start gap-5">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-md">
          <BrainCircuit className="h-7 w-7 text-white" />
        </div>

        <div className="flex-1">

          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />

            <h2 className="text-xl font-bold text-slate-900">
              Welcome back, Aarthi 👋
            </h2>
          </div>

          <p className="mt-3 leading-7 text-slate-600">
            I'm <span className="font-semibold text-slate-900">WorkLancer AI</span>,
            powered by <span className="font-semibold text-blue-600">Qwen AI</span>.
            I can help you manage projects, recommend the best task masters,
            estimate budgets, identify project risks, and generate professional
            project plans in seconds.
          </p>

        </div>

      </div>

      <div className="mt-8">

        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
          What I can help you with
        </h3>

        <div className="grid gap-3 md:grid-cols-2">

          {capabilities.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm"
            >
              <CheckCircle2
                size={20}
                className="text-green-500"
              />

              <span className="font-medium text-slate-700">
                {item}
              </span>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}