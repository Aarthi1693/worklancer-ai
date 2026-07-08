"use client";

import DesktopLayout from "@/components/layout/desktop-layout";
import {
  TrendingUp,
  BadgeDollarSign,
  Rocket,
  Award,
} from "lucide-react";

const strongSkills = [
  { name: "React.js", value: 95 },
  { name: "Next.js", value: 92 },
  { name: "UI/UX Design", value: 98 },
];

const improveSkills = [
  { name: "Node.js", value: 60 },
  { name: "Cloud Computing", value: 45 },
  { name: "System Design", value: 55 },
];

const certifications = [
  {
    title: "Google UX Design",
    impact: "High",
    duration: "3 Months",
    value: "+12%",
    difficulty: "Easy",
    completion: "95%",
  },
  {
    title: "AWS Solutions Architect",
    impact: "Very High",
    duration: "4 Months",
    value: "+18%",
    difficulty: "Medium",
    completion: "88%",
  },
  {
    title: "Meta Frontend Developer",
    impact: "High",
    duration: "2 Months",
    value: "+10%",
    difficulty: "Easy",
    completion: "91%",
  },
];

export default function AICareerPage() {
  return (
    <DesktopLayout>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">
            AI Career Intelligence
          </h1>

          <p className="text-slate-400 mt-2">
            Personalized AI-powered career growth analysis.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6">

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <div className="flex justify-between items-center">
              <p className="text-slate-400 text-sm">
                Market Demand
              </p>

              <TrendingUp className="text-green-400" />
            </div>

            <h2 className="text-3xl font-bold text-green-400 mt-4">
              94%
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <div className="flex justify-between items-center">
              <p className="text-slate-400 text-sm">
                Salary Forecast
              </p>

              <BadgeDollarSign className="text-blue-400" />
            </div>

            <h2 className="text-3xl font-bold text-blue-400 mt-4">
              ₹14 LPA
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <div className="flex justify-between items-center">
              <p className="text-slate-400 text-sm">
                Career Growth
              </p>

              <Rocket className="text-purple-400" />
            </div>

            <h2 className="text-3xl font-bold text-purple-400 mt-4">
              +22%
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <div className="flex justify-between items-center">
              <p className="text-slate-400 text-sm">
                Industry Ranking
              </p>

              <Award className="text-yellow-400" />
            </div>

            <h2 className="text-3xl font-bold text-yellow-400 mt-4">
              Top 8%
            </h2>
          </div>

        </div>

        {/* Skills */}
        <div className="grid grid-cols-2 gap-6">

          <div className="rounded-3xl border border-green-500/20 bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <h2 className="text-2xl font-bold mb-6 text-green-400">
              Strong Skills
            </h2>

            <div className="space-y-5">
              {strongSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span>{skill.name}</span>
                    <span>{skill.value}%</span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-700">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-1000"
                      style={{
                        width: `${skill.value}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-yellow-500/20 bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">
              Skills To Improve
            </h2>

            <div className="space-y-5">
              {improveSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span>{skill.name}</span>
                    <span>{skill.value}%</span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-700">
                    <div
                      className="h-2 rounded-full bg-yellow-500"
                      style={{
                        width: `${skill.value}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Market Demand */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] overflow-hidden">

          <div className="p-6 border-b border-white/[0.08]">
            <h2 className="text-2xl font-bold">
              Market Demand Analysis
            </h2>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="p-4 text-left">Skill</th>
                <th className="p-4 text-left">Demand</th>
                <th className="p-4 text-left">Trend</th>
              </tr>
            </thead>

            <tbody>
              {[
                ["React.js", "High", "↑"],
                ["Next.js", "High", "↑"],
                ["AI Integration", "Very High", "↑↑"],
                ["UI/UX Design", "High", "↑"],
                ["Cloud Computing", "Medium", "→"],
              ].map(([skill, demand, trend]) => (
                <tr
                  key={skill}
                  className="border-b border-white/5"
                >
                  <td className="p-4">{skill}</td>
                  <td className="p-4">{demand}</td>
                  <td className="p-4 text-green-400">
                    {trend}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

        {/* Salary Prediction */}
        <div
          className="
            rounded-3xl
            border
            border-green-500/20
            bg-gradient-to-r
            from-green-500/5
            to-emerald-500/5
            p-8
          "
        >
          <h2 className="text-2xl font-bold mb-6">
            Salary Prediction
          </h2>

          <div className="grid grid-cols-3 gap-6">

            <div>
              <p className="text-slate-400">
                Current Salary
              </p>

              <h3 className="text-4xl font-bold mt-2">
                ₹9 LPA
              </h3>
            </div>

            <div>
              <p className="text-slate-400">
                Potential Salary
              </p>

              <h3 className="text-4xl font-bold text-green-400 mt-2">
                ₹14 LPA
              </h3>
            </div>

            <div>
              <p className="text-slate-400">
                Growth Opportunity
              </p>

              <h3 className="text-4xl font-bold text-blue-400 mt-2">
                +55%
              </h3>
            </div>

          </div>
        </div>

        {/* Certifications */}
        <div className="grid grid-cols-3 gap-6">

          {certifications.map((cert) => (
            <div
              key={cert.title}
              className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6"
            >
              <h3 className="text-xl font-bold">
                {cert.title}
              </h3>

              <div className="space-y-2 mt-5 text-sm">

                <p>Impact: {cert.impact}</p>
                <p>Difficulty: {cert.difficulty}</p>
                <p>Duration: {cert.duration}</p>

                <p className="text-green-400">
                  Market Value: {cert.value}
                </p>

                <p className="text-blue-400">
                  Completion Rate: {cert.completion}
                </p>

              </div>
            </div>
          ))}

        </div>

        {/* Roadmap */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
          <h2 className="text-2xl font-bold mb-6">
            AI Career Roadmap
          </h2>

          <div className="grid grid-cols-4 gap-4">

            {[
              ["2026", "Advanced Next.js"],
              ["2027", "System Design"],
              ["2028", "AI Product Architect"],
              ["2029", "Senior Product Consultant"],
            ].map(([year, role]) => (
              <div
                key={year}
                className="rounded-2xl border border-white/[0.08] p-5 text-center"
              >
                <h3 className="text-blue-400 font-bold">
                  {year}
                </h3>

                <p className="mt-3">
                  {role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Intelligence Report */}
        <div
          className="
            rounded-3xl
            border
            border-blue-500/30
            bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
            p-6
            shadow-[0_0_30px_rgba(59,130,246,0.15)]
          "
        >
          <h2 className="text-2xl font-bold mb-6">
            AI Career Intelligence Report
          </h2>

          <div className="grid grid-cols-2 gap-6">

            <div>
              <p>Profile Strength: 92/100</p>
              <p className="mt-3">Industry Ranking: Top 8%</p>
              <p className="mt-3">Hiring Probability: 89%</p>
            </div>

            <div>
              <p>Recommended Focus:</p>
              <p className="text-blue-400 mt-2">
                Advanced Next.js + Cloud Computing
              </p>

              <p className="mt-4">
                Expected Salary Growth:
                <span className="text-green-400 ml-2">
                  +22%
                </span>
              </p>
            </div>

          </div>
        </div>

        {/* Career Score */}
        <div className="rounded-3xl border border-purple-500/20 bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
          <h2 className="text-2xl font-bold mb-6">
            AI Career Score
          </h2>

          <div className="flex items-center gap-6 mb-8">

            <div className="text-6xl font-bold text-purple-400">
              88
            </div>

            <div>
              <p className="text-slate-400">
                Overall Career Readiness Score
              </p>

              <p className="mt-2">
                Excellent growth potential detected.
              </p>
            </div>

          </div>

          <div className="space-y-5">

            {[
              ["Technical Skills", 92],
              ["Market Readiness", 89],
              ["Communication", 95],
              ["Leadership Potential", 76],
            ].map(([title, score]) => (
              <div key={title}>
                <div className="flex justify-between mb-2">
                  <span>{title}</span>
                  <span>{score}%</span>
                </div>

                <div className="h-2 bg-slate-700 rounded-full">
                  <div
                    className="h-2 bg-purple-500 rounded-full"
                    style={{
                      width: `${score}%`,
                    }}
                  />
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </DesktopLayout>
  );
}