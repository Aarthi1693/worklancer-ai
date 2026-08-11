"use client";

import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
} from "lucide-react";

const details = [
  {
    icon: User,
    label: "Full Name",
    value: "Aarth",
  },
  {
    icon: Mail,
    label: "Email",
    value: "aarth@example.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9876543210",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bangalore, Karnataka",
  },
  {
    icon: Calendar,
    label: "Joined",
    value: "June 2026",
  },
];

export default function BasicInformation() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-semibold text-slate-900">
        Basic Information
      </h2>

      <div className="mt-6 space-y-5">

        {details.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-start gap-4"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <Icon className="h-5 w-5 text-blue-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  {item.label}
                </p>

                <p className="font-medium text-slate-900">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
}