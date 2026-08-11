"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import ApplicantsHero from "@/assets/images/applicants-hero.png";

export default function ApplicantsHeader() {
  const router = useRouter();

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
            📋 Candidate Review
          </span>

          <h1 className="mt-5 text-4xl font-bold text-slate-900">
            Project Applicants
          </h1>

          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
            Review applications, compare skills, evaluate AI recommendations,
            and assign the best professionals for your projects.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => router.push("/provider/my-projects")}
              className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Created Tasks
            </button>

            
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src={ApplicantsHero}
            alt="Applicants"
            className="max-h-[260px] w-auto object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}