"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import AssignedMastersHero from "@/assets/images/assigned-masters-hero.png";

export default function AssignedMastersHeader() {
  const router = useRouter();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* Left */}
        <div>
          <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
            👥 Team Management
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900">
            Assigned Masters
          </h1>

          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
            Monitor your assigned professionals, track project progress,
            communicate instantly, and manage submitted work from one
            centralized workspace.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {/* submitted work */}
            <button
              onClick={() => router.push("/provider/submitted-work")}
              className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Review Work
            </button>

          </div>
        </div>

        {/* Right */}
        <div className="flex justify-center">
          <Image
            src={AssignedMastersHero}
            alt="Assigned Masters"
            className="max-h-[260px] w-auto object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}