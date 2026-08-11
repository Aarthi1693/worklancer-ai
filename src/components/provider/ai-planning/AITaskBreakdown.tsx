"use client";

import {
  CheckCircle2,
  Clock3,
  Wallet,
  Flag,
} from "lucide-react";

interface Props {
  plan: {
    projectSummary?: string;
    developmentRoadmap?: Array<{
      phase: string;
      description?: string;
    }>;
    recommendedTeamRoles?: string[];
    requiredSkills: string[];
    estimatedTimeline?: string;
    budgetSuggestion?: string;
    milestones?: Array<{
      name: string;
      date: string;
    }>;
    riskAnalysis: string[];
    recommendations: string[];
};
}

export default function AITaskBreakdown({ plan }: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-slate-900">
          AI Generated Roadmap
        </h2>

        <p className="mt-2 text-slate-600">
          Artificial Intelligence has analyzed your project and generated an
          optimized execution plan.
        </p>

      </div>

      {/* Project Summary */}

<div className="mb-8 overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">

  <div className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">

    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
      <CheckCircle2 className="h-6 w-6 text-white" />
    </div>

    <div>
      <h3 className="text-xl font-bold text-white">
        Project Summary
      </h3>

      <p className="text-sm text-blue-100">
        AI generated overview of your project
      </p>
    </div>

  </div>

  <div className="p-6">

    <p className="text-base leading-8 text-slate-700">
      {plan.projectSummary}
    </p>

  </div>

</div>

      {/* Budget Suggestion */}

{plan.budgetSuggestion && (
  <div className="mb-8 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">

    <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-4">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
        <Wallet className="h-6 w-6 text-white" />
      </div>

      <div>
        <h3 className="text-xl font-bold text-white">
          Budget Suggestion
        </h3>

        <p className="text-sm text-emerald-100">
          AI estimated project budget
        </p>
      </div>

    </div>

    <div className="p-6">

      <p className="text-base leading-8 text-slate-700">
        {plan.budgetSuggestion}
      </p>

    </div>

  </div>
)}

      {/* Milestones */}

{plan.milestones && plan.milestones.length > 0 && (
  <div className="mb-8 overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-sm">

    {/* Header */}

    <div className="flex items-center gap-3 bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
        <Flag className="h-6 w-6 text-white" />
      </div>

      <div>
        <h3 className="text-xl font-bold text-white">
          Project Milestones
        </h3>

        <p className="text-sm text-violet-100">
          Major deliverables and deadlines
        </p>
      </div>

    </div>

    {/* Timeline */}

    <div className="space-y-6 p-6">

      {plan.milestones.map((milestone, idx) => (

        <div
          key={idx}
          className="relative flex gap-5"
        >

          {/* Timeline */}

          <div className="flex flex-col items-center">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
              {idx + 1}
            </div>

            {idx !== plan.milestones.length - 1 && (
              <div className="mt-2 h-16 w-1 rounded-full bg-violet-200" />
            )}

          </div>

          {/* Card */}

          <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 p-5">

            <h4 className="text-lg font-bold text-slate-900">
              {milestone.name}
            </h4>

            <p className="mt-2 text-sm text-slate-500">
              Expected Date
            </p>

            <p className="font-semibold text-violet-700">
              {milestone.date}
            </p>

          </div>

        </div>

      ))}

    </div>

  </div>
)}

     {/* Estimated Timeline */}

{plan.estimatedTimeline && (
  <div className="mb-8 overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-sm">

    {/* Header */}

    <div className="flex items-center gap-3 bg-gradient-to-r from-sky-600 to-cyan-600 px-6 py-4">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
        <Clock3 className="h-6 w-6 text-white" />
      </div>

      <div>
        <h3 className="text-xl font-bold text-white">
          Estimated Timeline
        </h3>

        <p className="text-sm text-sky-100">
          Expected duration to complete the project
        </p>
      </div>

    </div>

    {/* Body */}

    <div className="space-y-5 p-6">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-500">
            Project Duration
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            {plan.estimatedTimeline}
          </h2>
        </div>

        <div className="rounded-2xl bg-sky-100 px-5 py-4">
          <Clock3 className="h-8 w-8 text-sky-600" />
        </div>

      </div>

      {/* Decorative Progress */}

      <div>

        <div className="mb-2 flex justify-between text-sm">

          <span className="text-slate-500">
            Planning Progress
          </span>

          <span className="font-semibold text-sky-600">
            100%
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-200">

          <div className="h-full w-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-500" />

        </div>

      </div>

    </div>

  </div>
)}
      
      {/* Development Roadmap */}

{plan.developmentRoadmap && plan.developmentRoadmap.length > 0 && (

  <div className="mb-8 overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-sm">

    {/* Header */}

    <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
        <CheckCircle2 className="h-6 w-6 text-white" />
      </div>

      <div>
        <h3 className="text-xl font-bold text-white">
          Development Roadmap
        </h3>

        <p className="text-sm text-indigo-100">
          AI generated implementation phases
        </p>
      </div>

    </div>

    {/* Body */}

    <div className="space-y-8 p-6">

      {plan.developmentRoadmap.map((item, index) => (

        <div
          key={index}
          className="relative flex gap-6"
        >

          {/* Timeline */}

          <div className="flex flex-col items-center">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-lg font-bold text-white shadow-lg">
              {index + 1}
            </div>

            {index !== plan.developmentRoadmap.length - 1 && (
              <div className="mt-3 h-24 w-1 rounded-full bg-indigo-200" />
            )}

          </div>

          {/* Phase Card */}

          <div className="flex-1 rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 transition hover:shadow-md">

            <div className="flex items-center justify-between">

              <h4 className="text-2xl font-bold text-slate-900">
                {item.phase}
              </h4>

              <span className="rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-700">
                Phase {index + 1}
              </span>

            </div>

            <div className="mt-5">

              <p className="leading-8 text-slate-600">
                {item.description}
              </p>

            </div>

          </div>

        </div>

      ))}

    </div>

  </div>

)}

    </div>
  );
}