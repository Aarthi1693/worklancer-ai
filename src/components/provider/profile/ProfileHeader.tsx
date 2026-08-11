"use client";

import { Edit, Mail, Calendar } from "lucide-react";

interface ProfileHeaderProps {
  onEdit: () => void;
}

export default function ProfileHeader({
  onEdit,
}: ProfileHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Banner */}
      <div className="h-44 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500" />

      <div className="px-8 pb-8">
        <div className="-mt-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          {/* Left */}
          <div className="flex items-end gap-6">

            <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-slate-900 text-5xl font-bold text-white shadow-lg">
              A
            </div>

            <div className="pb-2">

              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-slate-900">
                  Aarthi V
                </h1>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  Provider
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-600">

                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  aarthi@example.com
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  Joined June 2026
                </div>

              </div>

            </div>

          </div>

          {/* Right */}

          <button
            onClick={onEdit}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            <Edit size={18} />
            Edit Profile
          </button>

        </div>
      </div>

    </div>
  );
}