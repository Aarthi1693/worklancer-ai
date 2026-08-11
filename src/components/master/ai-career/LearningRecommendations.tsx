"use client";

import {
  BookOpen,
  ArrowRight,
} from "lucide-react";

interface LearningRecommendationsProps {
  roadmap: Array<{
    title: string;
    duration: string;
    level: string;
  }>;
}

export default function LearningRecommendations({ roadmap }: LearningRecommendationsProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Learning Recommendations
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Personalized learning suggestions to improve your skills and unlock better opportunities.
          </p>
        </div>

        <BookOpen className="h-8 w-8 text-blue-600" />
      </div>

      <div className="mt-6 space-y-4">
        {roadmap.length > 0 ? (
          roadmap.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50"
            >
              <div>
                <h3 className="font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-500">
                  {item.duration} • {item.level}
                </p>
              </div>

              <ArrowRight className="h-5 w-5 text-slate-400" />
            </div>
          ))
        ) : (
          <p className="text-slate-400 text-sm">
            No learning recommendations available yet.
          </p>
        )}
      </div>
    </div>
  );
}