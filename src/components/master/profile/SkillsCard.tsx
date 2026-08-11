"use client";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "UI/UX Design",
  "Figma",
  "Communication",
  "Problem Solving",
  "Customer Handling",
  "Digital Payments",
];

export default function SkillsCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">
        Skills
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Professional and technical skills.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}