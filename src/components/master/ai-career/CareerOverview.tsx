"use client";

import {
  TrendingUp,
  Award,
  Briefcase,
  Star,
} from "lucide-react";

// 👇 THIS MUST BE HERE (outside the component)
const stats = [
  {
    title: "Growth Score",
    value: "88%",
    icon: TrendingUp,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    title: "Current Level",
    value: "Intermediate",
    icon: Award,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    title: "Tasks Completed",
    value: "42",
    icon: Briefcase,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    title: "Worker Rating",
    value: "4.8 / 5",
    icon: Star,
    color: "text-yellow-500",
    bg: "bg-yellow-100",
  },
];

export default function CareerOverview() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{item.title}</p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {item.value}
                </h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}
              >
                <Icon className={`h-7 w-7 ${item.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}