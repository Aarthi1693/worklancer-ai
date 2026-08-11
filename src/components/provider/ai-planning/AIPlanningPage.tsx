"use client";

import { useState } from "react";
import AIPlanningHeader from "./AIPlanningHeader";
import AIActions from "./AIActions";
import ProjectPlanner from "./ProjectPlanner";
import AITaskBreakdown from "./AITaskBreakdown";
import AIRecommendations from "./AIRecommendations";
import ProductivityInsights from "./ProductivityInsights";
import { aiPlanningService } from "@/services/ai-planning.service";
import { useToast } from "@/components/ui/toast";
import type { ProjectPlanRequest, ProjectPlanResponse } from "@/types/ai-planning";

export function AIPlanningContent() {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<ProjectPlanResponse | null>(null);
  const [formData, setFormData] = useState<ProjectPlanRequest>({
    title: "",
    description: "",
    category: "",
    projectType: "",
    budget: "",
    deadline: "",
    requiredSkills: "",
    teamSize: "",
    priority: "",
  });

  const updateField = (field: keyof ProjectPlanRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    if (!formData.title || !formData.description) {
      addToast("Please fill in at least Project Title and Description.", "warning");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setPlan(null);
      const response = await aiPlanningService.generatePlan(formData);
      setPlan(response);
      addToast("AI Plan generated successfully!", "success");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to generate AI plan. Please try again.";
      setError(message);
      addToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
  if (!plan) {
    addToast("Generate a plan before saving.", "warning");
    return;
  }

  try {
    setIsSaving(true);

    await aiPlanningService.savePlan({
      ...formData,
      planData: plan,
    });

    addToast("AI Plan saved successfully!", "success");
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Failed to save AI Plan.";

    addToast(message, "error");
  } finally {
    setIsSaving(false);
  }
};

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      projectType: "",
      budget: "",
      deadline: "",
      requiredSkills: "",
      teamSize: "",
      priority: "",
    });
    setPlan(null);
    setError(null);
  };

  return (
    <div className="space-y-8">
      <AIPlanningHeader onGenerate={handleGenerate} loading={loading} />
      <AIActions />
      <ProjectPlanner
  formData={formData}
  onChange={updateField}
  onGenerate={handleGenerate}
  onSave={handleSave}
  onReset={resetForm}
  loading={loading}
  saving={isSaving}
/>
      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
          <p className="text-red-700 font-semibold">Error</p>
          <p className="mt-2 text-red-600">{error}</p>
        </div>
      )}
      {plan && <AITaskBreakdown plan={plan} />}
      {plan && <AIRecommendations plan={plan} />}
      <ProductivityInsights />
    </div>
  );
}

export default function AIPlanningPage() {
  return <AIPlanningContent />;
}