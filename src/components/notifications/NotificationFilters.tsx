"use client";

interface NotificationFiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const filters = [
  "All",
  "Unread",
  "Tasks",
  "AI",
  "Payments",
  "Messages",
  "System",
];

export default function NotificationFilters({
  activeFilter,
  setActiveFilter,
}: NotificationFiltersProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              activeFilter === filter
                ? "bg-blue-600 text-white shadow"
                : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}