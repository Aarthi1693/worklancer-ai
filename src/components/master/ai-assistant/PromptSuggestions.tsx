"use client";

import {
  User,
  Briefcase,
  FileText,
  GraduationCap,
  MessageSquare,
  BrainCircuit,
} from "lucide-react";

const prompts = [
  {
    icon: User,
    title: "Improve My Profile",
    description: "Get AI suggestions to strengthen your freelancer profile.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Briefcase,
    title: "Find High-Paying Tasks",
    description: "Discover projects that best match your skills.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: FileText,
    title: "Review My Proposal",
    description: "Optimize your proposal to improve acceptance chances.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: GraduationCap,
    title: "Learning Roadmap",
    description: "Generate a personalized learning plan.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: MessageSquare,
    title: "Mock Interview",
    description: "Practice technical and HR interview questions.",
    color: "bg-pink-100 text-pink-600",
  },
  {
    icon: BrainCircuit,
    title: "Analyze My Skills",
    description: "Identify strengths and skills to improve.",
    color: "bg-cyan-100 text-cyan-600",
  },
];

export default function PromptSuggestions() {
  return (
    <div>
      <h2 className="mb-5 text-xl font-bold text-slate-900">
        Suggested Prompts
      </h2>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {prompts.map((prompt) => {
          const Icon = prompt.icon;

          return (
            <button
              key={prompt.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${prompt.color}`}
              >
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                {prompt.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {prompt.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}