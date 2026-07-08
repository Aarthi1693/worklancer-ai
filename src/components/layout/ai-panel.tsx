"use client";

import { Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AIPanel() {
  const pathname = usePathname();

  const isMaster = pathname.startsWith("/master");

  return (
    <aside
      className="
        w-80
        border-l
        border-white/[0.08]
        bg-slate-950
        p-4
      "
    >
      <div className="flex items-center gap-2 mb-6">
        <Sparkles
          size={18}
          className="text-blue-400"
        />

        <h2 className="font-semibold text-lg">
          {isMaster
            ? "AI Career Assistant"
            : "AI Assistant"}
        </h2>
      </div>

      <div className="space-y-4">

        {isMaster ? (
          <>
            <div className="rounded-xl border border-white/[0.08] p-4">
              <p className="text-sm text-slate-400">
                Productivity Score
              </p>

              <h3 className="text-3xl font-bold text-green-400 mt-2">
                96%
              </h3>
            </div>

            <div className="rounded-xl border border-white/[0.08] p-4">
              <p className="text-sm text-slate-400">
                Skill Match
              </p>

              <h3 className="text-3xl font-bold text-blue-400 mt-2">
                94%
              </h3>
            </div>

            <div className="rounded-xl border border-white/[0.08] p-4">
              <p className="text-sm text-slate-400">
                Earnings Forecast
              </p>

              <h3 className="text-3xl font-bold text-purple-400 mt-2">
                ₹55,000
              </h3>
            </div>

            <div className="rounded-xl border border-white/[0.08] p-4">
              <p className="text-sm text-slate-400">
                Client Rating
              </p>

              <h3 className="text-3xl font-bold text-yellow-400 mt-2">
                4.9★
              </h3>
            </div>

            <div className="rounded-xl border border-purple-500/20 shadow-[0_0_40px_rgba(124,58,237,0.15)] p-4">
              <p className="text-sm text-slate-400 mb-2">
                AI Suggestion
              </p>

              <p className="text-sm">
                Complete AI Integration task today to
                improve your performance score.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-xl border border-white/[0.08] p-4">
              <p className="text-sm text-slate-400">
                Productivity Increase
              </p>

              <h3 className="text-3xl font-bold text-emerald-400 mt-2">
                +12%
              </h3>
            </div>

            <div className="rounded-xl border border-white/[0.08] p-4">
              <p className="text-sm text-slate-400">
                Tasks At Risk
              </p>

              <h3 className="text-3xl font-bold text-red-400 mt-2">
                3
              </h3>
            </div>

            <div className="rounded-xl border border-white/[0.08] p-4">
              <p className="text-sm text-slate-400">
                Business Health
              </p>

              <h3 className="text-3xl font-bold text-green-400 mt-2">
                95/100
              </h3>
            </div>

            <div className="rounded-xl border border-white/[0.08] p-4">
              <p className="text-sm text-slate-400">
                Success Forecast
              </p>

              <h3 className="text-3xl font-bold text-blue-400 mt-2">
                97%
              </h3>
            </div>

            <div className="rounded-xl border border-purple-500/20 shadow-[0_0_40px_rgba(124,58,237,0.15)] p-4">
              <p className="text-sm text-slate-400 mb-2">
                AI Suggestion
              </p>

              <p className="text-sm">
                Assign UI redesign task to Frontend
                Team Alpha.
              </p>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}