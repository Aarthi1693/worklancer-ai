"use client";

import Image from "next/image";
import { BrainCircuit, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import heroImage from "@/assets/images/saved-ai-plans-hero.png";

export default function SavedPlansHeader() {
  const router = useRouter();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* Left Content */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            <BrainCircuit size={18} />
            AI Knowledge Center
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-900">
            Saved AI Plans
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Access, review, reuse, and manage all your AI-generated project
            roadmaps from one centralized workspace. Build a reusable knowledge
            base for future projects.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => router.push("/provider/ai-planning")}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              <Plus size={18} />
              Generate New Plan
            </button>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="flex justify-center lg:justify-end">
          <Image
            src={heroImage}
            alt="Saved AI Plans"
            width={500}
            height={380}
            className="h-auto w-full max-w-md object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}