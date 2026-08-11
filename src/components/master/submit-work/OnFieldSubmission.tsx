"use client";

import { useState } from "react";
import {
  MapPin,
  MapPinned,
  Camera,
  Upload,
  Save,
  Send,
  ClipboardCheck,
  Building2,
  NotebookPen,
  BrainCircuit,
  CheckCircle2,
  ClipboardList,
  Navigation,
} from "lucide-react";

import {
  SubmissionTask,
  SubmissionDetail,
  SubmissionFormData,
} from "@/types/submission";

interface OnFieldSubmissionProps {
  task: SubmissionTask;
  initialSubmission?: SubmissionDetail | null;
  onSaveDraft: (data: SubmissionFormData) => void;
  onSubmit: (data: SubmissionFormData) => void;
  onUploadFiles: (files: File[]) => Promise<string[]>;
  submitting?: boolean;
  savingDraft?: boolean;
}

export default function OnFieldSubmission({
  task,
  initialSubmission,
  onSaveDraft,
  onSubmit,
  onUploadFiles,
  submitting,
  savingDraft,
}: OnFieldSubmissionProps) {
  const [formData, setFormData] = useState<SubmissionFormData>({
    location: "",
    visitDate: "",
    description: initialSubmission?.description ?? "",
    workSummary: initialSubmission?.description ?? "",
    observations: "",
    issues: "",
    notes: "",
    driveLink: "",
    latitude: "",
    longitude: "",
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

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const urls = await onUploadFiles(Array.from(files));

    setFormData((prev) => ({
      ...prev,
      fileUrls: [...(prev.fileUrls ?? []), ...urls],
    }));
  };

  const handleSaveDraft = () => {
    onSaveDraft(formData);
  };

  const handleSubmitClick = () => {
    onSubmit(formData);
  };

  return (
    <div className="space-y-8">

      {/* ================= PROJECT INFORMATION ================= */}

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
            <Building2 className="h-7 w-7 text-emerald-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Project Information
            </h2>

            <p className="text-slate-500">
              Review your assigned field project before submission.
            </p>
          </div>

        </div>

        <div className="grid gap-8 md:grid-cols-2">

          <div>

            <label className="mb-3 block font-semibold">
              Project
            </label>

            <input
              readOnly
              value={task.title}
              className="h-14 w-full rounded-2xl border bg-slate-50 px-5"
            />

          </div>

          <div>

            <label className="mb-3 block font-semibold">
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

      {/* ================= VISIT DETAILS ================= */}

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
            <MapPin className="h-7 w-7 text-blue-600" />
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Visit Details
            </h2>

            <p className="text-slate-500">
              Enter where and when the work was completed.
            </p>

          </div>

        </div>

        <div className="grid gap-8 md:grid-cols-2">

          <div>

            <label className="mb-3 block font-semibold">
              Work Location
            </label>

            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter work location"
              className="h-14 w-full rounded-2xl border border-slate-300 px-5 focus:border-blue-500 focus:outline-none"
            />

          </div>

          <div>

            <label className="mb-3 block font-semibold">
              Visit Date
            </label>

            <input
              type="date"
              name="visitDate"
              value={formData.visitDate}
              onChange={handleChange}
              className="h-14 w-full rounded-2xl border border-slate-300 px-5 focus:border-blue-500 focus:outline-none"
            />

          </div>

        </div>

      </section>

            {/* Visit Details */}

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
            <MapPinned className="h-7 w-7 text-orange-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold">Field Visit Details</h2>
            <p className="text-slate-500">
              Describe the work completed on-site.
            </p>
          </div>

        </div>

        <div className="grid gap-8 md:grid-cols-2">

          <div>

            <label className="mb-3 block font-semibold">
              Location Visited
            </label>

            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Client Office / Site"
              className="h-14 w-full rounded-2xl border border-slate-300 px-5 focus:border-green-500 focus:outline-none"
            />

          </div>

          <div>

            <label className="mb-3 block font-semibold">
              Visit Date
            </label>

            <input
              type="date"
              name="visitDate"
              value={formData.visitDate}
              onChange={handleChange}
              className="h-14 w-full rounded-2xl border border-slate-300 px-5 focus:border-green-500 focus:outline-none"
            />

          </div>

        </div>

      </section>

      {/* Work Summary */}

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
            <ClipboardCheck className="h-7 w-7 text-blue-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Work Summary
            </h2>

            <p className="text-slate-500">
              Explain the work completed during the visit.
            </p>

          </div>

        </div>

        <textarea
          rows={7}
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe completed work..."
          className="w-full rounded-2xl border border-slate-300 p-5 focus:border-green-500 focus:outline-none"
        />

      </section>

            {/* ================= LOCATION & VISIT DETAILS ================= */}

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
            <MapPin className="h-7 w-7 text-green-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Field Visit Information
            </h2>

            <p className="text-slate-500">
              Enter complete field visit details.
            </p>
          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-semibold">
              Visit Date
            </label>

            <input
              type="date"
              name="visitDate"
              value={formData.visitDate}
              onChange={handleChange}
              className="h-14 w-full rounded-2xl border px-5"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              Visit Time
            </label>

            <input
              type="time"
              name="visitTime"
              value={formData.visitTime}
              onChange={handleChange}
              className="h-14 w-full rounded-2xl border px-5"
            />

          </div>

        </div>

        <div className="mt-6">

          <label className="mb-2 block font-semibold">
            Location Address
          </label>

          <textarea
            rows={3}
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter exact field location..."
            className="w-full rounded-2xl border px-5 py-4"
          />

        </div>

      </section>

      {/* ================= FIELD REPORT ================= */}

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
            <ClipboardList className="h-7 w-7 text-blue-600" />
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Work Report
            </h2>

            <p className="text-slate-500">
              Describe the completed field activity.
            </p>

          </div>

        </div>

        <textarea
          rows={8}
          name="workSummary"
          value={formData.workSummary}
          onChange={handleChange}
          placeholder="Explain the completed field work..."
          className="w-full rounded-2xl border px-5 py-4"
        />

      </section>

            {/* ================= PHOTO / VIDEO EVIDENCE ================= */}

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100">
            <Camera className="h-7 w-7 text-purple-600" />
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Evidence Upload
            </h2>

            <p className="text-slate-500">
              Upload photos, videos and supporting documents.
            </p>

          </div>

        </div>

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 py-12 transition hover:border-blue-500 hover:bg-slate-50">

          <Upload className="mb-4 h-12 w-12 text-blue-600" />

          <p className="text-lg font-semibold">
            Click to Upload Files
          </p>

          <p className="mt-2 text-sm text-slate-500">
            JPG, PNG, MP4, PDF, DOCX
          </p>

          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleUpload(e.target.files)}
          />

        </label>

        {formData.fileUrls.length > 0 && (

          <div className="mt-6 space-y-3">

            {formData.fileUrls.map((file, index) => (

              <div
                key={index}
                className="rounded-xl border bg-slate-50 p-4 text-sm"
              >
                {file}
              </div>

            ))}

          </div>

        )}

      </section>

      {/* ================= GPS / NOTES ================= */}

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
            <MapPinned className="h-7 w-7 text-emerald-600" />
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              GPS & Additional Notes
            </h2>

            <p className="text-slate-500">
              Add optional GPS coordinates or remarks.
            </p>

          </div>

        </div>

        <textarea
          rows={5}
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional observations..."
          className="w-full rounded-2xl border px-5 py-4"
        />

      </section>

      {/* ================= ACTION BUTTONS ================= */}

      <div className="flex justify-end gap-5 pt-8">

        <button
          type="button"
          onClick={handleSaveDraft}
          disabled={savingDraft}
          className="flex items-center gap-2 rounded-2xl border border-slate-300 px-8 py-4 font-semibold hover:bg-slate-100"
        >
          <Save size={20} />
          {savingDraft ? "Saving..." : "Save Draft"}
        </button>

        <button
  type="button"
  onClick={handleSubmitClick}
  disabled={submitting}
  className="flex items-center gap-2 rounded-2xl bg-green-600 px-10 py-4 font-semibold text-white transition hover:bg-green-700"
>
          <Send size={20} />
          {submitting ? "Submitting..." : "Submit Work"}
        </button>

      </div>

    </div>
  );
}