"use client";

import {
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  Award,
  BookOpen,
  Briefcase,
} from "lucide-react";

const careerTips = [
  {
    icon: CheckCircle2,
    text: "Complete your KYC verification to unlock premium projects.",
    color: "text-green-600",
  },
  {
    icon: Briefcase,
    text: "Apply to at least 5 projects every week to increase opportunities.",
    color: "text-blue-600",
  },
  {
    icon: Award,
    text: "Maintain a worker rating above 4.8★ for better visibility.",
    color: "text-yellow-500",
  },
  {
    icon: BookOpen,
    text: "Learn one new technical or on-field skill every month.",
    color: "text-purple-600",
  },
  {
    icon: TrendingUp,
    text: "Keep your portfolio and completed projects updated regularly.",
    color: "text-indigo-600",
  },
  {
    icon: Lightbulb,
    text: "Improve communication with clients for higher project success.",
    color: "text-orange-500",
  },
];

export default function CareerTips() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">
        Career Tips
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Simple recommendations to improve your freelance profile and career growth.
      </p>

      <div className="mt-6 space-y-4">
        {careerTips.map((tip, index) => {
          const Icon = tip.icon;

          return (
            <div
              key={index}
              className="flex items-start gap-4 rounded-xl border border-slate-200 p-4 hover:bg-slate-50 transition"
            >
              <div className="rounded-lg bg-slate-100 p-2">
                <Icon className={`h-5 w-5 ${tip.color}`} />
              </div>

              <p className="text-sm leading-6 text-slate-700">
                {tip.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}