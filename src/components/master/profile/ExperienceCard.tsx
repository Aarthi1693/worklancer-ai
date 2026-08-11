"use client";

import { Briefcase } from "lucide-react";

const experience = [
  {
    role: "Frontend UI/UX Intern",
    company: "Infipost Pvt Ltd",
    duration: "2026 • 6 Months",
    description:
      "Designed and developed responsive interfaces for the WorkLancer AI platform using Next.js and Tailwind CSS.",
  },
  {
    role: "Freelance Worker",
    company: "Remote Projects",
    duration: "2025 - Present",
    description:
      "Worked on UI design, frontend development, and client collaboration for multiple digital projects.",
  },
];

export default function ExperienceCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-semibold text-slate-900">
        Experience
      </h2>

      <div className="mt-6 space-y-6">

        {experience.map((item, index) => (
          <div
            key={index}
            className="flex gap-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>

            <div className="flex-1">

              <h3 className="font-semibold text-slate-900">
                {item.role}
              </h3>

              <p className="text-sm text-blue-600">
                {item.company}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {item.duration}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.description}
              </p>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}