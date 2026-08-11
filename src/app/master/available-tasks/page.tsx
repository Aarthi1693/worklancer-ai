"use client";

import AvailableTasksHero from "@/assets/images/available-tasks-hero.png";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import DesktopLayout from "@/components/layout/desktop-layout";
import masterService from "@/services/master.service";
import applicationService from "@/services/application.service";
import authService from "@/services/auth.service";
import kycService from "@/services/kyc.service";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { ShieldCheck } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  requiredSkills: string;
  status: string;
  taskType: "DIGITAL" | "FIELD";
}

function AvailableTasksContent() {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [kycVerified, setKycVerified] = useState(false);
  const [loadingKyc, setLoadingKyc] = useState(true);
  const [showKycBlock, setShowKycBlock] = useState(false);
  const [applyingProjectId, setApplyingProjectId] = useState<string | null>(null);
  const [appliedProjectIds, setAppliedProjectIds] = useState<string[]>([]);
  const toast = useToast();

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const data = await masterService.getProjects();
        setProjects(
          (data || []).filter(
            (project: Project) => project.status === "OPEN"
          )
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }

      try {
        const kycData = await kycService.getStatus();
        setKycVerified(kycData.status === "VERIFIED");
        setShowKycBlock(kycData.status !== "VERIFIED");
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingKyc(false);
      }

      try {
        const apps = await applicationService.getApplications();
        const projectIds = (apps || [])
          .map((app: { projectId?: string }) => app.projectId)
          .filter((id: string | undefined | null): id is string => id != null);
        setAppliedProjectIds(projectIds);
      } catch (error) {
        console.error(error);
      }
    };

    loadInitialData();
  }, []);

  const digitalProjects = useMemo(
    () =>
      projects.filter(
        (project) => project.taskType === "DIGITAL"
      ),
    [projects]
  );

  const fieldProjects = useMemo(
    () =>
      projects.filter(
        (project) => project.taskType === "FIELD"
      ),
    [projects]
  );

  async function handleApply(projectId: string) {
    try {
      if (!kycVerified) {
        setShowKycBlock(true);
        return;
      }

      const user = authService.getUser();

      if (!user?.id) {
        toast.addToast("Please login again.", "error");
        return;
      }

      setApplyingProjectId(projectId);

      await applicationService.apply({
        userId: user.id,
        projectId,
      });

      setAppliedProjectIds((prev) => [...prev, projectId]);
      toast.addToast("Application submitted successfully!", "success");
    } catch (error) {
      console.error(error);

      const message = error instanceof Error ? error.message : "Failed to apply.";

      if (message.includes("KYC")) {
        setShowKycBlock(true);
        return;
      }

      if (
        message.toLowerCase().includes("already") ||
        message.toLowerCase().includes("duplicate")
      ) {
        setAppliedProjectIds((prev) => [...prev, projectId]);
        toast.addToast("You have already applied for this project.", "warning");
        return;
      }

      toast.addToast(message, "error");
    } finally {
      setApplyingProjectId(null);
    }
  }

   return (
    <DesktopLayout>
     <div className="space-y-8">

{/* ================= HERO ================= */}

<div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm p-8">

  {/* Illustration */}

  <div className="absolute right-2 top-[48%] -translate-y-1/2 hidden lg:block">

    <img
      src={AvailableTasksHero.src}
      alt="Available Tasks"
      className="w-[430px] object-contain scale-110"
    />

  </div>

  <div className="relative z-10 max-w-2xl">

    <span className="inline-flex items-center rounded-full bg-blue-600 text-white px-4 py-1 text-sm font-semibold">

      💼 Available Opportunities

    </span>

    <h1 className="mt-5 text-5xl font-bold text-slate-900">

      Available Tasks

    </h1>

    <p className="mt-5 text-lg leading-8 text-slate-600">

      Discover AI matched{" "}

      <span className="font-semibold text-blue-600">
        Digital
      </span>

      {" "}and{" "}

      <span className="font-semibold text-blue-600">
        On-Field
      </span>

      {" "}projects, apply instantly and grow your freelance career.

    </p>

    <div className="mt-8 flex flex-wrap gap-4">

      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4">

        <p className="text-xs uppercase tracking-wider text-slate-500">
          Open Tasks
        </p>

        <p className="mt-2 text-2xl font-bold text-slate-900">
          {projects.length}
        </p>

      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4">

        <p className="text-xs uppercase tracking-wider text-slate-500">
          Digital
        </p>

        <p className="mt-2 text-2xl font-bold text-blue-600">
          {digitalProjects.length}
        </p>

      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4">

        <p className="text-xs uppercase tracking-wider text-slate-500">
          Field
        </p>

        <p className="mt-2 text-2xl font-bold text-green-600">
          {fieldProjects.length}
        </p>

      </div>

    </div>

  </div>

</div>

{/* ================= SEARCH ================= */}

<div className="flex flex-col gap-4 lg:flex-row">

  <div className="relative flex-1">

    <input
      type="text"
      placeholder="Search projects, skills or keywords..."
      className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-5 pr-5 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />

  </div>

  <button className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-slate-700 shadow-sm transition hover:bg-slate-50">
    Filter
  </button>

  <button className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-slate-700 shadow-sm transition hover:bg-slate-50">
    Sort
  </button>

</div>

{/* ================= KPI ================= */}

<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

    <p className="text-slate-500">
      Total Projects
    </p>

    <h2 className="mt-3 text-4xl font-bold text-slate-900">
      {projects.length}
    </h2>

  </div>

  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

    <p className="text-slate-500">
      Digital
    </p>

    <h2 className="mt-3 text-4xl font-bold text-blue-600">
      {digitalProjects.length}
    </h2>

  </div>

  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

    <p className="text-slate-500">
      Field
    </p>

    <h2 className="mt-3 text-4xl font-bold text-blue-600">
      {fieldProjects.length}
    </h2>

  </div>

  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

    <p className="text-slate-500">
      Open Tasks
    </p>

    <h2 className="mt-3 text-4xl font-bold text-slate-900">
      {projects.length}
    </h2>

  </div>

</div>

  {loading ? (

    <div className="text-center py-20 text-slate-400">
      Loading Projects...
    </div>

  ) : (

    <>
      {/* DIGITAL */}

      <div>

        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          💻 Digital Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {digitalProjects.length === 0 ? (

            <div className="text-slate-400">
              No Digital Projects
            </div>

          ) : (

            digitalProjects.map((project) => (

              <div
                key={project.id}
                className="
                  rounded-3xl
                  border
                  border-slate-200
                  bg-white/[0.03]
                  p-6
                "
              >

                <div className="flex justify-between">

                  <h2 className="text-xl font-bold">
                    {project.title}
                  </h2>

                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                    DIGITAL
                  </span>

                </div>

                <p className="text-slate-400 mt-4 line-clamp-2">
                  {project.description}
                </p>

                <p className="text-slate-500 mt-5">
                  {project.requiredSkills}
                </p>

                <div className="flex justify-between items-center mt-6">

                  <h3 className="text-green-400 text-xl font-bold">
                     ₹{(project.budget ?? 0).toLocaleString()}
                  </h3>

                  <button
                    onClick={() => handleApply(project.id)}
                    disabled={applyingProjectId === project.id || appliedProjectIds.includes(project.id)}
                    className="
px-6
py-3
rounded-xl
bg-blue-600
text-white
font-medium
shadow-md
transition-all
duration-300
hover:bg-blue-700
hover:shadow-lg
disabled:opacity-60
disabled:cursor-not-allowed
"
                  >
                    {applyingProjectId === project.id
                      ? "Applying..."
                      : appliedProjectIds.includes(project.id)
                        ? "Applied"
                        : "Apply"}
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

      {/* FIELD */}

      <div className="mt-12">

        <h2 className="text-2xl font-bold text-blue-700 mb-6">
  📍 Field Projects
</h2>

        <div className="grid md:grid-cols-2 gap-6">

          {fieldProjects.length === 0 ? (

            <div className="text-slate-400">
              No Field Projects
            </div>

          ) : (

            fieldProjects.map((project) => (

              <div
                key={project.id}
                className="
                  rounded-3xl
                  border
                  border-orange-500/20
                  bg-white/[0.03]
                  p-6
                "
              >

                <div className="flex justify-between">

                  <h2 className="text-xl font-bold">
                    {project.title}
                  </h2>

                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                    FIELD
                  </span>

                </div>

                <p className="text-slate-400 mt-4 line-clamp-2">
                  {project.description}
                </p>

                <p className="text-slate-500 mt-5">
                  {project.requiredSkills}
                </p>

                <div className="flex justify-between items-center mt-6">

                  <h3 className="text-green-400 text-xl font-bold">
                     ₹{(project.budget ?? 0).toLocaleString()}
                  </h3>

                  <button
                    onClick={() => handleApply(project.id)}
                    disabled={applyingProjectId === project.id || appliedProjectIds.includes(project.id)}
                   className="
px-6
py-3
rounded-xl
bg-blue-600
text-white
font-medium
shadow-md
transition-all
duration-300
hover:bg-blue-700
hover:shadow-lg
disabled:opacity-60
disabled:cursor-not-allowed
"
                  >
                    {applyingProjectId === project.id
                      ? "Applying..."
                      : appliedProjectIds.includes(project.id)
                        ? "Applied"
                        : "Accept Task"}
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </>

   )} 

     {showKycBlock && (
      <div
        className="
          fixed
          inset-0
          bg-black/60
          backdrop-blur-sm
          flex
          items-center
          justify-center
          z-50
        "
      >
        <div
          className="
            w-[450px]
            rounded-3xl
            bg-slate-950
            border
            border-red-500/30
            p-8
            text-center
          "
        >
          <div className="text-6xl mb-4">
            <ShieldCheck className="w-16 h-16 text-red-400 mx-auto" />
          </div>

          <h2 className="text-2xl font-bold text-white">
            KYC Verification Required
          </h2>

          <p className="text-slate-400 mt-3">
            Complete AI KYC Verification before applying for projects.
          </p>

          <div className="flex gap-4 mt-6 justify-center">
            <button
              onClick={() => router.push("/master/kyc")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:from-green-500 hover:to-emerald-500 transition"
            >
              Verify Now
            </button>
            <button
              onClick={() => setShowKycBlock(false)}
              className="px-6 py-3 rounded-xl border border-white/[0.08] text-white hover:bg-white/10 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}

        </div>
       </DesktopLayout>
   );
}

export default function AvailableTasksPage() {
  return (
    <ToastProvider>
      <AvailableTasksContent />
    </ToastProvider>
  );
}