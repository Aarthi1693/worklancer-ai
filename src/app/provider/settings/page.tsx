"use client";

import { useState } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [taskUpdates, setTaskUpdates] =
    useState(true);

  const [aiAlerts, setAiAlerts] =
    useState(true);

  const [showSuccess, setShowSuccess] =
    useState(false);

  const [showPasswordPopup, setShowPasswordPopup] =
    useState(false);

  const handleSave = () => {
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <DesktopLayout>
      <div className="space-y-8">

        {/* Header */}

        <div>
          <h1 className="text-4xl font-bold text-white">
            Settings
          </h1>

          <p className="text-slate-400 mt-2">
            Manage your profile, notifications and preferences.
          </p>
        </div>

        {/* Profile */}

        <div
          className="
            rounded-3xl
            border
            border-white/[0.08]
            bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
            p-6
          "
        >
          <h2 className="text-2xl font-bold mb-5">
            Profile Information
          </h2>

          <div className="grid grid-cols-2 gap-6">

            <div>
              <label className="text-sm text-slate-400">
                Full Name
              </label>

              <input
                type="text"
                defaultValue="Aarthi"
                className="
                  w-full
                  mt-2
                  p-3
                  rounded-xl
                  bg-slate-800
                  border
                  border-white/[0.08]
                "
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">
                Email
              </label>

              <input
                type="email"
                defaultValue="aarthi@example.com"
                className="
                  w-full
                  mt-2
                  p-3
                  rounded-xl
                  bg-slate-800
                  border
                  border-white/[0.08]
                "
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">
                Role
              </label>

              <input
                type="text"
                defaultValue="Task Provider"
                className="
                  w-full
                  mt-2
                  p-3
                  rounded-xl
                  bg-slate-800
                  border
                  border-white/[0.08]
                "
              />
            </div>

            <div>
              <label className="text-sm text-slate-400">
                Company
              </label>

              <input
                type="text"
                defaultValue="WorkLancer AI"
                className="
                  w-full
                  mt-2
                  p-3
                  rounded-xl
                  bg-slate-800
                  border
                  border-white/[0.08]
                "
              />
            </div>

          </div>
        </div>

        {/* Notifications */}

        <div
          className="
            rounded-3xl
            border
            border-white/[0.08]
            bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
            p-6
          "
        >
          <h2 className="text-2xl font-bold mb-5">
            Notifications
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between items-center">
              <span>Email Notifications</span>

              <button
                onClick={() =>
                  setEmailNotifications(
                    !emailNotifications
                  )
                }
                className={`
                  px-4 py-2 rounded-xl
                  ${
                    emailNotifications
                      ? "bg-green-600"
                      : "bg-slate-700"
                  }
                `}
              >
                {emailNotifications
                  ? "Enabled"
                  : "Disabled"}
              </button>
            </div>

            <div className="flex justify-between items-center">
              <span>Task Updates</span>

              <button
                onClick={() =>
                  setTaskUpdates(
                    !taskUpdates
                  )
                }
                className={`
                  px-4 py-2 rounded-xl
                  ${
                    taskUpdates
                      ? "bg-green-600"
                      : "bg-slate-700"
                  }
                `}
              >
                {taskUpdates
                  ? "Enabled"
                  : "Disabled"}
              </button>
            </div>

            <div className="flex justify-between items-center">
              <span>AI Alerts</span>

              <button
                onClick={() =>
                  setAiAlerts(!aiAlerts)
                }
                className={`
                  px-4 py-2 rounded-xl
                  ${
                    aiAlerts
                      ? "bg-green-600"
                      : "bg-slate-700"
                  }
                `}
              >
                {aiAlerts
                  ? "Enabled"
                  : "Disabled"}
              </button>
            </div>

          </div>
        </div>

        {/* Security */}

        <div
          className="
            rounded-3xl
            border
            border-white/[0.08]
            bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
            p-6
          "
        >
          <h2 className="text-2xl font-bold mb-5">
            Security
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Password Status</span>

              <span className="text-green-400">
                Protected
              </span>
            </div>

            <div className="flex justify-between">
              <span>Two-Factor Authentication</span>

              <span className="text-yellow-400">
                Disabled
              </span>
            </div>

            <button
              onClick={() =>
                setShowPasswordPopup(true)
              }
              className="
                mt-4
                px-5
                py-3
                rounded-xl
                bg-purple-600
                hover:bg-purple-700
              "
            >
              Change Password
            </button>

          </div>
        </div>

        {/* Save */}

        <div>
          <button
            onClick={handleSave}
            className="
              px-6
              py-3
              rounded-xl
              bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)]
              hover:from-blue-500 hover:to-purple-500
            "
          >
            Save Changes
          </button>
        </div>

        {/* Password Popup */}

        {showPasswordPopup && (
          <div
            className="
              fixed
              inset-0
              bg-black/60
              flex
              items-center
              justify-center
              z-50
            "
          >
            <div
              className="
                bg-slate-950
                border
                border-white/[0.08]
                rounded-3xl
                p-8
                w-[450px]
              "
            >
              <h2 className="text-2xl font-bold mb-6">
                Change Password
              </h2>

              <input
                type="password"
                placeholder="Current Password"
                className="
                  w-full
                  p-3
                  mb-4
                  rounded-xl
                  bg-slate-800
                "
              />

              <input
                type="password"
                placeholder="New Password"
                className="
                  w-full
                  p-3
                  mb-4
                  rounded-xl
                  bg-slate-800
                "
              />

              <button
                onClick={() =>
                  setShowPasswordPopup(
                    false
                  )
                }
                className="
                  w-full
                  py-3
                  rounded-xl
                  bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)]
                "
              >
                Update Password
              </button>
            </div>
          </div>
        )}

        {/* Success Popup */}

        {showSuccess && (
          <div
            className="
              fixed
              inset-0
              bg-black/60
              flex
              items-center
              justify-center
              z-50
            "
          >
            <div
              className="
                bg-slate-950
                border
                border-green-500/20
                rounded-3xl
                p-8
                text-center
                w-[420px]
              "
            >
              <div className="text-6xl mb-4">
                ✅
              </div>

              <h2 className="text-2xl font-bold text-green-400">
                Settings Saved
              </h2>

              <p className="text-slate-400 mt-3">
                Your preferences have been updated.
              </p>
            </div>
          </div>
        )}

      </div>
    </DesktopLayout>
  );
}