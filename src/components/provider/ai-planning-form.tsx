"use client";

import { useState } from "react";
import { BrainCircuit, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import type { ProjectPlanRequest, ProjectPlanResponse } from "@/types/ai-planning";
import { aiPlanningService } from "@/services/ai-planning.service";
import { useToast } from "@/components/ui/toast";

interface Props {
  onPlanGenerated: (data: ProjectPlanResponse) => void;
  onFormDataSave: (data: ProjectPlanRequest) => void;
}

const categories = [
  "Web Development",
  "Mobile App",
  "UI/UX Design",
  "Data Science",
  "DevOps",
  "E-Commerce",
  "SaaS",
  "AI / ML",
  "Cybersecurity",
  "Blockchain",
];

const projectTypes = ["Digital", "Field", "Hybrid"];

const priorities = ["Low", "Medium", "High"];

export default function AIPlanningForm({ onPlanGenerated, onFormDataSave }: Props) {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<ProjectPlanRequest>({
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
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    if (!form.title || !form.description) {
      addToast("Please fill in at least Project Title and Description.", "warning");
      return;
    }

    try {
      setLoading(true);
      onFormDataSave(form);
      const plan = await aiPlanningService.generatePlan(form);
      onPlanGenerated(plan);
      addToast("AI Plan generated successfully!", "success");
    } catch (error) {
      console.error("Failed to generate plan:", error);
      addToast("Failed to generate AI plan. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl
        shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6
      "
    >
      <div className="flex items-center gap-3 mb-6">
        <BrainCircuit className="text-blue-400" size={24} />
        <h2 className="text-xl font-bold">Project Details</h2>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Project Title <span className="text-red-400">*</span>
          </label>
          <Input
            placeholder="e.g., AI-powered Healthcare Dashboard"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Project Description <span className="text-red-400">*</span>
          </label>
          <Textarea
            rows={4}
            placeholder="Describe your project requirements, goals, and objectives..."
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Project Category
            </label>
            <Select
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Project Type
            </label>
            <Select
              value={form.projectType}
              onChange={(e) => updateField("projectType", e.target.value)}
            >
              <option value="">Select type</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Budget (₹)
            </label>
            <Input
              type="number"
              placeholder="50000"
              value={form.budget}
              onChange={(e) => updateField("budget", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Deadline
            </label>
            <Input
              type="date"
              value={form.deadline}
              onChange={(e) => updateField("deadline", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Required Skills
          </label>
          <Input
            placeholder="React, Node.js, PostgreSQL, AWS..."
            value={form.requiredSkills}
            onChange={(e) => updateField("requiredSkills", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Expected Team Size
            </label>
            <Input
              type="number"
              placeholder="5"
              value={form.teamSize}
              onChange={(e) => updateField("teamSize", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Priority
            </label>
            <Select
              value={form.priority}
              onChange={(e) => updateField("priority", e.target.value)}
            >
              <option value="">Select priority</option>
              {priorities.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </Select>
          </div>
        </div>

        <div className="pt-2">
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="
              w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600
              text-white font-semibold shadow-[0_0_20px_rgba(124,58,237,0.4)]
              hover:from-blue-500 hover:to-purple-500 disabled:opacity-50
            "
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 size-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <BrainCircuit className="mr-2 size-5" />
                Generate AI Plan
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
