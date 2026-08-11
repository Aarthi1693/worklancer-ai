"use client";

import MasterHero from "@/assets/images/master-hero.png";
import DesktopLayout from "@/components/layout/desktop-layout";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import masterService from "@/services/master.service";
import kycService from "@/services/kyc.service";
import authService from "@/services/auth.service";
import { ShieldCheck, AlertTriangle, RefreshCw } from "lucide-react";

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

function getGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";

  return "Good Evening";
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
  const [error, setError] = useState<string | null>(null);
  const [careerData, setCareerData] = useState<{ suggestions?: string[] } | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const currentUser = mounted ? authService.getUser() : null;
  const userName = currentUser?.name ? currentUser.name.split(" ")[0] : "User";

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [data, kyc] = await Promise.all([
        masterService.getDashboard(),
        kycService.getStatus(),
      ]);
      setDashboard(data);
      setKycStatus({ status: kyc.status, score: kyc.score });

      if (currentUser?.id) {
        try {
          const { default: careerAiService } = await import("@/services/career-ai.service");
          const career = await careerAiService.analyze(currentUser.id);
          setCareerData(career);
        } catch (e) {
          console.error("Failed to load career insights", e);
        }
      }
    } catch (err) {
      console.error("Failed to load dashboard", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDashboard();
  }, [loadDashboard]);

  const retryDashboard = () => {
    loadDashboard();
  };

  return (
    <DesktopLayout>
      <div className="space-y-10">

        {/* ================= ERROR BANNER ================= */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-red-500" size={20} />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
            <button
              onClick={retryDashboard}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition text-sm font-medium"
            >
              <RefreshCw size={16} />
              Retry
            </button>
          </div>
        )}

        {/* ================= HERO ================= */}

        <div className="relative overflow-hidden rounded-3xl h-[420px] border border-gray-200 bg-white">

         <img
  src={MasterHero.src}
  alt="Master Workspace"
  className="absolute right-0 top-0 h-full w-[58%] object-contain"
/>
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/65 to-white/10" />

          <div className="relative z-10 px-10 py-14 max-w-3xl">

            <p className="text-sm tracking-[6px] uppercase font-semibold text-blue-600">
              WORKLANCER AI
            </p>

            <h1 className="mt-4 text-5xl font-bold text-gray-900 leading-tight">
              {getGreeting()},
              <br />
              {userName} 👋
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-8">
              Complete digital and on-field tasks, track your earnings, 
              and grow your freelance career with AI-powered recommendations.
            </p>

            <div className="flex gap-4 mt-8">

              <button
  onClick={() => router.push("/master/tasks")}
  className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
>
  View Tasks
</button>

<button
  onClick={() => router.push("/master/earnings")}
  className="px-6 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 transition"
>
  My Earnings
