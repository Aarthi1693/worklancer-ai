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
  Brain,
  Sparkles,
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
}

export default function AICareerPage() {
  const [loading, setLoading] = useState(true);

  const [career, setCareer] =
    useState<CareerAnalysis | null>(null);

  useEffect(() => {
    loadCareer();
  }, []);

  async function loadCareer() {
    try {
      const user = JSON.parse(
        Cookies.get("user") || "{}"
      );

      const data =
        await careerAIService.analyze(user.id);

      setCareer(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <DesktopLayout>
        <div className="flex justify-center items-center h-[70vh] text-white text-xl">
          Generating AI Career Report...
        </div>
      </DesktopLayout>
    );
  }

  if (!career) {
    return (
      <DesktopLayout>
        <div className="flex justify-center items-center h-[70vh] text-red-400">
          Failed to load AI Report.
        </div>
      </DesktopLayout>
    );
  }

  return (
    <DesktopLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold text-white">
            AI Career Intelligence
          </h1>

          <p className="text-slate-400 mt-2">
            Personalized career analysis powered by Gemini AI
          </p>
        </div>
        <p className="text-slate-400 mt-2">
  Personalized career analysis powered by Gemini AI
</p>
        {/* KPI Cards */}

        <div className="grid lg:grid-cols-4 gap-6">

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">
                Market Demand
              </span>

              <TrendingUp className="text-green-400" />
            </div>

            <h2 className="text-4xl font-bold text-green-400 mt-4">
              {career.marketDemand}%
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">
                Future Salary
              </span>

              <BadgeDollarSign className="text-blue-400" />
            </div>

            <h2 className="text-3xl font-bold text-blue-400 mt-4">
              {career.salaryPrediction.future}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">
                Career Score
              </span>

              <Rocket className="text-purple-400" />
            </div>

            <h2 className="text-4xl font-bold text-purple-400 mt-4">
              {career.careerScore}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">
                AI Rating
              </span>

              <Award className="text-yellow-400" />
            </div>

            <h2 className="text-4xl font-bold text-yellow-400 mt-4">
              ★★★★★
            </h2>
          </div>

        </div>

        {/* Skills */}

        <div className="grid lg:grid-cols-2 gap-8">

          <div className="rounded-3xl border border-green-500/30 bg-white/[0.03] p-8">

            <div className="flex items-center gap-3 mb-8">

              <Brain className="text-green-400" />

              <h2 className="text-2xl font-bold text-green-400">
                Strong Skills
              </h2>

            </div>

            <div className="space-y-6">

              {career.strongSkills.map((skill, index) => (

                <div key={index}>

                  <div className="flex justify-between mb-2">

                    <span className="text-white">
                      {skill}
                    </span>

                    <span className="text-green-400">
                      {95 - index * 5}%
                    </span>

                  </div>

                  <div className="h-2 rounded-full bg-slate-700">

                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                      style={{
                        width: `${95 - index * 5}%`,
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>

          <div className="rounded-3xl border border-yellow-500/30 bg-white/[0.03] p-8">

            <div className="flex items-center gap-3 mb-8">

              <Sparkles className="text-yellow-400" />

              <h2 className="text-2xl font-bold text-yellow-400">
                Skills To Improve
              </h2>

            </div>

            <div className="space-y-6">

              {career.skillsToImprove.map((skill, index) => (

                <div key={index}>

                  <div className="flex justify-between mb-2">

                    <span className="text-white">
                      {skill}
                    </span>

                    <span className="text-yellow-400">
                      {60 - index * 5}%
                    </span>

                  </div>

                  <div className="h-2 rounded-full bg-slate-700">

                    <div
                      className="h-2 rounded-full bg-yellow-500"
                      style={{
                        width: `${60 - index * 5}%`,
                      }}
                    />

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>
                {/* Salary Prediction */}

        <div className="rounded-3xl border border-cyan-500/20 bg-white/[0.03] p-8">

          <h2 className="text-3xl font-bold text-white mb-8">
            Salary Prediction
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div>
              <p className="text-slate-400">
                Current Salary
              </p>

              <h3 className="text-4xl font-bold mt-2">
                {career.salaryPrediction.current}
              </h3>
            </div>

            <div>
              <p className="text-slate-400">
                Potential Salary
              </p>

              <h3 className="text-4xl font-bold text-green-400 mt-2">
                {career.salaryPrediction.future}
              </h3>
            </div>

            <div>
              <p className="text-slate-400">
                Market Demand
              </p>

              <h3 className="text-4xl font-bold text-blue-400 mt-2">
                {career.marketDemand}%
              </h3>
            </div>

          </div>

        </div>

        {/* AI Career Roadmap */}

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">

          <h2 className="text-3xl font-bold text-white mb-8">
            AI Career Roadmap
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {career.roadmap.map((step, index) => (

              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-slate-900/40 p-6"
              >

                <div className="text-blue-400 font-bold text-xl mb-4">
                  Stage {index + 1}
                </div>

                <p className="text-slate-300 leading-relaxed">
                  {step}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* AI Career Report */}

        <div className="rounded-3xl border border-blue-500/20 bg-white/[0.03] p-8">

          <h2 className="text-3xl font-bold text-white mb-6">
            AI Career Intelligence Report
          </h2>

          <p className="text-slate-300 leading-8 whitespace-pre-line">
            {career.report}
          </p>

        </div>

        {/* AI Suggestions */}

        <div className="rounded-3xl border border-purple-500/20 bg-white/[0.03] p-8">

          <h2 className="text-3xl font-bold text-white mb-8">
            AI Recommendations
          </h2>

          <div className="space-y-4">

            {career.suggestions.map((item, index) => (

              <div
                key={index}
                className="rounded-xl bg-slate-900/40 border border-white/10 p-5 flex gap-4"
              >

                <div className="text-green-400 font-bold">
                  ✓
                </div>

                <p className="text-slate-300">
                  {item}
                </p>

              </div>

            ))}

          </div>

        </div>
              </div>
    </DesktopLayout>
  );
}