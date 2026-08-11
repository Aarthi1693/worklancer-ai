"use client";

import {
  Activity,
  BarChart3,
  Clock3,
  TrendingUp,
  Brain,
  CheckCircle2,
} from "lucide-react";

const insights = [
  {
    title: "Project Health",
    value: "94%",
    description: "Healthy",
    icon: Activity,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Team Productivity",
    value: "91%",
    description: "Excellent",
    icon: TrendingUp,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Resource Utilization",
    value: "88%",
    description: "Optimized",
    icon: BarChart3,
    color: "bg-violet-100 text-violet-600",
  },
  {
    title: "Estimated Delay",
    value: "2 Days",
    description: "Low Risk",
    icon: Clock3,
    color: "bg-amber-100 text-amber-600",
  },
];

const suggestions = [
  "Assign one additional Frontend Developer during the Development phase.",
  "Conduct weekly sprint reviews to reduce delivery risks.",
  "Prioritize API integration before UI polishing.",
  "Increase automated testing coverage before deployment.",
];

export default function ProductivityInsights() {
  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <h2 className="text-2xl font-bold text-slate-900">
          Productivity Insights
        </h2>

        <p className="mt-2 text-slate-600">
          AI continuously analyzes project performance,
          team productivity,
          resource utilization,
          and delivery confidence.
        </p>

      </div>

      {/* KPI Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {insights.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500">
                    {item.title}
                  </p>

                  <h3 className="mt-2 text-4xl font-bold text-slate-900">
                    {item.value}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-slate-600">
                    {item.description}
                  </p>

                </div>

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.color}`}
                >
                  <Icon size={30} />
                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* AI Suggestions */}

      <div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-8">

        <div className="flex items-center gap-3">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
            <Brain
              size={28}
              className="text-blue-600"
            />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              AI Actionable Suggestions
            </h2>

            <p className="text-slate-600">
              Improve delivery success with these recommendations.
            </p>

          </div>

        </div>

        <div className="mt-8 space-y-4">

          {suggestions.map((tip) => (

            <div
              key={tip}
              className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm"
            >

              <CheckCircle2
                className="mt-1 text-green-600"
                size={22}
              />

              <p className="leading-7 text-slate-700">
                {tip}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Overall AI Score */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="flex flex-col items-center text-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">

            <Brain
              size={42}
              className="text-blue-600"
            />

          </div>

          <h2 className="mt-6 text-3xl font-bold text-slate-900">
            Overall AI Performance Score
          </h2>

          <p className="mt-2 text-slate-600">
            Based on planning accuracy, team capability,
            budget allocation, timeline prediction,
            and historical project success.
          </p>

          <h1 className="mt-8 text-6xl font-extrabold text-blue-600">
            96%
          </h1>

          <span className="mt-4 rounded-full bg-green-100 px-5 py-2 font-semibold text-green-700">
            Excellent Project Outlook
          </span>

        </div>

      </div>

    </div>
  );
}