</button>
            </div>

          </div>

        </div>

        {/* ================= KYC ================= */}

        {kycStatus && (

          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 flex justify-between items-center">

            <div className="flex items-center gap-4">

              <ShieldCheck
                size={34}
                className={
                  kycStatus.status === "VERIFIED"
                    ? "text-green-600"
                    : kycStatus.status === "PENDING"
                    ? "text-yellow-500"
                    : "text-red-500"
                }
              />

              <div>

                <p className="text-sm text-gray-500">
                  Identity Verification
                </p>

                <h3 className="text-xl font-bold text-gray-900">

                  {kycStatus.status === "VERIFIED"
                    ? "KYC Verified"
                    : kycStatus.status === "PENDING"
                    ? "Verification Pending"
                    : kycStatus.status === "REJECTED"
                    ? "Verification Rejected"
                    : "Not Started"}

                </h3>

              </div>

            </div>

            <div>

              {kycStatus.status === "VERIFIED" && (

                <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
                  ✓ {kycStatus.score}/100
                </span>

              )}

              {kycStatus.status === "PENDING" && (

                <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                  Pending Review
                </span>

              )}

              {kycStatus.status === "REJECTED" && (

                <span className="px-4 py-2 rounded-full bg-red-100 text-red-700 font-medium">
                  Rejected
                </span>

              )}

            </div>

          </div>

        )}

        {/* ================= QUICK SUMMARY ================= */}

        <section>

          <div className="flex items-end justify-between">

            <div>

              <h2 className="text-3xl font-bold text-gray-900">
                Quick Summary
              </h2>

              <p className="text-gray-500 mt-2">
                Your freelancer activity at a glance.
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

            {/* Active */}

            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">

              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">
                📋
              </div>

              <h3 className="mt-6 text-4xl font-bold text-gray-900">
                {loading ? "..." : dashboard.activeProjects}
              </h3>

              <p className="mt-2 text-gray-500">
                Active Tasks
              </p>

            </div>

            {/* Completed */}

            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">

              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl">
                ✅
              </div>

              <h3 className="mt-6 text-4xl font-bold text-gray-900">
                {loading ? "..." : dashboard.completedProjects}
              </h3>

              <p className="mt-2 text-gray-500">
                Completed
              </p>

            </div>

            {/* Pending */}

            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">

              <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center text-2xl">
                ⏳
              </div>

              <h3 className="mt-6 text-4xl font-bold text-gray-900">
                {loading ? "..." : dashboard.pendingProjects}
              </h3>

              <p className="mt-2 text-gray-500">
                Pending
              </p>

            </div>

            {/* Earnings */}

            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">

              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl">
                💰
              </div>

              <h3 className="mt-6 text-3xl font-bold text-gray-900">
                ₹
                {loading
                  ? "..."
                  : (
                      dashboard.earningsBreakdown?.totalEarnings ?? 0
                    ).toLocaleString()}
              </h3>

              <p className="mt-2 text-gray-500">
                Total Earnings
              </p>

            </div>

          </div>

        </section>

        {/* ================= MAIN GRID ================= */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* ================= ASSIGNED TASKS ================= */}

        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-2xl font-bold text-gray-900">
                Assigned Tasks
              </h2>

              <p className="text-gray-500 mt-2">
                Continue working on your current assignments.
              </p>

            </div>

            <button
  onClick={() => router.push("/master/tasks")}
  className="text-blue-600 font-medium hover:underline"
>
  View All →
