"use client";

import { useState } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 25000 },
  { month: "Feb", revenue: 42000 },
  { month: "Mar", revenue: 55000 },
  { month: "Apr", revenue: 70000 },
  { month: "May", revenue: 85000 },
];

export default function AnalyticsPage() {
  const [message, setMessage] =
    useState("");

  const [showPopup, setShowPopup] =
    useState(false);

  const showAction = (text: string) => {
    setMessage(text);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <DesktopLayout>
      <div className="space-y-8">

        {/* Header */}

        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-4xl font-bold text-white">
              Analytics Center
            </h1>

            <p className="text-slate-400 mt-2">
              AI-powered business intelligence and project analytics.
            </p>
          </div>

          <div className="flex gap-3">

            <button
              onClick={() =>
                showAction(
                  "Analytics Report Exported"
                )
              }
              className="
                px-4
                py-3
                rounded-xl
                border
                border-white/[0.08]
              "
            >
              Export Report
            </button>

            <button
              onClick={() =>
                showAction(
                  "PDF Download Started"
                )
              }
              className="
                px-4
                py-3
                rounded-xl
                border
                border-white/[0.08]
              "
            >
              Download PDF
            </button>

            <button
              onClick={() =>
                showAction(
                  "AI Report Generated"
                )
              }
              className="
                px-4
                py-3
                rounded-xl
                bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)]
              "
            >
              Generate AI Report
            </button>

          </div>

        </div>

        {/* KPI Cards */}

        <div className="grid grid-cols-4 gap-6">

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400">
              Revenue
            </p>

            <h2 className="text-3xl font-bold mt-2">
              ₹1,85,000
            </h2>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400">
              Projects Completed
            </p>

            <h2 className="text-3xl font-bold mt-2">
              42
            </h2>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400">
              Success Rate
            </p>

            <h2 className="text-3xl font-bold text-green-400 mt-2">
              94%
            </h2>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400">
              Active Teams
            </p>

            <h2 className="text-3xl font-bold mt-2">
              8
            </h2>
          </div>

        </div>

        {/* Revenue Chart */}

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
            Revenue Growth
          </h2>

          <div className="w-full h-[320px]">

            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <LineChart data={revenueData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={4}
                />
              </LineChart>
            </ResponsiveContainer>

          </div>
        </div>

        {/* Analytics Grid */}

        <div className="grid grid-cols-2 gap-6">

          <div
            className="
              rounded-3xl
              border
              border-purple-500/20 shadow-[0_0_40px_rgba(124,58,237,0.15)]
              bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
              p-6
            "
          >
            <h2 className="text-2xl font-bold mb-4">
              AI Forecast
            </h2>

            <div className="space-y-3 text-slate-300">
              <p>
                📈 Revenue Growth Prediction: +12%
              </p>

              <p>
                🎯 Success Rate Forecast: 97%
              </p>

              <p>
                🚀 Productivity Increase: +9%
              </p>

              <p>
                💰 Expected Revenue: ₹2,10,000
              </p>
            </div>
          </div>

          <div
            className="
              rounded-3xl
              border
              border-purple-500/20
              bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
              p-6
            "
          >
            <h2 className="text-2xl font-bold mb-4">
              Team Efficiency
            </h2>

            <div className="space-y-4">

              <div>
                <div className="flex justify-between">
                  <span>Design Team</span>
                  <span>92%</span>
                </div>

                <div className="h-2 rounded-full bg-slate-700 mt-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-1000"
                    style={{
                      width: "92%",
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <span>Frontend Team</span>
                  <span>88%</span>
                </div>

                <div className="h-2 rounded-full bg-slate-700 mt-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-1000"
                    style={{
                      width: "88%",
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <span>AI Team</span>
                  <span>95%</span>
                </div>

                <div className="h-2 rounded-full bg-slate-700 mt-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-1000"
                    style={{
                      width: "95%",
                    }}
                  />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* AI Insights */}

        <div
          className="
            rounded-3xl
            border
            border-yellow-500/20
            bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
            p-6
          "
        >
          <h2 className="text-2xl font-bold mb-4">
            AI Business Insights
          </h2>

          <div className="space-y-3 text-slate-300">

            <p>
              📈 Revenue is expected to increase
              by 12% next month.
            </p>

            <p>
              ⚠ Two projects show early delay
              indicators.
            </p>

            <p>
              🤖 AI recommends hiring one
              additional Frontend Developer.
            </p>

            <p>
              🎯 Overall business health score:
              95/100.
            </p>

          </div>
        </div>

        {/* Success Popup */}

        {showPopup && (
          <div
            className="
              fixed
              inset-0
              bg-black/60
              flex
              items-center
              justify-center
              z-50
            "
          >
            <div
              className="
                bg-slate-950
                border
                border-green-500/20
                rounded-3xl
                p-8
                text-center
                w-[420px]
              "
            >
              <div className="text-6xl mb-4">
                📊
              </div>

              <h2 className="text-2xl font-bold text-green-400">
                Success
              </h2>

              <p className="text-slate-400 mt-3">
                {message}
              </p>
            </div>
          </div>
        )}

      </div>
    </DesktopLayout>
  );
}