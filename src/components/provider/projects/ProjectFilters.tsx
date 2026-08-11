"use client";

import { Search, SlidersHorizontal } from "lucide-react";

const filters = [
  "All",
  "Digital",
  "On-Field",
  "Active",
  "Completed",
  "Draft",
];

interface ProjectFiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export default function ProjectFilters({
  activeFilter,
  setActiveFilter,
  searchValue,
  setSearchValue,
}: ProjectFiltersProps) {
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
            placeholder="Search projects..."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">

          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-2xl px-5 py-2.5 text-sm font-medium transition-all ${
  activeFilter === filter
    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow"
    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600"
}`}
            >
              {filter}
            </button>
          ))}

          {/* Sort Button */}
          <button className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-slate-600 transition hover:border-blue-300 hover:text-blue-600">
            <SlidersHorizontal size={18} />
            Sort
          </button>

        </div>

      </div>

    </div>
  );
}