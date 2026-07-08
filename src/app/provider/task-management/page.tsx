"use client";

import { useState } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";
import { useRouter } from "next/navigation";

type Task = {
  id: number;
  title: string;
  priority: string;
  status: string;
  progress: number;
  risk: string;
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Website Prototype",
    priority: "High",
    status: "In Progress",
    progress: 70,
    risk: "Low",
  },
  {
    id: 2,
    title: "AI Dashboard",
    priority: "Medium",
    status: "Pending",
    progress: 25,
    risk: "Medium",
  },
  {
    id: 3,
    title: "Mobile App UI",
    priority: "High",
    status: "Delayed",
    progress: 45,
    risk: "High",
  },
  {
    id: 4,
    title: "Landing Page Design",
    priority: "Low",
    status: "Completed",
    progress: 100,
    risk: "Low",
  },
];

export default function TaskManagementPage() {
  const router = useRouter();

  const [tasks, setTasks] =
    useState<Task[]>(initialTasks);

  const [selectedTask, setSelectedTask] =
    useState<Task | null>(null);

  const [popupMessage, setPopupMessage] =
    useState("");

  const [showPopup, setShowPopup] =
    useState(false);

  const showSuccess = (message: string) => {
    setPopupMessage(message);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  const markCompleted = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: "Completed",
              progress: 100,
            }
          : task
      )
    );

    showSuccess("Task Marked as Completed");
  };

  return (
    <DesktopLayout>
      <div className="space-y-8">

        {/* Header */}

        <div>
          <h1 className="text-4xl font-bold text-white">
            Task Management
          </h1>

          <p className="text-slate-400 mt-2">
            Monitor project execution, progress,
            and AI risk analysis.
          </p>
        </div>

        {/* Filters */}

        <div className="flex gap-3 flex-wrap">

          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)] text-white">
            All
          </button>

          <button className="px-4 py-2 rounded-xl border border-white/[0.08]">
            In Progress
          </button>

          <button className="px-4 py-2 rounded-xl border border-white/[0.08]">
            Completed
          </button>

          <button className="px-4 py-2 rounded-xl border border-white/[0.08]">
            Delayed
          </button>

          <button
  onClick={() => router.push("/provider/applicants")}
  className="
    px-3
    py-2
    rounded-lg
    bg-blue-600
    hover:bg-blue-500
  "
>
  👥 Applicants
</button>

        </div>

        {/* Tasks Table */}

        <div
          className="
            rounded-3xl
            border
            border-white/[0.08]
            bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
            overflow-hidden
          "
        >
          <table className="w-full">

            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left p-5">
                  Task
                </th>

                <th className="text-left p-5">
                  Priority
                </th>

                <th className="text-left p-5">
                  Status
                </th>

                <th className="text-left p-5">
                  Progress
                </th>

                <th className="text-left p-5">
                  AI Risk
                </th>

                <th className="text-left p-5">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>

              {tasks.map((task) => (

                <tr
                  key={task.id}
                  className="border-b border-white/5"
                >

                  <td className="p-5">
                    {task.title}
                  </td>

                  <td className="p-5">
                    {task.priority}
                  </td>

                  <td className="p-5">
                    {task.status}
                  </td>

                  <td className="p-5">

                    <div className="w-40">

                      <div className="h-2 rounded-full bg-slate-700">

                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-1000"
                          style={{
                            width: `${task.progress}%`,
                          }}
                        />

                      </div>

                      <p className="mt-2 text-sm text-slate-400">
                        {task.progress}%
                      </p>

                    </div>

                  </td>

                  <td className="p-5">

                    {task.risk === "Low" && (
                      <span className="text-green-400">
                        🟢 Low
                      </span>
                    )}

                    {task.risk === "Medium" && (
                      <span className="text-yellow-400">
                        🟡 Medium
                      </span>
                    )}

                    {task.risk === "High" && (
                      <span className="text-red-400">
                        🔴 High
                      </span>
                    )}

                  </td>

                  <td className="p-5">

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          setSelectedTask(task)
                        }
                        className="
                          px-3
                          py-2
                          rounded-lg
                          border
                          border-white/[0.08]
                        "
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          showSuccess(
                            "AI Review Generated"
                          )
                        }
                        className="
                          px-3
                          py-2
                          rounded-lg
                          border
                          border-purple-500/20
                        "
                      >
                        AI Review
                      </button>

                      {task.status !==
                        "Completed" && (
                        <button
                          onClick={() =>
                            markCompleted(
                              task.id
                            )
                          }
                          className="
                            px-3
                            py-2
                            rounded-lg
                            bg-green-600
                          "
                        >
                          Complete
                        </button>
                      )}

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        </div>

        {/* AI Insights */}

        <div
          className="
            rounded-3xl
            border
            border-purple-500/20
            bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
            p-6
          "
        >
          <h2 className="text-2xl font-bold mb-4">
            AI Project Insights
          </h2>

          <div className="space-y-3 text-slate-300">

            <p>
              ⚠ Mobile App UI has a high delay risk.
            </p>

            <p>
              📈 Website Prototype is ahead of schedule.
            </p>

            <p>
              🤖 Recommend assigning one more Frontend Developer.
            </p>

            <p>
              🎯 Estimated overall project success rate:
              92%.
            </p>

          </div>
        </div>

        {/* Task Details Modal */}

        {selectedTask && (

          <div
            className="
              fixed
              inset-0
              bg-black/60
              flex
              items-center
              justify-center
              z-50
            "
          >

            <div
              className="
                w-[500px]
                rounded-3xl
                bg-slate-950
                border
                border-white/[0.08]
                p-8
              "
            >

              <h2 className="text-2xl font-bold mb-6">
                Task Details
              </h2>

              <div className="space-y-4">

                <p>
                  <strong>Task:</strong>{" "}
                  {selectedTask.title}
                </p>

                <p>
                  <strong>Priority:</strong>{" "}
                  {selectedTask.priority}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {selectedTask.status}
                </p>

                <p>
                  <strong>Progress:</strong>{" "}
                  {selectedTask.progress}%
                </p>

                <p>
                  <strong>Risk:</strong>{" "}
                  {selectedTask.risk}
                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedTask(null)
                }
                className="
                  mt-6
                  w-full
                  py-3
                  rounded-xl
                  bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)]
                "
              >
                Close
              </button>

            </div>

          </div>

        )}

        {/* Success Popup */}

        {showPopup && (

          <div
            className="
              fixed
              inset-0
              bg-black/60
              flex
              items-center
              justify-center
              z-50
            "
          >

            <div
              className="
                bg-slate-950
                border
                border-green-500/20
                rounded-3xl
                p-8
                text-center
                w-[420px]
              "
            >

              <div className="text-6xl mb-4">
                🚀
              </div>

              <h2 className="text-2xl font-bold text-green-400">
                Success
              </h2>

              <p className="text-slate-400 mt-3">
                {popupMessage}
              </p>

            </div>

          </div>

        )}

      </div>
    </DesktopLayout>
  );
}