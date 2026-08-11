"use client";

interface StatItem {
  title: string;
  value: number | string;
  icon: React.ElementType;
}

interface SubmittedWorkStatsProps {
  stats: StatItem[];
}

const colors = [
  {
    card: "bg-blue-50 border-blue-100",
    icon: "bg-blue-100 text-blue-600",
  },
  {
    card: "bg-green-50 border-green-100",
    icon: "bg-green-100 text-green-600",
  },
  {
    card: "bg-orange-50 border-orange-100",
    icon: "bg-orange-100 text-orange-600",
  },
  {
    card: "bg-violet-50 border-violet-100",
    icon: "bg-violet-100 text-violet-600",
  },
];

export default function SubmittedWorkStats({
  stats,
}: SubmittedWorkStatsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;
        const color = colors[index % colors.length];

        return (
          <div
            key={item.title}
            className={`rounded-3xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${color.card}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  {item.title}
                </p>

                <h2 className="mt-2 text-4xl font-bold text-slate-900">
                  {item.value}
                </h2>
              </div>

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${color.icon}`}
              >
                <Icon className="h-8 w-8" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}