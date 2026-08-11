"use client";

import {
  ClipboardList,
  BrainCircuit,
  Users,
  FolderOpen,
  Clock3,
} from "lucide-react";

const activities = [
  {
    title: "Created a new task",
    description: "E-Commerce Website UI Design",
    time: "2 hours ago",
    icon: ClipboardList,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Generated an AI Project Plan",
    description: "Healthcare Management System",
    time: "Yesterday",
    icon: BrainCircuit,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Assigned a Task Master",
    description: "Frontend Developer assigned",
    time: "2 days ago",
    icon: Users,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Saved an AI Plan",
    description: "Inventory Management Project",
    time: "4 days ago",
    icon: FolderOpen,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-900">
        Recent Activity
      </h2>

      <div className="space-y-5">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.title}
              className="flex items-start justify-between rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50"
            >
              <div className="flex gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${activity.color}`}
                >
                  <Icon size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {activity.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-600">
                    {activity.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock3 size={15} />
                {activity.time}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}