"use client";

import { useState } from "react";
import {
  GitBranch,
  Globe,
  FileText,
  Upload,
  Save,
  Send,
  CheckCircle2,
  FolderGit2,
  Image,
  Video,
  Code2,
  Bot,
} from "lucide-react";

import {
  SubmissionTask,
  SubmissionDetail,
  SubmissionFormData,
} from "@/types/submission";

interface DigitalSubmissionProps {
  task: SubmissionTask;
  initialSubmission?: SubmissionDetail | null;
  onSaveDraft: (data: SubmissionFormData) => void;
  onSubmit: (data: SubmissionFormData) => void;
  onUploadFiles: (files: File[]) => Promise<string[]>;
  submitting?: boolean;
  savingDraft?: boolean;
}

export default function DigitalSubmission({
  task,
  initialSubmission,
  onSaveDraft,
  onSubmit,
  onUploadFiles,
  submitting,
  savingDraft,
}: DigitalSubmissionProps) {
  const [formData, setFormData] = useState<SubmissionFormData>({
    github: "",
    demoUrl: "",
    description: initialSubmission?.description ?? "",
    workSummary: initialSubmission?.description ?? "",
    technologies: "",
    aiTools: "",
    completedFeatures: "",
    notes: "",
    fileUrls: initialSubmission?.reportFile
      ? [initialSubmission.reportFile]
      : [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileUpload = async (
    files: FileList | null,
  ) => {
    if (!files || files.length === 0) return;

    const urls = await onUploadFiles(Array.from(files));

    setFormData((prev) => ({
      ...prev,
      fileUrls: [...(prev.fileUrls ?? []), ...urls],
    }));
  };

  return (
    <div className="space-y-8">

      {/* ================= PROJECT DETAILS ================= */}

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
            <FolderGit2 className="h-7 w-7 text-blue-600" />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              Project Information
            </h2>

            <p className="text-slate-500">
              Review your assigned project before submission.
            </p>

          </div>

        </div>

        <div className="grid gap-8 md:grid-cols-2">

          <div>

            <label className="mb-3 block font-semibold text-slate-700">
              Project
            </label>

            <input
              readOnly
              value={task.title}
              className="h-14 w-full rounded-2xl border bg-slate-50 px-5"
            />

          </div>

          <div>

            <label className="mb-3 block font-semibold text-slate-700">
              Provider
            </label>

            <input
              readOnly
              value={task.provider}
              className="h-14 w-full rounded-2xl border bg-slate-50 px-5"
            />

          </div>

          

        </div>

      </section>

      {/* ================= GITHUB & DEPLOYMENT ================= */}

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
            <GitBranch className="h-7 w-7 text-indigo-600" />
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Repository & Deployment
            </h2>

            <p className="text-slate-500">
              Add your source code repository and live project URL.
            </p>

          </div>

        </div>

        <div className="grid gap-8 md:grid-cols-2">

          <div>

            <label className="mb-3 flex items-center gap-2 font-semibold">
              <GitBranch size={18} />
              GitHub Repository
            </label>

            <input
              type="url"
              name="github"
              value={formData.github ?? ""}
              onChange={handleChange}
              placeholder="https://github.com/username/project"
              className="h-14 w-full rounded-2xl border border-slate-300 px-5 focus:border-blue-500 focus:outline-none"
            />

          </div>

          <div>

            <label className="mb-3 flex items-center gap-2 font-semibold">
              <Globe size={18} />
              Live Demo URL
            </label>

            <input
              type="url"
              name="demoUrl"
              value={formData.demoUrl ?? ""}
              onChange={handleChange}
              placeholder="https://your-project.vercel.app"
              className="h-14 w-full rounded-2xl border border-slate-300 px-5 focus:border-blue-500 focus:outline-none"
            />

          </div>

        </div>

      </section>

            {/* ================= WORK DESCRIPTION ================= */}

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
            <FileText className="h-7 w-7 text-emerald-600" />
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Work Summary
            </h2>

            <p className="text-slate-500">
              Explain the work completed for this project.
            </p>

          </div>

        </div>

        <div className="space-y-6">

          <div>

            <label className="mb-3 block font-semibold">
              Project Description
            </label>

            <textarea
              rows={6}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the completed work..."
              className="w-full rounded-2xl border border-slate-300 p-5 focus:border-blue-500 focus:outline-none"
            />

          </div>

          <div>

            <label className="mb-3 block font-semibold">
              Work Summary
            </label>

            <textarea
              rows={5}
              name="workSummary"
              value={formData.workSummary}
              onChange={handleChange}
              placeholder="Provide a summary of your implementation..."
              className="w-full rounded-2xl border border-slate-300 p-5 focus:border-blue-500 focus:outline-none"
            />

          </div>

        </div>

      </section>

      {/* ================= TECHNOLOGIES ================= */}

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100">
            <Code2 className="h-7 w-7 text-purple-600" />
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Technologies Used
            </h2>

            <p className="text-slate-500">
              Mention frameworks, libraries and tools used.
            </p>

          </div>

        </div>

        <textarea
          rows={5}
          name="technologies"
          value={formData.technologies}
          onChange={handleChange}
          placeholder="React, Next.js, Tailwind CSS, NestJS, PostgreSQL..."
          className="w-full rounded-2xl border border-slate-300 p-5 focus:border-blue-500 focus:outline-none"
        />

      </section>

      {/* ================= AI TOOLS ================= */}

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100">
            <Bot className="h-7 w-7 text-cyan-600" />
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              AI Tools Used
            </h2>

            <p className="text-slate-500">
              Mention AI tools used during development.
            </p>

          </div>

        </div>

        <textarea
          rows={4}
          name="aiTools"
          value={formData.aiTools}
          onChange={handleChange}
          placeholder="ChatGPT, GitHub Copilot, Gemini..."
          className="w-full rounded-2xl border border-slate-300 p-5 focus:border-blue-500 focus:outline-none"
        />

      </section>

            {/* ================= COMPLETED FEATURES ================= */}

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
            <CheckCircle2 className="h-7 w-7 text-green-600" />
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Completed Features
            </h2>

            <p className="text-slate-500">
              Mention every completed feature delivered in this submission.
            </p>

          </div>

        </div>

        <textarea
          rows={6}
          name="completedFeatures"
          value={formData.completedFeatures}
          onChange={handleChange}
          placeholder="• Authentication&#10;• Dashboard&#10;• Reports&#10;• Notifications&#10;• Chat System"
          className="w-full rounded-2xl border border-slate-300 p-5 focus:border-blue-500 focus:outline-none"
        />

      </section>

      {/* ================= NOTES ================= */}

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="mb-8">

          <h2 className="text-2xl font-bold">
            Additional Notes
          </h2>

          <p className="text-slate-500">
            Mention deployment details, credentials or any important information.
          </p>

        </div>

        <textarea
          rows={5}
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional comments..."
          className="w-full rounded-2xl border border-slate-300 p-5 focus:border-blue-500 focus:outline-none"
        />

      </section>

      {/* ================= FILE UPLOAD ================= */}

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
            <Upload className="h-7 w-7 text-orange-600" />
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Upload Deliverables
            </h2>

            <p className="text-slate-500">
              Upload screenshots, reports, source code archives or supporting files.
            </p>

          </div>

        </div>

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 p-10 transition hover:border-blue-500 hover:bg-blue-50">

          <Upload className="mb-4 h-12 w-12 text-blue-600" />

          <h3 className="text-lg font-semibold">
            Click to Upload Files
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            PDF, ZIP, Images, Videos or Documents
          </p>

          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files)}
          />

        </label>

        {formData.fileUrls &&
          formData.fileUrls.length > 0 && (

            <div className="mt-8 grid gap-4 md:grid-cols-2">

              {formData.fileUrls.map((file, index) => (

                <div
                  key={index}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4"
                >

                  {file.match(/\.(png|jpg|jpeg|gif|webp)$/i) ? (
                    <Image className="h-8 w-8 text-green-600" />
                  ) : file.match(/\.(mp4|avi|mov)$/i) ? (
                    <Video className="h-8 w-8 text-purple-600" />
                  ) : (
                    <FileText className="h-8 w-8 text-blue-600" />
                  )}

                  <div className="flex-1 overflow-hidden">

                    <p className="truncate text-sm font-medium">
                      {file}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

      </section>

            {/* ================= ACTION BUTTONS ================= */}

      <section className="sticky bottom-0 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">

        <div className="flex flex-col justify-end gap-4 sm:flex-row">

          <button
            type="button"
            onClick={() => onSaveDraft(formData)}
            disabled={savingDraft}
            className="flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-8 py-4 font-semibold transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={20} />
            {savingDraft ? "Saving Draft..." : "Save Draft"}
          </button>

          <button
            type="button"
            onClick={() => onSubmit(formData)}
            disabled={submitting}
            className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send size={20} />
            {submitting ? "Submitting..." : "Submit Work"}
          </button>

        </div>

      </section>

    </div>
  );
}