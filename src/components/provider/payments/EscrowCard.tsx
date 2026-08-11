"use client";

import {
  Lock,
  User,
  IndianRupee,
  CheckCircle2,
  Eye,
  Wallet,
  AlertTriangle,
} from "lucide-react";

export default function EscrowCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg">

      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

        <div>
          <div className="mb-3 flex items-center gap-3">
            <h2 className="text-xl font-bold text-slate-900">
              Healthcare Management System
            </h2>

            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
              Escrow Locked
            </span>
          </div>

          <p className="text-sm text-slate-500">
            Payment is securely held in escrow until the submitted work is approved.
          </p>
        </div>

        <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
          <p className="text-sm text-slate-600">
            Escrow Amount
          </p>

          <h2 className="mt-2 flex items-center text-3xl font-bold text-green-600">
            <IndianRupee className="mr-1 h-6 w-6" />
            50,000
          </h2>
        </div>

      </div>

      {/* Information */}

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-100 p-3">
            <User className="h-5 w-5 text-blue-600" />
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Task Master
            </p>

            <p className="font-semibold text-slate-900">
              Rahul Sharma
            </p>
          </div>

        </div>

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-amber-100 p-3">
            <Lock className="h-5 w-5 text-amber-600" />
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Escrow Status
            </p>

            <p className="font-semibold text-amber-600">
              Locked
            </p>
          </div>

        </div>

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-green-100 p-3">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Work Status
            </p>

            <p className="font-semibold text-green-600">
              Approved
            </p>
          </div>

        </div>

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-purple-100 p-3">
            <Wallet className="h-5 w-5 text-purple-600" />
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Payment Method
            </p>

            <p className="font-semibold text-slate-900">
              Escrow Wallet
            </p>
          </div>

        </div>

      </div>

      {/* Payment Progress */}

      <div className="mt-8">

        <div className="mb-2 flex justify-between text-sm">
          <span className="font-medium text-slate-700">
            Payment Progress
          </span>

          <span className="font-semibold text-green-600">
            75%
          </span>
        </div>

        <div className="h-3 rounded-full bg-slate-200">
          <div className="h-3 w-3/4 rounded-full bg-green-500"></div>
        </div>

      </div>

      {/* Timeline */}

      <div className="mt-8 rounded-2xl bg-slate-50 p-5">

        <h3 className="mb-4 font-semibold text-slate-900">
          Escrow Timeline
        </h3>

        <div className="flex flex-wrap items-center gap-2 text-sm">

          <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
            Created
          </span>

          →

          <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
            Funded
          </span>

          →

          <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
            Locked
          </span>

          →

          <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
            Submitted
          </span>

          →

          <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
            Approved
          </span>

          →

          <span className="rounded-full bg-slate-200 px-3 py-1 text-slate-600">
            Release Pending
          </span>

        </div>

      </div>

      {/* Actions */}

      <div className="mt-8 flex flex-wrap justify-end gap-3">

        <button className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100">
  <Eye size={18} />
  View Details
</button>

        <button className="flex items-center gap-2 rounded-xl bg-red-100 px-5 py-3 text-red-700 hover:bg-red-200">
          <AlertTriangle size={18} />
          Raise Dispute
        </button>

        <button className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700">
          <Wallet size={18} />
          Release Payment
        </button>

      </div>

    </div>
  );
}