"use client";

import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    institute: "University",
    year: "2024 - 2026",
  },
  {
    degree: "Bachelor's Degree",
    institute: "University",
    year: "2021 - 2024",
  },
];

export default function EducationCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-semibold text-slate-900">
        Education
      </h2>

      <div className="mt-6 space-y-5">

        {education.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 rounded-2xl border border-slate-100 p-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
              <GraduationCap className="h-6 w-6 text-indigo-600" />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                {item.degree}
              </h3>

              <p className="text-sm text-slate-600">
                {item.institute}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {item.year}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}