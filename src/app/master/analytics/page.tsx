"use client";

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

const feedbacks = [
  {
    client: "TechCorp",
    rating: "5★",
    feedback: "Excellent work quality",
  },
  {
    client: "StartupX",
    rating: "4.8★",
    feedback: "Fast delivery",
  },
  {
    client: "AI Labs",
    rating: "5★",
    feedback: "Outstanding performance",
  },
];

const skillData = [
  { name: "UI/UX Design", value: 30 },
  { name: "Frontend", value: 28 },
  { name: "Communication", value: 24 },
  { name: "AI Integration", value: 18 },
];

const taskOverview = [
  {
    title: "Completed",
    value: 18,
    color: "text-green-400",
  },
  {
    title: "In Progress",
    value: 8,
    color: "text-blue-400",
  },
  {
    title: "Pending",
    value: 4,
    color: "text-yellow-400",
  },
  {
    title: "Review",
    value: 2,
    color: "text-purple-400",
  },
];

const growthData = [
  { month: "Jan", growth: 8 },
  { month: "Feb", growth: 12 },
  { month: "Mar", growth: 15 },
  { month: "Apr", growth: 18 },
  { month: "May", growth: 21 },
  { month: "Jun", growth: 22 },
];

const COLORS = [
  "#3B82F6",
  "#8B5CF6",
  "#10B981",
  "#F59E0B",
];

export default function AnalyticsPage() {
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
              98%
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400 text-sm">
              Average Rating
            </p>

            <h2 className="text-3xl font-bold text-yellow-400 mt-2">
              4.9★
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400 text-sm">
              Projects Completed
            </p>

            <h2 className="text-3xl font-bold text-blue-400 mt-2">
              127
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400 text-sm">
              Revenue Generated
            </p>

            <h2 className="text-3xl font-bold text-purple-400 mt-2">
              ₹2.45L
            </h2>
          </div>

        </div>

        {/* Weekly Performance */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">

          <h2 className="text-2xl font-bold mb-6">
            Weekly Performance
          </h2>

          {[
            ["Monday", 75],
            ["Tuesday", 82],
            ["Wednesday", 88],
            ["Thursday", 91],
            ["Friday", 96],
            ["Saturday", 85],
            ["Sunday", 92],
          ].map(([day, value]) => (
            <div key={day} className="mb-5">

              <div className="flex justify-between mb-2">
                <span>{day}</span>
                <span>{value}%</span>
              </div>

              <div className="h-2 rounded-full bg-slate-700">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-1000"
                  style={{
                    width: `${value}%`,
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
        <span className="text-green-400">18</span>
      </div>

      <div className="flex justify-between">
        <span>Completion Time</span>
        <span className="text-blue-400">2.3 Days</span>
      </div>

      <div className="flex justify-between">
        <span>Pending Reviews</span>
        <span className="text-yellow-400">4</span>
      </div>

      <div className="flex justify-between">
        <span>Client Retention</span>
        <span className="text-purple-400">87%</span>
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

          <table className="w-full">

            <thead>
              <tr className="border-b border-white/[0.08]">

                <th className="p-4 text-left">
                  Client
                </th>

                <th className="p-4 text-left">
                  Rating
                </th>

                <th className="p-4 text-left">
                  Feedback
                </th>

              </tr>
            </thead>

            <tbody>

              {feedbacks.map((item) => (
                <tr
                  key={item.client}
                  className="border-b border-white/5"
                >
                  <td className="p-4">
                    {item.client}
                  </td>

                  <td className="p-4 text-yellow-400">
                    {item.rating}
                  </td>

                  <td className="p-4">
                    {item.feedback}
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

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
  dataKey="growth"
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

              <p>
                🎯 Most Profitable Skill:
                <span className="text-blue-400 ml-2">
                  UI/UX Design
                </span>
              </p>

              <p>
                🚀 Most Requested Skill:
                <span className="text-green-400 ml-2">
                  Frontend Development
                </span>
              </p>

              <p>
                📅 Best Working Day:
                <span className="text-yellow-400 ml-2">
                  Friday
                </span>
              </p>

              <p>
                📈 Career Trend:
                <span className="text-purple-400 ml-2">
                  Strong Growth
                </span>
              </p>

            </div>

          </div>

        </div>

      </div>
    </DesktopLayout>
  );
}