"use client";

import { Search, SlidersHorizontal } from "lucide-react";

const filters = [
  "All",
  "Recommended",
  "New",
  "Shortlisted",
  "Rejected",
];

interface ApplicantFiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export default function ApplicantFilters({
  activeFilter,
  setActiveFilter,
  searchValue,
  setSearchValue,
}: ApplicantFiltersProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        {/* Search */}

        <div className="relative w-full lg:max-w-xl">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search applicants..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Filters */}

        <div className="flex flex-wrap gap-3">

          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-xl px-5 py-2.5 text-sm font-medium transition ${
                activeFilter === filter
                  ? "bg-blue-600 text-white shadow"
                  : "border border-slate-300 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {filter}
            </button>
          ))}

          <button className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-600 hover:border-blue-300 hover:text-blue-600">
            <SlidersHorizontal size={18} />
            Sort
          </button>

        </div>

      </div>
    </div>
  );
}