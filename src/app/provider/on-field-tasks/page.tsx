"use client";

import { useEffect, useState } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";
import projectService from "@/services/project.service";

interface FieldTask {
  id: string;
  title: string;
  description: string;
  budget: number;
  requiredSkills: string;
  status: string;
  taskType: "DIGITAL" | "FIELD";
}

export default function OnFieldTasksPage() {
  const [tasks, setTasks] = useState<FieldTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await projectService.getProjects();
        setTasks(data.filter((t: FieldTask) => t.taskType === "FIELD"));
      } catch (error) {
        console.error("Failed to load field tasks:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const total = tasks.length;
  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const completed = tasks.filter((t) => t.status === "COMPLETED").length;
  const pending = tasks.filter((t) => t.status === "OPEN").length;

  return (
    <DesktopLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-5xl font-bold text-white">
            On-Field Tasks
          </h1>

          <p className="text-slate-400 mt-2">
            Manage physical and location-based tasks.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4">

          <div className="bg-slate-900/50 border border-white/[0.08] rounded-2xl p-5">
            <p className="text-slate-400">Total Tasks</p>
            <h2 className="text-3xl font-bold text-white mt-2">
              {total}
            </h2>
          </div>

          <div className="bg-slate-900/50 border border-white/[0.08] rounded-2xl p-5">
            <p className="text-slate-400">In Progress</p>
            <h2 className="text-3xl font-bold text-blue-400 mt-2">
              {inProgress}
            </h2>
          </div>

          <div className="bg-slate-900/50 border border-white/[0.08] rounded-2xl p-5">
            <p className="text-slate-400">Completed</p>
            <h2 className="text-3xl font-bold text-green-400 mt-2">
              {completed}
            </h2>
          </div>

          <div className="bg-slate-900/50 border border-white/[0.08] rounded-2xl p-5">
            <p className="text-slate-400">Pending</p>
            <h2 className="text-3xl font-bold text-yellow-400 mt-2">
              {pending}
            </h2>
          </div>

        </div>

        <div className="bg-slate-900/50 border border-white/[0.08] rounded-3xl overflow-hidden">

          <div className="p-6 border-b border-white/[0.08]">
            <h2 className="text-2xl font-semibold">
              Active Field Tasks
            </h2>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-400">Loading field tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="p-12 text-center text-slate-400">No field tasks found.</div>
          ) : (
            <table className="w-full">

              <thead>
                <tr className="border-b border-white/[0.08] text-slate-400">
                  <th className="text-left p-5">Task</th>
                  <th className="text-left p-5">Budget</th>
                  <th className="text-left p-5">Skills</th>
                  <th className="text-left p-5">Status</th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((task) => (
                  <tr
                    key={task.id}
                    className="border-b border-white/5"
                  >
                    <td className="p-5">
                      <p className="text-white font-medium">{task.title}</p>
                      <p className="text-slate-400 text-sm mt-1 line-clamp-1">{task.description}</p>
                    </td>

                    <td className="p-5 text-green-400">
                      ₹{(task.budget ?? 0).toLocaleString()}
                    </td>

                    <td className="p-5 text-slate-400">
                      {task.requiredSkills}
                    </td>

                    <td className="p-5">
                      <span
                        className={`
                          px-3 py-1 rounded-full text-xs
                          ${
                            task.status === "COMPLETED"
                              ? "bg-green-500/20 text-green-400"
                              : task.status === "OPEN"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : task.status === "IN_PROGRESS"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-slate-500/20 text-slate-400"
                          }
                        `}
                      >
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          )}
        </div>

      </div>
    </DesktopLayout>
  );
}
