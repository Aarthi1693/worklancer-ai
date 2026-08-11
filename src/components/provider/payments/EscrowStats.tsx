"use client";

import {
  Lock,
  CheckCircle2,
  Wallet,
  AlertTriangle,
} from "lucide-react";

const stats = [
  {
    title: "Locked Funds",
    value: "₹1,25,000",
    icon: Lock,
    bg: "bg-amber-100",
    color: "text-amber-600",
  },
  {
    title: "Released",
    value: "₹4,80,000",
    icon: CheckCircle2,
    bg: "bg-emerald-100",
    color: "text-emerald-600",
  },
  {
    title: "Pending Release",
    value: "₹75,000",
    icon: Wallet,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    title: "Disputes",
    value: "02",
    icon: AlertTriangle,
    bg: "bg-red-100",
    color: "text-red-600",
  },
];

export default function EscrowStats() {
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