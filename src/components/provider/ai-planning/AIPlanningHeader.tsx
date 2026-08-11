"use client";

import Image from "next/image";
import AIPlanningHero from "@/assets/images/ai-planning-hero.png";

interface Props {
  onGenerate: () => void;
  loading: boolean;
}

export default function AIPlanningHeader({ onGenerate, loading }: Props) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="grid items-center gap-10 px-8 py-8 lg:grid-cols-2">

        {/* Left */}

        <div>

          <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
            🤖 AI Powered Project Management
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900">
            AI Project Planning
          </h1>

          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
            Generate intelligent project roadmaps, estimate timelines,
            recommend the ideal team, analyze project risks,
            and receive AI-driven insights to deliver successful projects
            faster and smarter.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <button
              onClick={onGenerate}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate AI Plan"}
            </button>

            

          </div>

        </div>

        {/* Right */}

        <div className="flex justify-center">

          <Image
            src={AIPlanningHero}
            alt="AI Planning"
            className="max-h-[270px] w-auto object-contain"
            priority
          />

        </div>

      </div>
    </div>
  );
}