"use client";

import DesktopLayout from "@/components/layout/desktop-layout";
import {
  BrainCircuit,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

export default function AIPlanningPage() {
  return (
  <DesktopLayout>
    <div className="space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          AI Project Planning
        </h1>

        <p className="text-slate-400 mt-2">
          AI-generated project forecasts, recommendations and resource planning.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6">

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-5">
            <p className="text-slate-400 text-sm">
              Success Probability
            </p>

            <h2 className="text-3xl font-bold text-green-400 mt-2">
              94%
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-5">
            <p className="text-slate-400 text-sm">
              Cost Forecast
            </p>

            <h2 className="text-3xl font-bold text-blue-400 mt-2">
              ₹85K
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-5">
            <p className="text-slate-400 text-sm">
              Deadline Prediction
            </p>

            <h2 className="text-3xl font-bold text-purple-400 mt-2">
              21 Days
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-5">
            <p className="text-slate-400 text-sm">
              Risk Level
            </p>

            <h2 className="text-3xl font-bold text-yellow-400 mt-2">
              Low
            </h2>
          </div>

        </div>

        {/* AI Recommendations */}
        <div className="rounded-3xl border border-purple-500/20 shadow-[0_0_40px_rgba(124,58,237,0.15)] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">

          <div className="flex items-center gap-3 mb-5">
            <BrainCircuit className="text-blue-400" />
            <h2 className="text-2xl font-bold">
              AI Recommendations
            </h2>
          </div>

          <div className="space-y-3 text-slate-300">

            <p>
              ✅ Assign Frontend module to Priya Verma
            </p>

            <p>
              ✅ Increase UI resources by 1 member
            </p>

            <p>
              ⚠ Backend workload exceeds 85%
            </p>

            <p>
              🚀 Current team can finish before deadline
            </p>

          </div>
        </div>

        {/* Timeline + Resources */}
        <div className="grid grid-cols-2 gap-6">

          {/* Timeline */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">

            <div className="flex items-center gap-3 mb-5">
              <CalendarDays className="text-purple-400" />
              <h2 className="text-2xl font-bold">
                Project Timeline
              </h2>
            </div>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Planning Phase</span>
                <span className="text-green-400">
                  Completed
                </span>
              </div>

              <div className="flex justify-between">
                <span>Design Phase</span>
                <span className="text-green-400">
                  Completed
                </span>
              </div>

              <div className="flex justify-between">
                <span>Development Phase</span>
                <span className="text-yellow-400">
                  In Progress
                </span>
              </div>

              <div className="flex justify-between">
                <span>Testing Phase</span>
                <span className="text-slate-400">
                  Upcoming
                </span>
              </div>

              <div className="flex justify-between">
                <span>Deployment</span>
                <span className="text-slate-400">
                  Upcoming
                </span>
              </div>

            </div>
          </div>

          {/* Resource Allocation */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">

            <div className="flex items-center gap-3 mb-5">
              <TrendingUp className="text-green-400" />
              <h2 className="text-2xl font-bold">
                Resource Allocation
              </h2>
            </div>

            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-2">
                  <span>Frontend</span>
                  <span>35%</span>
                </div>

                <div className="h-2 bg-slate-700 rounded-full">
                  <div
                    className="h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-1000 rounded-full"
                    style={{ width: "35%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>Backend</span>
                  <span>30%</span>
                </div>

                <div className="h-2 bg-slate-700 rounded-full">
                  <div
                    className="h-2 bg-purple-500 rounded-full"
                    style={{ width: "30%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>UI/UX</span>
                  <span>20%</span>
                </div>

                <div className="h-2 bg-slate-700 rounded-full">
                  <div
                    className="h-2 bg-green-500 rounded-full"
                    style={{ width: "20%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>Testing</span>
                  <span>15%</span>
                </div>

                <div className="h-2 bg-slate-700 rounded-full">
                  <div
                    className="h-2 bg-yellow-500 rounded-full"
                    style={{ width: "15%" }}
                  />
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </DesktopLayout>
  );
}