</button>

          </div>

          <div className="space-y-5">

            {!loading && dashboard.currentTasks.length === 0 ? (

              <div className="text-center py-14 border border-dashed border-gray-300 rounded-2xl">

                <p className="text-gray-500">
                  No assigned tasks yet.
                </p>

              </div>

            ) : (

              dashboard.currentTasks
  .slice(0, 2)
  .map((task) => (

                <div
                  key={task.id}
                  className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition"
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <h3 className="text-xl font-semibold text-gray-900">
                        {task.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                       Budget ₹{Number(task.budget ?? 0).toLocaleString()}
                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        task.status === "IN_PROGRESS"
                          ? "bg-blue-100 text-blue-700"
                          : task.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {task.status === "IN_PROGRESS"
                        ? "In Progress"
                        : task.status === "COMPLETED"
                        ? "Completed"
                        : "Pending"}
                    </span>

                  </div>

                  <div className="mt-6">

                    <div className="flex justify-between text-sm mb-2">

                      <span className="text-gray-500">
                        Progress
                      </span>

                      <span className="font-semibold text-gray-700">
                        {task.progress}%
                      </span>

                    </div>

                    <div className="h-2 rounded-full bg-gray-200 overflow-hidden">

                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{
                          width: `${task.progress}%`,
                        }}
                      />

                    </div>

                  </div>

                  <div className="flex justify-end mt-6">

                    <button className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">

                      Continue Task →

                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

        {/* ================= EARNINGS ================= */}

        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">

          <h2 className="text-2xl font-bold text-gray-900">
            Earnings Overview
          </h2>

          <p className="text-gray-500 mt-2">
            Your current payment summary.
          </p>

          <div className="mt-8 space-y-6">

            <div className="rounded-2xl bg-green-50 p-6 border border-green-100">

              <p className="text-sm text-gray-500">
                Total Earnings
              </p>

              <h3 className="text-4xl font-bold text-green-700 mt-2">
                ₹
                {(dashboard.earningsBreakdown?.totalEarnings ?? 0).toLocaleString()}
              </h3>

            </div>

            <div className="rounded-2xl bg-yellow-50 p-6 border border-yellow-100">

              <p className="text-sm text-gray-500">
                Pending Payments
              </p>

              <h3 className="text-3xl font-bold text-yellow-700 mt-2">
                ₹
                {(dashboard.earningsBreakdown?.pendingEarnings ?? 0).toLocaleString()}
              </h3>

            </div>

            <div className="rounded-2xl bg-blue-50 p-6 border border-blue-100">

              <p className="text-sm text-gray-500">
                Released Payments
              </p>

              <h3 className="text-3xl font-bold text-blue-700 mt-2">
                ₹
                {(dashboard.earningsBreakdown?.releasedEarnings ?? 0).toLocaleString()}
              </h3>

            </div>

          </div>

        </div>

        </div>

        {/* ================= BOTTOM GRID ================= */}
              {/* ================= AI + PERFORMANCE ================= */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* AI Career Insights */}

          <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-xl">

            <p className="uppercase tracking-[5px] text-sm opacity-80">
              AI Assistant
            </p>

            <h2 className="text-3xl font-bold mt-3">
              Career Growth Insights
            </h2>

            <p className="mt-4 text-blue-100 leading-7">
              Personalized recommendations generated from your performance,
              completed projects and skills.
            </p>

            <div className="mt-8 space-y-4">

              {careerData?.suggestions &&
              careerData.suggestions.length > 0 ? (
                careerData.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur rounded-xl px-4 py-3"
                  >
                    ✓ {suggestion}
                  </div>
                ))
              ) : (
                <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3">
                  No AI recommendations available yet. Complete more tasks to receive personalized suggestions.
                </div>
              )}

            </div>

            <button className="mt-8 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition">
              View AI Roadmap →
            </button>

          </div>

          {/* Performance */}

          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">

            <h2 className="text-3xl font-bold text-gray-900">
              Performance
            </h2>

            <p className="text-gray-500 mt-2">
              Your freelancer performance metrics.
            </p>

            <div className="mt-8 space-y-6">

              <div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Success Rate
                  </span>

                  <span className="font-bold text-green-600">
                    {dashboard.successRate}%
                  </span>

                </div>

                <div className="h-2 rounded-full bg-gray-200 mt-2 overflow-hidden">

                  <div
                    className="h-full bg-green-500"
                    style={{
                      width: `${dashboard.successRate}%`,
                    }}
                  />

                </div>

              </div>

              <div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Client Rating
                  </span>

                  <span className="font-bold text-blue-600">
                    ⭐ {dashboard.averageRating}
                  </span>

                </div>

                <div className="h-2 rounded-full bg-gray-200 mt-2 overflow-hidden">

                  <div
                    className="h-full bg-blue-500"
                    style={{
                      width: `${dashboard.averageRating * 20}%`,
                    }}
                  />

                </div>

              </div>

              <div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    On-Time Delivery
                  </span>

                  <span className="font-bold text-purple-600">
                    {dashboard.onTimeDelivery}%
                  </span>

                </div>

                <div className="h-2 rounded-full bg-gray-200 mt-2 overflow-hidden">

                  <div
                    className="h-full bg-purple-500"
                    style={{
                      width: `${dashboard.onTimeDelivery}%`,
                    }}
                  />

                </div>

              </div>

            </div>

            <div className="mt-10 rounded-2xl bg-gray-50 p-6 border">

              <h3 className="font-bold text-lg text-gray-900">
                AI Recommendation
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
                {dashboard.successRate >= 80 && dashboard.averageRating >= 4.5
                  ? "You're performing well. Completing pending tasks on time and maintaining a client rating above 4.8 will significantly improve your chances of receiving premium projects."
                  : dashboard.successRate > 0
                  ? `Your success rate is ${dashboard.successRate}%. Focus on completing tasks on time to improve your performance metrics and attract more clients.`
                  : "Start completing tasks to receive personalized AI recommendations."}
              </p>

            </div>

          </div>

        </div>

      </div>

    </DesktopLayout>
  );
}
