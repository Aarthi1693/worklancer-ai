"use client";

import { Wallet } from "lucide-react";

export default function PaymentHeader() {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
          <Wallet className="h-8 w-8 text-green-600" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Escrow Payments
          </h1>

          <p className="mt-1 text-slate-500">
            Securely manage escrow payments, release funds after approval,
            and monitor all payment transactions.
          </p>
        </div>
      </div>
    </div>
  );
}