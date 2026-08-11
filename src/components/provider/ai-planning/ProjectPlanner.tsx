"use client";

import { Sparkles } from "lucide-react";
import type { ProjectPlanRequest } from "@/types/ai-planning";

interface Props {
  formData: ProjectPlanRequest;
  onChange: (field: keyof ProjectPlanRequest, value: string) => void;

  onGenerate?: () => void;
  onSave?: () => void;
  onReset?: () => void;

  loading?: boolean;
  saving?: boolean;
}

export default function ProjectPlanner({
  formData,
  onChange,
  onGenerate,
  onSave,
  onReset,
  loading = false,
  saving = false,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
          <Sparkles className="text-blue-600" size={28} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            AI Project Planner
          </h2>

          <p className="mt-1 text-slate-600">
            Provide your project details and let AI generate a complete execution roadmap.
          </p>
        </div>
      </div>

      {/* Form */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Project Title */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Project Title
          </label>

          <input
            type="text"
            placeholder="AI Based Food Delivery Platform"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            value={formData.title}
            onChange={(e) => onChange("title", e.target.value)}
          />
        </div>

        {/* Project Category */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Project Category
          </label>

          <select
            value={formData.category}
            onChange={(e) => onChange("category", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="" disabled className="text-slate-400">
              Select Category
            </option>

            <option className="text-slate-900">
              Web Development
            </option>

            <option className="text-slate-900">
              Mobile App
            </option>

            <option className="text-slate-900">
              UI / UX
            </option>

            <option className="text-slate-900">
              AI Project
            </option>

            <option className="text-slate-900">
              Data Science
            </option>

          </select>
        </div>

        {/* Budget */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Budget
          </label>

          <input
            type="text"
            placeholder="₹50,000"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            value={formData.budget}
            onChange={(e) => onChange("budget", e.target.value)}
          />
        </div>

        {/* Team Size */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Team Size
          </label>

          <select
            value={formData.teamSize}
            onChange={(e) => onChange("teamSize", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="" disabled className="text-slate-400">
              Select Team Size
            </option>

            <option className="text-slate-900">
              1-2 Members
            </option>

            <option className="text-slate-900">
              3-5 Members
            </option>

            <option className="text-slate-900">
              6-10 Members
            </option>

            <option className="text-slate-900">
              10+ Members
            </option>

          </select>
        </div>

        {/* Priority */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Priority
          </label>

          <select
            value={formData.priority}
            onChange={(e) => onChange("priority", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="" disabled className="text-slate-400">
              Select Priority
            </option>

            <option className="text-slate-900">
              Low
            </option>

            <option className="text-slate-900">
              Medium
            </option>

            <option className="text-slate-900">
              High
            </option>

            <option className="text-slate-900">
              Critical
            </option>

          </select>
        </div>

        {/* Deadline */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Deadline
          </label>

          <input
            type="date"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            value={formData.deadline}
            onChange={(e) => onChange("deadline", e.target.value)}
          />
        </div>

      </div>

      {/* Project Type */}

      <div className="mt-6">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Project Type
        </label>

        <select
          value={formData.projectType}
          onChange={(e) => onChange("projectType", e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        >
          <option value="" disabled className="text-slate-400">
            Select Project Type
          </option>

          <option className="text-slate-900">Digital</option>
          <option className="text-slate-900">Field</option>
          <option className="text-slate-900">Hybrid</option>

        </select>
      </div>

      {/* Required Skills */}

      <div className="mt-6">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Required Skills
        </label>

        <input
          type="text"
          placeholder="React, Node.js, PostgreSQL, AWS..."
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          value={formData.requiredSkills}
          onChange={(e) => onChange("requiredSkills", e.target.value)}
        />
      </div>

      {/* Description */}

      <div className="mt-6">

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Project Description
        </label>

        <textarea
          rows={6}
          placeholder="Describe your project objectives, features, requirements, expected deliverables, and any additional information..."
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          value={formData.description}
          onChange={(e) => onChange("description", e.target.value)}
        />

      </div>

      {/* Goals */}

      <div className="mt-6">

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Project Goals
        </label>

        <textarea
          rows={4}
          placeholder="Example: Build a scalable AI-powered platform with secure authentication, responsive UI and analytics."
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />

      </div>

      {/* Buttons */}

      <div className="mt-8 flex flex-wrap gap-4">

        <button
  onClick={onGenerate}
  disabled={loading}
  className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
>
  {loading ? "Generating..." : "🤖 Generate AI Roadmap"}
</button>

        <button
  onClick={onSave}
  disabled={saving}
  className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
>
  {saving ? "Saving..." : "💾 Save AI Plan"}
</button>

        <button
          className="rounded-xl border border-slate-300 bg-white px-8 py-3 font-semibold text-slate-700 hover:bg-slate-100"
          onClick={onReset}
        >
          Reset Form
        </button>

      </div>

    </div>
  );
}