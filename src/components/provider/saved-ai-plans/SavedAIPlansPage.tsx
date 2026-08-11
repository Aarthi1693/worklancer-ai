"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { aiPlanningService } from "@/services/ai-planning.service";

import SavedPlansHeader from "./SavedPlansHeader";
import SavedPlanStats from "./SavedPlanStats";
import SavedPlanFilters from "./SavedPlanFilters";
import SavedPlanCard from "./SavedPlanCard";
import SavedPlanModal from "@/components/provider/SavedPlanModal";

export default function SavedAIPlansPage() {
  const router = useRouter();

  const [savedPlans, setSavedPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function loadPlans() {
      try {
        const data = await aiPlanningService.getSavedPlans();
        setSavedPlans(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadPlans();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this AI plan?"
    );

    if (!confirmDelete) return;

    try {
      await aiPlanningService.deleteSavedPlan(id);

      setSavedPlans((prev) => prev.filter((item) => item.id !== id));

      if (selectedPlan?.id === id) {
        setModalOpen(false);
        setSelectedPlan(null);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete plan.");
    }
  };

  const handleCreateTask = (plan: any) => {
    const params = new URLSearchParams();

    params.set("planId", plan.id);
    params.set("title", plan.title);
    params.set("description", plan.description);

    if (plan.requiredSkills)
      params.set("skills", plan.requiredSkills);

    if (plan.budget)
      params.set("budget", plan.budget);

    if (plan.category)
      params.set("category", plan.category);

    if (plan.deadline)
      params.set("deadline", plan.deadline);

    router.push(`/provider/create-task?${params.toString()}`);
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-slate-500 text-lg">
          Loading AI Plans...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <SavedPlansHeader />

      <SavedPlanStats />

      <SavedPlanFilters />

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {savedPlans.map((plan) => (
          <SavedPlanCard
  key={plan.id}
  plan={plan}
  onView={() => {
    setSelectedPlan(plan);
    setModalOpen(true);
  }}
  
  onDelete={() => handleDelete(plan.id)}
  onCreateTask={() => handleCreateTask(plan)}
/>
        ))}
      </section>

      <SavedPlanModal
        open={modalOpen}
        plan={selectedPlan}
        onClose={() => {
          setModalOpen(false);
          setSelectedPlan(null);
        }}
      />
    </div>
  );
}