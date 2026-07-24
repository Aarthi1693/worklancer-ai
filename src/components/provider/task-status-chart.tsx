"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const DEMO_DATA = [
  { name: "Completed", value: 65 },
  { name: "In Progress", value: 25 },
  { name: "Pending", value: 10 },
];

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b"];

interface StatusItem {
  name: string;
  value: number;
}

export default function TaskStatusChart({ data }: { data?: StatusItem[] }) {
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
          Task Status
        </h3>
        <p className="text-sm text-slate-400 mt-1">
          Breakdown of ongoing tasks
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              paddingAngle={4}
              animationDuration={1000}
              label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
              labelLine={{ stroke: "#64748b" }}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#0f172a"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 0 20px rgba(0,0,0,0.5)",
              }}
               formatter={(value) => [value, "Tasks"]}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{ color: "#94a3b8", fontSize: "12px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
