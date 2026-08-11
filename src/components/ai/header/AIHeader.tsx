"use client";

import { Sparkles, X } from "lucide-react";

interface AIHeaderProps {
  onClose?: () => void;
}

export default function AIHeader({ onClose }: AIHeaderProps) {
  return (
    <div className="border-b border-slate-200 bg-white px-6 py-5">
      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 shadow-md">
            <Sparkles className="h-7 w-7 text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              WorkLancer AI
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Powered by Qwen AI
            </p>
          </div>

        </div>

       {onClose && (
  <button
    onClick={onClose}
    className="rounded-xl p-2 transition hover:bg-slate-100"
  >
    <X className="h-6 w-6 text-slate-500" />
  </button>
)}

      </div>
    </div>
  );
}