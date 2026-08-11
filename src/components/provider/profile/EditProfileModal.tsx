"use client";

import { X, Camera } from "lucide-react";

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export default function EditProfileModal({
  open,
  onClose,
}: EditProfileModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Edit Profile
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update your personal and company information.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-slate-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-8 p-8">

          {/* Profile Photo */}
          <div className="flex flex-col items-center">
            <div className="relative">

              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-slate-900 text-4xl font-bold text-white">
                A
              </div>

              <button className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white shadow-lg hover:bg-blue-700">
                <Camera size={18} />
              </button>
            </div>

            <button className="mt-4 text-sm font-medium text-blue-600 hover:underline">
              Change Profile Picture
            </button>
          </div>

          {/* Personal Information */}

          <div>
            <h3 className="mb-5 text-lg font-semibold text-slate-900">
              Personal Information
            </h3>

            <div className="grid gap-5 md:grid-cols-2">

              <Input label="Full Name" defaultValue="Aarthi V" />

              <Input label="Email" defaultValue="aarthi@example.com" />

              <Input label="Phone" defaultValue="+91 9876543210" />

              <Input label="Date of Birth" defaultValue="16 Sep 2003" />

              <Select
                label="Gender"
                options={["Female", "Male", "Other"]}
              />

              <Input
                label="Location"
                defaultValue="Bangalore, Karnataka"
              />

            </div>
          </div>

          {/* Company Information */}

          <div>
            <h3 className="mb-5 text-lg font-semibold text-slate-900">
              Company Information
            </h3>

            <div className="grid gap-5 md:grid-cols-2">

              <Input
                label="Company Name"
                defaultValue="Freelance Provider"
              />

              <Select
                label="Industry"
                options={[
                  "Software",
                  "Healthcare",
                  "Education",
                  "Finance",
                ]}
              />

              <Select
                label="Organization Type"
                options={[
                  "Individual",
                  "Startup",
                  "Company",
                ]}
              />

              <Input
                label="Website"
                defaultValue="www.worklancer.ai"
              />

              <Input
                label="Office Location"
                defaultValue="Bangalore"
              />

            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-4 border-t border-slate-200 px-8 py-5">

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Save Changes
          </button>

        </div>

      </div>
    </div>
  );
}

interface InputProps {
  label: string;
  defaultValue?: string;
}

function Input({ label, defaultValue }: InputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500"
      />
    </div>
  );
}

interface SelectProps {
  label: string;
  options: string[];
}

function Select({ label, options }: SelectProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <select className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-500">
        {options.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </div>
  );
}