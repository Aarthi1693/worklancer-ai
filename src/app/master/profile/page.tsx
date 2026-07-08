"use client";

import { useState } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";

const projects = [
  {
    name: "WorkLancer AI",
    tech: "Next.js + AI",
    date: "May 2026",
    rating: "★★★★★",
  },
  {
    name: "Smart Analytics Dashboard",
    tech: "React + Charts",
    date: "March 2026",
    rating: "★★★★★",
  },
  {
    name: "AI Resume Builder",
    tech: "Next.js + OpenAI",
    date: "January 2026",
    rating: "★★★★★",
  },
];

export default function ProfilePage() {
  const [showProjects, setShowProjects] = useState(false);

  const [showEditProfile, setShowEditProfile] =
    useState(false);

  const [selectedProject, setSelectedProject] =
    useState<(typeof projects)[0] | null>(null);

  return (
    <DesktopLayout>
      <div className="space-y-8">

        {/* Header */}

        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-8">

          <div className="flex items-center gap-6">

            <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold">
              A
            </div>

            <div>
              <h1 className="text-4xl font-bold text-white">
                Aarthi Valavan
              </h1>

              <p className="text-slate-400 mt-2">
                Senior UI/UX Designer & Frontend Engineer
              </p>

              <p className="text-slate-500 mt-1">
                Bengaluru, India
              </p>

              <p className="text-yellow-400 mt-2">
                ⭐ 4.9 / 5 Rating
              </p>
            </div>

          </div>

          <div className="flex gap-3 mt-8">

            <button
              onClick={() => setShowProjects(true)}
              className="
                px-5
                py-3
                rounded-xl
                border
                border-white/[0.08]
                hover:bg-white/5
              "
            >
              View Projects
            </button>

            <button
              onClick={() => setShowEditProfile(true)}
              className="
                px-5
                py-3
                rounded-xl
                border
                border-white/[0.08]
                hover:bg-white/5
              "
            >
              Edit Profile
            </button>

            <button
              onClick={() =>
                alert("Resume Download Started")
              }
              className="
                px-5
                py-3
                rounded-xl
                bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)]
                hover:from-blue-500 hover:to-purple-500
              "
            >
              Download Resume
            </button>

          </div>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6">

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400">
              Completed Projects
            </p>

            <h2 className="text-3xl font-bold text-green-400 mt-2">
              48
            </h2>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400">
              Total Earnings
            </p>

            <h2 className="text-3xl font-bold text-yellow-400 mt-2">
              ₹4.5L
            </h2>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400">
              Success Rate
            </p>

            <h2 className="text-3xl font-bold text-purple-400 mt-2">
              98%
            </h2>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400">
              AI Match Score
            </p>

            <h2 className="text-3xl font-bold text-blue-400 mt-2">
              94%
            </h2>
          </div>

        </div>

        {/* Skills */}

        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-8">

          <h2 className="text-2xl font-bold mb-6">
            Skills
          </h2>

          <div className="flex flex-wrap gap-3">

            {[
              "React",
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
              "UI/UX",
              "AI Integration",
            ].map((skill) => (
              <span
                key={skill}
                className="
                  px-4
                  py-2
                  rounded-xl
                  bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-1000/10
                  text-blue-400
                "
              >
                {skill}
              </span>
            ))}

          </div>

        </div>

        {/* Portfolio */}

        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-8">

          <h2 className="text-3xl font-bold mb-8">
            Portfolio Projects
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {projects.map((project) => (

              <div
                key={project.name}
                className="
                  rounded-3xl
                  border
                  border-white/[0.08]
                  p-6
                "
              >

                <h3 className="text-xl font-bold">
                  {project.name}
                </h3>

                <p className="text-slate-400 mt-3">
                  {project.tech}
                </p>

                <p className="text-yellow-400 mt-3">
                  {project.rating}
                </p>

                <p className="text-blue-400 mt-3">
                  {project.date}
                </p>

                <button
                  onClick={() =>
                    setSelectedProject(project)
                  }
                  className="
                    mt-4
                    px-5
                    py-2
                    rounded-xl
                    bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)]
                  "
                >
                  View Project
                </button>

              </div>

            ))}

          </div>

        </div>

        {/* AI Insights */}

        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-8">

          <h2 className="text-2xl font-bold mb-6">
            🤖 AI Career Insights
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div>
              <p className="text-slate-400">
                Market Demand
              </p>

              <h3 className="text-green-400 text-xl font-bold mt-2">
                High
              </h3>
            </div>

            <div>
              <p className="text-slate-400">
                Recommended Skill
              </p>

              <h3 className="text-blue-400 text-xl font-bold mt-2">
                AI Agents
              </h3>
            </div>

            <div>
              <p className="text-slate-400">
                Salary Forecast
              </p>

              <h3 className="text-purple-400 text-xl font-bold mt-2">
                ₹24 LPA
              </h3>
            </div>

            <div>
              <p className="text-slate-400">
                Growth Potential
              </p>

              <h3 className="text-yellow-400 text-xl font-bold mt-2">
                Excellent
              </h3>
            </div>

          </div>

        </div>

        {/* Edit Profile Popup */}

        {showEditProfile && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="bg-slate-950 rounded-3xl border border-white/[0.08] p-8 w-[600px]">

              <h2 className="text-3xl font-bold mb-6">
                Edit Profile
              </h2>

              <div className="space-y-4">

                <input
                  defaultValue="Aarthi Valavan"
                  className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08]"
                />

                <input
                  defaultValue="Senior UI/UX Designer"
                  className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08]"
                />

                <input
                  defaultValue="Bengaluru, India"
                  className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08]"
                />

              </div>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() =>
                    setShowEditProfile(false)
                  }
                  className="flex-1 py-3 rounded-xl border border-white/[0.08]"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    alert(
                      "Profile Updated Successfully"
                    );
                    setShowEditProfile(false);
                  }}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                >
                  Save Changes
                </button>

              </div>

            </div>

          </div>
        )}

        {/* View Projects Popup */}

        {showProjects && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="bg-slate-950 rounded-3xl border border-white/[0.08] p-8 w-[700px]">

              <h2 className="text-3xl font-bold mb-6">
                My Projects
              </h2>

              {projects.map((project) => (
                <div
                  key={project.name}
                  className="border-b border-white/[0.08] py-4"
                >
                  <h3 className="font-bold">
                    {project.name}
                  </h3>

                  <p className="text-slate-400">
                    {project.tech}
                  </p>
                </div>
              ))}

              <button
                onClick={() =>
                  setShowProjects(false)
                }
                className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                >
                  Close
                </button>

            </div>

          </div>
        )}

        {/* Single Project Popup */}

        {selectedProject && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

            <div className="bg-slate-950 rounded-3xl border border-white/[0.08] p-8 w-[700px]">

              <h2 className="text-3xl font-bold">
                {selectedProject.name}
              </h2>

              <p className="text-slate-400 mt-4">
                {selectedProject.tech}
              </p>

              <p className="text-yellow-400 mt-4">
                {selectedProject.rating}
              </p>

              <p className="text-blue-400 mt-4">
                {selectedProject.date}
              </p>

              <p className="mt-6 text-slate-300">
                Successfully delivered through WorkLancer AI with excellent client feedback and high satisfaction.
              </p>

              <button
                onClick={() =>
                  setSelectedProject(null)
                }
                className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)]"
              >
                Close
              </button>

            </div>

          </div>
        )}

      </div>
    </DesktopLayout>
  );
}