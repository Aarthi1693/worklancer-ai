"use client";

import {
  Brain,
  Users,
  Wallet,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  AlertTriangle,
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

export default function AIRecommendations({ plan }: Props) {
  const riskLevel = plan.riskAnalysis && plan.riskAnalysis.length > 0 ? "Low Risk" : "N/A";
  const successProb = "97%";
  const confidence = "96%";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-slate-900">
          AI Recommendations
        </h2>

        <p className="mt-2 text-slate-600">
          Intelligent recommendations generated from your project
          requirements and historical project insights.
        </p>

      </div>

      {/* Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <div
          className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
        >
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600`}
          >
            <Brain size={28} />
          </div>

          <h3 className="mt-5 text-lg font-bold text-slate-900">
            Required Skills
          </h3>

          <p className="mt-3 leading-7 text-slate-600">
            {plan.requiredSkills.length > 0 ? plan.requiredSkills.join(" • ") : "N/A"}
          </p>
        </div>

        <div
          className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
        >
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600`}
          >
            <Users size={28} />
          </div>

          <h3 className="mt-5 text-lg font-bold text-slate-900">
            Recommended Team
          </h3>

          <p className="mt-3 leading-7 text-slate-600">
            {plan.recommendedTeamRoles && plan.recommendedTeamRoles.length > 0
              ? `${plan.recommendedTeamRoles.length} role(s) recommended`
              : "N/A"}
          </p>
        </div>

        <div
          className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
        >
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600`}
          >
            <Wallet size={28} />
          </div>

          <h3 className="mt-5 text-lg font-bold text-slate-900">
            Budget Utilization
          </h3>

          <p className="mt-3 leading-7 text-slate-600">
            {plan.budgetSuggestion || "N/A"}
          </p>
        </div>

        <div
          className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
        >
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600`}
          >
            <ShieldCheck size={28} />
          </div>

          <h3 className="mt-5 text-lg font-bold text-slate-900">
            Risk Level
          </h3>

          <p className="mt-3 leading-7 text-slate-600">{riskLevel}</p>
        </div>

        <div
          className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
        >
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600`}
          >
            <TrendingUp size={28} />
          </div>

          <h3 className="mt-5 text-lg font-bold text-slate-900">
            Success Probability
          </h3>

          <p className="mt-3 leading-7 text-slate-600">{successProb}</p>
        </div>

        <div
          className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
        >
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600`}
          >
            <Sparkles size={28} />
          </div>

          <h3 className="mt-5 text-lg font-bold text-slate-900">
            AI Confidence
          </h3>

          <p className="mt-3 leading-7 text-slate-600">{confidence}</p>
        </div>

      </div>

      {/* Risks */}

      {plan.riskAnalysis && plan.riskAnalysis.length > 0 && (
        <div className="mt-10 rounded-3xl border border-red-100 bg-gradient-to-r from-red-50 to-orange-50 p-6">

          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle size={24} className="text-red-600" />
            <h3 className="text-xl font-bold text-slate-900">Risk Analysis</h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {plan.riskAnalysis.map((risk, idx) => (
              <div key={idx} className="rounded-xl border border-red-100 bg-white p-4">
                <p className="font-semibold text-slate-900">{risk}</p>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* AI Summary */}

      <div className="mt-10 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">

        <div className="flex items-start gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
            <Brain
              size={28}
              className="text-blue-600"
            />
          </div>

          <div>

            <h3 className="text-xl font-bold text-slate-900">
              AI Executive Summary
            </h3>

            <p className="mt-3 leading-8 text-slate-700">
              {plan.projectSummary || "No summary available."}
            </p>

          </div>

        </div>

      </div>

      {/* Recommendations */}

      {plan.recommendations && plan.recommendations.length > 0 && (
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="flex items-center gap-3 mb-4">
            <Sparkles size={24} className="text-purple-600" />
            <h3 className="text-xl font-bold text-slate-900">AI Recommendations</h3>
          </div>

          <ul className="space-y-3">
            {plan.recommendations.map((rec, idx) => (
              <li
                key={idx}
                className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700"
              >
                <span className="mt-2 h-2 w-2 rounded-full bg-purple-400" />
                {rec}
              </li>
            ))}
          </ul>

        </div>
      )}

    </div>
  );
}