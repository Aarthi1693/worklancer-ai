"use client";

import DesktopLayout from "@/components/layout/desktop-layout";
import { useRouter } from "next/navigation";
import DashboardCard from "@/components/provider/dashboard-card";
import ProductivityChart from "@/components/provider/productivity-chart";
import TaskStatusChart from "@/components/provider/task-status-chart";
import AIMonitoring from "@/components/provider/ai-monitoring";
import TeamRecommendation from "@/components/provider/team-recommendation";
import { useEffect, useState } from "react";
import providerService from "@/services/provider.service";


import {
  Briefcase,
  Users,
  DollarSign,
  ClipboardList,
} from "lucide-react";

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
  return (
    <DesktopLayout>
      <div className="space-y-8">
        
        {/* Header */}
        <div>
  <h1 className="text-5xl font-bold text-white">
    Good Morning, Aarthi 👋
  </h1>

  <p className="mt-3 text-slate-400">
    Your team completed 18 tasks today.
    AI detected 3 optimization opportunities.
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
        router.push("/provider/analytics")
      }
      className="
      px-5
      py-3
      rounded-xl
      border
      border-white/[0.08]
      hover:bg-white/5
      transition
      "
    >
      Analytics
    </button>

    <button
      onClick={() =>
        router.push("/provider/team")
      }
      className="
      px-5
      py-3
      rounded-xl
      border
      border-white/[0.08]
      hover:bg-white/5
      transition
      "
    >
      Find Team
    </button>
  </div>
</div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6">
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
            title="Team Members"
            value={loading ? "..." : dashboard.inProgressProjects.toString()}
            icon={<Users />}
          />

          <DashboardCard
            title="Revenue"
            value={loading ? "..." : dashboard.totalApplications.toString()}
            icon={<DollarSign />}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6">
          <ProductivityChart />
          <TaskStatusChart />
        </div>

        {/* AI Monitoring + Team Recommendation */}
        <div className="grid grid-cols-2 gap-6">
          <AIMonitoring />
          <TeamRecommendation />
        </div>

      </div>
    </DesktopLayout>
  );
}