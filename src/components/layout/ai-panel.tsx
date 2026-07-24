"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import masterService from "@/services/master.service";
import careerAiService from "@/services/career-ai.service";
import authService from "@/services/auth.service";

interface Stats {
  productivity: number;
  skillMatch: number;
  earningsForecast: number;
  clientRating: number;
}

export default function AIPanel() {
  const pathname = usePathname();
  const isMaster = pathname.startsWith("/master");
  const [stats, setStats] = useState<Stats>({
    productivity: 0,
    skillMatch: 0,
    earningsForecast: 0,
    clientRating: 0,
  });
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(isMaster);

  useEffect(() => {
    if (!isMaster) return;

    const load = async () => {
      try {
        const [dashboard, career] = await Promise.all([
          masterService.getDashboard(),
          careerAiService.analyze(authService.getUser()?.id || ""),
        ]);
        setStats({
          productivity: dashboard.successRate,
          skillMatch: Math.round(dashboard.performance),
          earningsForecast: dashboard.earningsBreakdown?.totalEarnings || 0,
          clientRating: dashboard.averageRating,
        });
        setSuggestions(career?.suggestions || []);
      } catch (e) {
        console.error("Failed to load AI panel data", e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [isMaster]);

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
                {loading ? "..." : `${stats.productivity}%`}
              </h3>
            </div>

            <div className="rounded-xl border border-white/[0.08] p-4">
              <p className="text-sm text-slate-400">
                Skill Match
              </p>

              <h3 className="text-3xl font-bold text-blue-400 mt-2">
                {loading ? "..." : `${stats.skillMatch}%`}
              </h3>
            </div>

            <div className="rounded-xl border border-white/[0.08] p-4">
              <p className="text-sm text-slate-400">
                Earnings Forecast
              </p>

              <h3 className="text-3xl font-bold text-purple-400 mt-2">
                {loading ? "..." : `₹${stats.earningsForecast.toLocaleString()}`}
              </h3>
            </div>

            <div className="rounded-xl border border-white/[0.08] p-4">
              <p className="text-sm text-slate-400">
                Client Rating
              </p>

              <h3 className="text-3xl font-bold text-yellow-400 mt-2">
                {loading ? "..." : `${stats.clientRating}★`}
              </h3>
            </div>

            <div className="rounded-xl border border-purple-500/20 shadow-[0_0_40px_rgba(124,58,237,0.15)] p-4">
              <p className="text-sm text-slate-400 mb-2">
                AI Suggestion
              </p>

              <p className="text-sm">
                {suggestions.length > 0
                  ? suggestions[0]
                  : "No AI suggestions available."}
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
                +18%
              </h3>
            </div>

            <div className="rounded-xl border border-white/[0.08] p-4">
              <p className="text-sm text-slate-400">
                Tasks At Risk
              </p>
              <h3 className="text-3xl font-bold text-red-400 mt-2">
                2
              </h3>
            </div>

            <div className="rounded-xl border border-white/[0.08] p-4">
              <p className="text-sm text-slate-400">
                Business Health
              </p>
              <h3 className="text-3xl font-bold text-emerald-400 mt-2">
                Excellent
              </h3>
            </div>

            <div className="rounded-xl border border-white/[0.08] p-4">
              <p className="text-sm text-slate-400">
                Success Forecast
              </p>
              <h3 className="text-3xl font-bold text-blue-400 mt-2">
                92%
              </h3>
            </div>

            <div className="rounded-xl border border-purple-500/20 shadow-[0_0_40px_rgba(124,58,237,0.15)] p-4">
              <p className="text-sm text-slate-400 mb-2">
                AI Suggestion
              </p>
              <p className="text-sm">
                Projects created before noon receive approximately 15% more freelancer applications.
              </p>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
