"use client";

import { ClipboardCheck, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SubmittedWorkHeader() {
  const router = useRouter();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        {/* Left */}
        <div className="flex items-center gap-5">
          <div className="rounded-2xl bg-emerald-100 p-4">
            <ClipboardCheck className="h-8 w-8 text-emerald-600" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Submitted Work
            </h1>

            <p className="mt-1 text-slate-600">
              Review completed work submitted by task masters before releasing
              escrow payments.
            </p>
          </div>
        </div>

        {/* Right */}
        <button
          onClick={() => router.push("/provider/payments")}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <CreditCard size={20} />
          Payments
        </button>
      </div>
    </div>
  );
}