"use client";

import { Search, ArrowUpDown } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ToastProvider, useToast } from "@/components/ui/toast";
import masterService from "@/services/master.service";
import authService from "@/services/auth.service";
import { useSubmissionSocket } from "@/hooks/useSubmissionSocket";
import { SubmissionTask } from "@/types/submission";
import SubmissionCard from "./SubmissionCard";
import SubmitWorkModal from "./SubmitWorkModal";

export function deriveSubmissionStatus(raw: string): string {
  switch (raw) {
    case "APPROVED":
      return "Approved";
    case "PENDING":
    case "PENDING_REVIEW":
      return "Submitted";
    case "REVISION_REQUIRED":
    case "REVISION_REQUESTED":
      return "Revision Required";
    case "REJECTED":
      return "Rejected";
    default:
      return "Assigned";
  }
}

function mapTaskToSubmission(task: {
  id: string;
  status: string;
  matchScore?: number;
  createdAt?: string;
  files?: number;
  title?: string;
  provider?: string;
  submission?: {
    id: string;
    status: string;
    files?: number;
  };
  project?: {
  id: string;
  title?: string;
  taskType?: string;
  provider?: {
    id: string;
    name: string;
    email: string;
  };
};
}): SubmissionTask {
  const taskType =
    task.project?.taskType === "FIELD" ? "ON_FIELD" : "DIGITAL";

  return {
    id: task.id,
    title: task.project?.title ?? task.title ?? "Untitled Project",
    provider:
  task.project?.provider?.name ??
  task.provider ??
  "Task Provider",
    status: deriveSubmissionStatus(task.submission?.status ?? task.status),
    files: task.submission?.files ?? task.files ?? 0,
    taskType,
    applicationId: task.id,
    submissionId: task.submission?.id,
  };
}

function SubmitWorkContent() {
  const toast = useToast();
  const [submissions, setSubmissions] = useState<SubmissionTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadSubmissions = useCallback(async () => {
    try {
      setLoading(true);
      const user = authService.getUser();
      const data = await masterService.getMyTasks(user?.id ?? "");
      const mapped = (data ?? []).map(mapTaskToSubmission);
      setSubmissions(mapped);
    } catch (error) {
      console.error(error);
      toast.addToast("Failed to load assigned work.", "error");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    loadSubmissions();
  }, [loadSubmissions]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const patchSubmissionState = useCallback(
    (payload: {
      submissionId?: string;
      applicationId?: string;
      status?: string;
    }) => {
      const { submissionId, applicationId, status } = payload;
      setSubmissions((prev) =>
        prev.map((s) => {
          const match =
            (submissionId && s.submissionId === submissionId) ||
            (applicationId && s.applicationId === applicationId);
          if (!match) return s;
          return {
            ...s,
            status: status ? deriveSubmissionStatus(status) : s.status,
            submissionId: submissionId ?? s.submissionId,
          };
        }),
      );
    },
    [],
  );

  const handleUpdated = useCallback(
    (updated?: {
      submissionId?: string;
      applicationId?: string;
      status?: string;
    }) => {
      if (!updated) {
        loadSubmissions();
        return;
      }
      const { submissionId, applicationId, status } = updated;
      const exists = submissions.some(
        (s) =>
          (submissionId && s.submissionId === submissionId) ||
          (applicationId && s.applicationId === applicationId),
      );
      if (!exists || !status) {
        loadSubmissions();
        return;
      }
      patchSubmissionState(updated);
    },
    [submissions, loadSubmissions, patchSubmissionState],
  );

  useSubmissionSocket({
    onCreated: patchSubmissionState,
    onUpdated: patchSubmissionState,
  });

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return submissions;
    return submissions.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.provider.toLowerCase().includes(query),
    );
  }, [submissions, search]);

  const stats = [
    {
      title: "Assigned Tasks",
      value: submissions.filter((s) => s.status === "Assigned").length,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Drafts",
      value: submissions.filter((s) => s.status === "Draft").length,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Submitted",
      value: submissions.filter((s) => s.status === "Submitted").length,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Approved",
      value: submissions.filter((s) => s.status === "Approved").length,
      color: "bg-green-100 text-green-600",
    },
  ];

  const [selectedTask, setSelectedTask] = useState<SubmissionTask | null>(
    null,
  );
  const [open, setOpen] = useState(false);

  const handleSubmitClick = (task: SubmissionTask) => {
    setSelectedTask(task);
    setOpen(true);
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Submit Work
          </h1>

          <p className="mt-2 text-slate-500">
            Submit completed work for your assigned projects.
          </p>
        </div>

        <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700">
          + Submit New Work
        </button>

      </div>

      {/* Stats */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => (

          <div
            key={item.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {item.value}
                </h2>

              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color}`}
              >
                📁
              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Search */}

      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">

        <div className="relative w-full lg:max-w-md">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            placeholder="Search submissions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 outline-none focus:border-blue-500"
          />

        </div>

        <div className="flex flex-wrap gap-3">

          <select className="h-12 rounded-xl border border-slate-200 px-4">

            <option>All Status</option>
            <option>Assigned</option>
            <option>Draft</option>
            <option>Submitted</option>
            <option>Approved</option>

          </select>

          <select className="h-12 rounded-xl border border-slate-200 px-4">

            <option>All Projects</option>
            <option>AI Image Annotation</option>
            <option>Invoice OCR</option>
            <option>Medical Data Labeling</option>

          </select>

          <button className="flex h-12 items-center gap-2 rounded-xl border border-slate-200 px-4 hover:bg-slate-50">
            <ArrowUpDown size={16} />
            Sort
          </button>

        </div>

      </div>

      {/* Cards */}

      <div className="grid gap-6 lg:grid-cols-2">

        {loading ? (
          <div className="col-span-2 rounded-3xl border border-slate-200 bg-white py-16 text-center text-slate-500 shadow-sm">
            Loading your assigned work...
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-2 rounded-3xl border border-slate-200 bg-white py-16 text-center text-slate-500 shadow-sm">
            No submissions found.
          </div>
        ) : (
          filtered.map((submission) => (
            <SubmissionCard
              key={submission.id}
              submission={submission}
              onSubmit={handleSubmitClick}
              onView={handleSubmitClick}
            />
          ))
        )}

      </div>
      <SubmitWorkModal
        open={open}
        onOpenChange={setOpen}
        task={selectedTask}
        onUpdated={handleUpdated}
      />

    </div>
  );
}

export default function SubmitWorkPage() {
  return (
    <ToastProvider>
      <SubmitWorkContent />
    </ToastProvider>
  );
}
