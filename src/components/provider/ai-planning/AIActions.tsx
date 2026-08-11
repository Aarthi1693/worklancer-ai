"use client";

import {
  Brain,
  Users,
  Wallet,
  CalendarClock,
  ShieldAlert,
  BarChart3,
  ArrowRight,
} from "lucide-react";

const actions = [
  {
    title: "Generate Project Plan",
    description:
      "Create an AI-powered roadmap with milestones, deliverables, and execution phases.",
    icon: Brain,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Recommend Masters",
    description:
      "Find the most suitable professionals based on skills, experience, and AI matching.",
    icon: Users,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Budget Estimation",
    description:
      "Predict project costs and optimize budget allocation before starting.",
    icon: Wallet,
    color: "bg-amber-100 text-amber-600",
  },
  {
    title: "Timeline Prediction",
    description:
      "Estimate project duration with intelligent scheduling and milestones.",
    icon: CalendarClock,
    color: "bg-violet-100 text-violet-600",
  },
  {
    title: "Risk Analysis",
    description:
      "Identify project risks early and receive AI-driven mitigation strategies.",
    icon: ShieldAlert,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Productivity Insights",
    description:
      "Analyze team productivity, workload, and project health using AI.",
    icon: BarChart3,
    color: "bg-cyan-100 text-cyan-600",
  },
];

export default function AIActions() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          AI Workspace
        </h2>

        <p className="mt-2 text-slate-600">
          Select an AI capability to accelerate planning, optimize resources,
          and improve project delivery.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <div
              key={action.title}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${action.color}`}
              >
                <Icon size={30} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {action.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {action.description}
              </p>

              <button className="mt-6 inline-flex items-center gap-2 font-medium text-blue-600 transition group-hover:gap-3">
                Try Now
                <ArrowRight size={18} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}