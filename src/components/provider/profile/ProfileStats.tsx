"use client";

import {
  ClipboardList,
  Briefcase,
  Users,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Tasks Posted",
    value: "24",
    icon: ClipboardList,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Active Projects",
    value: "6",
    icon: Briefcase,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Masters Hired",
    value: "18",
    icon: Users,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Success Rate",
    value: "96%",
    icon: TrendingUp,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function ProfileStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {stat.value}
                </h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.color}`}
              >
                <Icon size={26} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}