"use client";

import { useEffect, useState } from "react";
import { X, Laptop, MapPin } from "lucide-react";
import DigitalSubmission from "./DigitalSubmission";
import OnFieldSubmission from "./OnFieldSubmission";
import { useToast } from "@/components/ui/toast";
import { submissionService } from "@/services/submission.service";
import {
  emitSubmissionCreated,
  emitSubmissionUpdated,
} from "@/services/socket.service";
import {
  SubmissionTask,
  SubmissionDetail,
  SubmissionFormData,
} from "@/types/submission";

interface SubmitWorkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: SubmissionTask | null;
  onUpdated: (updated?: {
    submissionId?: string;
    applicationId: string;
    status?: string;
  }) => void;
}

export default function SubmitWorkModal({
  open,
  onOpenChange,
  task,
  onUpdated,
}: SubmitWorkModalProps) {
  const { addToast } = useToast();
  const [existingSubmission, setExistingSubmission] =
    useState<SubmissionDetail | null>(null);
  const [loadingSubmission, setLoadingSubmission] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!task) {
      setExistingSubmission(null);
      return;
    }

    if (task.submissionId) {
      setLoadingSubmission(true);
      submissionService
        .getOne(task.submissionId)
        .then((data: SubmissionDetail) => setExistingSubmission(data))
        .catch((error) => {
          console.error(error);
          addToast("Failed to load submission details.", "error");
        })
        .finally(() => setLoadingSubmission(false));
    } else {
      setExistingSubmission(null);
    }
  }, [task, addToast]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const payloadFor = (data: SubmissionFormData) => ({
    description: (data.description ?? data.workSummary) || "",
    githubLink: data.github,
    deploymentLink: data.demoUrl || data.driveLink,
    reportFile: data.fileUrls?.[0],
  });

  const handleSaveDraft = async (data: SubmissionFormData) => {
    if (!task) return;

    setSavingDraft(true);
    try {
      if (task.submissionId) {
        await submissionService.updateSubmission(task.submissionId, {
          ...payloadFor(data),
        });
      } else {
        localStorage.setItem(
          `draft-${task.applicationId}`,
          JSON.stringify(data),
        );
      }
      addToast("Draft saved successfully.", "success");
    } catch (error) {
      console.error(error);
      addToast("Failed to save draft.", "error");
    } finally {
      setSavingDraft(false);
    }
  };

  const handleSubmit = async (data: SubmissionFormData) => {
    if (!task) return;

    setSubmitting(true);
    try {
      if (task.submissionId) {
        await submissionService.updateSubmission(task.submissionId, {
          ...payloadFor(data),
          status: "PENDING_REVIEW",
        });
        addToast("Work submitted successfully!", "success");
        onUpdated({
          submissionId: task.submissionId,
          applicationId: task.applicationId,
          status: "PENDING_REVIEW",
        });
        emitSubmissionUpdated({
          submissionId: task.submissionId,
          applicationId: task.applicationId,
          status: "PENDING_REVIEW",
        });
        onOpenChange(false);
      } else {
        const created = await submissionService.submit({
          applicationId: task.applicationId,
          githubLink: data.github ?? "",
          deploymentLink: data.demoUrl || data.driveLink,
          description: (data.description ?? data.workSummary) || "",
        });
        const submissionId =
          created?.id ?? created?.submissionId ?? task.applicationId;
        addToast("Work submitted successfully!", "success");
        onUpdated({
          submissionId,
          applicationId: task.applicationId,
          status: "PENDING_REVIEW",
        });
        emitSubmissionCreated({
          submissionId,
          applicationId: task.applicationId,
          status: "PENDING_REVIEW",
        });
        onOpenChange(false);
      }
    } catch (error) {
      console.error(error);
      addToast("Failed to submit work.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUploadFiles = async (files: File[]) => {
    try {
      return await submissionService.uploadFiles(files);
    } catch (error) {
      console.error(error);
      addToast("Failed to upload file.", "error");
      return [];
    }
  };

  if (!open || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6">

      <div className="relative flex h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Close */}

        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-6 top-6 rounded-lg p-2 hover:bg-slate-100"
        >
          <X size={22} />
        </button>

        {/* Header */}

        <div className="border-b bg-white px-10 py-8">

          <div className="flex items-start justify-between">

            <div>

              <h1 className="text-4xl font-bold text-slate-900">
                Submit Work
              </h1>

              <p className="mt-2 text-lg text-slate-500">
                Upload your completed project deliverables.
              </p>

            </div>

            <div
              className={`flex items-center gap-3 rounded-full px-6 py-3 text-base font-semibold ${
                task.taskType === "DIGITAL"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {task.taskType === "DIGITAL" ? (
                <>
                  <Laptop size={20} />
                  Digital Task
                </>
              ) : (
                <>
                  <MapPin size={20} />
                  On-Field Task
                </>
              )}
            </div>

          </div>

        </div>

        {/* Project Summary */}

        <div className="border-b bg-slate-50 px-10 py-8">

          <div className="grid grid-cols-3 gap-10">

            <div>
              <p className="text-sm font-medium uppercase text-slate-500">
                Project
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                {task.title}
              </h2>
            </div>

            <div>
              <p className="text-sm font-medium uppercase text-slate-500">
                Provider
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                {task.provider}
              </h2>
            </div>

            

            <div>
              <p className="text-sm font-medium uppercase text-slate-500">
                Status
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                {task.status}
              </h2>
            </div>

          </div>

          {loadingSubmission && (
            <div className="mt-4 text-sm text-slate-500">
              Loading submission details...
            </div>
          )}

        </div>

        {/* Scroll Area */}

        <div className="flex-1 overflow-y-auto px-10 py-8">

          {task.taskType === "DIGITAL" ? (
            <DigitalSubmission
              key={existingSubmission?.id ?? "new"}
              task={task}
              initialSubmission={existingSubmission}
              onSaveDraft={handleSaveDraft}
              onSubmit={handleSubmit}
              onUploadFiles={handleUploadFiles}
              submitting={submitting}
              savingDraft={savingDraft}
            />
          ) : (
            <OnFieldSubmission
              key={existingSubmission?.id ?? "new"}
              task={task}
              initialSubmission={existingSubmission}
              onSaveDraft={handleSaveDraft}
              onSubmit={handleSubmit}
              onUploadFiles={handleUploadFiles}
              submitting={submitting}
              savingDraft={savingDraft}
            />
          )}

        </div>

      </div>

    </div>
  );
}
