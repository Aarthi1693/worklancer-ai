"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Completed", value: 60 },
  { name: "In Progress", value: 25 },
  { name: "Pending", value: 15 },
];

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
];

export default function TaskStatusChart() {
  return (
    <div
  className="
  rounded-3xl
  border
  border-white/[0.08]
  bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
  backdrop-blur-xl
  p-6
  "
>
      <h3 className="font-semibold mb-4">
        Task Status
      </h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={90}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}