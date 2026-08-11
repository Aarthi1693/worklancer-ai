"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import CreateTaskHero from "@/assets/images/create-task-hero.png";

export default function CreateTaskHeader() {
  const router = useRouter();

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        {/* Left Content */}
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-blue-600">
            WORKLANCER AI
          </p>

          <h1 className="mt-4 text-5xl font-bold leading-tight text-slate-900">
            Create New Task 🚀
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Publish digital or on-field projects, define your requirements,
            budget, timeline and let AI help you connect with the most suitable
            professionals.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => router.push("/provider/ai-planning")}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              🤖 AI Planning
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end">
          <Image
            src={CreateTaskHero}
            alt="Create Task"
            width={520}
            height={360}
            priority
            className="h-auto w-[420px]"
          />
        </div>
      </div>
    </div>
  );
}