"use client";

import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  VenusAndMars,
} from "lucide-react";

const details = [
  {
    icon: User,
    label: "Full Name",
    value: "Aarthi V",
  },
  {
    icon: Mail,
    label: "Email",
    value: "aarthi@example.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9876543210",
  },
  {
    icon: Calendar,
    label: "Date of Birth",
    value: "16 Sep 2003",
  },
  {
    icon: VenusAndMars,
    label: "Gender",
    value: "Female",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bangalore, Karnataka",
  },
];

export default function PersonalInfo() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-900">
        Personal Information
      </h2>

      <div className="space-y-5">
        {details.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-none"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-3">
                  <Icon
                    size={18}
                    className="text-blue-600"
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