"use client";

import {
  Users,
  Brain,
  UserCheck,
  UserX,
} from "lucide-react";


const statsConfig = [
  {
    title: "Total Applicants",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "AI Recommended",
    icon: Brain,
    color: "bg-violet-100 text-violet-600",
  },
  {
    title: "Shortlisted",
    icon: UserCheck,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Rejected",
    icon: UserX,
    color: "bg-red-100 text-red-600",
  },
];

interface ApplicantStatsProps {
  totalApplicants?: number;
  aiRecommended?: number;
  shortlisted?: number;
  rejected?: number;
}

export default function ApplicantStats({
  totalApplicants: totalProp = 0,
  aiRecommended: aiProp = 0,
  shortlisted: shortProp = 0,
  rejected: rejectedProp = 0,
}: ApplicantStatsProps) {
  
  const resolved = {
  totalApplicants: totalProp,
  aiRecommended: aiProp,
  shortlisted: shortProp,
  rejected: rejectedProp,
};

  const dynamicStats = [
    {
      ...statsConfig[0],
      value: String(resolved.totalApplicants),
    },
    {
      ...statsConfig[1],
      value: String(resolved.aiRecommended),
    },
    {
      ...statsConfig[2],
      value: String(resolved.shortlisted),
    },
    {
      ...statsConfig[3],
      value: String(resolved.rejected),
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {dynamicStats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {item.title}
                </p>

                <h2 className="mt-2 text-4xl font-bold text-slate-900">
                  {item.value}
                </h2>
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
  );
}
