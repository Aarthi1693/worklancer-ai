"use client";

import { useEffect, useState } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";
import masterService from "@/services/master.service";

interface MyTask {
  id: string;
  matchScore: number;
  status: string;
  createdAt: string;
  project: {
    id: string;
    title: string;
    description: string;
    budget: number;
    requiredSkills: string;
    status: string;
  };
}

export default function MyTasksPage() {
  const [tasks, setTasks] = useState<MyTask[]>([]);
  const [loading, setLoading] = useState(true);

  const [submittedTask, setSubmittedTask] =
    useState<string | null>(null);

  const [showSuccess, setShowSuccess] =
    useState(false);

  const [selectedTask, setSelectedTask] =
    useState<MyTask | null>(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await masterService.getMyTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleSubmitTask = (id: string) => {
    setSubmittedTask(id);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <DesktopLayout>
      <div className="space-y-8">

        {/* Header */}

        <div>
          <h1 className="text-4xl font-bold text-white">
            My Tasks
          </h1>

          <p className="text-slate-400 mt-2">
            Track all assigned tasks and monitor progress.
          </p>
        </div>

        {/* Search */}

        <div className="mt-6">

          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="
              w-full
              rounded-xl
              border
              border-white/[0.08]
              bg-slate-900
              px-4
              py-3
              text-white
              outline-none
            "
          />

        </div>

        {/* Stats */}

        <div className="grid grid-cols-4 gap-6">

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6">
            <p className="text-slate-400">
              Applied Tasks
            </p>

            <h2 className="text-3xl font-bold text-white mt-2">
              {tasks.length}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6">

            <p className="text-slate-400">
              Pending
            </p>

            <h2 className="text-3xl font-bold text-blue-400 mt-2">
              {
                tasks.filter(
                  (t) => t.status === "PENDING"
                ).length
              }
            </h2>

          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6">

            <p className="text-slate-400">
              Accepted
            </p>

            <h2 className="text-3xl font-bold text-green-400 mt-2">
              {
                tasks.filter(
                  (t) => t.status === "ACCEPTED"
                ).length
              }
            </h2>

          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6">

            <p className="text-slate-400">
              Average Match
            </p>

            <h2 className="text-3xl font-bold text-yellow-400 mt-2">

              {tasks.length > 0
                ? Math.round(
                    tasks.reduce(
                      (sum, t) =>
                        sum + t.matchScore,
                      0
                    ) / tasks.length
                  )
                : 0}
              %

            </h2>

          </div>

        </div>

        {/* Filters */}

        <div className="flex gap-3">

          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
            All
          </button>

          <button className="px-4 py-2 rounded-xl border border-white/10">
            Pending
          </button>

          <button className="px-4 py-2 rounded-xl border border-white/10">
            Accepted
          </button>

        </div>

        {/* Task Cards */}

        <div className="grid md:grid-cols-2 gap-6">
        {loading ? (

  <div className="col-span-2 text-center py-10 text-slate-400">
    Loading tasks...
  </div>

) : filteredTasks.length === 0 ? (

  <div className="col-span-2 text-center py-10 text-slate-400">
    No tasks found.
  </div>

) : (

  filteredTasks.map((task) => (

    <div
      key={task.id}
      className="
        rounded-3xl
        border
        border-white/[0.08]
        bg-white/[0.03]
        backdrop-blur-xl
        shadow-[0_0_40px_rgba(59,130,246,0.08)]
        p-6
      "
    >

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-xl font-bold text-white">
            {task.project.title}
          </h2>

          <p className="text-slate-400 mt-2 line-clamp-2">
            {task.project.description}
          </p>

        </div>

        <span className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
          Digital
        </span>

      </div>

      <div className="mt-5">

        <p className="text-slate-500 text-sm">
          Required Skills
        </p>

        <p className="text-white mt-1">
          {task.project.requiredSkills}
        </p>

      </div>

      <div className="mt-5">

        <p className="text-slate-500 text-sm">
          Budget
        </p>

        <p className="text-green-400 font-semibold text-lg">
          ₹{task.project.budget.toLocaleString()}
        </p>

      </div>

      <div className="mt-5">

        <p className="text-slate-500 text-sm">
          AI Match Score
        </p>

        <p className="text-cyan-400 font-semibold">
          {Math.round(task.matchScore)}%
        </p>

      </div>

      <div className="flex justify-between items-center mt-6">

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            task.status === "PENDING"
              ? "bg-yellow-500/20 text-yellow-400"
              : task.status === "ACCEPTED"
              ? "bg-green-500/20 text-green-400"
              : task.status === "REJECTED"
              ? "bg-red-500/20 text-red-400"
              : "bg-blue-500/20 text-blue-400"
          }`}
        >
          {submittedTask === task.id
            ? "Submitted"
            : task.status}
        </span>

        <div className="flex gap-2">

          <button
            onClick={() => setSelectedTask(task)}
            className="
              px-4
              py-2
              rounded-xl
              border
              border-white/[0.08]
            "
          >
            View
          </button>

          <button
            onClick={() =>
              handleSubmitTask(task.id)
            }
            className="
              px-4
              py-2
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              hover:from-blue-500
              hover:to-purple-500
            "
          >
            Submit
          </button>

        </div>

      </div>

    </div>

  ))

)}

</div>
        {/* AI Productivity Insights */}

        <div
          className="
            rounded-3xl
            border
            border-white/[0.08]
            bg-white/[0.03]
            backdrop-blur-xl
            shadow-[0_0_40px_rgba(59,130,246,0.08)]
            p-8
          "
        >
          <h2 className="text-2xl font-bold mb-6">
            🤖 AI Productivity Insights
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div>
              <p className="text-slate-400">
                Applications
              </p>

              <h3 className="text-blue-400 text-xl font-bold mt-2">
                {tasks.length}
              </h3>
            </div>

            <div>
              <p className="text-slate-400">
                Average Match
              </p>

              <h3 className="text-green-400 text-xl font-bold mt-2">
                {tasks.length > 0
                  ? Math.round(
                      tasks.reduce(
                        (sum, task) =>
                          sum + task.matchScore,
                        0
                      ) / tasks.length
                    )
                  : 0}
                %
              </h3>
            </div>

            <div>
              <p className="text-slate-400">
                Accepted
              </p>

              <h3 className="text-purple-400 text-xl font-bold mt-2">
                {
                  tasks.filter(
                    (task) =>
                      task.status === "ACCEPTED"
                  ).length
                }
              </h3>
            </div>

            <div>
              <p className="text-slate-400">
                Pending
              </p>

              <h3 className="text-yellow-400 text-xl font-bold mt-2">
                {
                  tasks.filter(
                    (task) =>
                      task.status === "PENDING"
                  ).length
                }
              </h3>
            </div>

          </div>

        </div>

        {/* View Task Modal */}

        {selectedTask && (

          <div
            className="
              fixed
              inset-0
              bg-black/60
              backdrop-blur-sm
              flex
              items-center
              justify-center
              z-50
            "
          >

            <div
              className="
                w-[550px]
                rounded-3xl
                bg-slate-950
                border
                border-white/[0.08]
                p-8
              "
            >

              <h2 className="text-2xl font-bold text-white mb-6">
                Project Details
              </h2>

              <div className="space-y-4">

                <div>
                  <p className="text-slate-500">
                    Project
                  </p>

                  <p className="text-white">
                    {selectedTask.project.title}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">
                    Description
                  </p>

                  <p className="text-white">
                    {selectedTask.project.description}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">
                    Required Skills
                  </p>

                  <p className="text-blue-400">
                    {selectedTask.project.requiredSkills}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">
                    Budget
                  </p>

                  <p className="text-green-400">
                    ₹
                    {selectedTask.project.budget.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">
                    AI Match Score
                  </p>

                  <p className="text-cyan-400">
                    {Math.round(
                      selectedTask.matchScore
                    )}
                    %
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">
                    Application Status
                  </p>

                  <p className="text-yellow-400">
                    {selectedTask.status}
                  </p>
                </div>

              </div>

              <button
                onClick={() =>
                  setSelectedTask(null)
                }
                className="
                  mt-8
                  w-full
                  py-3
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  to-purple-600
                "
              >
                Close
              </button>

            </div>

          </div>

        )}

        {/* Success Popup */}

        {showSuccess && (

          <div
            className="
              fixed
              inset-0
              bg-black/60
              backdrop-blur-sm
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
                🎉
              </div>

              <h2 className="text-2xl font-bold text-white">
                Task Submitted
              </h2>

              <p className="text-slate-400 mt-3">
                Waiting for client approval.
              </p>

            </div>

          </div>

        )}

      </div>
    </DesktopLayout>
  );
}
