"use client";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const DEMO_DATA = [
  { day: "Mon", value: 72 },
  { day: "Tue", value: 78 },
  { day: "Wed", value: 75 },
  { day: "Thu", value: 83 },
  { day: "Fri", value: 88 },
  { day: "Sat", value: 91 },
  { day: "Sun", value: 95 },
];

export default function ProductivityChart({ data }: { data?: Array<{ day: string; value: number }> }) {
  const chartData = data && data.length > 0 ? data : DEMO_DATA;

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
      <div className="mb-4">
        <h3 className="font-semibold text-white">
          Weekly Productivity
        </h3>
        <p className="text-sm text-slate-400 mt-1">
          AI-generated productivity trend
        </p>
      </div>

      {chartData.length > 0 ? (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.9} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="day"
                stroke="#475569"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                label={{ value: "Day", position: "insideBottom", offset: -5, fill: "#64748b" }}
              />
              <YAxis
                stroke="#475569"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                label={{ value: "Productivity", angle: -90, position: "insideLeft", fill: "#64748b" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 0 20px rgba(0,0,0,0.5)",
                }}
                cursor={{ stroke: "#3b82f6", strokeWidth: 1, fill: "none" }}
                formatter={(value) => [value, "Productivity"]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="url(#lineGradient)"
                strokeWidth={3}
                dot={{ fill: "#10b981", r: 4, strokeWidth: 2, stroke: "#0f172a" }}
                activeDot={{ r: 6, fill: "#3b82f6", strokeWidth: 2, stroke: "#0f172a" }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center text-sm text-slate-400">
          No project activity yet. Create a project to view productivity trends.
        </div>
      )}
    </div>
  );
}
