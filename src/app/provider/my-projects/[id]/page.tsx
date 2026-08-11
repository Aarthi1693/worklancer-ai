"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DesktopLayout from "@/components/layout/desktop-layout";
import projectService from "@/services/project.service";
import providerService from "@/services/provider.service";
import ApplicantCard from "@/components/provider/applicants/ApplicantCard";
import {
  ArrowLeft,
  Briefcase,
  CalendarDays,
  ClipboardList,
  DollarSign,
  Users,
} from "lucide-react";

interface ProjectDetails {
  id: string;
  title: string;
  description: string;
  budget: number;
  requiredSkills: string;
  status: string;
  taskType: string;
  createdAt: string;
  applicantsCount: number;
}

interface Applicant {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  experience: string;
  skills: string[];
  budget: string;
  delivery: string;
  aiScore: number;
  proposal: string;
  availability: string;
}

function readText(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function readNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeStatus(value: unknown) {
  const status = readText(value).toUpperCase();

  if (status.includes("COMPLETE")) return "COMPLETED";
  if (status.includes("PROGRESS")) return "IN_PROGRESS";
  if (status.includes("REVIEW")) return "REVIEW";
  if (status.includes("OPEN")) return "OPEN";

  return status || "OPEN";
}

function normalizeTaskType(value: unknown) {
  const taskType = readText(value).toUpperCase();

  if (taskType.includes("FIELD")) return "FIELD";
  return "DIGITAL";
}

function extractItem(data: unknown) {
  if (Array.isArray(data)) {
    return data[0] || null;
  }

  if (data && typeof data === "object") {
    const response = data as { project?: unknown; data?: unknown; item?: unknown };

    if (response.project) return response.project;
    if (response.item) return response.item;
    if (response.data && typeof response.data === "object" && !Array.isArray(response.data)) {
      return response.data;
    }

    return data;
  }

  return null;
}

function mapProject(data: unknown): ProjectDetails | null {
  const project = extractItem(data) as Record<string, unknown> | null;

  if (!project) return null;

  return {
    id: readText(project.id, ""),
    title: readText(project.title, readText(project.name, "Untitled Project")),
    description: readText(
      project.description,
      readText(project.summary, "No description available.")
    ),
    budget: readNumber(project.budget ?? project.amount ?? project.projectBudget, 0),
    requiredSkills: readText(
      project.requiredSkills,
      readText(project.skills, "N/A")
    ),
    status: normalizeStatus(project.status ?? project.projectStatus),
    taskType: normalizeTaskType(project.taskType ?? project.type ?? project.projectType),
    createdAt: readText(project.createdAt, new Date().toISOString()),
    applicantsCount: readNumber(
      project.applicantsCount ?? project.totalApplicants ?? project.applicants,
      0
    ),
  };
}

function extractApplicants(data: unknown) {
  if (Array.isArray(data)) return data;

  if (data && typeof data === "object") {
    const response = data as { applicants?: unknown[]; data?: unknown[]; items?: unknown[] };

    if (Array.isArray(response.applicants)) return response.applicants;
    if (Array.isArray(response.items)) return response.items;
    if (Array.isArray(response.data)) return response.data;
  }

  return [];
}

function formatSkills(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item)).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function mapApplicants(data: unknown): Applicant[] {
  return extractApplicants(data).map((applicant, index) => {
    const currentApplicant = applicant as Record<string, unknown>;
    const user = (currentApplicant.user as Record<string, unknown> | undefined) || {};

    return {
      id: readNumber(currentApplicant.id, index + 1),
      name: readText(currentApplicant.name, readText(user.name, "Anonymous Applicant")),
      role: readText(currentApplicant.role, readText(user.role, "Applicant")),
      avatar: readText(
        currentApplicant.avatar,
        readText(user.avatar, `https://i.pravatar.cc/150?img=${(index % 70) + 1}`)
      ),
      rating: readNumber(currentApplicant.rating, 4.8),
      experience: readText(currentApplicant.experience, "Experienced"),
      skills: formatSkills(currentApplicant.skills ?? user.skills),
      budget: readText(
        currentApplicant.budget,
        currentApplicant.expectedBudget ? `₹${readNumber(currentApplicant.expectedBudget, 0).toLocaleString()}` : "₹0"
      ),
      delivery: readText(currentApplicant.delivery, readText(currentApplicant.deliveryTime, "N/A")),
      aiScore: readNumber(currentApplicant.aiScore ?? currentApplicant.matchScore, 0),
      proposal: readText(
        currentApplicant.proposal,
        readText(currentApplicant.coverLetter, "No proposal available.")
      ),
      availability: readText(currentApplicant.availability, "Available"),
    };
  });
}

