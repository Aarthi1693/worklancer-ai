"use client";

import { Search } from "lucide-react";

export default function PaymentFilters() {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">

      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />

        <input
          type="text"
          placeholder="Search project or task master..."
          className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-blue-500"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">

        <select className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 font-medium outline-none">
          <option>All Status</option>
          <option>Locked</option>
          <option>Pending Release</option>
          <option>Released</option>
          <option>Disputed</option>
        </select>

        <select className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 font-medium outline-none">
          <option>Newest First</option>
          <option>Oldest First</option>
          <option>Highest Amount</option>
          <option>Lowest Amount</option>
        </select>

      </div>

    </div>
  );
}