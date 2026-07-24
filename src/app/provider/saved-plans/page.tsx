"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";
import { useRouter } from "next/navigation";
import { Sparkles, Search, SlidersHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import { ToastProvider, useToast } from "@/components/ui/toast";
import SavedPlanCard from "@/components/provider/saved-plan-card";
import type { SavedPlan } from "@/types/ai-planning";
import { aiPlanningService } from "@/services/ai-planning.service";

const priorities = ["Low", "Medium", "High"];
const categories = ["Web Development", "Mobile App", "UI/UX Design", "Data Science", "DevOps", "E-Commerce", "SaaS", "AI / ML", "Cybersecurity", "Blockchain"];
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
];

function SavedPlansContent() {
  const router = useRouter();
  const { addToast } = useToast();
  const [plans, setPlans] = useState<SavedPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const loadPlans = useCallback(async () => {
    try {
      setLoading(true);
      const data = await aiPlanningService.getSavedPlans();
      setPlans(data);
    } catch (error) {
      console.error("Failed to load saved plans:", error);
      addToast("Failed to load saved plans.", "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await aiPlanningService.deleteSavedPlan(deleteId);
      setPlans((prev) => prev.filter((p) => p.id !== deleteId));
      addToast("Plan deleted successfully", "success");
    } catch (error) {
      console.error("Failed to delete plan:", error);
      addToast("Failed to delete plan. Please try again.", "error");
    }
  };

  const handleCreateTask = (plan: SavedPlan) => {
    const params = new URLSearchParams();
    params.set("planId", plan.id);
    params.set("title", plan.title);
    params.set("description", plan.description);
    if (plan.requiredSkills) params.set("skills", plan.requiredSkills);
    if (plan.budget) params.set("budget", plan.budget);
    if (plan.category) params.set("category", plan.category);
    if (plan.deadline) params.set("deadline", plan.deadline);
    router.push(`/provider/create-task?${params.toString()}`);
  };

  const filteredPlans = useMemo(() => {
    let result = [...plans];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((plan) =>
        plan.title.toLowerCase().includes(query) ||
        plan.description.toLowerCase().includes(query)
      );
    }

    if (filterPriority) {
      result = result.filter((plan) => plan.priority === filterPriority);
    }

    if (filterCategory) {
      result = result.filter((plan) => plan.category === filterCategory);
    }

    if (filterStatus) {
      result = result.filter((plan) => plan.status === filterStatus);
    }

    if (filterDate) {
      result = result.filter((plan) => {
        const planDate = plan.createdAt ? new Date(plan.createdAt).toISOString().split("T")[0] : "N/A";
        return planDate === filterDate;
      });
    }

    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [plans, searchQuery, filterPriority, filterCategory, filterStatus, filterDate, sortBy]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="text-blue-400" size={28} />
            <h1 className="text-4xl font-bold text-white">Saved AI Plans</h1>
          </div>
          <p className="text-slate-400 mt-2">
            View, manage, and create tasks from your saved AI project plans.
          </p>
        </div>

        <button
          onClick={() => router.push("/provider/ai-planning")}
          className="
            flex items-center gap-2 px-5 py-3 rounded-xl
            bg-gradient-to-r from-blue-600 to-purple-600
            text-white font-medium shadow-[0_0_20px_rgba(124,58,237,0.4)]
            hover:from-blue-500 hover:to-purple-500 transition-all
          "
        >
          <Plus size={18} />
          New Plan
        </button>
      </div>

      {/* Search & Filters */}
      <div
        className="
          rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl
          shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6
        "
      >
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal className="text-blue-400" size={20} />
          <h2 className="text-lg font-semibold">Search & Filter</h2>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <Input
              placeholder="Search by project title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
            <option value="">All Priorities</option>
            {priorities.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </Select>

          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Select>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="ARCHIVED">Archived</option>
            <option value="IN_PROGRESS">In Progress</option>
          </Select>

          <Input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full"
          />
          <div />
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        </div>
      ) : filteredPlans.length === 0 ? (
        <div
          className="
            rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl
            shadow-[0_0_40px_rgba(59,130,246,0.08)] p-12 text-center
          "
        >
          <Sparkles className="mx-auto text-slate-600 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-slate-300 mb-2">No Saved Plans Found</h3>
          <p className="text-slate-500 mb-6">
            {searchQuery || filterPriority || filterCategory
              ? "Try adjusting your search or filters."
              : "Generate and save your first AI project plan to see it here."}
          </p>
          <Button
            onClick={() => router.push("/provider/ai-planning")}
            className="
              bg-gradient-to-r from-blue-600 to-purple-600 text-white
              hover:from-blue-500 hover:to-purple-500
            "
          >
            Go to AI Planning
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <SavedPlanCard
              key={plan.id}
              plan={plan}
              onView={() => router.push(`/provider/saved-plans/${plan.id}`)}
              onEdit={() => router.push(`/provider/saved-plans/${plan.id}?mode=edit`)}
              onDelete={() => setDeleteId(plan.id)}
              onCreateTask={() => handleCreateTask(plan)}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Plan"
        message="Are you sure you want to delete this saved AI plan? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}

export default function SavedPlansPage() {
  return (
    <DesktopLayout>
      <ToastProvider>
        <SavedPlansContent />
      </ToastProvider>
    </DesktopLayout>
  );
}
