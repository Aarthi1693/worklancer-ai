"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Route,
  Users,
  Wrench,
  Calendar,
  AlertTriangle,
  Lightbulb,
  Save,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import PlanSection from "@/components/provider/plan-section";
import TimelineCard from "@/components/provider/timeline-card";
import RoleCard from "@/components/provider/role-card";
import SkillBadge from "@/components/provider/skill-badge";
import RiskCard from "@/components/provider/risk-card";
import type { ProjectPlanResponse } from "@/types/ai-planning";

interface Props {
  plan: ProjectPlanResponse;
  onSave: () => void;
  isSaving: boolean;
}

export default function AIPlanningResults({
  plan,
  onSave,
  isSaving,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            AI Generated Plan
          </h2>
          <p className="text-slate-400 mt-1">
            Review the intelligent execution plan below
          </p>
        </div>

        <Button
          onClick={onSave}
          disabled={isSaving}
          className="h-12 px-6 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600"
        >
          {isSaving ? (
            <>
              <div className="mr-2 h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-5 w-5" />
              Save Plan
            </>
          )}
        </Button>
      </div>

      {/* Summary */}
      <PlanSection
        title="Project Summary"
        icon={<FileText className="size-5" />}
        gradient="blue"
      >
        <p className="text-slate-300 leading-relaxed">
          {plan.projectSummary}
        </p>
      </PlanSection>

      {/* Roadmap */}
      <PlanSection
        title="Development Roadmap"
        icon={<Route className="size-5" />}
        gradient="purple"
      >
        <div className="space-y-3">
          {(plan.developmentRoadmap || []).map((phase, idx) => (
            <TimelineCard
              key={idx}
              index={idx}
              phase={phase.phase}
              duration=""
              tasks={phase.description ? [phase.description] : []}
            />
          ))}
        </div>
      </PlanSection>

      {/* Roles + Skills */}
      <div className="grid grid-cols-2 gap-6">
        <PlanSection
          title="Recommended Team Roles"
          icon={<Users className="size-5" />}
          gradient="green"
        >
          <div className="space-y-3">
            {(plan.recommendedTeamRoles || []).map(
              (role: string, idx: number) => (
                <RoleCard
                  key={idx}
                  role={role}
                  responsibility="Responsible for project execution."
                />
              )
            )}
          </div>
        </PlanSection>

        <PlanSection
          title="Required Skills"
          icon={<Wrench className="size-5" />}
          gradient="blue"
        >
          <SkillBadge skills={plan.requiredSkills || []} />
        </PlanSection>
      </div>

      {/* Timeline */}
      <PlanSection
        title="Estimated Timeline"
        icon={<Calendar className="size-5" />}
        gradient="green"
      >
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center">
            <Calendar className="text-white size-8" />
          </div>

          <div>
            <p className="text-3xl font-bold text-green-400">
              {plan.estimatedTimeline}
            </p>

            <p className="text-sm text-slate-400">
              Total estimated duration
            </p>
          </div>
        </div>
      </PlanSection>

      {/* Risks */}
      <PlanSection
        title="Risk Analysis"
        icon={<AlertTriangle className="size-5" />}
        gradient="yellow"
      >
        <div className="grid grid-cols-2 gap-4">
          {(plan.riskAnalysis || []).map((risk, idx) => (
            <RiskCard
              key={idx}
              risk={risk}
              solution="Mitigate through proper planning."
            />
          ))}
        </div>
      </PlanSection>

      {/* Recommendations */}
      <PlanSection
        title="AI Recommendations"
        icon={<Lightbulb className="size-5" />}
        gradient="purple"
      >
        <ul className="space-y-3">
          {(plan.recommendations || []).map(
            (rec: string, idx: number) => (
              <li
                key={idx}
                className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-slate-300"
              >
                <span className="mt-2 h-2 w-2 rounded-full bg-purple-400" />
                {rec}
              </li>
            )
          )}
        </ul>
      </PlanSection>
    </motion.div>
  );
}