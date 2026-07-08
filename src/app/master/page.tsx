"use client";

import DesktopLayout from "@/components/layout/desktop-layout";
import { useEffect, useState } from "react";
import masterService from "@/services/master.service";

export default function MasterDashboard() {
  const [dashboard, setDashboard] = useState({
  activeProjects: 0,
  completedProjects: 0,
  earnings: 0,
  performance: 96,
});

const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadDashboard = async () => {
    try {
      const data = await masterService.getDashboard();
      setDashboard(data);
    } catch (error) {
      console.error("Failed to load dashboard", error);
    } finally {
      setLoading(false);
    }
  };

  loadDashboard();
}, []);
  return (
    <DesktopLayout>
      <div className="space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-5xl font-bold text-white">
            Good Morning, Rahul 👋
          </h1>

          <p className="mt-3 text-slate-400">
            You have 5 active tasks today.
            AI predicts a productivity score of 96%.
          </p>

          <div className="flex gap-4 mt-6">
            <button
              className="
                px-5
                py-3
                rounded-xl
                bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)]
                hover:from-blue-500 hover:to-purple-500
                transition
              "
            >
              View Tasks
            </button>

            <button
              className="
                px-5
                py-3
                rounded-xl
                border
                border-white/[0.08]
                hover:bg-white/5
                transition
              "
            >
              My Earnings
            </button>

            <button
              className="
                px-5
                py-3
                rounded-xl
                border
                border-white/[0.08]
                hover:bg-white/5
                transition
              "
            >
              Career Insights
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6">

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400 text-sm">
              Assigned Tasks
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {loading ? "..." : dashboard.activeProjects}
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400 text-sm">
              Completed Tasks
            </p>

            <h2 className="text-3xl font-bold mt-2 text-green-400">
              {loading ? "..." : dashboard.completedProjects}
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400 text-sm">
              Monthly Earnings
            </p>

            <h2 className="text-3xl font-bold mt-2 text-blue-400">
              {loading ? "..." : `₹${dashboard.earnings}`}
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400 text-sm">
              AI Performance
            </p>

            <h2 className="text-3xl font-bold mt-2 text-purple-400">
              {loading ? "..." : `${dashboard.performance}%`}
            </h2>
          </div>

        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-2 gap-6">

          {/* Tasks */}
          <div
            className="
              rounded-3xl
              border
              border-white/[0.08]
              bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
              p-6
            "
          >
            <h2 className="text-2xl font-bold mb-6">
              Current Tasks
            </h2>

            <div className="space-y-5">

              <div>
                <div className="flex justify-between mb-2">
                  <span>UI Design</span>
                  <span>90%</span>
                </div>

                <div className="h-2 bg-slate-700 rounded-full">
                  <div
                    className="h-2 bg-green-500 rounded-full"
                    style={{ width: "90%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>Landing Page</span>
                  <span>75%</span>
                </div>

                <div className="h-2 bg-slate-700 rounded-full">
                  <div
                    className="h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-1000 rounded-full"
                    style={{ width: "75%" }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span>AI Integration</span>
                  <span>40%</span>
                </div>

                <div className="h-2 bg-slate-700 rounded-full">
                  <div
                    className="h-2 bg-purple-500 rounded-full"
                    style={{ width: "40%" }}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Earnings */}
          <div
            className="
              rounded-3xl
              border
              border-white/[0.08]
              bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
              p-6
            "
          >
            <h2 className="text-2xl font-bold mb-6">
              Earnings Overview
            </h2>

            <div className="space-y-5">

              <div>
                <p className="text-slate-400">
                  This Month
                </p>

                <h3 className="text-3xl font-bold text-blue-400 mt-2">
                  ₹42,500
                </h3>
              </div>

              <div>
                <p className="text-slate-400">
                  Pending Payments
                </p>

                <h3 className="text-xl font-semibold text-yellow-400 mt-2">
                  ₹8,500
                </h3>
              </div>

              <div>
                <p className="text-slate-400">
                  Completed Payments
                </p>

                <h3 className="text-xl font-semibold text-green-400 mt-2">
                  ₹34,000
                </h3>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-2 gap-6">

          {/* AI Career */}
          <div
            className="
              rounded-3xl
              border
              border-purple-500/20
              shadow-[0_0_40px_rgba(124,58,237,0.15)]
              bg-white/[0.03]
              backdrop-blur-xl
              p-6
            "
          >
            <h2 className="text-2xl font-bold mb-4">
              AI Career Assistant
            </h2>

            <div className="space-y-3 text-slate-300">
              <p>🚀 Learn Next.js Advanced Routing</p>
              <p>📈 React demand increased by 12%</p>
              <p>🎯 UI/UX skills match 95% of market</p>
              <p>🏆 Recommended Certification: Google UX Design</p>
            </div>
          </div>

          {/* Performance */}
          <div
            className="
              rounded-3xl
              border
              border-white/[0.08]
              bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
              p-6
            "
          >
            <h2 className="text-2xl font-bold mb-4">
              Performance Analytics
            </h2>

            <div className="space-y-5">

              <div>
                <p className="text-slate-400">
                  Task Success Rate
                </p>

                <h3 className="text-2xl font-bold text-green-400">
                  98%
                </h3>
              </div>

              <div>
                <p className="text-slate-400">
                  Client Satisfaction
                </p>

                <h3 className="text-2xl font-bold text-blue-400">
                  4.9 ★
                </h3>
              </div>

              <div>
                <p className="text-slate-400">
                  On-Time Delivery
                </p>

                <h3 className="text-2xl font-bold text-purple-400">
                  96%
                </h3>
              </div>

            </div>
          </div>

        </div>

      </div>
    </DesktopLayout>
  );
}