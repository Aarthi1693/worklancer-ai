"use client";

import { Sparkles } from "lucide-react";

interface CareerHeaderProps {
  onGeneratePlan: () => Promise<void>;
  loading: boolean;
}

export default function CareerHeader({ onGeneratePlan, loading }: CareerHeaderProps) {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
          <Sparkles className="h-8 w-8 text-violet-600" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            AI Career Coach
          </h1>

          <p className="mt-1 text-slate-500">
            Receive personalized career guidance, skill recommendations, and
            market insights powered by AI to accelerate your professional
            growth.
          </p>
        </div>
      </div>

      <button
        onClick={onGeneratePlan}
        disabled={loading}
        className="
          flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3
          font-semibold text-white transition hover:bg-violet-700
          disabled:opacity-50
        "
      >
        {loading ? (
          <>
            <Sparkles className="h-5 w-5 animate-pulse" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            Generate Career Plan
          </>
        )}
      </button>
    </div>
  );
}