export default function ProviderProjectDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [applicantsLoading, setApplicantsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      if (!projectId) {
        setError(true);
        setLoading(false);
        setApplicantsLoading(false);
        return;
      }

      try {
        setError(false);
        const [projectData, applicantsData] = await Promise.all([
          projectService.getProject(projectId),
          providerService.getApplicants(projectId),
        ]);

        setProject(mapProject(projectData));
        setApplicants(mapApplicants(applicantsData));
      } catch (fetchError) {
        console.error("Failed to load project details", fetchError);
        setError(true);
      } finally {
        setLoading(false);
        setApplicantsLoading(false);
      }
    };

    loadProject();
  }, [projectId]);

  const statusClass = {
    OPEN: "bg-green-100 text-green-700",
    ACTIVE: "bg-blue-100 text-blue-700",
    IN_PROGRESS: "bg-blue-100 text-blue-700",
    DRAFT: "bg-amber-100 text-amber-700",
    REVIEW: "bg-amber-100 text-amber-700",
    COMPLETED: "bg-indigo-100 text-indigo-700",
  } as const;

  if (loading) {
    return (
      <DesktopLayout>
        <div className="flex h-[70vh] items-center justify-center bg-slate-50">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500/30 border-t-blue-500" />
        </div>
      </DesktopLayout>
    );
  }

  if (error || !project) {
    return (
      <DesktopLayout>
        <div className="bg-slate-50 py-20 text-center">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            Project Not Found
          </h2>
          <p className="mb-6 text-slate-600">
            The requested project could not be loaded.
          </p>
          <button
            onClick={() => router.push("/provider/my-projects")}
            className="rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
          >
            Back to My Projects
          </button>
        </div>
      </DesktopLayout>
    );
  }

  return (
    <DesktopLayout>
      <div className="space-y-8 bg-slate-50">
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <button
                onClick={() => router.push("/provider/my-projects")}
                className="text-slate-500 transition-colors hover:text-slate-900"
              >
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-3xl font-bold text-slate-900">
                {project.title}
              </h1>
            </div>
            <p className="ml-9 text-slate-600">
              View project information, applicants and progress.
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[project.status as keyof typeof statusClass] || "bg-slate-100 text-slate-700"}`}
          >
            {project.status}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <p className="text-slate-500">Budget</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              ₹{project.budget.toLocaleString()}
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <p className="text-slate-500">Task Type</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              {project.taskType}
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <p className="text-slate-500">Applicants</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              {applicants.length || project.applicantsCount}
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <p className="text-slate-500">Created</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">
              {new Date(project.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
          <div className="xl:col-span-2 space-y-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-2">
                <Briefcase size={20} className="text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-900">
                  Project Overview
                </h2>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-sm text-slate-500">Description</p>
                  <p className="mt-2 leading-7 text-slate-600">
                    {project.description}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Required Skills</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.requiredSkills
                      .split(",")
                      .map((skill) => skill.trim())
                      .filter(Boolean)
                      .map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
                        >
                          {skill}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-2">
                <Users size={20} className="text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-900">
                  Applicants
                </h2>
              </div>

              {applicantsLoading ? (
                <div className="flex items-center justify-center py-16 text-slate-600">
                  Loading applicants...
                </div>
              ) : applicants.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-24 text-center shadow-sm">

                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-5xl">
                    📋
                  </div>

                  <h2 className="mt-6 text-2xl font-bold text-slate-900">
                    No Applicants Found
                  </h2>

                  <p className="mt-3 text-slate-600">
                    There are no applicants for this project yet.
                  </p>

                </div>
              ) : (
                <div className="mt-8 grid gap-6">
                  {applicants.map((applicant) => (
                    <ApplicantCard
                      key={applicant.id}
                      applicant={applicant}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-2">
                <ClipboardList size={20} className="text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-900">
                  Details
                </h2>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <p className="mt-1 text-slate-600">{project.status}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Task Type</p>
                  <p className="mt-1 text-slate-600">{project.taskType}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Budget</p>
                  <p className="mt-1 text-slate-600">₹{project.budget.toLocaleString()}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Applicants Count</p>
                  <p className="mt-1 text-slate-600">{applicants.length || project.applicantsCount}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Created On</p>
                  <p className="mt-1 text-slate-600">
                    {new Date(project.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-2">
                <DollarSign size={20} className="text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-900">
                  Project Summary
                </h2>
              </div>

              <div className="mt-6 space-y-5">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Budget</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    ₹{project.budget.toLocaleString()}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Created At</p>
                  <p className="mt-2 text-slate-600">
                    {new Date(project.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Applicants</p>
                  <p className="mt-2 text-slate-600">
                    {applicants.length || project.applicantsCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-2">
                <CalendarDays size={20} className="text-blue-600" />
                <h2 className="text-xl font-semibold text-slate-900">
                  Timeline
                </h2>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Created</span>
                  <span>
                    {new Date(project.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
}
