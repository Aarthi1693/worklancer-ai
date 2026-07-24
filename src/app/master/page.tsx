"use client";

import DesktopLayout from "@/components/layout/desktop-layout";
import { useEffect, useState } from "react";
import masterService from "@/services/master.service";
import kycService from "@/services/kyc.service";
import authService from "@/services/auth.service";
import { ShieldCheck, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

interface CurrentTask {
  id: string;
  title: string;
  budget: number;
  status: string;
  progress: number;
  submissionStatus: string;
}

interface DashboardData {
  activeProjects: number;
  completedProjects: number;
  pendingProjects: number;
  earnings: number;
  performance: number;
  successRate: number;
  averageRating: number;
  onTimeDelivery: number;
  currentTasks: CurrentTask[];
  earningsBreakdown: {
    totalEarnings: number;
    pendingEarnings: number;
    releasedEarnings: number;
  };
}

export default function MasterDashboard() {
  const [dashboard, setDashboard] = useState<DashboardData>({
    activeProjects: 0,
    completedProjects: 0,
    pendingProjects: 0,
    earnings: 0,
    performance: 0,
    successRate: 0,
    averageRating: 0,
    onTimeDelivery: 0,
    currentTasks: [],
    earningsBreakdown: {
      totalEarnings: 0,
      pendingEarnings: 0,
      releasedEarnings: 0,
    },
  });
  const [kycStatus, setKycStatus] = useState<{ status: string; score: number | null } | null>(null);
  const [loading, setLoading] = useState(true);
  const [careerData, setCareerData] = useState<{ suggestions?: string[] } | null>(null);

  const user = authService.getUser();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await masterService.getDashboard();
        setDashboard(data);
        const kyc = await kycService.getStatus();
        setKycStatus({ status: kyc.status, score: kyc.score });

        if (user?.id) {
          const { default: careerAiService } = await import("@/services/career-ai.service");
          try {
            const career = await careerAiService.analyze(user.id);
            setCareerData(career);
          } catch (e) {
            console.error("Failed to load career insights", e);
          }
        }
      } catch (error) {
        console.error("Failed to load dashboard", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [user?.id]);

  const userName = user?.name?.split(" ")[0] || "User";

  return (
    <DesktopLayout>
      <div className="space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-5xl font-bold text-white">
            Good Morning, {userName} 👋
          </h1>

          <p className="mt-3 text-slate-400">
            You have {loading ? "..." : dashboard.activeProjects} active tasks today.
            AI predicts a productivity score of {dashboard.successRate}%.
          </p>

          <div className="flex gap-4 mt-6">
            <button
              className="
                px-5
                py-3
                rounded-xl
                bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)]
                hover:from-blue-500 hover:to-purple-500
                transition
              "
            >
              View Tasks
            </button>

            <button
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
              My Earnings
            </button>

            <button
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
              Career Insights
            </button>
          </div>
        </div>

        {/* KYC Widget */}
        {kycStatus && (
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck size={24} className={
                kycStatus.status === "VERIFIED" ? "text-green-400" :
                kycStatus.status === "PENDING" ? "text-yellow-400" : "text-red-400"
              } />
              <div>
                <p className="text-sm text-slate-400">KYC Status</p>
                <p className="text-lg font-bold text-white">
                  {kycStatus.status === "VERIFIED" ? "KYC Verified" :
                   kycStatus.status === "PENDING" ? "Verification Pending" :
                   kycStatus.status === "REJECTED" ? "Verification Rejected" :
                   "Not Started"}
                </p>
              </div>
            </div>
            {kycStatus.status === "VERIFIED" && (
              <div className="flex items-center gap-1 text-green-400 text-sm">
                <CheckCircle2 size={16} /> {kycStatus.score}/100
              </div>
            )}
            {kycStatus.status === "PENDING" && (
              <div className="flex items-center gap-1 text-yellow-400 text-sm">
                <AlertTriangle size={16} /> Pending Review
              </div>
            )}
            {kycStatus.status === "REJECTED" && (
              <div className="flex items-center gap-1 text-red-400 text-sm">
                <XCircle size={16} /> Rejected
              </div>
            )}
            {!kycStatus.status && (
              <div className="flex items-center gap-1 text-slate-400 text-sm">
                Not Started
              </div>
            )}
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6">

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400 text-sm">
              Assigned Tasks
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {loading ? "..." : dashboard.activeProjects}
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400 text-sm">
              Completed Tasks
            </p>

            <h2 className="text-3xl font-bold mt-2 text-green-400">
              {loading ? "..." : dashboard.completedProjects}
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400 text-sm">
              Monthly Earnings
            </p>

            <h2 className="text-3xl font-bold mt-2 text-blue-400">
              {loading ? "..." : `₹${(dashboard.earningsBreakdown?.totalEarnings ?? 0).toLocaleString()}`}
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400 text-sm">
              AI Performance
            </p>

            <h2 className="text-3xl font-bold mt-2 text-purple-400">
              {loading ? "..." : `${dashboard.performance}%`}
            </h2>
          </div>

        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-2 gap-6">

          {/* Tasks */}
          <div
            className="
              rounded-3xl
              border
              border-white/[0.08]
              bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
              p-6
            "
          >
            <h2 className="text-2xl font-bold mb-6">
              Current Tasks
            </h2>

            <div className="space-y-5">
              {dashboard.currentTasks.length === 0 && !loading ? (
                <p className="text-slate-400 text-sm">No active tasks.</p>
              ) : (
                dashboard.currentTasks.map((task) => (
                  <div key={task.id}>
                    <div className="flex justify-between mb-2">
                      <span>{task.title}</span>
                      <span>{task.progress}%</span>
                    </div>

                    <div className="h-2 bg-slate-700 rounded-full">
                      <div
                        className="h-2 bg-green-500 rounded-full"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Earnings */}
          <div
            className="
              rounded-3xl
              border
              border-white/[0.08]
              bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
              p-6
            "
          >
            <h2 className="text-2xl font-bold mb-6">
              Earnings Overview
            </h2>

            <div className="space-y-5">

              <div>
                <p className="text-slate-400">
                  This Month
                </p>

                <h3 className="text-3xl font-bold text-blue-400 mt-2">
                  ₹{loading ? "..." : (dashboard.earningsBreakdown?.totalEarnings ?? 0).toLocaleString()}
                </h3>
              </div>

              <div>
                <p className="text-slate-400">
                  Pending Payments
                </p>

                <h3 className="text-xl font-semibold text-yellow-400 mt-2">
                  ₹{loading ? "..." : (dashboard.earningsBreakdown?.pendingEarnings ?? 0).toLocaleString()}
                </h3>
              </div>

              <div>
                <p className="text-slate-400">
                  Completed Payments
                </p>

                <h3 className="text-xl font-semibold text-green-400 mt-2">
                  ₹{loading ? "..." : (dashboard.earningsBreakdown?.releasedEarnings ?? 0).toLocaleString()}
                </h3>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-2 gap-6">

          {/* AI Career */}
          <div
            className="
              rounded-3xl
              border
              border-purple-500/20
              shadow-[0_0_40px_rgba(124,58,237,0.15)]
              bg-white/[0.03]
              backdrop-blur-xl
              p-6
            "
          >
            <h2 className="text-2xl font-bold mb-4">
              AI Career Assistant
            </h2>

            <div className="space-y-3 text-slate-300">
              {careerData && careerData.suggestions && careerData.suggestions.length > 0 ? (
                careerData.suggestions.map((suggestion, idx) => (
                  <p key={idx}>✓ {suggestion}</p>
                ))
              ) : (
                <div className="space-y-2">
                  <p className="text-slate-300">✓ Learn System Design.</p>
                  <p className="text-slate-300">✓ Improve Node.js skills.</p>
                  <p className="text-slate-300">✓ Practice DSA regularly.</p>
                  <p className="text-slate-300">✓ Complete Azure or AWS certification.</p>
                </div>
              )}
            </div>
          </div>

          {/* Performance */}
          <div
            className="
              rounded-3xl
              border
              border-white/[0.08]
              bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
              p-6
            "
          >
            <h2 className="text-2xl font-bold mb-4">
              Performance Analytics
            </h2>

            <div className="space-y-5">

              <div>
                <p className="text-slate-400">
                  Task Success Rate
                </p>

                <h3 className="text-2xl font-bold text-green-400">
                  {loading ? "..." : `${dashboard.successRate}%`}
                </h3>
              </div>

              <div>
                <p className="text-slate-400">
                  Client Satisfaction
                </p>

                <h3 className="text-2xl font-bold text-blue-400">
                  {loading ? "..." : `${dashboard.averageRating} ★`}
                </h3>
              </div>

              <div>
                <p className="text-slate-400">
                  On-Time Delivery
                </p>

                <h3 className="text-2xl font-bold text-purple-400">
                  {loading ? "..." : `${dashboard.onTimeDelivery}%`}
                </h3>
              </div>

            </div>
          </div>

        </div>

      </div>
    </DesktopLayout>
  );
}
