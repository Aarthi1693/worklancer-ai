"use client";

import {
  TrendingUp,
  Wallet,
  MapPin,
  Target,
} from "lucide-react";

interface CareerInsightsProps {
  weaknesses: string[];
  improvementSuggestions: string[];
}

const insights = [
  {
    title: "Market Demand",
    value: "High",
    icon: TrendingUp,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    title: "Expected Earnings",
    value: "₹15K - ₹35K",
    icon: Wallet,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    title: "Preferred Work",
    value: "Remote / On-Site",
    icon: MapPin,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  {
    title: "Success Rate",
    value: "92%",
    icon: Target,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
];

export default function CareerInsights({
  weaknesses,
  improvementSuggestions,
}: CareerInsightsProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Career Insights
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          AI-generated insights based on your profile, completed tasks, and market trends.
        </p>
      </div>

      <div className="space-y-4">
        {insights.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.bg}`}
                >
                  <Icon className={`h-6 w-6 ${item.color}`} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    {item.title}
                  </p>

                  <h3 className="font-semibold text-slate-900">
                    {item.value}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>


      {weaknesses.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-3">Weaknesses</h3>
          <div className="space-y-2">
            {weaknesses.map((weakness) => (
              <div
                key={weakness}
                className="flex items-center gap-2 text-sm text-slate-600"
              >
                <span className="h-2 w-2 rounded-full bg-red-500" />
                {weakness}
              </div>
            ))}
          </div>
        </div>
      )}

      {improvementSuggestions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-3">Improvement Suggestions</h3>
          <div className="space-y-2">
            {improvementSuggestions.map((suggestion) => (
              <div
                key={suggestion}
                className="flex items-start gap-2 text-sm text-slate-600"
              >
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                {suggestion}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}