"use client";

import { useEffect, useState } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";
import providerService from "@/services/provider.service";
import { useRouter } from "next/navigation";
import chatService from "@/services/chat.service";
import authService from "@/services/auth.service";


interface Applicant {
  id: string;
  status: string;
  matchScore: number;

  user: {
    id: string;
    name: string;
    email: string;
    skills: string | null;
    experience: number | null;
    rating: number;
  };

  project: {
    id: string;
    title: string;
    budget: number;
    requiredSkills: string;
  };
}

export default function ApplicantsPage() {
  const router = useRouter();

  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await providerService.getProjects();

      setProjects(data);

      if (data.length > 0) {
        setSelectedProject(data[0].id);
        loadApplicants(data[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadApplicants = async (projectId: string) => {
    try {
      setLoading(true);

      const data =
        await providerService.getApplicants(projectId);

      setApplicants(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const accept = async (id: string) => {
    await providerService.acceptApplicant(id);

    loadApplicants(selectedProject);
  };

  const reject = async (id: string) => {
    await providerService.rejectApplicant(id);

    loadApplicants(selectedProject);
  };

  const startChat = async (applicant: Applicant) => {
  try {
    const user = authService.getUser();

    if (!user?.id) {
      console.error(
        "startChat: cannot start conversation, logged-in provider id is missing"
      );
      return;
    }

    const projectId = applicant.project.id;
    const providerId = user.id;
    const masterId = applicant.user.id;

    console.log("createConversation payload:", {
      projectId,
      providerId,
      masterId,
    });

    if (!projectId || !providerId || !masterId) {
      console.error(
        "startChat: refusing to call API with undefined required field",
        { projectId, providerId, masterId }
      );
      return;
    }

    await chatService.createConversation({
      projectId,
      providerId,
      masterId,
    });

    router.push("/provider/chat");
  } catch (error) {
    console.log(error);
  }
};

  return (
    <DesktopLayout>
      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Project Applicants
          </h1>

          <p className="text-slate-400 mt-2">
            Review AI ranked applicants and hire the best candidate.
          </p>

        </div>

        <select
          value={selectedProject}
          onChange={(e) => {
            setSelectedProject(e.target.value);
            loadApplicants(e.target.value);
          }}
          className="
            w-full
            p-4
            rounded-xl
            bg-slate-900
            border
            border-white/10
          "
        >

          {projects.map((project) => (

            <option
              key={project.id}
              value={project.id}
            >
              {project.title}
            </option>

          ))}

        </select>

        <div className="grid gap-6"></div>
        {loading ? (

  <div className="text-center py-12 text-slate-400">
    Loading applicants...
  </div>

) : applicants.length === 0 ? (

  <div className="text-center py-12 text-slate-400">
    No applicants found for this project.
  </div>

) : (

  applicants.map((applicant) => (

    <div
      key={applicant.id}
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

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-2xl font-bold text-white">
            {applicant.user.name}
          </h2>

          <p className="text-slate-400 mt-2">
            {applicant.user.email}
          </p>

        </div>

        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            applicant.status === "PENDING"
              ? "bg-yellow-500/20 text-yellow-400"
              : applicant.status === "ACCEPTED"
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {applicant.status}
        </span>

      </div>

      <div className="grid md:grid-cols-4 gap-6 mt-8">

        <div>

          <p className="text-slate-500 text-sm">
            AI Match
          </p>

          <h3 className="text-cyan-400 text-xl font-bold mt-2">
            {Math.round(applicant.matchScore)}%
          </h3>

        </div>

        <div>

          <p className="text-slate-500 text-sm">
            Rating
          </p>

          <h3 className="text-green-400 text-xl font-bold mt-2">
            ⭐ {applicant.user.rating}
          </h3>

        </div>

        <div>

          <p className="text-slate-500 text-sm">
            Experience
          </p>

          <h3 className="text-purple-400 text-xl font-bold mt-2">
            {applicant.user.experience ?? 0} yrs
          </h3>

        </div>

        <div>

          <p className="text-slate-500 text-sm">
            Project Budget
          </p>

          <h3 className="text-yellow-400 text-xl font-bold mt-2">
            ₹{(applicant.project?.budget ?? 0).toLocaleString()}
          </h3>

        </div>

      </div>

      <div className="mt-6">

        <p className="text-slate-500 mb-2">
          Skills
        </p>

        <div className="rounded-xl bg-slate-900 p-4">
          {applicant.user.skills || "No skills added"}
        </div>

      </div>

      <div className="flex gap-4 mt-8">

  {applicant.status === "PENDING" && (
    <>
      <button
        onClick={() => accept(applicant.id)}
        className="
          flex-1
          py-3
          rounded-xl
          bg-green-600
          hover:bg-green-500
        "
      >
        ✅ Accept
      </button>

      <button
        onClick={() => reject(applicant.id)}
        className="
          flex-1
          py-3
          rounded-xl
          bg-red-600
          hover:bg-red-500
        "
      >
        ❌ Reject
      </button>
    </>
  )}

  {applicant.status === "ACCEPTED" && (
    <button
      onClick={() => startChat(applicant)}
      className="
        flex-1
        py-3
        rounded-xl
        bg-gradient-to-r
        from-blue-600
        to-purple-600
        hover:from-blue-500
        hover:to-purple-500
      "
    >
      💬 Open Chat
    </button>
  )}

</div>

    </div>

  ))

)}
        </div>

        {/* Summary Card */}

        <div
          className="
            rounded-3xl
            border
            border-white/[0.08]
            bg-white/[0.03]
            backdrop-blur-xl
            shadow-[0_0_40px_rgba(59,130,246,0.08)]
            p-8
          "
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            📊 Hiring Summary
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div>
              <p className="text-slate-400 text-sm">
                Total Applicants
              </p>

              <h3 className="text-3xl font-bold text-white mt-2">
                {applicants.length}
              </h3>
            </div>

            <div>
              <p className="text-slate-400 text-sm">
                Accepted
              </p>

              <h3 className="text-3xl font-bold text-green-400 mt-2">
                {
                  applicants.filter(
                    (a) => a.status === "ACCEPTED"
                  ).length
                }
              </h3>
            </div>

            <div>
              <p className="text-slate-400 text-sm">
                Pending
              </p>

              <h3 className="text-3xl font-bold text-yellow-400 mt-2">
                {
                  applicants.filter(
                    (a) => a.status === "PENDING"
                  ).length
                }
              </h3>
            </div>

            <div>
              <p className="text-slate-400 text-sm">
                Highest AI Match
              </p>

              <h3 className="text-3xl font-bold text-cyan-400 mt-2">
                {applicants.length > 0
                  ? Math.max(
                      ...applicants.map((a) =>
                        Math.round(a.matchScore)
                      )
                    )
                  : 0}
                %
              </h3>
            </div>

          </div>

        </div>
        
    </DesktopLayout>
  );
}
