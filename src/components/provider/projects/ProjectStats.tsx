"use client";

import {
  FolderOpen,
  PlayCircle,
  CheckCircle2,
  FileEdit,
} from "lucide-react";

type ProjectStat = {
  title: string;
  value: string;
  icon: typeof FolderOpen;
  color: string;
};

const defaultStats: ProjectStat[] = [
  {
    title: "Total Projects",
    value: "12",
    icon: FolderOpen,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Active",
    value: "5",
    icon: PlayCircle,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Completed",
    value: "6",
    icon: CheckCircle2,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Draft",
    value: "1",
    icon: FileEdit,
    color: "bg-amber-100 text-amber-600",
  },
];

interface ProjectStatsProps {
  stats?: ProjectStat[];
}

export default function ProjectStats({ stats = defaultStats }: ProjectStatsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md hover:shadow-lg transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{item.title}</p>

                <h2 className="mt-2 text-4xl font-bold text-slate-900">
                  {item.value}
                </h2>
              </div>

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.color}`}
              >
                <Icon size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}