"use client";

import { useState } from "react";
import {
  Calendar,
  User,
  FileText,
  FolderArchive,
  PlayCircle,
  Sparkles,
  Eye,
} from "lucide-react";


interface Submission {
  id: string;
  status: string;
  description?: string;
  feedback?: string;
  githubLink?: string;
  deploymentLink?: string;
  reportFile?: string;
  createdAt: string;
  application?: {
    user?: {
      name?: string;
      email?: string;
    };
    project?: {
      title?: string;
      taskType?: string;
      budget?: number;
      status?: string;
    };
  };
}


interface SubmissionCardProps {
  submission: Submission;
  onView?: (id: string) => void;
}

const statusConfig: Record<string, { color: string; label: string }> = {
  PENDING: { color: "bg-amber-100 text-amber-700", label: "Pending Review" },
  PENDING_REVIEW: { color: "bg-amber-100 text-amber-700", label: "Pending Review" },
  APPROVED: { color: "bg-green-100 text-green-700", label: "Approved" },
  REVISION_REQUIRED: { color: "bg-orange-100 text-orange-700", label: "Revision Required" },
  REJECTED: { color: "bg-red-100 text-red-700", label: "Rejected" },
};

export default function SubmissionCard({
  submission,
  onView,
}: SubmissionCardProps) {
  

  const project = submission.application?.project || {};
  const applicant = submission.application?.user || {};
  const status = statusConfig[submission.status] || {
    color: "bg-slate-100 text-slate-700",
    label: submission.status,
  };

  const handleView = () => {
    onView?.(submission.id);
  };

  return (
  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">

    {/* Header */}
    <div className="flex items-start justify-between">

      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          {project.title || "Untitled Project"}
        </h2>

        <p className="mt-2 text-slate-500">
          Submitted by{" "}
          <span className="font-semibold text-blue-600">
            {applicant.name || "Unknown"}
          </span>
        </p>
      </div>

      <span
        className={`rounded-full px-4 py-1 text-sm font-semibold ${status.color}`}
      >
        {status.label}
      </span>

    </div>

    {/* Project Details */}

    <div className="mt-6 grid gap-5 md:grid-cols-2">

      <div>
        <p className="text-sm text-slate-500">Task Type</p>
        <p className="font-semibold text-slate-900">
          {project.taskType || "Digital"}
        </p>
      </div>

      <div>
        <p className="text-sm text-slate-500">Budget</p>
        <p className="font-semibold text-slate-900">
          ₹{project.budget ?? 0}
        </p>
      </div>

      <div>
        <p className="text-sm text-slate-500">Submitted On</p>
        <p className="font-semibold text-slate-900">
          {new Date(submission.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div>
        <p className="text-sm text-slate-500">Project Status</p>
        <p className="font-semibold text-slate-900">
          {project.status || "OPEN"}
        </p>
      </div>

    </div>

    {/* Description */}

    <div className="mt-6 rounded-2xl bg-slate-50 p-5">
      <h3 className="font-semibold text-slate-900">
        Submission Notes
      </h3>

      <p className="mt-2 text-slate-600 leading-7">
        {submission.description ||
          "No additional description provided."}
      </p>
    </div>

    {/* Files */}

    {(submission.githubLink ||
      submission.deploymentLink ||
      submission.reportFile) && (
      <div className="mt-6 rounded-2xl border border-slate-200 p-5">

        <h3 className="mb-4 font-semibold text-slate-900">
          Links & Files
        </h3>

        <div className="space-y-2">

          {submission.githubLink && (
            <a
              href={submission.githubLink}
              target="_blank"
              className="block text-blue-600 hover:underline"
            >
              🔗 GitHub Repository
            </a>
          )}

          {submission.deploymentLink && (
            <a
              href={submission.deploymentLink}
              target="_blank"
              className="block text-blue-600 hover:underline"
            >
              🌐 Live Demo
            </a>
          )}

          {submission.reportFile && (
            <a
              href={submission.reportFile}
              target="_blank"
              className="block text-blue-600 hover:underline"
            >
              📄 Project Report
            </a>
          )}

        </div>

      </div>
    )}

    {/* Buttons */}
<div className="mt-8 flex flex-wrap gap-3">
  <button
    onClick={handleView}
    className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white transition hover:from-blue-700 hover:to-purple-700"
  >
    View Submission
  </button>
</div>


  </div>
);
}