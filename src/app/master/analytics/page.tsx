"use client";

import { useEffect, useState } from "react";
import masterAnalyticsService from "@/services/master-analytics.service";
import DesktopLayout from "@/components/layout/desktop-layout";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface Analytics {
  acceptedTasks: number;
  completedTasks: number;
  pendingReview: number;
  rejected: number;
  earnings: number;
  successRate: number;
  averageRating: number;

  weeklyPerformance: {
  day: string;
  value: number;
}[];

  monthlyGrowth: {
    month: string;
    value: number;
  }[];

  skillDistribution: {
    name: string;
    value: number;
  }[];
}

const COLORS = [
  "#3B82F6",
  "#8B5CF6",
  "#10B981",
  "#F59E0B",
];

export default function AnalyticsPage() {
  const [analytics, setAnalytics] =
  useState<Analytics | null>(null);

const [loading, setLoading] =
  useState(true);

useEffect(() => {
  loadAnalytics();
}, []);

async function loadAnalytics() {
  try {
    const data =
      await masterAnalyticsService.getAnalytics();

    setAnalytics(data);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
}

if (loading) {
  return (
    <DesktopLayout>
      <div className="flex justify-center items-center h-[70vh] text-white text-xl">
        Loading Analytics...
      </div>
    </DesktopLayout>
  );
}

if (!analytics) {
  return (
    <DesktopLayout>
      <div className="flex justify-center items-center h-[70vh] text-red-400">
        Failed to load analytics.
      </div>
    </DesktopLayout>
  );
}
const skillData = analytics.skillDistribution;

const growthData = analytics.monthlyGrowth;

const weeklyPerformance = analytics.weeklyPerformance;

const taskOverview = [
  {
    title: "Accepted",
    value: analytics.acceptedTasks,
    color: "text-blue-400",
  },
  {
    title: "Completed",
    value: analytics.completedTasks,
    color: "text-green-400",
  },
  {
    title: "Pending Review",
    value: analytics.pendingReview,
    color: "text-yellow-400",
  },
  {
    title: "Rejected",
    value: analytics.rejected,
    color: "text-red-400",
  },
];
  return (
    <DesktopLayout>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">
            Performance Analytics
          </h1>

          <p className="text-slate-400 mt-2">
            AI-powered insights into productivity,
            earnings and professional growth.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6">

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400 text-sm">
              Task Success Rate
            </p>

            <h2 className="text-3xl font-bold text-green-400 mt-2">
  {analytics.successRate}%
</h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400 text-sm">
              Average Rating
            </p>

            <h2 className="text-3xl font-bold text-yellow-400 mt-2">
  {analytics.averageRating}★
</h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
           <p className="text-slate-400 text-sm">
  Completed Tasks
</p>

<h2 className="text-3xl font-bold text-blue-400 mt-2">
  {analytics.completedTasks}
</h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400 text-sm">
  Total Earnings
</p>

<h2 className="text-3xl font-bold text-purple-400 mt-2">
  ₹{(analytics.earnings ?? 0).toLocaleString()}
</h2>
          </div>

        </div>

        {/* Weekly Performance */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">

          <h2 className="text-2xl font-bold mb-6">
            Weekly Performance
          </h2>

          {weeklyPerformance.map((item) => (
            <div key={item.day} className="mb-5">

              <div className="flex justify-between mb-2">
                <span>{item.day}</span>
                <span>{item.value}%</span>
              </div>

              <div className="h-2 rounded-full bg-slate-700">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-1000"
                  style={{
                    width:`${item.value}%`,
                  }}
                />
              </div>

            </div>
          ))}

        </div>

       {/* Productivity + Analytics */}

<div className="grid grid-cols-3 gap-6">

  {/* Productivity */}
  <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">

    <h2 className="text-xl font-bold mb-6">
      Productivity Analytics
    </h2>

    <div className="space-y-5">

      <div className="flex justify-between">
  <span>Tasks Completed</span>

  <span className="text-green-400">
    {analytics.completedTasks}
  </span>
</div>

      <div className="flex justify-between">
        <span>Completion Time</span>
        <span className="text-blue-400">
    N/A
 </span>
      </div>

      <div className="flex justify-between">
        <span>Pending Reviews</span>
<span className="text-yellow-400">
  {analytics.pendingReview}
</span>
      </div>

      <div className="flex justify-between">
        <span>Client Retention</span>
<span className="text-purple-400">
  {analytics.successRate}%
</span>
      </div>

    </div>

  </div>

  {/* Skill Distribution Donut */}
  <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">

    <h2 className="text-xl font-bold mb-4">
      Skill Distribution
    </h2>

    <ResponsiveContainer width="100%" height={280}>
      <PieChart>

        <Pie
          data={skillData}
          dataKey="value"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={4}
        >
          {skillData.map((_, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />

      </PieChart>
    </ResponsiveContainer>

    <div className="grid grid-cols-2 gap-2 mt-4">

      {skillData.map((item, index) => (
        <div
          key={item.name}
          className="flex items-center gap-2 text-sm"
        >
          <div
            className="h-3 w-3 rounded-full"
            style={{
              background:
                COLORS[index % COLORS.length],
            }}
          />

          <span>{item.name}</span>
        </div>
      ))}

    </div>

  </div>

  {/* Task Overview */}
  <div className="space-y-4">

    {taskOverview.map((item) => (
      <div
        key={item.title}
        className="
          rounded-2xl
          border
          border-white/[0.08]
          bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
          p-5
        "
      >
        <p className="text-slate-400">
          {item.title}
        </p>

        <h2
          className={`text-3xl font-bold mt-2 ${item.color}`}
        >
          {item.value}
        </h2>
      </div>
    ))}

  </div>

</div>

        {/* Feedback */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] overflow-hidden">

          <div className="p-6 border-b border-white/[0.08]">
            <h2 className="text-2xl font-bold">
              Client Feedback Analysis
            </h2>
          </div>

          <div className="p-12 text-center text-slate-400">
            No feedback data available.
          </div>

        </div>

        {/* Growth + AI Insights */}
        <div className="grid grid-cols-2 gap-6">

          {/* Growth Chart */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">

            <h2 className="text-2xl font-bold mb-6">
              Monthly Growth Trend
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Line
  type="monotone"
  dataKey="value"
  stroke="#3B82F6"
  strokeWidth={4}
  dot={{
    r: 5,
    fill: "#3B82F6",
  }}
/>
              </LineChart>
            </ResponsiveContainer>

          </div>

          {/* AI Insights */}
          <div
            className="
              rounded-3xl
              border
              border-purple-500/20 shadow-[0_0_40px_rgba(124,58,237,0.15)]
              bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
              p-6
            "
          >
            <h2 className="text-2xl font-bold mb-6">
              AI Performance Insights
            </h2>

            <div className="space-y-4">

              <p>🎯 Most Profitable Skill:
                <span className="text-blue-400 ml-2">
                  N/A
                </span>
              </p>

              <p>🚀 Most Requested Skill:
                <span className="text-green-400 ml-2">
                  N/A
                </span>
              </p>

              <p>📅 Best Working Day:
                <span className="text-yellow-400 ml-2">
                  N/A
                </span>
              </p>

              <p>📈 Career Trend:
                <span className="text-purple-400 ml-2">
                  N/A
                </span>
              </p>

            </div>

          </div>

        </div>

      </div>
    </DesktopLayout>
  );
}