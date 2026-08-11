"use client";

import { Award } from "lucide-react";

const certifications = [
  {
    title: "Microsoft Azure Fundamentals",
    issuer: "Microsoft",
  },
  {
    title: "Infosys Springboard Internship",
    issuer: "Infosys",
  },
  {
    title: "UI/UX Design Training",
    issuer: "Infipost Pvt Ltd",
  },
];

export default function CertificationCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-semibold text-slate-900">
        Certifications
      </h2>

      <div className="mt-6 space-y-4">

        {certifications.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>

            <div>
              <h3 className="font-medium text-slate-900">
                {item.title}
              </h3>

              <p className="text-sm text-slate-500">
                Issued by {item.issuer}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}