"use client";

import {
  Building2,
  Files,
  Eye,
  Upload,
} from "lucide-react";
import { SubmissionTask } from "@/types/submission";

interface Props {
  submission: SubmissionTask;
  onSubmit: (submission: SubmissionTask) => void;
  onView?: (submission: SubmissionTask) => void;
}

export default function SubmissionCard({
  submission,
  onSubmit,
  onView,
}: Props) {
  const statusColors: Record<string, string> = {
    Assigned: "bg-blue-100 text-blue-700",
    Draft: "bg-yellow-100 text-yellow-700",
    Submitted: "bg-purple-100 text-purple-700",
    Approved: "bg-green-100 text-green-700",
    "Revision Required": "bg-amber-100 text-amber-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-xl font-semibold text-slate-900">
            {submission.title}
          </h2>

          <div className="mt-4 space-y-3">

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Building2 size={16} />
              {submission.provider}
            </div>

            

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Files size={16} />
              Files Submitted: {submission.files}
            </div>

          </div>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusColors[submission.status]
          }`}
        >
          {submission.status}
        </span>

      </div>

      <div className="mt-6 flex gap-3">

        <button
          onClick={() => onView?.(submission)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <Eye size={16} />
          View Task
        </button>

        <button
          onClick={() => onSubmit(submission)}
          disabled={submission.status === "Approved"}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Upload size={16} />
          Submit Work
        </button>

      </div>

    </div>
  );
}
