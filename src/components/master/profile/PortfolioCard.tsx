"use client";

import { FolderOpen } from "lucide-react";

const projects = [
  {
    title: "WorkLancer AI",
    role: "Frontend Developer",
    status: "Completed",
  },
  {
    title: "AI Career Dashboard",
    role: "UI/UX Designer",
    status: "Completed",
  },
  {
    title: "Task Management System",
    role: "Frontend Developer",
    status: "In Progress",
  },
];

export default function PortfolioCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-semibold text-slate-900">
        Portfolio
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Recent work and completed projects.
      </p>

      <div className="mt-6 space-y-4">

        {projects.map((project) => (
          <div
            key={project.title}
            className="flex items-center justify-between rounded-2xl border border-slate-100 p-5"
          >
            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <FolderOpen className="h-6 w-6 text-blue-600" />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900">
                  {project.title}
                </h3>

                <p className="text-sm text-slate-500">
                  {project.role}
                </p>
              </div>

            </div>

            <span
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                project.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {project.status}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}