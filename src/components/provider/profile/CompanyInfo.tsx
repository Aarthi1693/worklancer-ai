"use client";

import {
  Building2,
  Globe,
  Briefcase,
  MapPinned,
  Users,
} from "lucide-react";

const company = [
  {
    icon: Building2,
    label: "Company",
    value: "Freelance Provider",
  },
  {
    icon: Briefcase,
    label: "Industry",
    value: "Software Development",
  },
  {
    icon: Users,
    label: "Organization",
    value: "Individual",
  },
  {
    icon: Globe,
    label: "Website",
    value: "www.worklancer.ai",
  },
  {
    icon: MapPinned,
    label: "Office Location",
    value: "Bangalore, India",
  },
];

export default function CompanyInfo() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-900">
        Company Information
      </h2>

      <div className="space-y-5">
        {company.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-none"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-green-50 p-3">
                  <Icon
                    size={18}
                    className="text-green-600"
                  />
                </div>

                <span className="text-slate-600">
                  {item.label}
                </span>
              </div>

              <span className="font-medium text-slate-900">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}