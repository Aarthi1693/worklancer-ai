"use client";

import {
  FileText,
  Briefcase,
  BrainCircuit,
  FolderKanban,
  GraduationCap,
  Map,
  ArrowRight,
} from "lucide-react";

const actions = [
  {
    title: "Resume Review",
    description: "Get AI feedback on your resume.",
    icon: FileText,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Proposal Generator",
    description: "Generate winning project proposals.",
    icon: Briefcase,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Skill Assessment",
    description: "Evaluate your technical strengths.",
    icon: BrainCircuit,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Portfolio Analyzer",
    description: "Improve your project portfolio.",
    icon: FolderKanban,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Interview Preparation",
    description: "Practice technical interviews.",
    icon: GraduationCap,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Career Roadmap",
    description: "Generate a personalized roadmap.",
    icon: Map,
    color: "bg-cyan-100 text-cyan-600",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold text-slate-900">
        Quick Actions
      </h2>

      <div className="space-y-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="flex w-full items-center justify-between rounded-2xl border border-slate-200 p-4 text-left transition-all duration-300 hover:border-blue-300 hover:bg-slate-50 hover:shadow-md"
            >
              <div className="flex items-center gap-4">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${action.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <div>

                  <h3 className="font-semibold text-slate-900">
                    {action.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {action.description}
                  </p>

                </div>

              </div>

              <ArrowRight className="h-5 w-5 text-slate-400" />

            </button>
          );
        })}

      </div>

    </div>
  );
}