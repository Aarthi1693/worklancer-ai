"use client";

import MyTasksHero from "@/assets/images/my-tasks-hero.png";
import { useCallback, useEffect, useMemo, useState } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";
import masterService from "@/services/master.service";
import authService from "@/services/auth.service";
import { useSubmissionSocket } from "@/hooks/useSubmissionSocket";
import { SubmissionEventPayload } from "@/services/socket.service";
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
    status: string;
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

  const loadTasks = useCallback(async () => {
    try {
      const user = authService.getUser();
      const data = await masterService.getMyTasks(user?.id || "");
      setTasks(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const applySubmissionEvent = useCallback(
    (payload: SubmissionEventPayload) => {
      const { submissionId, applicationId, status } = payload;
      if (!submissionId && !applicationId && !status) return;

      setTasks((prev) =>
        prev.map((task) => {
          const byApp = applicationId ? task.id === applicationId : false;
          const bySub = submissionId
            ? task.submission?.id === submissionId
            : false;
          if (!byApp && !bySub) return task;

          if (!task.submission) {
            if (!status || !submissionId) return task;
            return {
              ...task,
              submission: { id: submissionId, status: status },
            };
          }

          return {
            ...task,
            submission: {
              ...task.submission,
              status: status ?? task.submission.status,
              id: submissionId ?? task.submission.id,
            },
          };
        }),
      );
    },
    [],
  );

  useSubmissionSocket({
    onCreated: applySubmissionEvent,
    onUpdated: applySubmissionEvent,
  });

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      (task.project?.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (task.project?.description || "").toLowerCase().includes(search.toLowerCase()) ||
      (task.project?.requiredSkills || "").toLowerCase().includes(search.toLowerCase())
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

      {/* ================= HERO ================= */}

      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm p-8">

        <div className="absolute right-2 top-[48%] -translate-y-1/2 hidden lg:block">
  <img
    src={MyTasksHero.src}
    alt="My Tasks"
    className="w-[450px] object-contain scale-110"
  />
</div>

        <div className="relative z-10 max-w-2xl">

          <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-700">
            📋 Task Workspace
          </span>

          <h1 className="mt-5 text-5xl font-bold text-slate-900">
            My Tasks
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Manage your{" "}
            <span className="font-semibold text-blue-600">
              Digital
            </span>{" "}
            and{" "}
            <span className="font-semibold text-blue-600">
              On-Field
            </span>{" "}
            assignments, track progress and submit your work
            efficiently.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Active
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {accepted}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Completed
              </p>

              <p className="mt-2 text-2xl font-bold text-green-600">
                {completed}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4">
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Under Review
              </p>

              <p className="mt-2 text-2xl font-bold text-yellow-600">
                {review}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* ================= SEARCH ================= */}

      <div className="flex flex-col gap-4 lg:flex-row">

        <div className="relative flex-1">

          <Search
            size={20}
            className="absolute left-4 top-3.5 text-slate-400"
          />

          <input
            placeholder="Search tasks, skills or projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-5 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>

        <button className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-slate-700 shadow-sm transition hover:bg-slate-50">
          Filter
        </button>

        <button className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-slate-700 shadow-sm transition hover:bg-slate-50">
          Sort
        </button>

      </div>

      {/* ================= KPI ================= */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">
                Total Tasks
              </p>

              <h2 className="mt-3 text-4xl font-bold text-slate-900">
                {totalTasks}
              </h2>

            </div>

            <ClipboardList
              size={42}
              className="text-blue-600"
            />

          </div>

        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">
                Accepted
              </p>

              <h2 className="mt-3 text-4xl font-bold text-green-600">
                {accepted}
              </h2>

            </div>

            <CheckCircle2
              size={42}
              className="text-green-600"
            />

          </div>

        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">
                Under Review
              </p>

              <h2 className="mt-3 text-4xl font-bold text-yellow-600">
                {review}
              </h2>

            </div>

            <Clock3
              size={42}
              className="text-yellow-600"
            />

          </div>

        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">
                Completed
              </p>

              <h2 className="mt-3 text-4xl font-bold text-purple-600">
                {completed}
              </h2>

            </div>

            <Trophy
              size={42}
              className="text-purple-600"
            />

          </div>

        </div>

      </div>

      {/* ================= TASK LIST ================= */}

{loading ? (

  <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-12 text-center text-slate-600">
    Loading your tasks...
  </div>

) : filteredTasks.length === 0 ? (

  <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-12 text-center">

    <ClipboardList
      size={60}
      className="mx-auto text-slate-400"
    />

    <h2 className="mt-6 text-2xl font-bold text-slate-900">
      No Tasks Found
    </h2>

    <p className="mt-2 text-slate-600">
      Apply for projects to see them here.
    </p>

  </div>

) : (

  <div className="grid gap-6 lg:grid-cols-2">

    {filteredTasks.map((task) => (

      <div
        key={task.id}
        className="
          group
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-7
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
          hover:border-blue-300
        "
      >

        {/* Header */}

        <div className="flex items-start justify-between">

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              {task.project.title}
            </h2>

            <p className="mt-2 line-clamp-2 text-slate-500">
              {task.project.description}
            </p>

          </div>

          <span
            className={`rounded-full px-4 py-2 text-xs font-semibold ${
              task.submission?.status === "APPROVED"
                ? "bg-green-100 text-green-700"
                : task.submission?.status === "REJECTED"
                ? "bg-red-100 text-red-700"
                : task.submission?.status === "PENDING"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {task.submission
              ? task.submission.status
              : task.status}
          </span>

        </div>

        {/* Information */}

        <div className="mt-7 grid grid-cols-2 gap-5">

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-500">
              Task Type
            </p>

            <span
              className="mt-2 inline-block rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold"
            >
              {task.project.taskType}
            </span>

          </div>

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-500">
              Budget
            </p>

            <p className="mt-2 text-lg font-bold text-green-600">
              ₹{(task.project?.budget ?? 0).toLocaleString()}
            </p>

          </div>

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-500">
              AI Match
            </p>

            <p className="mt-2 text-lg font-bold text-purple-600">
              {Math.round(task.matchScore)}%
            </p>

          </div>

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-500">
              Skills
            </p>

            <div className="mt-2 flex flex-wrap gap-2">

              {task.project.requiredSkills
                .split(",")
                .map((skill) => (

                  <span
                    key={skill}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {skill.trim()}
                  </span>

                ))}

            </div>

          </div>

        </div>

        {/* ================= PROGRESS ================= */}

<div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">

  <div className="flex items-center justify-between">

    <p className="text-sm font-medium text-slate-700">
      Task Progress
    </p>

    <span className="text-sm font-semibold text-slate-600">

      {!task.submission
        ? "40%"
        : task.submission.status === "PENDING"
        ? "80%"
        : task.submission.status === "APPROVED"
        ? "100%"
        : "60%"}

    </span>

  </div>

  <div className="mt-3 h-2 rounded-full bg-slate-200">

    <div
      className="h-2 rounded-full bg-blue-600 transition-all duration-700"
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

      <p className="text-sm text-blue-600">
        📌 Complete this project and submit it from the{" "}
        <span className="font-semibold">
          Submit Work
        </span>{" "}
        page.
      </p>

    )}

    {task.submission?.status === "PENDING" && (

      <p className="text-sm text-yellow-600">
        ⏳ Your work has been submitted successfully and is waiting for provider review.
      </p>

    )}

    {task.submission?.status === "APPROVED" && (

      <p className="text-sm text-green-600">
        🎉 Great work! Your submission has been approved successfully.
      </p>

    )}

    {task.submission?.status === "REJECTED" && (

      <p className="text-sm text-red-600">
        ❌ Your submission was rejected. Please improve your work and submit again.
      </p>

    )}

  </div>

</div>

{/* ================= FOOTER ================= */}

<div className="mt-7 flex justify-end">

  <button
    onClick={() => setSelectedTask(task)}
    className="
flex
items-center
gap-2
rounded-xl
bg-blue-600
px-6
py-3
font-medium
text-white
shadow-md
transition-all
duration-300
hover:bg-blue-700
hover:shadow-lg
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

{/* ================= PROJECT DETAILS MODAL ================= */}                  

{selectedTask && (

  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6">

    <div className="w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-3xl font-bold text-slate-900">
            {selectedTask.project.title}
          </h2>

          <p className="mt-2 text-slate-600">
            Complete project information
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Assigned on{" "}
            {new Date(selectedTask.createdAt).toLocaleDateString()}
          </p>

        </div>

        <button
          onClick={() => setSelectedTask(null)}
          className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-slate-700 transition hover:bg-slate-100"
        >
          Close
        </button>

      </div>

      {/* Description */}

      <div className="mt-8">

        <h3 className="mb-3 text-lg font-semibold text-slate-900">
          Description
        </h3>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 whitespace-pre-wrap text-slate-700 leading-7">

          {selectedTask.project.description}

        </div>

      </div>

      {/* Details */}

      <div className="mt-8 grid grid-cols-2 gap-6">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Task Type
          </p>

          <span
            className="inline-block mt-3 rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-sm font-semibold"
          >
            {selectedTask.project.taskType}
          </span>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Budget
          </p>

          <p className="mt-3 text-xl font-bold text-green-600">
            ₹{(selectedTask.project?.budget ?? 0).toLocaleString()}
          </p>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            Required Skills
          </p>

          <div className="mt-3 flex flex-wrap gap-2">

            {selectedTask.project.requiredSkills
              .split(",")
              .map((skill) => (

                <span
                  key={skill}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                >
                  {skill.trim()}
                </span>

              ))}

          </div>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <p className="text-sm text-slate-500">
            AI Match
          </p>

          <p className="mt-3 text-xl font-bold text-purple-600">
            {Math.round(selectedTask.matchScore)}%
          </p>

        </div>

      </div>

      {/* Status */}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">

        <h3 className="mb-4 text-lg font-semibold text-slate-900">
          Current Status
        </h3>

        {!selectedTask.submission && (

          <p className="text-blue-600">
            📌 Complete your assigned work and submit it from the
            <span className="font-semibold">
              {" "}Submit Work
            </span>{" "}
            page.
          </p>

        )}

        {selectedTask.submission?.status === "PENDING" && (

          <p className="text-yellow-600">
            ⏳ Your work is currently under provider review.
          </p>

        )}

        {selectedTask.submission?.status === "APPROVED" && (

          <p className="text-green-600">
            🎉 Congratulations! Your work has been approved successfully.
          </p>

        )}

        {selectedTask.submission?.status === "REJECTED" && (

          <p className="text-red-600">
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