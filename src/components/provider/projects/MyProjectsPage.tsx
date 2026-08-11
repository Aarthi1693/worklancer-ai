"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FolderOpen,
  PlayCircle,
  CheckCircle2,
  FileEdit,
} from "lucide-react";

import MyProjectsHeader from "./MyProjectsHeader";
import ProjectStats from "./ProjectStats";
import ProjectFilters from "./ProjectFilters";
import ProjectCard from "./ProjectCard";
import providerService from "@/services/provider.service";
import projectService from "@/services/project.service";

type Project = {
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

type BackendProject = Record<string, unknown>;
type BackendProjectsResponse = {
  projects?: unknown;
  data?: unknown;
};

function readText(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function readNumber(value: unknown, fallback: number) {
  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) ? parsedValue : fallback;
}

function extractProjects(data: unknown): BackendProject[] {
  if (Array.isArray(data)) {
    return data as BackendProject[];
  }

  if (data && typeof data === "object") {
    const response = data as BackendProjectsResponse;

    if (Array.isArray(response.projects)) {
      return response.projects as BackendProject[];
    }

    if (Array.isArray(response.data)) {
      return response.data as BackendProject[];
    }
  }

  return [];
}

function normalizeStatus(status?: string) {
  const value = (status || "").toLowerCase();

  if (value.includes("complete")) return "Completed";
  if (value.includes("draft") || value.includes("pending")) return "Draft";

  return "Active";
}

function normalizeType(type?: string) {
  const value = (type || "").toLowerCase();

  if (
    value.includes("on-field") ||
    value.includes("on field") ||
    value.includes("field") ||
    value.includes("site")
  ) {
    return "On-Field";
  }

  return "Digital";
}

function normalizeTaskType(type?: string): "digital" | "field" {
  const value = (type || "").toLowerCase();

  if (
    value.includes("on-field") ||
    value.includes("on field") ||
    value.includes("field") ||
    value.includes("site")
  ) {
    return "field";
  }

  return "digital";
}

function formatBudget(value: unknown) {
  const amount = Number(value) || 0;

  return `₹${amount.toLocaleString()}`;
}

function formatDuration(value: unknown) {
  if (typeof value === "string" && value.trim()) {
    return value;
  }

  const amount = Number(value);

  return Number.isFinite(amount) && amount > 0 ? `${amount} Days` : "—";
}

function mapProjects(data: unknown): Project[] {
  const projects = extractProjects(data);

  return projects.map((project) => {
    const projectData = project as BackendProject;
    const projectId =
      readText(projectData.id, "") ||
      readText(projectData.projectId, "") ||
      readText(projectData.uuid, "") ||
      readText(projectData._id, "");

    return {
      id: projectId,
      title: readText(projectData.title, readText(projectData.name, "Untitled Project")),
      type: normalizeType(
        readText(
          projectData.type,
          readText(projectData.projectType, readText(projectData.category, "Digital"))
        )
      ),
      taskType: normalizeTaskType(
        readText(
          projectData.type,
          readText(projectData.projectType, readText(projectData.category, "Digital"))
        )
      ),
      status: normalizeStatus(
        readText(projectData.status, readText(projectData.projectStatus, "Active"))
      ),
      budget: formatBudget(
        projectData.budget ?? projectData.amount ?? projectData.projectBudget
      ),
      budgetValue: readNumber(
        projectData.budget ?? projectData.amount ?? projectData.projectBudget,
        0
      ),
      duration: formatDuration(
        projectData.duration ?? projectData.timeline ?? projectData.days
      ),
      applicants: readNumber(
        projectData.applicants ??
          projectData.applicantsCount ??
          projectData.applicationCount ??
          projectData.totalApplicants,
        0
      ),
      aiScore: readNumber(projectData.aiScore ?? projectData.matchScore, 0),
      description: readText(projectData.description, readText(projectData.summary, "")),
      requiredSkills: readText(projectData.requiredSkills, readText(projectData.skills, "")),
    };
  });
}

export default function MyProjectsPage() {
  const router = useRouter();

  const [activeFilter, setActiveFilter] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setError(false);
      const data = await providerService.getProjects();
      setProjects(mapProjects(data));
    } catch (fetchError) {
      console.error("Failed to load provider projects", fetchError);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      searchValue.trim().length === 0 ||
      [project.title, project.type, project.status]
        .join(" ")
        .toLowerCase()
        .includes(searchValue.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === "All") return true;

    if (activeFilter === "Digital")
      return project.type === "Digital";

    if (activeFilter === "On-Field")
      return project.type === "On-Field";

    return project.status === activeFilter;
  });

  const stats = [
    {
      title: "Total Projects",
      value: String(projects.length),
      icon: FolderOpen,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active",
      value: String(projects.filter((project) => project.status === "Active").length),
      icon: PlayCircle,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Completed",
      value: String(
        projects.filter((project) => project.status === "Completed").length
      ),
      icon: CheckCircle2,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Draft",
      value: String(projects.filter((project) => project.status === "Draft").length),
      icon: FileEdit,
      color: "bg-amber-100 text-amber-600",
    },
  ];

  const handleEditProject = (project: Project) => {
    const params = new URLSearchParams({
      mode: "edit",
      projectId: project.id,
      taskType: project.taskType,
      title: project.title,
      description: project.description,
      budget: String(project.budgetValue),
      skills: project.requiredSkills,
    });

    router.push(`/provider/create-task?${params.toString()}`);
  };

  const handleDeleteProject = async (projectId: string) => {
    const confirmed = window.confirm("Delete this project?");
    if (!confirmed) return;

    try {
      setDeletingProjectId(projectId);
      await projectService.deleteProject(projectId);
      alert("Project deleted successfully.");
      await fetchProjects();
    } catch (deleteError) {
      console.error("Failed to delete project", deleteError);
      alert("Failed to delete project.");
    } finally {
      setDeletingProjectId(null);
    }
  };

  return (
    <div className="space-y-8">

      {/* Hero */}
      <MyProjectsHeader />

      {/* Statistics */}
      <ProjectStats stats={stats} />

      {/* Filters */}
      <ProjectFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      {/* Projects */}

      {loading ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-24 text-center shadow-sm">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-4xl">
            ⏳
          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            Loading Projects
          </h2>

          <p className="mt-3 text-slate-600">
            Fetching your projects from the backend.
          </p>

        </div>
      ) : error ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-24 text-center shadow-sm">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-4xl">
            ⚠️
          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            Unable to Load Projects
          </h2>

          <p className="mt-3 text-slate-600">
            Please try again to refresh the project list.
          </p>

          <button
            onClick={fetchProjects}
            className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Retry
          </button>

        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid gap-6 xl:grid-cols-2">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
              deletingProjectId={deletingProjectId}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-24 text-center shadow-sm">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-4xl">
            📁
          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            No Projects Found
          </h2>

          <p className="mt-3 text-slate-600">
            Try changing your filter or create your first project.
          </p>

          <button className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
            + Create Project
          </button>

        </div>
      )}

      {/* Pagination */}

      <div className="flex items-center justify-center gap-3 pt-2">

        <button className="rounded-xl border border-slate-300 bg-white px-5 py-2 text-slate-600 hover:bg-slate-100">
          Previous
        </button>

        <button className="rounded-xl bg-blue-600 px-5 py-2 text-white">
          1
        </button>

        <button className="rounded-xl border border-slate-300 bg-white px-5 py-2 text-slate-600 hover:bg-slate-100">
          2
        </button>

        <button className="rounded-xl border border-slate-300 bg-white px-5 py-2 text-slate-600 hover:bg-slate-100">
          Next
        </button>

      </div>

    </div>
  );
}