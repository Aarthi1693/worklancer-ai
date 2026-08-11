"use client";

import { Search, Filter, ArrowUpDown } from "lucide-react";

export default function SavedPlanFilters() {
  return (
    <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search saved AI plans..."
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">

          {/* Status */}
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-500" />

            <select className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none">
              <option>All Plans</option>
              <option>Completed</option>
              <option>Draft</option>
              <option>Archived</option>
            </select>
          </div>

          {/* Category */}
          <select className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none">
            <option>All Categories</option>
            <option>Web Development</option>
            <option>Mobile App</option>
            <option>AI Project</option>
            <option>UI / UX</option>
            <option>Data Science</option>
          </select>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <ArrowUpDown size={18} className="text-slate-500" />

            <select className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none">
              <option>Newest</option>
              <option>Oldest</option>
              <option>Highest Confidence</option>
              <option>Recently Used</option>
            </select>
          </div>

        </div>
      </div>
    </section>
  );
}