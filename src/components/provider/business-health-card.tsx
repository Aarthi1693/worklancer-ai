"use client";

import { TrendingUp } from "lucide-react";

export default function BusinessHealthCard() {
  return (
    <div
      className="
        rounded-3xl
        border
        border-white/[0.08]
        bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
        p-6
      "
    >
      <h3 className="text-sm text-slate-400 mb-4">Business Health</h3>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500 mb-1">Status</p>
          <p className="text-2xl font-bold text-emerald-400">Healthy</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500 mb-1">Health Score</p>
          <p className="text-2xl font-bold text-white">92%</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500 mb-1 flex items-center gap-1 justify-end">
            <TrendingUp size={14} className="text-emerald-400" />
            Growth Trend
          </p>
          <p className="text-2xl font-bold text-emerald-400">+12%</p>
        </div>
      </div>
    </div>
  );
}
