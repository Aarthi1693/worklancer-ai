"use client";

import { useEffect, useState } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";
import careerAIService from "@/services/career-ai.service";
import Cookies from "js-cookie";

import {
  TrendingUp,
  BadgeDollarSign,
  Rocket,
  Award,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface CareerAnalysis {
  careerScore: number;
  marketDemand: number;

  salaryPrediction: {
    current: string;
    future: string;
  };

  strongSkills: string[];

  skillsToImprove: string[];

  roadmap: string[];

  report: string;

  suggestions: string[];

  futureSalary?: string;

  aiRating?: number;

  expectedGrowth?: string;

  productivityScore?: number;

  skillMatch?: number;

  earningsForecast?: string;

  clientRating?: number;

  careerInsights?: string[];

  interviewReadiness?: {
    technical: number;
    communication: number;
    problemSolving: number;
    leadership: number;
    overall: number;
  };
}

const DEMO_CAREER: CareerAnalysis = {
  careerScore: 91,
  marketDemand: 87,
  salaryPrediction: {
    current: "₹4.5 LPA",
    future: "₹9.8 LPA",
  },
  futureSalary: "₹9.8 LPA",
  aiRating: 4.8,
  expectedGrowth: "+118%",
  strongSkills: [
    "React.js",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "UI/UX Design",
    "REST API Integration",
    "Git & GitHub",
    "Problem Solving",
  ],
  skillsToImprove: [
    "System Design",
    "Node.js",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Cloud Computing",
    "AI Prompt Engineering",
    "Testing",
  ],
  roadmap: [
    "Student",
    "Frontend Developer",
    "Full Stack Developer",
    "Senior Software Engineer",
    "Technical Lead",
  ],
  report:
    "High demand for Full Stack Developers. Excellent React and Next.js proficiency. Strong UI/UX development skills. Good communication and teamwork. Recommended salary range: ₹8 LPA – ₹12 LPA.",
  suggestions: [
    "Learn System Design.",
    "Improve Node.js skills.",
    "Practice DSA regularly.",
    "Complete Azure or AWS certification.",
    "Build two full-stack projects.",
    "Contribute to open-source projects.",
  ],
  productivityScore: 82,
  skillMatch: 91,
  earningsForecast: "₹9.8 LPA",
  clientRating: 4.9,
  careerInsights: [
    "High demand for Full Stack Developers.",
    "Excellent React and Next.js proficiency.",
    "Strong UI/UX development skills.",
    "Good communication and teamwork.",
    "Recommended salary range: ₹8 LPA – ₹12 LPA.",
  ],
  interviewReadiness: {
    technical: 90,
    communication: 82,
    problemSolving: 88,
    leadership: 70,
    overall: 87,
  },
};

function resolveCareer(
  data: CareerAnalysis | null
): CareerAnalysis {
  if (!data) return DEMO_CAREER;

  return {
    ...DEMO_CAREER,
    ...data,
    salaryPrediction: {
      ...DEMO_CAREER.salaryPrediction,
      ...(data.salaryPrediction || {}),
    },
    interviewReadiness: {
      technical: data.interviewReadiness?.technical ?? DEMO_CAREER.interviewReadiness!.technical,
      communication: data.interviewReadiness?.communication ?? DEMO_CAREER.interviewReadiness!.communication,
      problemSolving: data.interviewReadiness?.problemSolving ?? DEMO_CAREER.interviewReadiness!.problemSolving,
      leadership: data.interviewReadiness?.leadership ?? DEMO_CAREER.interviewReadiness!.leadership,
      overall: data.interviewReadiness?.overall ?? DEMO_CAREER.interviewReadiness!.overall,
    },
  };
}

export default function AICareerPage() {
  const [loading, setLoading] = useState(true);
  const [rawCareer, setRawCareer] = useState<CareerAnalysis | null>(null);

  async function loadCareer() {
    try {
      const user = JSON.parse(
        Cookies.get("user") || "{}"
      );

      const data =
        await careerAIService.analyze(user.id);

      setRawCareer(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCareer();
  }, []);

  const career = resolveCareer(rawCareer);

  if (loading) {
    return (
      <DesktopLayout>
        <div className="flex justify-center items-center h-[70vh] text-white text-xl">
          Generating AI Career Report...
        </div>
      </DesktopLayout>
    );
  }

  const interviewMetrics = [
    { label: "Technical Skills", value: career.interviewReadiness?.technical ?? 90 },
    { label: "Communication", value: career.interviewReadiness?.communication ?? 82 },
    { label: "Problem Solving", value: career.interviewReadiness?.problemSolving ?? 88 },
    { label: "Leadership", value: career.interviewReadiness?.leadership ?? 70 },
    { label: "Overall Readiness", value: career.interviewReadiness?.overall ?? 87 },
  ];

  const getEarningsNumber = (val?: string) => {
    if (!val) return 0;
    const match = val.match(/(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const earningsPercent = Math.min((getEarningsNumber(career.earningsForecast) / 20) * 100, 100);
  const clientRatingPercent = ((career.clientRating ?? 4.9) / 5) * 100;

  const sidebarMetrics = [
    { label: "Productivity Score", value: `${career.productivityScore ?? 82}%`, percent: career.productivityScore ?? 82 },
    { label: "Skill Match", value: `${career.skillMatch ?? 91}%`, percent: career.skillMatch ?? 91 },
    { label: "Earnings Forecast", value: career.earningsForecast ?? "₹9.8 LPA", percent: earningsPercent },
    { label: "Client Rating", value: `${career.clientRating ?? 4.9} / 5`, percent: clientRatingPercent },
  ];

  return (
    <DesktopLayout>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">
            AI Career Intelligence
          </h1>
          <p className="text-slate-400 mt-2">
            Personalized career analysis powered by Gemini AI
          </p>
        </div>

        {/* Section 1: KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: "Market Demand",
              value: `${career.marketDemand ?? 87}%`,
              icon: <TrendingUp className="text-green-400" size={24} />,
              color: "text-green-400",
              bg: "bg-green-500/15",
            },
            {
              title: "Future Salary",
              value: career.salaryPrediction?.future ?? career.futureSalary ?? "₹9.8 LPA",
              icon: <BadgeDollarSign className="text-blue-400" size={24} />,
              color: "text-blue-400",
              bg: "bg-blue-500/15",
            },
            {
              title: "Career Score",
              value: `${career.careerScore ?? 91}/100`,
              icon: <Rocket className="text-purple-400" size={24} />,
              color: "text-purple-400",
              bg: "bg-purple-500/15",
            },
            {
              title: "AI Rating",
              value: `${(career.aiRating ?? 4.8).toFixed(1)}/5`,
              icon: <Award className="text-yellow-400" size={24} />,
              color: "text-yellow-400",
              bg: "bg-yellow-500/15",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="
                h-full rounded-3xl border border-white/[0.08] bg-white/[0.03]
                backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
                p-6 flex flex-col justify-between
                hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(59,130,246,0.15)]
                transition-all duration-300
              "
            >
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm font-medium">{card.title}</span>
                <div className={`h-10 w-10 rounded-xl ${card.bg} flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.15)]`}>
                  {card.icon}
                </div>
              </div>
              <h3 className={`text-3xl font-bold mt-4 ${card.color}`}>
                {card.value}
              </h3>
            </div>
          ))}
        </div>

        {/* Section 2: Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6 hover:shadow-[0_0_60px_rgba(59,130,246,0.12)] transition-all duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-xl bg-green-500/15 flex items-center justify-center">
                <TrendingUp className="text-green-400" size={20} />
              </div>
              <h2 className="text-xl font-bold text-green-400">Strong Skills</h2>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {career.strongSkills?.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full border border-green-500/40 bg-green-500/10 px-4 py-1.5 text-sm text-green-300 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6 hover:shadow-[0_0_60px_rgba(59,130,246,0.12)] transition-all duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-xl bg-yellow-500/15 flex items-center justify-center">
                <Award className="text-yellow-400" size={20} />
              </div>
              <h2 className="text-xl font-bold text-yellow-400">Skills To Improve</h2>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {career.skillsToImprove?.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full border border-yellow-500/40 bg-yellow-500/10 px-4 py-1.5 text-sm text-yellow-300 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Salary Prediction */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6 hover:shadow-[0_0_60px_rgba(59,130,246,0.12)] transition-all duration-300">
          <h2 className="text-2xl font-bold text-white mb-6">Salary Prediction</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Current Salary", value: career.salaryPrediction?.current ?? "₹4.5 LPA", desc: "Based on market analysis" },
              { title: "Potential Salary", value: career.salaryPrediction?.future ?? career.futureSalary ?? "₹9.8 LPA", desc: "With skill upgrades", color: "text-green-400" },
              { title: "Market Demand", value: `${career.marketDemand ?? 87}%`, desc: "Industry demand index", color: "text-blue-400" },
              { title: "Expected Growth", value: career.expectedGrowth ?? "+118%", desc: "Projected annual growth", color: "text-purple-400" },
            ].map((stat) => (
              <div key={stat.title}>
                <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                <h3 className={`text-3xl font-bold mt-2 ${stat.color ?? "text-white"}`}>{stat.value}</h3>
                <p className="text-slate-500 text-xs mt-1">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Career Overview */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6 hover:shadow-[0_0_60px_rgba(59,130,246,0.12)] transition-all duration-300">
          <h2 className="text-2xl font-bold text-white mb-6">Career Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sidebarMetrics.map((item) => (
              <div key={item.label} className="p-4 rounded-2xl bg-slate-900/40 border border-white/[0.08]">
                <p className="text-slate-400 text-sm mb-3">{item.label}</p>
                <div className="h-2 rounded-full bg-slate-700/80 overflow-hidden mb-3">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-1000"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
                <span className="text-lg font-semibold text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Career Roadmap */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6 hover:shadow-[0_0_60px_rgba(59,130,246,0.12)] transition-all duration-300">
          <h2 className="text-2xl font-bold text-white mb-8">Career Roadmap</h2>
          <div className="flex items-center justify-between overflow-x-auto pb-2">
            {career.roadmap?.map((step, index) => (
              <>
                <div key={step} className="flex flex-col items-center text-center min-w-[130px]">
                  <div className="h-16 w-16 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {index + 1}
                  </div>
                  <p className="text-slate-300 mt-3 font-medium text-sm">{step}</p>
                </div>
                {index < (career.roadmap?.length ?? 0) - 1 && (
                  <div className="flex-1 flex items-center justify-center px-1 min-w-[32px]">
                    <ArrowRight className="text-slate-500" size={20} />
                  </div>
                )}
              </>
            ))}
          </div>
        </div>

        {/* Section 6: Interview Readiness */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6 hover:shadow-[0_0_60px_rgba(59,130,246,0.12)] transition-all duration-300">
          <h2 className="text-2xl font-bold text-white mb-6">Interview Readiness</h2>
          <div className="space-y-5">
            {interviewMetrics.map((metric) => (
              <div key={metric.label}>
                <div className="flex justify-between mb-2">
                  <span className="text-white font-medium">{metric.label}</span>
                  <span className="text-cyan-400 font-semibold">{metric.value}%</span>
                </div>
                <div className="h-3 rounded-full bg-slate-700/80 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-1000"
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 7: Career Insights */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6 hover:shadow-[0_0_60px_rgba(59,130,246,0.12)] transition-all duration-300">
          <h2 className="text-2xl font-bold text-white mb-6">Career Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {career.careerInsights?.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 bg-slate-900/40 border border-white/[0.08] rounded-xl p-4 hover:border-cyan-500/30 transition-all duration-300">
                <CheckCircle2 className="text-cyan-400 mt-0.5 shrink-0" size={18} />
                <p className="text-slate-300 text-sm leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 8: AI Career Intelligence Report */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6 hover:shadow-[0_0_60px_rgba(59,130,246,0.12)] transition-all duration-300">
          <h2 className="text-2xl font-bold text-white mb-4">AI Career Intelligence Report</h2>
          <p className="text-slate-300 leading-[1.8] whitespace-pre-line text-[15px]">
            {career.report ?? "No report available"}
          </p>
        </div>

        {/* Section 9: AI Recommendations */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6 hover:shadow-[0_0_60px_rgba(59,130,246,0.12)] transition-all duration-300">
          <h2 className="text-2xl font-bold text-white mb-6">AI Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {career.suggestions?.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-slate-900/40 border border-white/[0.08] rounded-2xl p-5 hover:border-green-500/30 transition-all duration-300"
              >
                <div className="mt-0.5 shrink-0">
                  <CheckCircle2 className="text-green-400" size={20} />
                </div>
                <p className="text-slate-300 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DesktopLayout>
  );
}
