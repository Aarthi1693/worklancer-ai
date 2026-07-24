"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import DesktopLayout from "@/components/layout/desktop-layout";
import masterService from "@/services/master.service";
import applicationService from "@/services/application.service";
import authService from "@/services/auth.service";
import kycService from "@/services/kyc.service";
import { ShieldCheck, XCircle } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  requiredSkills: string;
  status: string;
  taskType: "DIGITAL" | "FIELD";
}

export default function AvailableTasksPage() {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [kycVerified, setKycVerified] = useState(false);
  const [loadingKyc, setLoadingKyc] = useState(true);
  const [showKycBlock, setShowKycBlock] = useState(false);

  useEffect(() => {
    fetchProjects();
    checkKyc();
  }, []);

  async function checkKyc() {
    try {
      const data = await kycService.getStatus();
      setKycVerified(data.status === "VERIFIED");
      setShowKycBlock(data.status !== "VERIFIED");
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingKyc(false);
    }
  }

  async function fetchProjects() {
    try {
      setLoading(true);

      const data = await masterService.getProjects();

      setProjects(
        (data || []).filter(
          (project: Project) =>
            project.status === "OPEN"
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

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
        alert("Please login again.");
        return;
      }

      console.log("Logged in user:", user);
      console.log("Applying with userId:", user.id);
      console.log("Project:", projectId); 

      await applicationService.apply({
        userId: user.id,
        projectId,
      });

      setShowSuccess(true);

      setTimeout(() => {
        router.push("/master/tasks");
      }, 1800);

    } catch (error: any) {
      console.error(error);

      if (error?.response?.data?.message?.includes("KYC")) {
        setShowKycBlock(true);
        return;
      }

      alert(
        error?.response?.data?.message ??
          "Failed to apply."
      );
    }
  }

return (
   <DesktopLayout>
    <div className="space-y-8">

  {/* Header */}

  <div>
    <h1 className="text-4xl font-bold text-white">
      Available Tasks
    </h1>

    <p className="text-slate-400 mt-2">
      Discover projects matching your skills.
    </p>
  </div>

  {/* Statistics */}

  <div className="grid grid-cols-4 gap-6">

    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-slate-400">Total Projects</p>
      <h2 className="text-3xl font-bold mt-2">
        {projects.length}
      </h2>
    </div>

    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-slate-400">Digital</p>
      <h2 className="text-3xl font-bold text-cyan-400 mt-2">
        {digitalProjects.length}
      </h2>
    </div>

    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-slate-400">Field</p>
      <h2 className="text-3xl font-bold text-orange-400 mt-2">
        {fieldProjects.length}
      </h2>
    </div>

    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-slate-400">Open Tasks</p>
      <h2 className="text-3xl font-bold text-green-400 mt-2">
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

        <h2 className="text-2xl font-bold text-cyan-400 mb-6">
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
                  border-cyan-500/20
                  bg-white/[0.03]
                  p-6
                "
              >

                <div className="flex justify-between">

                  <h2 className="text-xl font-bold">
                    {project.title}
                  </h2>

                  <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs">
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
                    className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500"
                  >
                    Apply
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

      {/* FIELD */}

      <div className="mt-12">

        <h2 className="text-2xl font-bold text-orange-400 mb-6">
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

                  <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs">
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
                    className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500"
                  >
                    Accept Task
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </>

  )} 

        {showSuccess && (
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
                border-green-500/30
                p-8
                text-center
              "
            >
              <div className="text-6xl mb-4">
                ✅
              </div>

              <h2 className="text-2xl font-bold text-white">
                Application Submitted
              </h2>

              <p className="text-slate-400 mt-3">
                AI has matched your profile with this opportunity.
              </p>

              <p className="text-green-400 mt-4">
                Redirecting to My Tasks...
              </p>
            </div>
          </div>
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