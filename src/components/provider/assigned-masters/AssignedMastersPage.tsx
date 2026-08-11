"use client";

import { useEffect, useState } from "react";

import AssignedMastersHeader from "./AssignedMastersHeader";
import TeamStats from "./TeamStats";
import MasterFilters from "./MasterFilters";
import MasterCard from "./MasterCard";

import ProviderService from "@/services/provider.service";

export default function AssignedMastersPage() {
  const [masters, setMasters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    loadMasters();
  }, []);

  async function loadMasters() {
    try {
      const data = await ProviderService.getAssignedMasters();
      setMasters(data);
    } catch (error) {
      console.error("Failed to load assigned masters:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredMasters = masters.filter((master) => {
    if (activeFilter === "All") return true;

    if (activeFilter === "Top Rated") {
      return (master.rating || 0) >= 4.5;
    }

    return master.status === activeFilter;
  });

  const assignedMasters = masters.length;

const runningProjects = new Set(
  masters.map((master) => master.projectId)
).size;

  return (
    <div className="space-y-8">
      {/* Hero */}
      <AssignedMastersHeader />

      {/* Stats */}
      <TeamStats
  assignedMasters={assignedMasters}
  runningProjects={runningProjects}
/>

      {/* Filters */}
      <MasterFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {/* Cards */}
      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white py-20 text-center shadow-sm">
          <p className="text-lg text-slate-600">
            Loading assigned masters...
          </p>
        </div>
      ) : filteredMasters.length > 0 ? (
        <div className="grid gap-6 xl:grid-cols-2">
          {filteredMasters.map((master) => (
            <MasterCard
              key={master.id}
              master={master}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-24 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-4xl">
            👥
          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            No Assigned Masters
          </h2>

          <p className="mt-3 text-slate-600">
            No professionals are assigned to your projects yet.
          </p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-3">
        <button className="rounded-xl border border-slate-300 bg-white px-5 py-2 text-slate-600 hover:bg-slate-100">
          Previous
        </button>

        <button className="rounded-xl bg-blue-600 px-5 py-2 text-white">
          1
        </button>

        <button className="rounded-xl border border-slate-300 bg-white px-5 py-2 text-slate-600 hover:bg-slate-100">
          Next
        </button>
      </div>
    </div>
  );
}