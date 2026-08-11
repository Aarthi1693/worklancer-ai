"use client";

import {
  BrainCircuit,
  FileText,
  RotateCcw,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Saved Plans",
    value: "2",
    description: "Total AI plans saved",
    icon: FileText,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Generated This Month",
    value: "1",
    description: "New AI roadmaps",
    icon: BrainCircuit,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Average AI Confidence",
    value: "84%",
    description: "Planning accuracy",
    icon: TrendingUp,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Plans Reused",
    value: "1",
    description: "Duplicated & reused",
    icon: RotateCcw,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function SavedPlanStats() {
  return (
    <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {item.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  {item.value}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {item.description}
                </p>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color}`}
              >
                <Icon size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}