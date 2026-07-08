"use client";

import { useState } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  skillMatch: number;
  availability: string;
  rate: string;
  aiScore: number;
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "UI/UX Designer",
    skillMatch: 98,
    availability: "Available",
    rate: "₹500/hr",
    aiScore: 96,
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "Frontend Developer",
    skillMatch: 95,
    availability: "Available",
    rate: "₹700/hr",
    aiScore: 94,
  },
  {
    id: 3,
    name: "Arjun Patel",
    role: "AI Engineer",
    skillMatch: 91,
    availability: "Part-Time",
    rate: "₹1000/hr",
    aiScore: 92,
  },
];

export default function TeamPage() {
  const [selectedMember, setSelectedMember] =
    useState<TeamMember | null>(null);

  const [showSuccess, setShowSuccess] =
    useState(false);

  return (
    <DesktopLayout>
      <div className="space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">
            AI Team Recommendation Engine
          </h1>

          <p className="text-slate-400 mt-2">
            AI-selected professionals based on project requirements.
          </p>
        </div>

        {/* AI Summary */}
        <div
          className="
            rounded-3xl
            border
            border-purple-500/20 shadow-[0_0_40px_rgba(124,58,237,0.15)]
            bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
            backdrop-blur-xl
            p-6
          "
        >
          <h2 className="text-2xl font-bold mb-4">
            AI Recommendation Summary
          </h2>

          <div className="space-y-2 text-slate-300">
            <p>🎯 Team Success Prediction: 94%</p>
            <p>⚡ Estimated Completion Time: 21 Days</p>
            <p>🤖 Recommended Team Size: 3 Members</p>
            <p>💰 Estimated Cost: ₹85,000</p>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-6">

            <div className="rounded-xl border border-white/[0.08] p-4">
              <p className="text-slate-400 text-sm">
                Recommended Members
              </p>

              <h3 className="text-2xl font-bold mt-1">
                3
              </h3>
            </div>

            <div className="rounded-xl border border-white/[0.08] p-4">
              <p className="text-slate-400 text-sm">
                Avg AI Score
              </p>

              <h3 className="text-2xl font-bold mt-1 text-blue-400">
                94%
              </h3>
            </div>

            <div className="rounded-xl border border-white/[0.08] p-4">
              <p className="text-slate-400 text-sm">
                Avg Skill Match
              </p>

              <h3 className="text-2xl font-bold mt-1 text-green-400">
                95%
              </h3>
            </div>

            <div className="rounded-xl border border-white/[0.08] p-4">
              <p className="text-slate-400 text-sm">
                Project Success
              </p>

              <h3 className="text-2xl font-bold mt-1 text-purple-400">
                94%
              </h3>
            </div>

          </div>
        </div>

        {/* Team Members */}
        <div className="space-y-4">

          {teamMembers.map((member) => (

            <div
              key={member.id}
              className="
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
                backdrop-blur-xl
                p-5
              "
            >

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="text-xl font-semibold">
                    {member.name}
                  </h3>

                  <p className="text-slate-400 text-sm">
                    {member.role}
                  </p>
                </div>

                <div className="text-green-400 font-semibold">
                  {member.skillMatch}% Match
                </div>

              </div>

              <div className="grid grid-cols-3 gap-6 mt-4">

                <div>
                  <p className="text-xs text-slate-500">
                    Availability
                  </p>

                  <p className="mt-1">
                    {member.availability}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Hourly Rate
                  </p>

                  <p className="mt-1">
                    {member.rate}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    AI Score
                  </p>

                  <p className="mt-1 text-blue-400">
                    {member.aiScore}%
                  </p>
                </div>

              </div>

              <div className="mt-4">

                <div className="flex justify-between text-sm mb-2">
                  <span>Skill Match</span>
                  <span>{member.skillMatch}%</span>
                </div>

                <div className="h-2 rounded-full bg-slate-700">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-1000"
                    style={{
                      width: `${member.skillMatch}%`,
                    }}
                  />
                </div>

              </div>

              <div className="mt-5 flex justify-end">

                <button
                  onClick={() =>
                    setSelectedMember(member)
                  }
                  className="
                    px-4
                    py-2
                    rounded-xl
                    bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)]
                    hover:from-blue-500 hover:to-purple-500
                    transition
                  "
                >
                  Invite To Project
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* Invite Popup */}
        {selectedMember && (
          <div
            className="
              fixed
              inset-0
              bg-black/60
              backdrop-blur-sm
              flex
              items-center
              justify-center
              z-50
            "
          >
            <div
              className="
                w-[500px]
                rounded-3xl
                bg-slate-950
                border
                border-white/[0.08]
                p-8
              "
            >
              <h2 className="text-2xl font-bold mb-6">
                Team Invitation
              </h2>

              <div className="space-y-4">

                <div>
                  <p className="text-slate-500">
                    Team Member
                  </p>

                  <p className="text-white">
                    {selectedMember.name}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">
                    Role
                  </p>

                  <p className="text-white">
                    {selectedMember.role}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">
                    AI Score
                  </p>

                  <p className="text-blue-400">
                    {selectedMember.aiScore}%
                  </p>
                </div>

              </div>

              <div className="flex gap-3 mt-8">

                <button
                  onClick={() =>
                    setSelectedMember(null)
                  }
                  className="
                    flex-1
                    py-3
                    rounded-xl
                    border
                    border-white/[0.08]
                  "
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    setSelectedMember(null);
                    setShowSuccess(true);

                    setTimeout(() => {
                      setShowSuccess(false);
                    }, 2000);
                  }}
                  className="
                    flex-1
                    py-3
                    rounded-xl
                    bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)]
                  "
                >
                  Assign To Project
                </button>

              </div>

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
                🎉
              </div>

              <h2 className="text-2xl font-bold text-green-400">
                Invitation Sent
              </h2>

              <p className="text-slate-400 mt-3">
                Team member has been assigned successfully.
              </p>
            </div>
          </div>
        )}

      </div>
    </DesktopLayout>
  );
}