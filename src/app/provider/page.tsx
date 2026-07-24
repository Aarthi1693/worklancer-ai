"use client";

import DesktopLayout from "@/components/layout/desktop-layout";
import { useRouter } from "next/navigation";
import DashboardCard from "@/components/provider/dashboard-card";
import ProductivityChart from "@/components/provider/productivity-chart";
import TaskStatusChart from "@/components/provider/task-status-chart";
import AIMonitoring from "@/components/provider/ai-monitoring";
import BusinessHealthCard from "@/components/provider/business-health-card";
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

export default function ProviderDashboard() {
  const router = useRouter();
  const [dashboard, setDashboard] = useState({
    totalProjects: 0,
    openProjects: 0,
    inProgressProjects: 0,
    reviewProjects: 0,
    completedProjects: 0,
    totalApplications: 0,
  });

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<{ budget?: number; status?: string }[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  const user = authService.getUser();

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
        const data = await providerService.getDashboard();
        setDashboard(data);
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
        setProjects(Array.isArray(data) ? data : data.projects || []);
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
        
        {/* Header */}
        <div>
          <h1 className="text-5xl font-bold text-white">
            {getGreeting()}, {user?.name?.split(" ")[0] || "User"} 👋
          </h1>

          <p className="mt-3 text-slate-400">
            You have {loading ? "..." : `${dashboard.openProjects} open`} projects and {loading ? "..." : `${dashboard.completedProjects} completed`}.
          </p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() =>
                router.push("/provider/create-task")
              }
              className="
              px-5
              py-3
              rounded-xl
              bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)]
              hover:from-blue-500 hover:to-purple-500
              transition
              "
            >
              Create Task
            </button>


            <button
              onClick={() =>
                router.push("/provider/ai-planning")
              }
              className="
              px-5
              py-3
              rounded-xl
              bg-gradient-to-r from-green-600 to-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.4)]
              hover:from-green-500 hover:to-emerald-500
              transition
              "
            >
              AI Planning
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <DashboardCard
            title="Active Projects"
            value={loading ? "..." : dashboard.totalProjects.toString()}
            icon={<Briefcase />}
          />

          <DashboardCard
            title="Open Tasks"
            value={loading ? "..." : dashboard.openProjects.toString()}
            icon={<ClipboardList />}
          />

          <DashboardCard
            title="Applicants"
            value={loading ? "..." : dashboard.totalApplications.toString()}
            icon={<Users />}
          />

          <DashboardCard
            title="Total Budget"
            value={
              loading || projectsLoading
                ? "..."
                : totalBudget > 0
                  ? `₹${totalBudget.toLocaleString()}`
                  : "₹0"
            }
            icon={<DollarSign />}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProductivityChart />
          <TaskStatusChart data={taskStatusData} />
        </div>

        {/* Productivity Message */}
        <p className="text-sm text-slate-400">
          Your project productivity has improved by 14% compared to last week.
        </p>

        {/* Business Health Card */}
        <BusinessHealthCard />

        {/* AI Monitoring */}
        <AIMonitoring projects={projects} />

      </div>
    </DesktopLayout>
  );
}