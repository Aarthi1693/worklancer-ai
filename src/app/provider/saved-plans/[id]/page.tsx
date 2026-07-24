"use client";

import { useState, useEffect, useCallback } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { ArrowLeft, Save, Loader2, Edit3, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ToastProvider, useToast } from "@/components/ui/toast";
import PlanSection from "@/components/provider/plan-section";
import TimelineCard from "@/components/provider/timeline-card";
import RoleCard from "@/components/provider/role-card";
import SkillBadge from "@/components/provider/skill-badge";
import RiskCard from "@/components/provider/risk-card";
import type { SavedPlan, UpdatePlanInput } from "@/types/ai-planning";
import { aiPlanningService } from "@/services/ai-planning.service";

const priorities = ["Low", "Medium", "High"];
const categories = ["Web Development", "Mobile App", "UI/UX Design", "Data Science", "DevOps", "E-Commerce", "SaaS", "AI / ML", "Cybersecurity", "Blockchain"];

function SavedPlanDetailContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { addToast } = useToast();
  const [plan, setPlan] = useState<SavedPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(searchParams.get("mode") === "edit");

  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPriority, setEditPriority] = useState("");

  const planId = params.id as string;

  const loadPlan = useCallback(async () => {
    try {
      setLoading(true);
      const data = await aiPlanningService.getSavedPlan(planId);
      setPlan(data);
      setEditTitle(data.title);
      setEditCategory(data.category || "");
      setEditPriority(data.priority || "");
    } catch (error) {
      console.error("Failed to load plan:", error);
      addToast("Failed to load plan details.", "error");
    } finally {
      setLoading(false);
    }
  }, [planId, addToast]);

  useEffect(() => {
    if (planId) {
      loadPlan();
    }
  }, [planId, loadPlan]);

  const handleSaveEdit = async () => {
    if (!plan) return;

    try {
      setSaving(true);
      const updateData: UpdatePlanInput = {};
      if (editTitle !== plan.title) updateData.title = editTitle;
      if (editCategory !== (plan.category || "")) updateData.category = editCategory;
      if (editPriority !== (plan.priority || "")) updateData.priority = editPriority;

      if (Object.keys(updateData).length === 0) {
        addToast("No changes to save.", "warning");
        setIsEditing(false);
        return;
      }

      const updated = await aiPlanningService.updateSavedPlan(plan.id, updateData);
      setPlan(updated);
      setIsEditing(false);
      addToast("Plan updated successfully!", "success");
    } catch (error) {
      console.error("Failed to update plan:", error);
      addToast("Failed to update plan. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateTask = () => {
    if (!plan) return;
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-4">Plan Not Found</h2>
        <p className="text-slate-400 mb-6">The requested plan could not be found or you don&#39;t have access to it.</p>
        <Button onClick={() => router.push("/provider/saved-plans")}>Back to Saved Plans</Button>
      </div>
    );
  }

  const planData = plan.planData;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => router.push("/provider/saved-plans")}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            {isEditing ? (
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="text-2xl font-bold bg-transparent border-white/10 text-white"
              />
            ) : (
              <h1 className="text-3xl font-bold text-white">{plan.title}</h1>
            )}
          </div>
          <p className="text-slate-400 ml-9">{plan.description}</p>
        </div>

        <div className="flex gap-3">
          {isEditing ? (
            <>
              <Select value={editCategory} onChange={(e) => setEditCategory(e.target.value)} className="w-40">
                <option value="">Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Select>
              <Select value={editPriority} onChange={(e) => setEditPriority(e.target.value)} className="w-32">
                <option value="">Priority</option>
                {priorities.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </Select>
              <Button
                onClick={handleSaveEdit}
                disabled={saving}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-500 hover:to-emerald-500"
              >
                {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} className="mr-2" />}
                Save
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                variant="ghost"
                className="text-slate-300 hover:text-white"
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => setIsEditing(true)}
                variant="ghost"
                className="text-slate-300 hover:text-white hover:bg-white/10"
              >
                <Edit3 size={18} className="mr-2" />
                Edit
              </Button>
              <Button
                onClick={handleCreateTask}
                className="
                  bg-gradient-to-r from-green-600 to-emerald-600 text-white
                  hover:from-green-500 hover:to-emerald-500
                "
              >
                <Play size={18} className="mr-2" />
                Create Task
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-3">
        {plan.category && (
          <Badge variant="outline" className="border-blue-500/30 bg-blue-500/10 text-blue-300 rounded-lg">
            {plan.category}
          </Badge>
        )}
        {plan.priority && (
          <Badge variant="outline" className="border-red-500/30 bg-red-500/10 text-red-300 rounded-lg">
            {plan.priority} Priority
          </Badge>
        )}
        {plan.budget && (
          <Badge variant="outline" className="border-green-500/30 bg-green-500/10 text-green-300 rounded-lg">
             Budget: ₹{plan.budget ?? "N/A"}
          </Badge>
        )}
        {plan.teamSize && (
          <Badge variant="outline" className="border-purple-500/30 bg-purple-500/10 text-purple-300 rounded-lg">
            Team Size: {plan.teamSize}
          </Badge>
        )}
      </div>

      {/* Plan Sections */}
      <div className="space-y-6">
        {planData.summary && (
          <PlanSection title="Project Summary" icon={<Edit3 size={20} />} gradient="blue">
            <p className="text-slate-300 leading-relaxed">{planData.summary}</p>
          </PlanSection>
        )}

        {planData.roadmap && planData.roadmap.length > 0 && (
          <PlanSection title="Development Roadmap" icon={<Edit3 size={20} />} gradient="purple">
            <div className="space-y-2">
              {planData.roadmap.map((phase, idx) => (
                <TimelineCard
                  key={idx}
                  index={idx}
                  phase={phase.phase}
                  duration={phase.duration}
                  tasks={phase.tasks}
                />
              ))}
            </div>
          </PlanSection>
        )}

        <div className="grid grid-cols-2 gap-6">
          {planData.roles && planData.roles.length > 0 && (
            <PlanSection title="Recommended Team Roles" icon={<Edit3 size={20} />} gradient="green">
              <div className="space-y-3">
                {planData.roles.map((role, idx) => (
                  <RoleCard
                    key={idx}
                    role={role.role}
                    responsibility={role.responsibility}
                  />
                ))}
              </div>
            </PlanSection>
          )}

          {planData.requiredSkills && planData.requiredSkills.length > 0 && (
            <PlanSection title="Required Skills" icon={<Edit3 size={20} />} gradient="blue">
              <SkillBadge skills={planData.requiredSkills} />
            </PlanSection>
          )}
        </div>

        {planData.timeline && (
          <PlanSection title="Estimated Timeline" icon={<Edit3 size={20} />} gradient="green">
            <p className="text-2xl font-bold text-green-400">{planData.timeline}</p>
          </PlanSection>
        )}

        {planData.riskAnalysis && planData.riskAnalysis.length > 0 && (
          <PlanSection title="Risk Analysis" icon={<Edit3 size={20} />} gradient="yellow">
            <div className="grid grid-cols-2 gap-4">
              {planData.riskAnalysis.map((risk, idx) => (
                <RiskCard
                  key={idx}
                  risk={risk.risk}
                  solution={risk.solution}
                />
              ))}
            </div>
          </PlanSection>
        )}

        {planData.recommendations && planData.recommendations.length > 0 && (
          <PlanSection title="AI Recommendations" icon={<Edit3 size={20} />} gradient="purple">
            <ul className="space-y-3">
              {planData.recommendations.map((rec, idx) => (
                <li
                  key={idx}
                  className="
                    flex items-start gap-3 rounded-xl border border-white/[0.08]
                    bg-white/[0.03] p-4 text-slate-300
                  "
                >
                  <span className="mt-0.5 size-2 rounded-full bg-purple-400 shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </PlanSection>
        )}
      </div>
    </div>
  );
}

export default function SavedPlanDetailPage() {
  return (
    <DesktopLayout>
      <ToastProvider>
        <SavedPlanDetailContent />
      </ToastProvider>
    </DesktopLayout>
  );
}
