"use client";

import { useEffect, useState } from "react";

import DesktopLayout from "@/components/layout/desktop-layout";
import submissionService from "@/services/submission.service";

interface Submission {
  id: string;
  githubLink?: string;
  deploymentLink?: string;
  reportFile?: string;
  imageUrls?: string;
  location?: string;
  completionDate?: string;
  description: string;
  status: string;

  application: {
    user: {
      name: string;
      email: string;
    };

    project: {
      title: string;
      taskType: "DIGITAL" | "FIELD";
      budget: number;
    };
  };
}

export default function ProviderSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubmissions();
  }, []);

  async function loadSubmissions() {
  try {
    const data = await submissionService.getProviderSubmissions();

    console.log("Frontend received:", data);

    setSubmissions(data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}
  async function review(
    id: string,
    status: "APPROVED" | "REJECTED"
  ) {
    try {
      await submissionService.review(id, {
        status,
      });

      alert(`Submission ${status}`);

      loadSubmissions();
    } catch (error) {
      console.log(error);

      alert("Failed to update submission.");
    }
  }

  return (
    <DesktopLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Submitted Work
          </h1>

          <p className="text-slate-400 mt-2">
            Review completed work submitted by Masters.
          </p>

        </div>

        {loading ? (

          <div className="text-center py-16">
            Loading submissions...
          </div>

        ) : submissions.length === 0 ? (

          <div className="text-center py-16 text-slate-400">
            No submissions yet.
          </div>
          ) : (

  <div className="space-y-6">

    {submissions.map((submission) => (

      <div
        key={submission.id}
        className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          backdrop-blur-xl
          p-8
          space-y-6
        "
      >
        <div className="flex justify-between items-start">

          <div>

            <h2 className="text-2xl font-bold text-white">
              {submission.application.project.title}
            </h2>

            <p className="text-slate-400 mt-2">
              Submitted by
              <span className="text-cyan-400 ml-2">
                {submission.application.user.name}
              </span>
            </p>

            <p className="text-slate-500">
              {submission.application.user.email}
            </p>

          </div>

          <span
  className={`
    px-4
    py-2
    rounded-full
    text-sm
    font-bold

    ${
      submission.status === "PENDING"
        ? "bg-yellow-500/20 text-yellow-400"
        : submission.status === "APPROVED"
        ? "bg-green-500/20 text-green-400"
        : "bg-red-500/20 text-red-400"
    }
  `}
>
  {submission.status}
</span>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <p className="text-slate-400 mb-2">
              Task Type
            </p>

            <div className="rounded-xl bg-slate-900 p-4">
              {submission.application.project.taskType}
            </div>
          </div>

          <div>
            <p className="text-slate-400 mb-2">
              Budget
            </p>

            <div className="rounded-xl bg-slate-900 p-4">
              ₹{submission.application.project.budget}
            </div>
          </div>

        </div>

        <div>
          <p className="text-slate-400 mb-2">
            Description
          </p>

          <div className="rounded-xl bg-slate-900 p-4 whitespace-pre-wrap">
            {submission.description}
          </div>
        </div>

        <div className="flex gap-4">

  <button
    onClick={() => review(submission.id, "APPROVED")}
    disabled={submission.status !== "PENDING"}
    className={`
      flex-1
      py-3
      rounded-xl
      font-semibold
      transition

      ${
        submission.status === "PENDING"
          ? "bg-green-600 hover:bg-green-500"
          : "bg-green-900 opacity-50 cursor-not-allowed"
      }
    `}
  >
    ✅ Approve
  </button>

  <button
    onClick={() => review(submission.id, "REJECTED")}
    disabled={submission.status !== "PENDING"}
    className={`
      flex-1
      py-3
      rounded-xl
      font-semibold
      transition

      ${
        submission.status === "PENDING"
          ? "bg-red-600 hover:bg-red-500"
          : "bg-red-900 opacity-50 cursor-not-allowed"
      }
    `}
  >
    ❌ Reject
  </button>

  {submission.status === "APPROVED" && (
  <div className="rounded-xl bg-green-500/10 border border-green-500/30 p-4 text-green-400 text-center font-semibold">
    ✅ Project Completed Successfully
  </div>
)}

</div>

      </div>

    ))}

  </div>

)}

      </div>

    </DesktopLayout>
  );
}