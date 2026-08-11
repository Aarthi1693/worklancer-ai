"use client";

import { Clock } from "lucide-react";

const availability = [
  {
    label: "Current Status",
    value: "Available for New Tasks",
  },
  {
    label: "Work Mode",
    value: "Remote & On-site",
  },
  {
    label: "Preferred Shift",
    value: "Flexible",
  },
  {
    label: "Weekly Availability",
    value: "40 Hours / Week",
  },
];

export default function AvailabilityCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
          <Clock className="h-6 w-6 text-green-600" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Availability
          </h2>

          <p className="text-sm text-slate-500">
            Current work preferences and schedule.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {availability.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-100 p-4"
          >
            <p className="text-sm text-slate-500">
              {item.label}
            </p>

            <p className="mt-2 font-semibold text-slate-900">
              {item.value}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}