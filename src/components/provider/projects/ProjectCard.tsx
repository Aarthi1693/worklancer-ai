"use client";

import { useRouter } from "next/navigation";
import {
  Users,
  IndianRupee,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    type: string;
    taskType: "digital" | "field";
    status: string;
    budget: string;
    budgetValue: number;
    duration: string;
    applicants: number;
    aiScore: number;
    description: string;
    requiredSkills: string;
  };
  onEdit: (project: {
    id: string;
    title: string;
    type: string;
    taskType: "digital" | "field";
    status: string;
    budget: string;
    budgetValue: number;
    duration: string;
    applicants: number;
    aiScore: number;
    description: string;
    requiredSkills: string;
  }) => void;
  onDelete: (projectId: string) => Promise<void>;
  deletingProjectId: string | null;
}

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
  deletingProjectId,
}: ProjectCardProps) {
  const router = useRouter();
  const isDeleting = deletingProjectId === project.id;

  const statusColor = {
    Active: "bg-green-100 text-green-700",
    Completed: "bg-slate-100 text-slate-700",
    Draft: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {project.title}
          </h2>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
              {project.type === "Digital"
                ? "💻 Digital"
                : "📍 On-Field"}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                statusColor[
                  project.status as keyof typeof statusColor
                ]
              }`}
            >
              {project.status}
            </span>
          </div>
        </div>

        <div className="rounded-xl bg-blue-50 px-4 py-2">
          <p className="text-xs text-slate-500">
            AI Match
          </p>

          <h3 className="text-lg font-bold text-blue-600">
            {project.aiScore}%
          </h3>
        </div>
      </div>

      {/* Info */}
      <div className="mt-8 grid gap-5 md:grid-cols-2">

        <div className="flex items-center gap-3">
          <IndianRupee
            size={20}
            className="text-green-600"
          />

          <div>
            <p className="text-sm text-slate-500">
              Budget
            </p>

            <h4 className="font-semibold text-slate-900">
              {project.budget}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Users
            size={20}
            className="text-purple-600"
          />

          <div>
            <p className="text-sm text-slate-500">
              Applicants
            </p>

            <h4 className="font-semibold text-slate-900">
              {project.applicants}
            </h4>
          </div>
        </div>

      </div>

      {/* Progress */}
      <div className="mt-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-slate-600">
            Project Progress
          </span>

          <span className="text-sm font-semibold text-blue-600">
            70%
          </span>
        </div>

        <div className="h-2 rounded-full bg-slate-200">
          <div className="h-2 w-[70%] rounded-full bg-blue-600"></div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap gap-3">

        <button
          onClick={() =>
            router.push(`/provider/my-projects/${project.id}`)
          }
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Eye size={18} />
          View
        </button>

        {/* NEW BUTTON */}
        <button
          onClick={() =>
            router.push(`/provider/applicants?projectId=${project.id}`)
          }
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          <Users size={18} />
          Applicants
        </button>

        <button
          onClick={() => onEdit(project)}
          className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
        >
          <Pencil size={18} />
          Edit
        </button>

        <button
          onClick={() => onDelete(project.id)}
          disabled={isDeleting}
          className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-60"
        >
          <Trash2 size={18} />
          {isDeleting ? "Deleting..." : "Delete"}
        </button>

      </div>

    </div>
  );
}