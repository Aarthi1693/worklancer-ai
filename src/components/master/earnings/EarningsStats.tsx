"use client";

import {
  IndianRupee,
  Clock3,
  Wallet,
  CheckCircle2,
} from "lucide-react";

const stats = [
  {
    title: "Total Earnings",
    value: "₹4,80,000",
    icon: IndianRupee,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    title: "Pending Payments",
    value: "₹75,000",
    icon: Clock3,
    bg: "bg-amber-100",
    color: "text-amber-600",
  },
  {
    title: "Available Balance",
    value: "₹2,10,000",
    icon: Wallet,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    title: "Completed Projects",
    value: "28",
    icon: CheckCircle2,
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
];

export default function EarningsStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {item.title}
                </p>

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