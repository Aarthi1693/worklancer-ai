"use client";

import DesktopLayout from "@/components/layout/desktop-layout";

export default function SettingsPage() {
  return (
    <DesktopLayout>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">
            Settings
          </h1>

          <p className="text-slate-400 mt-2">
            Manage your account, preferences,
            security and AI settings.
          </p>
        </div>

        {/* Profile Settings */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">

          <h2 className="text-2xl font-bold mb-6">
            Profile Settings
          </h2>

          <div className="grid grid-cols-2 gap-6">

            <input
              defaultValue="Aarthi Valavan"
              className="bg-slate-800 border border-white/[0.08] rounded-xl p-3 text-white"
            />

            <input
              defaultValue="aarthi@gmail.com"
              className="bg-slate-800 border border-white/[0.08] rounded-xl p-3 text-white"
            />

            <input
              defaultValue="+91 9876543210"
              className="bg-slate-800 border border-white/[0.08] rounded-xl p-3 text-white"
            />

            <input
              defaultValue="Bangalore"
              className="bg-slate-800 border border-white/[0.08] rounded-xl p-3 text-white"
            />

          </div>

          <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)] rounded-xl text-white font-semibold">
            Save Changes
          </button>

        </div>

        {/* Account + Notifications */}

        <div className="grid grid-cols-2 gap-6">

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">

            <h2 className="text-xl font-bold mb-6">
              Account Preferences
            </h2>

            <div className="space-y-4">

              <label className="flex justify-between">
                <span>Public Profile</span>
                <input type="checkbox" defaultChecked />
              </label>

              <label className="flex justify-between">
                <span>Available For Work</span>
                <input type="checkbox" defaultChecked />
              </label>

              <label className="flex justify-between">
                <span>Show Earnings</span>
                <input type="checkbox" />
              </label>

            </div>

          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">

            <h2 className="text-xl font-bold mb-6">
              Notification Settings
            </h2>

            <div className="space-y-4">

              <label className="flex justify-between">
                <span>Email Notifications</span>
                <input type="checkbox" defaultChecked />
              </label>

              <label className="flex justify-between">
                <span>Task Updates</span>
                <input type="checkbox" defaultChecked />
              </label>

              <label className="flex justify-between">
                <span>Payment Alerts</span>
                <input type="checkbox" defaultChecked />
              </label>

              <label className="flex justify-between">
                <span>AI Recommendations</span>
                <input type="checkbox" defaultChecked />
              </label>

            </div>

          </div>

        </div>

        {/* Security */}

        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">

          <h2 className="text-2xl font-bold mb-6">
            Security Settings
          </h2>

          <div className="grid grid-cols-3 gap-6">

            <input
              type="password"
              placeholder="Current Password"
              className="bg-slate-800 border border-white/[0.08] rounded-xl p-3 text-white"
            />

            <input
              type="password"
              placeholder="New Password"
              className="bg-slate-800 border border-white/[0.08] rounded-xl p-3 text-white"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="bg-slate-800 border border-white/[0.08] rounded-xl p-3 text-white"
            />

          </div>

          <button className="mt-6 px-6 py-3 bg-green-600 rounded-xl text-white font-semibold">
            Update Password
          </button>

        </div>

        {/* AI Preferences + Insight */}

        <div className="grid grid-cols-2 gap-6">

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">

            <h2 className="text-xl font-bold mb-6">
              AI Preferences
            </h2>

            <div className="space-y-4">

              <label className="flex justify-between">
                <span>Career Guidance</span>
                <input type="checkbox" defaultChecked />
              </label>

              <label className="flex justify-between">
                <span>Skill Suggestions</span>
                <input type="checkbox" defaultChecked />
              </label>

              <label className="flex justify-between">
                <span>Salary Forecast</span>
                <input type="checkbox" defaultChecked />
              </label>

              <label className="flex justify-between">
                <span>Market Insights</span>
                <input type="checkbox" defaultChecked />
              </label>

            </div>

          </div>

          <div className="rounded-3xl border border-purple-500/20 shadow-[0_0_40px_rgba(124,58,237,0.15)] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">

            <h2 className="text-xl font-bold mb-6">
              AI Settings Insight
            </h2>

            <h3 className="text-4xl font-bold text-green-400">
              94%
            </h3>

            <p className="text-slate-400 mt-2">
              Profile Optimization Score
            </p>

            <div className="mt-6 space-y-3">

              <p>✓ Career Guidance Enabled</p>
              <p>✓ Market Insights Enabled</p>
              <p>✓ Salary Forecast Enabled</p>

            </div>

          </div>

        </div>

      </div>
    </DesktopLayout>
  );
}