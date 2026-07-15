"use client";

import { useEffect, useMemo, useState } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";
import masterService from "@/services/master.service";
import {
  ClipboardList,
  CheckCircle2,
  Clock3,
  Trophy,
  Search,
  Eye,
} from "lucide-react";

interface MyTask {
  id: string;
  matchScore: number;
  status: string;
  createdAt: string;

  submission?: {
    id: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
  };

  project: {
    id: string;
    title: string;
    description: string;
    budget: number;
    requiredSkills: string;
    taskType: "DIGITAL" | "FIELD";
  };
}

export default function MyTasksPage() {
  const [tasks, setTasks] = useState<MyTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedTask, setSelectedTask] =
    useState<MyTask | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const data = await masterService.getMyTasks();
      setTasks(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.project.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [tasks, search]);

  const totalTasks = tasks.length;

  const accepted = tasks.filter(
    (t) => t.status === "ACCEPTED"
  ).length;

  const review = tasks.filter(
    (t) => t.submission?.status === "PENDING"
  ).length;

  const completed = tasks.filter(
    (t) => t.submission?.status === "APPROVED"
  ).length;

  return (
    <DesktopLayout>

      <div className="space-y-8">

        {/* Header */}

        <div>

          <h1 className="text-4xl font-bold text-white">
            My Tasks
          </h1>

          <p className="text-slate-400 mt-2">
            Track assigned projects, monitor submissions and view progress.
          </p>

        </div>

        {/* Search */}

        <div className="relative">

          <Search
            size={20}
            className="absolute left-4 top-3.5 text-slate-500"
          />

          <input
            placeholder="Search project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              rounded-2xl
              bg-slate-900
              border
              border-white/10
              pl-12
              pr-5
              py-3
              outline-none
              text-white
            "
          />

        </div>

        {/* KPI Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/20 p-6">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-400">
                  Total Tasks
                </p>

                <h2 className="text-4xl font-bold text-white mt-3">
                  {totalTasks}
                </h2>

              </div>

              <ClipboardList
                size={40}
                className="text-cyan-400"
              />

            </div>

          </div>

          <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-green-500/20 p-6">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-400">
                  Accepted
                </p>

                <h2 className="text-4xl font-bold text-green-400 mt-3">
                  {accepted}
                </h2>

              </div>

              <CheckCircle2
                size={40}
                className="text-green-400"
              />

            </div>

          </div>

          <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-yellow-500/20 p-6">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-400">
                  Under Review
                </p>

                <h2 className="text-4xl font-bold text-yellow-400 mt-3">
                  {review}
                </h2>

              </div>

              <Clock3
                size={40}
                className="text-yellow-400"
              />

            </div>

          </div>

          <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-purple-500/20 p-6">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-400">
                  Completed
                </p>

                <h2 className="text-4xl font-bold text-purple-400 mt-3">
                  {completed}
                </h2>

              </div>

              <Trophy
                size={40}
                className="text-purple-400"
              />

            </div>

          </div>

        </div>

                {/* Task List */}

        {loading ? (

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-12 text-center text-slate-400">
            Loading your tasks...
          </div>

        ) : filteredTasks.length === 0 ? (

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-12 text-center">

            <ClipboardList
              size={60}
              className="mx-auto text-slate-600"
            />

            <h2 className="mt-6 text-2xl font-bold text-white">
              No Tasks Found
            </h2>

            <p className="mt-2 text-slate-400">
              Apply for projects to see them here.
            </p>

          </div>

        ) : (

          <div className="grid lg:grid-cols-2 gap-6">

            {filteredTasks.map((task) => (

              <div
                key={task.id}
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-slate-900
                  p-7
                  transition-all
                  duration-300
                  hover:border-cyan-500/40
                  hover:-translate-y-1
                "
              >

                {/* Top */}

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-2xl font-bold text-white">
                      {task.project.title}
                    </h2>

                    <p className="mt-2 text-slate-400 line-clamp-2">
                      {task.project.description}
                    </p>

                  </div>

                  <span
                    className={`
                      px-4
                      py-2
                      rounded-full
                      text-xs
                      font-semibold

                      ${
                        task.submission?.status === "APPROVED"
                          ? "bg-green-500/20 text-green-400"
                          : task.submission?.status === "REJECTED"
                          ? "bg-red-500/20 text-red-400"
                          : task.submission?.status === "PENDING"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                      }
                    `}
                  >
                    {task.submission
                      ? task.submission.status
                      : task.status}
                  </span>

                </div>

                {/* Information */}

                <div className="grid grid-cols-2 gap-5 mt-7">

                  <div>

                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Task Type
                    </p>

                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                        task.project.taskType === "DIGITAL"
                          ? "bg-cyan-500/20 text-cyan-400"
                          : "bg-orange-500/20 text-orange-400"
                      }`}
                    >
                      {task.project.taskType}
                    </span>

                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Budget
                    </p>

                    <p className="mt-2 text-lg font-bold text-green-400">
                      ₹{task.project.budget.toLocaleString()}
                    </p>

                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      AI Match
                    </p>

                    <p className="mt-2 text-lg font-bold text-purple-400">
                      {Math.round(task.matchScore)}%
                    </p>

                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Skills
                    </p>

                    <p className="mt-2 text-white">
                      {task.project.requiredSkills}
                    </p>

                  </div>

                </div>

                                {/* Progress */}

                <div className="mt-7 rounded-2xl border border-white/10 bg-black/20 p-5">

                  <div className="flex justify-between items-center">

                    <p className="text-sm font-medium text-slate-300">
                      Task Progress
                    </p>

                    <span className="text-sm text-slate-400">

                      {!task.submission
                        ? "40%"
                        : task.submission.status === "PENDING"
                        ? "80%"
                        : task.submission.status === "APPROVED"
                        ? "100%"
                        : "60%"}

                    </span>

                  </div>

                  <div className="mt-3 h-2 rounded-full bg-slate-800">

                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-700"
                      style={{
                        width:
                          !task.submission
                            ? "40%"
                            : task.submission.status === "PENDING"
                            ? "80%"
                            : task.submission.status === "APPROVED"
                            ? "100%"
                            : "60%",
                      }}
                    />

                  </div>

                  <div className="mt-5">

                    {!task.submission && (

                      <p className="text-cyan-400 text-sm">
                        📌 Complete this project and submit it from the
                        <span className="font-semibold">
                          {" "}Submit Work
                        </span>
                        {" "}page.
                      </p>

                    )}

                    {task.submission?.status === "PENDING" && (

                      <p className="text-yellow-400 text-sm">
                        ⏳ Your work has been submitted successfully and is waiting for provider review.
                      </p>

                    )}

                    {task.submission?.status === "APPROVED" && (

                      <p className="text-green-400 text-sm">
                        🎉 Great work! Your submission has been approved.
                      </p>

                    )}

                    {task.submission?.status === "REJECTED" && (

                      <p className="text-red-400 text-sm">
                        ❌ Your submission was rejected. Please update your work and submit again.
                      </p>

                    )}

                  </div>

                </div>

                {/* Footer */}

                <div className="mt-7 flex justify-end">

                  <button
                    onClick={() => setSelectedTask(task)}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-gradient-to-r
                      from-cyan-600
                      to-blue-600
                      px-6
                      py-3
                      font-medium
                      text-white
                      transition-all
                      duration-300
                      hover:scale-105
                    "
                  >
                    <Eye size={18} />
                    View Details
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

              {/* Project Details Modal */}

      {selectedTask && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">

          <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">

            {/* Header */}

            <div className="flex items-start justify-between">

              <div>

                <h2 className="text-3xl font-bold text-white">
                  {selectedTask.project.title}
                </h2>

                <p className="mt-2 text-slate-400">
                  Complete project information
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Assigned on{" "}
                  {new Date(selectedTask.createdAt).toLocaleDateString()}
                </p>

              </div>

              <button
                onClick={() => setSelectedTask(null)}
                className="rounded-xl border border-white/10 px-4 py-2 text-slate-300 hover:bg-white/10"
              >
                Close
              </button>

            </div>

            {/* Description */}

            <div className="mt-8">

              <h3 className="mb-3 text-lg font-semibold text-white">
                Description
              </h3>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5 whitespace-pre-wrap text-slate-300">

                {selectedTask.project.description}

              </div>

            </div>

            {/* Details */}

            <div className="mt-8 grid grid-cols-2 gap-6">

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

                <p className="text-sm text-slate-500">
                  Task Type
                </p>

                <span
                  className={`inline-block mt-3 rounded-full px-3 py-1 text-sm font-semibold ${
                    selectedTask.project.taskType === "DIGITAL"
                      ? "bg-cyan-500/20 text-cyan-400"
                      : "bg-orange-500/20 text-orange-400"
                  }`}
                >
                  {selectedTask.project.taskType}
                </span>

              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

                <p className="text-sm text-slate-500">
                  Budget
                </p>

                <p className="mt-3 text-xl font-bold text-green-400">
                  ₹{selectedTask.project.budget.toLocaleString()}
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

                <p className="text-sm text-slate-500">
                  Required Skills
                </p>

                <p className="mt-3 text-white">
                  {selectedTask.project.requiredSkills}
                </p>

              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

                <p className="text-sm text-slate-500">
                  AI Match
                </p>

                <p className="mt-3 text-xl font-bold text-purple-400">
                  {Math.round(selectedTask.matchScore)}%
                </p>

              </div>

            </div>

            {/* Status */}

            <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">

              <h3 className="mb-4 text-lg font-semibold text-white">
                Current Status
              </h3>

              {!selectedTask.submission && (
                <p className="text-cyan-400">
                  📌 Complete your assigned work and submit it from the Submit Work page.
                </p>
              )}

              {selectedTask.submission?.status === "PENDING" && (
                <p className="text-yellow-400">
                  ⏳ Your work is currently under provider review.
                </p>
              )}

              {selectedTask.submission?.status === "APPROVED" && (
                <p className="text-green-400">
                  🎉 Congratulations! Your work has been approved successfully.
                </p>
              )}

              {selectedTask.submission?.status === "REJECTED" && (
                <p className="text-red-400">
                  ❌ Your work was rejected. Please improve it and submit again.
                </p>
              )}

            </div>

          </div>

        </div>

      )}


            </div>

    </DesktopLayout>

  );
}