"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import MyProjectsHero from "@/assets/images/my-projects-hero.png";

export default function MyProjectsHeader() {
  const router = useRouter();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-md">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        {/* Left */}
        <div>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-1 text-sm font-medium text-slate-700">
            📁 Project Management
          </span>

          <h1 className="mt-5 text-4xl font-bold text-slate-900">
            My Projects
          </h1>

          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
            Manage, monitor and track all your digital and on-field projects
            from one place. Stay updated with project progress, applicants and
            submissions.
          </p>

          <div className="mt-8">
            <button
              onClick={() => router.push("/provider/create-task")}
              className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700"
            >
              + Create New Project
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="flex justify-center lg:justify-end">
          <Image
            src={MyProjectsHero}
            alt="My Projects"
            priority
            className="h-[220px] w-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}