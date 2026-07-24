"use client";

import { useEffect, useState } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";
import { submissionService } from "@/services/submission.service";
import masterService from "@/services/master.service";
import authService from "@/services/auth.service";

interface Task {
  id: string;

  project: {
    id: string;
    title: string;
    description: string;
    taskType: "DIGITAL" | "FIELD";
    budget: number;
  };

  submission?: {
    id: string;
  };
}

interface Submission {
  id: string;
  githubLink?: string;
  deploymentLink?: string;
  description: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;

  application: {
    project: {
      title: string;
      taskType: "DIGITAL" | "FIELD";
      budget: number;
    };
  };
}

export default function SubmitWorkPage() {

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [submittedTasks, setSubmittedTasks] = useState<Submission[]>([]);

  const [selectedTask, setSelectedTask] = useState("");

  const [githubLink, setGithubLink] = useState("");
  const [deploymentLink, setDeploymentLink] = useState("");

  const [workSummary, setWorkSummary] = useState("");
  const [proofLink, setProofLink] = useState("");

  const [description, setDescription] = useState("");

  const currentTask = tasks.find(
    (task) => task.id === selectedTask
  );

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const user = authService.getUser();

      const acceptedTasks =
        await masterService.getMyTasks(user?.id || "");

      const pendingTasks = (acceptedTasks || []).filter(
        (task: Task) => !task.submission
      );

      setTasks(pendingTasks);

      if (pendingTasks.length > 0) {
        setSelectedTask(pendingTasks[0].id);
      }

      const submissions =
        await submissionService.getAll();

      setSubmittedTasks(submissions);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {

    if (!selectedTask) {
      alert("Please select a task.");
      return;
    }

    if (
      currentTask?.project.taskType === "DIGITAL" &&
      (!githubLink || !description)
    ) {
      alert("GitHub Repository is required.");
      return;
    }

    if (
      currentTask?.project.taskType === "FIELD" &&
      (!workSummary || !proofLink || !description)
    ) {
      alert("Please complete all field task details.");
      return;
    }

    try {

      setSubmitting(true);

      await submissionService.submit({

        applicationId: selectedTask,

        githubLink:
          currentTask?.project.taskType === "DIGITAL"
            ? githubLink
            : proofLink,

        deploymentLink:
          currentTask?.project.taskType === "DIGITAL"
            ? deploymentLink
            : "",

        description:
          currentTask?.project.taskType === "DIGITAL"
            ? description
            : `${workSummary}\n\n${description}`,
      });

      alert("✅ Work Submitted Successfully");

      setGithubLink("");
      setDeploymentLink("");
      setWorkSummary("");
      setProofLink("");
      setDescription("");

      loadData();

    } catch (error) {

      console.log(error);
      alert("Submission Failed");

    } finally {

      setSubmitting(false);

    }
  }
    return (
    <DesktopLayout>

      <div className="space-y-10">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-4xl font-bold text-white">
              Submit Completed Work
            </h1>

            <p className="text-slate-400 mt-2">
              Submit completed projects and track their approval status.
            </p>

          </div>

          <div className="rounded-2xl bg-cyan-500/10 border border-cyan-500/20 px-6 py-4">

            <p className="text-slate-400 text-sm">
              Pending Tasks
            </p>

            <h2 className="text-3xl font-bold text-cyan-400">
              {tasks.length}
            </h2>

          </div>

        </div>

        {loading ? (

          <div className="rounded-3xl border border-white/10 p-20 text-center text-slate-400">
            Loading...
          </div>

        ) : (

          <>

            {/* Submit Card */}

            <div
              className="
                rounded-3xl
                border
                border-white/10
                bg-gradient-to-br
                from-slate-900
                to-slate-950
                p-8
                space-y-8
              "
            >

              <div>

                <h2 className="text-2xl font-bold text-white">
                  New Submission
                </h2>

                <p className="text-slate-400 mt-2">
                  Choose an accepted task and upload your completed work.
                </p>

              </div>

              <div>

                <label className="text-white font-medium">
                  Select Task
                </label>

                <select
                  value={selectedTask}
                  onChange={(e) =>
                    setSelectedTask(e.target.value)
                  }
                  className="
                    mt-3
                    w-full
                    rounded-2xl
                    bg-slate-900
                    border
                    border-white/10
                    p-4
                    text-white
                  "
                >

                  {tasks.map((task) => (

                    <option
                      key={task.id}
                      value={task.id}
                    >
                      {task.project.title}
                    </option>

                  ))}

                </select>

              </div>

              {currentTask && (

                <div className="flex items-center justify-between rounded-2xl bg-slate-800/60 p-4">

                  <div>

                    <p className="text-slate-400 text-sm">
                      Task Type
                    </p>

                    <span
                      className={`inline-block mt-2 px-4 py-2 rounded-full text-sm font-semibold ${
                        currentTask?.project?.taskType === "DIGITAL"
                          ? "bg-cyan-500/20 text-cyan-400"
                          : "bg-orange-500/20 text-orange-400"
                      }`}
                    >
                      {currentTask.project.taskType}
                    </span>

                  </div>

                  <div className="text-right">

                    <p className="text-slate-400 text-sm">
                      Budget
                    </p>

                    <h3 className="text-3xl font-bold text-green-400">
                       {currentTask?.project?.budget}
                    </h3>

                  </div>

                </div>

              )}
                            {/* Digital Task */}

              {currentTask?.project.taskType === "DIGITAL" && (

                <>

                  <div className="grid md:grid-cols-2 gap-6">

                    <div>

                      <label className="text-white font-medium">
                        GitHub Repository
                      </label>

                      <input
                        type="text"
                        value={githubLink}
                        onChange={(e) => setGithubLink(e.target.value)}
                        placeholder="https://github.com/username/project"
                        className="mt-2 w-full rounded-xl bg-slate-900 border border-white/10 p-4 text-white"
                      />

                    </div>

                    <div>

                      <label className="text-white font-medium">
                        Deployment URL (Optional)
                      </label>

                      <input
                        type="text"
                        value={deploymentLink}
                        onChange={(e) => setDeploymentLink(e.target.value)}
                        placeholder="https://your-app.vercel.app"
                        className="mt-2 w-full rounded-xl bg-slate-900 border border-white/10 p-4 text-white"
                      />

                    </div>

                  </div>

                </>

              )}

              {/* Field Task */}

              {currentTask?.project.taskType === "FIELD" && (

                <>

                  <div className="grid md:grid-cols-2 gap-6">

                    <div>

                      <label className="text-white font-medium">
                        Work Summary
                      </label>

                      <input
                        type="text"
                        value={workSummary}
                        onChange={(e) => setWorkSummary(e.target.value)}
                        placeholder="Completed field work summary"
                        className="mt-2 w-full rounded-xl bg-slate-900 border border-white/10 p-4 text-white"
                      />

                    </div>

                    <div>

                      <label className="text-white font-medium">
                        Proof Link
                      </label>

                      <input
                        type="text"
                        value={proofLink}
                        onChange={(e) => setProofLink(e.target.value)}
                        placeholder="Google Drive / OneDrive / Image URL"
                        className="mt-2 w-full rounded-xl bg-slate-900 border border-white/10 p-4 text-white"
                      />

                    </div>

                  </div>

                </>

              )}

              {/* Description */}

              <div>

                <label className="text-white font-medium">
                  Work Description
                </label>

                <textarea
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your completed work..."
                  className="
                    mt-2
                    w-full
                    rounded-2xl
                    bg-slate-900
                    border
                    border-white/10
                    p-4
                    text-white
                  "
                />

              </div>

              <div className="flex justify-end">

                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="
                    px-10
                    py-4
                    rounded-2xl
                    bg-gradient-to-r
                    from-cyan-600
                    to-blue-600
                    hover:from-cyan-500
                    hover:to-blue-500
                    transition
                    disabled:opacity-50
                    text-white
                    font-semibold
                  "
                >
                  {submitting
                    ? "Submitting..."
                    : "Submit Work"}
                </button>

              </div>

            </div>
                        {/* ================= Submitted Work ================= */}

            <div className="space-y-6">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-3xl font-bold text-white">
                    My Submitted Work
                  </h2>

                  <p className="text-slate-400 mt-2">
                    Review all the work you've submitted.
                  </p>

                </div>

                <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 px-6 py-4">

                  <p className="text-slate-400 text-sm">
                    Total Submitted
                  </p>

                  <h2 className="text-3xl font-bold text-purple-400">
                    {submittedTasks.length}
                  </h2>

                </div>

              </div>

              {submittedTasks.length === 0 ? (

                <div className="rounded-3xl border border-dashed border-white/10 p-12 text-center">

                  <h3 className="text-2xl font-bold text-white">
                    No Submitted Work
                  </h3>

                  <p className="text-slate-400 mt-3">
                    Your submissions will appear here.
                  </p>

                </div>

              ) : (

                <div className="grid lg:grid-cols-2 gap-6">

                  {submittedTasks.map((submission) => (

                    <div
                      key={submission.id}
                      className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 space-y-5"
                    >

                      <div className="flex justify-between items-start">

                        <div>

                          <h3 className="text-xl font-bold text-white">
                             {submission.application?.project?.title || "Untitled Project"}
                          </h3>

                          <p className="text-slate-500 mt-1">
                            {new Date(
                              submission.createdAt
                            ).toLocaleDateString()}
                          </p>

                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            submission.status === "APPROVED"
                              ? "bg-green-500/20 text-green-400"
                              : submission.status === "REJECTED"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {submission.status}
                        </span>

                      </div>

                      <div className="flex items-center justify-between">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                             submission.application?.project?.taskType ===
                            "DIGITAL"
                              ? "bg-cyan-500/20 text-cyan-400"
                              : "bg-orange-500/20 text-orange-400"
                          }`}
                        >
                           {submission.application?.project?.taskType}
                        </span>

                        <span className="text-green-400 font-bold">
                           ₹{(submission.application?.project?.budget ?? 0).toLocaleString()}
                        </span>

                      </div>

                      {submission.githubLink && (

                        <div>

                          <p className="text-slate-500 text-sm mb-2">
                            GitHub Repository
                          </p>

                          <a
                            href={submission.githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-cyan-400 break-all hover:underline"
                          >
                            {submission.githubLink}
                          </a>

                        </div>

                      )}

                      {submission.deploymentLink && (

                        <div>

                          <p className="text-slate-500 text-sm mb-2">
                            Deployment
                          </p>

                          <a
                            href={submission.deploymentLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-green-400 break-all hover:underline"
                          >
                            {submission.deploymentLink}
                          </a>

                        </div>

                      )}

                      <div>

                        <p className="text-slate-500 text-sm mb-2">
                          Description
                        </p>

                        <div className="rounded-xl bg-slate-800/70 p-4 text-slate-300 whitespace-pre-wrap">
                          {submission.description}
                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </>

        )}

      </div>

    </DesktopLayout>

  );

}