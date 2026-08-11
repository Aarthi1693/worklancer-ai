"use client";

import {
  Sparkles,
  Target,
  BrainCircuit,
  TrendingUp,
  Lightbulb,
} from "lucide-react";

export default function AIInsights() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          AI Insights
        </h2>

        <p className="mt-2 text-slate-600">
          Personalized recommendations based on your activity,
          profile, completed projects, and AI analysis.
        </p>
      </div>

      {/* KPI Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <Sparkles className="mb-4 h-8 w-8 text-blue-600" />

          <p className="text-sm text-slate-500">
            AI Confidence
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            96%
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            High-quality recommendations.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <Target className="mb-4 h-8 w-8 text-green-600" />

          <p className="text-sm text-slate-500">
            Profile Strength
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            89%
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Add more certifications to improve.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <BrainCircuit className="mb-4 h-8 w-8 text-violet-600" />

          <p className="text-sm text-slate-500">
            Project Match
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            92%
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            You're matched with enterprise projects.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <TrendingUp className="mb-4 h-8 w-8 text-orange-600" />

          <p className="text-sm text-slate-500">
            Weekly AI Usage
          </p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            24
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            AI interactions this week.
          </p>
        </div>

      </div>

      {/* AI Recommendation */}

      <div className="rounded-3xl border border-blue-200 bg-blue-50 p-8">

        <div className="flex items-start gap-4">

          <div className="rounded-2xl bg-blue-100 p-3">
            <Lightbulb className="h-8 w-8 text-blue-600" />
          </div>

          <div>

            <h3 className="text-xl font-bold text-slate-900">
              AI Recommendation
            </h3>

            <p className="mt-4 leading-7 text-slate-700">
              Based on your recent activity, you have a strong frontend
              profile. To unlock higher-paying enterprise projects,
              prioritize learning <strong>NestJS</strong>,
              <strong> Docker</strong>, and
              <strong> AWS Cloud</strong>. Completing one backend
              project and earning an AWS certification could
              significantly improve your ranking and proposal success
              rate.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}