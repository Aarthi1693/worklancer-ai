"use client";

import { Bot, Sparkles } from "lucide-react";

export default function AssistantHeader() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

        {/* Left */}

        <div className="flex items-start gap-4">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
            <Bot className="h-8 w-8 text-blue-600" />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-900">
              AI Assistant
            </h1>

            <p className="mt-2 max-w-2xl text-slate-600 leading-7">
              Your intelligent career companion. Get personalized project
              recommendations, proposal improvements, interview preparation,
              learning guidance, and instant answers to help you succeed as a
              freelancer.
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2">

          <Sparkles className="h-5 w-5 text-green-600" />

          <span className="text-sm font-semibold text-green-700">
            AI Online
          </span>

        </div>

      </div>

    </div>
  );
}