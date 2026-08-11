"use client";

import {
  BrainCircuit,
  Users,
  Wallet,
  FileText,
  ShieldCheck,
  Lightbulb,
  CalendarDays,
  BarChart3,
} from "lucide-react";

const actions = [
  {
    title: "Project Planner",
    description: "Generate milestones and project roadmap.",
    icon: BrainCircuit,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Team Recommendation",
    description: "Find the best Task Masters instantly.",
    icon: Users,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Budget Estimator",
    description: "Estimate project cost and duration.",
    icon: Wallet,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Proposal Generator",
    description: "Generate professional project proposals.",
    icon: FileText,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Risk Analysis",
    description: "Identify project risks before starting.",
    icon: ShieldCheck,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Skill Recommendation",
    description: "Suggest required technologies & skills.",
    icon: Lightbulb,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Timeline Prediction",
    description: "Predict project completion timeline.",
    icon: CalendarDays,
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    title: "Productivity Insights",
    description: "Optimize workflow using AI analytics.",
    icon: BarChart3,
    color: "bg-indigo-100 text-indigo-600",
  },
];

interface QuickActionsProps {
  onSelect: (prompt: string) => void;
}

export default function QuickActions({
  onSelect,
}: QuickActionsProps) {
  return (
    <div className="px-6 pt-6">

      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-900">
          AI Quick Actions
        </h3>

        <p className="text-sm text-slate-500">
          Start with a predefined AI workflow.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => onSelect(action.title)}
              className="group rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${action.color}`}
              >
                <Icon size={24} />
              </div>

              <h4 className="font-semibold text-slate-900 group-hover:text-blue-600">
                {action.title}
              </h4>

              <p className="mt-2 text-sm leading-5 text-slate-500">
                {action.description}
              </p>
            </button>
          );
        })}

      </div>

    </div>
  );
}