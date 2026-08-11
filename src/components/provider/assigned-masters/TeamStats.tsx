"use client";

import {
  Users,
  UserCheck,
  BriefcaseBusiness,
  Star,
} from "lucide-react";

interface Props {
  assignedMasters: number;
  runningProjects: number;
}

export default function TeamStats({
  assignedMasters,
  runningProjects,
}: Props) {
  const stats = [
    {
      title: "Assigned Masters",
      value: assignedMasters,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active Now",
      value: 2, // Demo value
      icon: UserCheck,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Running Projects",
      value: runningProjects,
      icon: BriefcaseBusiness,
      color: "bg-violet-100 text-violet-600",
    },
    {
      title: "Average Rating",
      value: "4.9", // Demo value
      icon: Star,
      color: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {item.title}
                </p>

                <h2 className="mt-2 text-4xl font-bold text-slate-900">
                  {item.value}
                </h2>
              </div>

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.color}`}
              >
                <Icon size={30} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}