"use client";

import { Wallet } from "lucide-react";

export default function EarningsHeader() {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
          <Wallet className="h-8 w-8 text-green-600" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Earnings
          </h1>

          <p className="mt-1 text-slate-500">
            Track your completed project payments, pending earnings,
            withdrawable balance, and transaction history.
          </p>
        </div>
      </div>
    </div>
  );
}