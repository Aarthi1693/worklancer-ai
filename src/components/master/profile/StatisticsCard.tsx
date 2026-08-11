"use client";

import {
  Briefcase,
  Star,
  IndianRupee,
  CheckCircle,
} from "lucide-react";

const stats = [
  {
    title: "Tasks Completed",
    value: "42",
    icon: Briefcase,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Worker Rating",
    value: "4.8",
    icon: Star,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Total Earnings",
    value: "₹82,500",
    icon: IndianRupee,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Completion Rate",
    value: "98%",
    icon: CheckCircle,
    color: "bg-purple-100 text-purple-600",
  },
];

export default function StatisticsCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-semibold text-slate-900">
        Performance Statistics
      </h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-100 p-5 transition hover:shadow-md"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}
              >
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="mt-4 text-3xl font-bold text-slate-900">
                {item.value}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {item.title}
              </p>
            </div>
          );
        })}

      </div>

    </div>
  );
}