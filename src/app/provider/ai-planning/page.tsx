"use client";

import { useState } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowLeft } from "lucide-react";
import AIPlanningForm from "@/components/provider/ai-planning-form";
import AIPlanningResults from "@/components/provider/ai-planning-results";
import { ToastProvider } from "@/components/ui/toast";
import type { ProjectPlanResponse } from "@/types/ai-planning";
import { aiPlanningService } from "@/services/ai-planning.service";
import { useToast } from "@/components/ui/toast";
import authService from "@/services/auth.service";

function PlanningContent() {
  const router = useRouter();
  const { addToast } = useToast();
  const [plan, setPlan] = useState<ProjectPlanResponse | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: string;
    projectType: string;
    budget: string;
    deadline: string;
    requiredSkills: string;
    teamSize: string;
    priority: string;
  } | null>(null);

  const user = authService.getUser();

  const handlePlanGenerated = (data: ProjectPlanResponse) => {
    setPlan(data);
  };

  const handleSave = async () => {
    if (!plan || !formData) return;

    try {
      setIsSaving(true);
      await aiPlanningService.savePlan({
        ...formData,
        planData: plan,
        userId: user?.id,
      });
      addToast("Plan saved successfully!", "success");
    } catch (error) {
      console.error("Failed to save plan:", error);
      addToast("Failed to save plan. Please try again.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleFormDataSave = (data: {
    title: string;
    description: string;
    category: string;
    projectType: string;
    budget: string;
    deadline: string;
    requiredSkills: string;
    teamSize: string;
    priority: string;
  }) => {
    setFormData(data);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="text-blue-400" size={28} />
            <h1 className="text-4xl font-bold text-white">
              AI Project Planning
            </h1>
          </div>
          <p className="text-slate-400 mt-2">
            Generate intelligent project execution plans with AI before publishing your task.
          </p>
        </div>

        <button
          onClick={() => router.push("/provider")}
          className="
            flex items-center gap-2 px-5 py-3 rounded-xl
            border border-white/[0.08] hover:bg-white/5 transition-all
          "
        >
          <ArrowLeft size={18} />
          Dashboard
        </button>
      </div>

      {/* Main Content */}
      {!plan ? (
        <AIPlanningForm onPlanGenerated={handlePlanGenerated} onFormDataSave={handleFormDataSave} />
      ) : (
        <AIPlanningResults plan={plan} onSave={handleSave} isSaving={isSaving} />
      )}
    </div>
  );
}

export default function AIPlanningPage() {
  return (
    <DesktopLayout>
      <ToastProvider>
        <PlanningContent />
      </ToastProvider>
    </DesktopLayout>
  );
}
