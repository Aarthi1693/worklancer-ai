"use client";

import {
  Briefcase,
  ArrowUpRight,
} from "lucide-react";

const opportunities = [
  {
    role: "Digital Marketing Assistant",
    match: "92%",
    demand: "High Demand",
  },
  {
    role: "React Frontend Developer",
    match: "88%",
    demand: "Growing",
  },
  {
    role: "Field Service Executive",
    match: "95%",
    demand: "High Demand",
  },
  {
    role: "Data Entry Specialist",
    match: "84%",
    demand: "Stable",
  },
];

export default function CareerOpportunities() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            AI Career Opportunities
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            AI matched opportunities based on your profile and skills.
          </p>
        </div>

        <Briefcase className="h-8 w-8 text-blue-600" />
      </div>

      <div className="mt-6 space-y-4">
        {opportunities.map((job) => (
          <div
            key={job.role}
            className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 hover:bg-slate-50 transition"
          >
            <div>
              <h3 className="font-semibold text-slate-900">
                {job.role}
              </h3>

              <p className="text-sm text-slate-500">
                {job.demand}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                {job.match}
              </span>

              <ArrowUpRight className="h-5 w-5 text-slate-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}