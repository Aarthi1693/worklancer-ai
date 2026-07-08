"use client";

import { useEffect, useState } from "react";
import masterService from "@/services/master.service";
import { useRouter } from "next/navigation";
import DesktopLayout from "@/components/layout/desktop-layout";
import applicationService from "@/services/application.service";
import authService from "@/services/auth.service";

interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  requiredSkills: string;
  status: string;
}

export default function AvailableTasksPage() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetchProjects();
}, []);

const fetchProjects = async () => {
  try {
    const data = await masterService.getProjects();
    setProjects(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const handleApply = async (projectId: string) => {
  try {
    const user = authService.getUser();

    console.log("Current User:", user);
    console.log("User ID:", user?.id);
    console.log("Project ID:", projectId);

    const payload = {
      userId: user?.id,
      projectId,
    };

    console.log("Payload:", payload);

    await applicationService.apply(payload);

    setShowSuccess(true);

    setTimeout(() => {
      router.push("/master/tasks");
    }, 2000);
  } catch (error: any) {
    console.log("Backend Error:", error.response?.data);
    console.log(error);

    alert("Failed to apply for project.");
  }
};

  return (
    <DesktopLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Available Tasks
          </h1>

          <p className="text-slate-400 mt-2">
            Discover tasks that match your skills and interests.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6">

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400">Total Opportunities</p>
            <h2 className="text-3xl font-bold text-white mt-2">48</h2>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400">Digital Tasks</p>
            <h2 className="text-3xl font-bold text-blue-400 mt-2">34</h2>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400">On-Field Tasks</p>
            <h2 className="text-3xl font-bold text-purple-400 mt-2">14</h2>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400">AI Match Score</p>
            <h2 className="text-3xl font-bold text-green-400 mt-2">94%</h2>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

  {loading ? (

    <p className="text-slate-400">
      Loading projects...
    </p>

  ) : (

    projects.map((project) => (

      <div
        key={project.id}
        className="
          rounded-3xl
          border
          border-white/[0.08]
          bg-white/[0.03]
          backdrop-blur-xl
          shadow-[0_0_40px_rgba(59,130,246,0.08)]
          p-6
        "
      >

        <h2 className="text-xl font-bold">
          {project.title}
        </h2>

        <p className="text-slate-400 mt-2">
          {project.requiredSkills}
        </p>

        <p className="text-slate-500 mt-3 line-clamp-2">
          {project.description}
        </p>

        <p className="text-green-400 mt-5 text-xl font-semibold">
          ₹{project.budget.toLocaleString()}
        </p>

        <div className="flex justify-between items-center mt-5">

          <span
            className={`
              px-3
              py-1
              rounded-full
              text-xs
              ${
                project.status === "OPEN"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-blue-500/20 text-blue-400"
              }
            `}
          >
            {project.status}
          </span>

          <button
            onClick={() => handleApply(project.id)}
            className="
              px-5
              py-2
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              hover:from-blue-500
              hover:to-purple-500
            "
          >
            Apply
          </button>

        </div>

      </div>

    ))

  )}

</div>

        {/* On-Field Opportunities */}

<div>

  <h2 className="text-2xl font-bold text-white">
    On-Field Opportunities
  </h2>

  <div className="grid md:grid-cols-2 gap-6 mt-6">

    <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">

      <h2 className="text-xl font-bold">
        Deliver Laptop
      </h2>

      <p className="text-slate-400 mt-2">
        Electronic City → Whitefield
      </p>

      <div className="flex justify-between mt-5">

        <div>
          <p className="text-slate-500 text-sm">
            Reward
          </p>

          <p className="text-green-400 font-semibold">
            ₹350
          </p>
        </div>

        <div>
          <p className="text-slate-500 text-sm">
            Distance
          </p>

          <p className="text-white">
            12 KM
          </p>
        </div>

      </div>

      <button
        onClick={handleApply}
        className="
          mt-6
          w-full
          py-3
          rounded-xl
          bg-purple-600
          hover:bg-purple-700
        "
      >
        Accept Delivery
      </button>

    </div>

    <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">

      <h2 className="text-xl font-bold">
        Collect Documents
      </h2>

      <p className="text-slate-400 mt-2">
        Koramangala → MG Road
      </p>

      <div className="flex justify-between mt-5">

        <div>
          <p className="text-slate-500 text-sm">
            Reward
          </p>

          <p className="text-green-400 font-semibold">
            ₹250
          </p>
        </div>

        <div>
          <p className="text-slate-500 text-sm">
            Distance
          </p>

          <p className="text-white">
            8 KM
          </p>
        </div>

      </div>

      <button
        onClick={handleApply}
        className="
          mt-6
          w-full
          py-3
          rounded-xl
          bg-purple-600
          hover:bg-purple-700
        "
      >
        Accept Delivery
      </button>

    </div>

  </div>

</div>

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

        {/* AI Recommendations */}

<div
  className="
    rounded-3xl
    border
    border-white/[0.08]
    bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
    p-8
  "
>
  <h2 className="text-2xl font-bold text-white mb-6">
    🤖 AI Recommended For You
  </h2>

  <div className="grid md:grid-cols-4 gap-6">

    <div className="rounded-2xl bg-slate-950 border border-white/[0.08] p-5">
      <p className="text-slate-400 text-sm">
        Top Skill Match
      </p>

      <h3 className="text-xl font-bold text-blue-400 mt-2">
        AI Dashboard
      </h3>

      <p className="text-slate-500 mt-2">
        96% Match
      </p>
    </div>

    <div className="rounded-2xl bg-slate-950 border border-white/[0.08] p-5">
      <p className="text-slate-400 text-sm">
        Highest Paying
      </p>

      <h3 className="text-xl font-bold text-green-400 mt-2">
        ₹25,000
      </h3>

      <p className="text-slate-500 mt-2">
        AI Dashboard Development
      </p>
    </div>

    <div className="rounded-2xl bg-slate-950 border border-white/[0.08] p-5">
      <p className="text-slate-400 text-sm">
        Nearest Field Task
      </p>

      <h3 className="text-xl font-bold text-purple-400 mt-2">
        8 KM
      </h3>

      <p className="text-slate-500 mt-2">
        Document Collection
      </p>
    </div>

    <div className="rounded-2xl bg-slate-950 border border-white/[0.08] p-5">
      <p className="text-slate-400 text-sm">
        Monthly Potential
      </p>

      <h3 className="text-xl font-bold text-yellow-400 mt-2">
        ₹55,000+
      </h3>

      <p className="text-slate-500 mt-2">
        Based on AI Forecast
      </p>
    </div>

  </div>
</div>

      </div>
    </DesktopLayout>
  );
}