"use client";

import { Save, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Edit Profile
            </h1>

            <p className="mt-2 text-slate-500">
              Update your personal information, skills and work preferences.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.push("/master/profile")}
              className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
            >
              <X size={18} />
              Cancel
            </button>

            <button
              onClick={() => {
                // Backend integration later
                router.push("/master/profile");
              }}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">

          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              defaultValue="Aarth"
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              defaultValue="aarth@example.com"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Phone Number
            </label>

            <input
              type="text"
              defaultValue="+91 9876543210"
              placeholder="Enter your phone number"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Location
            </label>

            <input
              type="text"
              defaultValue="Bangalore"
              placeholder="Enter your location"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Worker Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Worker Type
            </label>

            <select
              defaultValue="Digital"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option>Digital</option>
              <option>Field</option>
              <option>Digital + Field</option>
            </select>
          </div>

          {/* Experience */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Experience
            </label>

            <input
              type="text"
              defaultValue="2 Years"
              placeholder="Enter your experience"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Skills */}
        <div className="mt-8">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Skills
          </label>

          <textarea
            rows={4}
            defaultValue="React, Next.js, Tailwind CSS, UI Design, Customer Handling"
            placeholder="Enter your skills"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* About */}
        <div className="mt-8">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            About Me
          </label>

          <textarea
            rows={5}
            defaultValue="Experienced worker passionate about delivering quality work and continuously improving skills."
            placeholder="Tell us about yourself"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>
    </div>
  );
}