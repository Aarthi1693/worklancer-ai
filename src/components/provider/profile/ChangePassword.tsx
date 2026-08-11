"use client";

import { Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function ChangePassword() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-blue-100 p-3">
          <Lock className="text-blue-600" size={22} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Change Password
          </h2>

          <p className="text-sm text-slate-500">
            Keep your account secure by updating your password.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">

        {/* Current Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Current Password
          </label>

          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              placeholder="Enter current password"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-sm outline-none focus:border-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            New Password
          </label>

          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              placeholder="Enter new password"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-sm outline-none focus:border-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm new password"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-sm outline-none focus:border-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

      </div>

      <div className="mt-8 flex justify-end">
        <button className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
          Update Password
        </button>
      </div>
    </div>
  );
}