"use client";

import WorkspaceHero from "@/assets/images/workspace-hero.png";
import DesktopLayout from "@/components/layout/desktop-layout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import providerService from "@/services/provider.service";
import authService from "@/services/auth.service";

import {
  Briefcase,
  Users,
  DollarSign,
  ClipboardList,
} from "lucide-react";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  return "Good Evening";
}

type DashboardState = {
  totalProjects: number;
  openProjects: number;
  inProgressProjects: number;
  reviewProjects: number;
  completedProjects: number;
  totalApplications: number;
};

type ProjectItem = {
  id: string | number;
  title: string;
  description: string;
  budget: number;
  requiredSkills: string;
  createdAt: string;
  taskType: string;
  status: string;
};

type ProviderDashboardResponse = Partial<DashboardState> & {
  projects?: unknown[];
  data?: unknown[];
};

function readNumber(value: unknown, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function readText(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function normalizeTaskType(value: unknown) {
  const taskType = readText(value).toUpperCase();

  if (taskType.includes("ON_FIELD") || taskType.includes("FIELD")) {
    return "ON_FIELD";
  }

  return "DIGITAL";
}

function normalizeStatus(value: unknown) {
  const status = readText(value).toUpperCase();

  if (status.includes("OPEN")) return "OPEN";
  if (status.includes("PROGRESS")) return "IN_PROGRESS";
  if (status.includes("COMPLETE")) return "COMPLETED";

  return "OPEN";
}

function extractProjects(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;

  if (data && typeof data === "object") {
    const response = data as ProviderDashboardResponse;

    if (Array.isArray(response.projects)) return response.projects;
    if (Array.isArray(response.data)) return response.data;
  }

  return [];
}

function mapProjects(data: unknown): ProjectItem[] {
  return extractProjects(data).map((project, index) => {
    const currentProject = project as Record<string, unknown>;

    return {
      id: currentProject.id ?? index + 1,
      title: readText(currentProject.title, readText(currentProject.name, "Untitled Project")),
      description: readText(currentProject.description, "No description available."),
      budget: readNumber(
        currentProject.budget ?? currentProject.amount ?? currentProject.projectBudget,
        0
      ),
      requiredSkills: readText(
        currentProject.requiredSkills,
        readText(currentProject.skills, "N/A")
      ),
      createdAt: readText(currentProject.createdAt, new Date(0).toISOString()),
      taskType: normalizeTaskType(
        currentProject.taskType ?? currentProject.type ?? currentProject.projectType
      ),
      status: normalizeStatus(currentProject.status ?? currentProject.projectStatus),
    };
  });
}

export default function ProviderDashboard() {
  const router = useRouter();
  const [dashboard, setDashboard] = useState<DashboardState>({
    totalProjects: 0,
    openProjects: 0,
    inProgressProjects: 0,
    reviewProjects: 0,
    completedProjects: 0,
    totalApplications: 0,
  });

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const user = mounted ? authService.getUser() : null;

  const userName = user?.name ? user.name.split(" ")[0] : "User";

  const totalBudget = projects.reduce(
    (sum, p) => sum + (Number(p.budget) || 0),
    0
  );

  const taskStatusData =
    !loading && dashboard.totalProjects > 0
      ? [
          { name: "In Progress", value: dashboard.inProgressProjects },
          { name: "In Review", value: dashboard.reviewProjects },
          { name: "Completed", value: dashboard.completedProjects },
        ].filter((item) => item.value > 0)
      : undefined;

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = (await providerService.getDashboard()) as ProviderDashboardResponse;

        setDashboard({
          totalProjects: readNumber(
            data.totalProjects ?? data.openProjects ?? data.inProgressProjects,
            0
          ),
          openProjects: readNumber(data.openProjects ?? data.pendingProjects, 0),
          inProgressProjects: readNumber(data.inProgressProjects, 0),
          reviewProjects: readNumber(data.reviewProjects ?? data.pendingProjects, 0),
          completedProjects: readNumber(data.completedProjects, 0),
          totalApplications: readNumber(data.totalApplications, 0),
        });
      } catch (error) {
        console.error("Failed to load dashboard", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await providerService.getProjects();
        setProjects(mapProjects(data));
      } catch (error) {
        console.error("Failed to load projects", error);
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, []);
  return (
    <DesktopLayout>
      <div className="space-y-8">
        
        {/* Hero Banner */}

<div className="relative overflow-hidden rounded-3xl h-[460px] border border-gray-200 bg-white">

  <img
  src={WorkspaceHero.src}
  alt="Workspace"
  className="absolute inset-0 w-full h-full object-cover object-right scale-95"
/>

  <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/65 to-white/10" />

  <div className="relative h-full flex flex-col justify-center px-20 max-w-3xl">

    <span className="text-sm font-medium uppercase tracking-[4px] text-blue-600">
      WorkLancer AI
    </span>

    <h1 className="mt-4 text-5xl font-bold text-gray-900 leading-tight">
      {getGreeting()},
      <br />
      {userName} 👋
    </h1>

    <p className="mt-5 text-lg text-gray-700 max-w-2xl leading-8">
      Create projects, manage applicants, monitor progress, and use AI to
plan and deliver successful work—all from one intelligent workspace.
    </p>

    <div className="flex gap-4 mt-8">

      <button
        onClick={() => router.push("/provider/create-task")}
        className="px-7 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-lg"
      >
        Create Task
      </button>

      <button
        onClick={() => router.push("/provider/ai-planning")}
        className="px-7 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 transition shadow-sm"
      >
        AI Planning
      </button>

    </div>

  </div>

</div>

       {/* Quick Summary */}

<div className="mt-10">

  <div className="flex items-center justify-between mb-6">

    <div>
      <h2 className="text-2xl font-bold text-gray-900">
        Quick Summary
      </h2>

      <p className="text-gray-500 mt-1">
        A quick overview of your current workspace.
      </p>
    </div>

  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

    {/* Active Projects */}

    <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition">

      <div className="flex justify-between items-center">

        <Briefcase className="w-8 h-8 text-blue-600" />

        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          Active
        </span>

      </div>

      <h3 className="mt-6 text-4xl font-bold text-gray-900">
        {loading ? "..." : dashboard.totalProjects}
      </h3>

      <p className="mt-2 text-gray-500">
        Active Projects
      </p>

    </div>

    {/* Open Tasks */}

    <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition">

      <div className="flex justify-between items-center">

        <ClipboardList className="w-8 h-8 text-emerald-600" />

        <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
          Open
        </span>

      </div>

      <h3 className="mt-6 text-4xl font-bold text-gray-900">
        {loading ? "..." : dashboard.openProjects}
      </h3>

      <p className="mt-2 text-gray-500">
        Open Tasks
      </p>

    </div>

    {/* Applicants */}

    <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition">

      <div className="flex justify-between items-center">

        <Users className="w-8 h-8 text-violet-600" />

        <span className="text-xs bg-violet-100 text-violet-700 px-3 py-1 rounded-full">
          Hiring
        </span>

      </div>

      <h3 className="mt-6 text-4xl font-bold text-gray-900">
        {loading ? "..." : dashboard.totalApplications}
      </h3>

      <p className="mt-2 text-gray-500">
        Applicants
      </p>

    </div>

    {/* Budget */}

    <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition">

      <div className="flex justify-between items-center">

        <DollarSign className="w-8 h-8 text-orange-500" />

        <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
          Budget
        </span>

      </div>

      <h3 className="mt-6 text-3xl font-bold text-gray-900">

        {loading || projectsLoading
          ? "..."
          : `₹${totalBudget.toLocaleString()}`}

      </h3>

      <p className="mt-2 text-gray-500">
        Total Budget
      </p>

    </div>

  </div>

</div>

        {/* Continue Working */}

<div className="mt-14">

  <div className="flex items-center justify-between mb-6">

    <div>
      <h2 className="text-2xl font-bold text-gray-900">
  Your Projects
</h2>

<p className="text-gray-500">
  View, manage and track the projects you've created.
</p>
    </div>

    <button
      onClick={() => router.push("/provider/my-projects")}
      className="text-blue-600 font-medium hover:underline"
    >
      View All Projects →
    </button>

  </div>

  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

  {projects
  .sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  )
  .slice(0, 2)
  .map((project: any) => (
    <div
  key={project.id}
  className="bg-white rounded-3xl border border-gray-200 p-5 hover:shadow-xl transition-all duration-300"
>
  {/* Header */}

  <div className="flex justify-between items-start">

    <div>

      <h3 className="text-xl font-bold text-gray-900">
        {project.title}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {project.taskType === "DIGITAL"
          ? "💻 Digital Task"
          : "📍 Field Task"}
      </p>

    </div>

    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        project.status === "OPEN"
          ? "bg-green-100 text-green-700"
          : project.status === "IN_PROGRESS"
          ? "bg-blue-100 text-blue-700"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      {project.status === "OPEN"
  ? "🟢 Open"
  : project.status === "IN_PROGRESS"
  ? "🔵 In Progress"
  : "⚫ Completed"}
    </span>

  </div>

  {/* Description */}

  <p className="mt-5 text-gray-600 line-clamp-2">
    {project.description}
  </p>

  {/* Information Grid */}

  <div className="grid grid-cols-2 gap-4 mt-6">

    <div>

      <p className="text-xs uppercase tracking-wider text-gray-400">
        Budget
      </p>

      <p className="font-semibold text-gray-900">
        ₹{project.budget.toLocaleString()}
      </p>

    </div>

    <div>

      <p className="text-xs uppercase tracking-wider text-gray-400">
        Skills
      </p>

      <p className="text-sm text-gray-700 truncate">
        {project.requiredSkills}
      </p>

    </div>

    <div>

      <p className="text-xs uppercase tracking-wider text-gray-400">
        Created
      </p>

      <p className="text-sm text-gray-700">
        {new Date(project.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>

    </div>

    <div>

      <p className="text-xs uppercase tracking-wider text-gray-400">
        Project Type
      </p>

      <p className="text-sm text-gray-700">
        {project.taskType}
      </p>

    </div>

  </div>

  {/* Footer */}

  <div className="flex justify-end 6">

    <button
      onClick={() => router.push("/provider/my-projects")}
      className="px-5 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
    >
      Open Project →
    </button>

  </div>

</div>
    
))}

    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">

      <h3 className="text-2xl font-bold flex items-center gap-2">
  🤖 AI Insights
</h3>

      <div className="mt-6 space-y-5">

  <div className="flex justify-between">
    <span className="text-blue-100">Projects Created</span>
    <span className="font-semibold">
      {dashboard.totalProjects}
    </span>
  </div>

  <div className="flex justify-between">
    <span className="text-blue-100">Open Projects</span>
    <span className="font-semibold">
      {dashboard.openProjects}
    </span>
  </div>

  <div className="flex justify-between">
    <span className="text-blue-100">Completed</span>
    <span className="font-semibold">
      {dashboard.completedProjects}
    </span>
  </div>

  <div className="pt-3 border-t border-white/20">

    <p className="text-sm text-blue-100">
      💡 <strong>AI Suggestion</strong>
    </p>

    <p className="mt-2 text-sm leading-6 text-white/90">
      Focus on completing your open projects before creating new ones.
      This can improve client satisfaction and overall project success.
    </p>

  </div>

</div>

      <button
        onClick={() => router.push("/provider/ai-planning")}
        className="mt-6 bg-white text-blue-600 px-5 py-3 rounded-xl font-medium hover:bg-gray-100"
      >
        Generate AI Plan →
      </button>

    </div>

  </div>

</div>

      </div>
    </DesktopLayout>
  );
}