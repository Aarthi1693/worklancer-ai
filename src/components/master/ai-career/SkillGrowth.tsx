"use client";

import { Circle } from "lucide-react";

interface SkillGrowthProps {
  strengths: string[];
  weaknesses: string[];
  recommendedSkills: string[];
}

export default function SkillGrowth({
  weaknesses,
  recommendedSkills,
}: SkillGrowthProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">
        Skill Growth Analysis
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Improve your career opportunities by focusing on the following skills.
      </p>

      {/* Weaknesses */}
      <div className="mt-6">
        <h3 className="mb-4 font-semibold text-slate-800">
          Skills to Improve
        </h3>

        <div className="space-y-3">
          {weaknesses.length > 0 ? (
            weaknesses.map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-3"
              >
                <Circle className="h-5 w-5 text-orange-400" />
                <span className="text-slate-700">{skill}</span>
              </div>
            ))
          ) : (
            <p className="text-slate-400 text-sm">
              No improvement areas identified yet.
            </p>
          )}
        </div>
      </div>

      {/* Recommended Skills */}
      <div className="mt-8 border-t border-slate-200 pt-6">
        <h3 className="mb-4 font-semibold text-slate-800">
          Recommended Skills
        </h3>

        <div className="grid gap-3 sm:grid-cols-2">
          {recommendedSkills.length > 0 ? (
            recommendedSkills.map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3"
              >
                <Circle className="h-5 w-5 text-blue-500" />
                <span className="text-slate-700 font-medium">
                  {skill}
                </span>
              </div>
            ))
          ) : (
            <p className="text-slate-400 text-sm">
              No recommendations available yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}