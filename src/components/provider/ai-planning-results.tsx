"use client";

import { motion } from "framer-motion";
import { FileText, Route, Users, Wrench, Calendar, AlertTriangle, Lightbulb, Save } from "lucide-react";
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

export default function AIPlanningResults({ plan, onSave, isSaving }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header with Save */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">AI Generated Plan</h2>
          <p className="text-slate-400 mt-1">Review the intelligent execution plan below</p>
        </div>
        <Button
          onClick={onSave}
          disabled={isSaving}
          className="
            h-12 px-6 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600
            text-white font-semibold shadow-[0_0_20px_rgba(16,185,129,0.4)]
            hover:from-green-500 hover:to-emerald-500 disabled:opacity-50
          "
        >
          {isSaving ? (
            <>
              <div className="mr-2 size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 size-5" />
              Save Plan
            </>
          )}
        </Button>
      </div>

      {/* Summary */}
      <PlanSection title="Project Summary" icon={<FileText className="size-5" />} gradient="blue">
        <p className="text-slate-300 leading-relaxed">{plan.summary}</p>
      </PlanSection>

      {/* Roadmap */}
      <PlanSection title="Development Roadmap" icon={<Route className="size-5" />} gradient="purple">
        <div className="space-y-2">
          {(plan.roadmap || []).map((phase, idx) => (
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

      {/* Grid: Roles + Skills */}
      <div className="grid grid-cols-2 gap-6">
        <PlanSection title="Recommended Team Roles" icon={<Users className="size-5" />} gradient="green">
          <div className="space-y-3">
            {(plan.roles || []).map((role, idx) => (
              <RoleCard
                key={idx}
                role={role.role}
                responsibility={role.responsibility}
              />
            ))}
          </div>
        </PlanSection>

        <PlanSection title="Required Skills" icon={<Wrench className="size-5" />} gradient="blue">
          <SkillBadge skills={plan.requiredSkills} />
        </PlanSection>
      </div>

      {/* Timeline */}
      <PlanSection title="Estimated Timeline" icon={<Calendar className="size-5" />} gradient="green">
        <div className="flex items-center gap-3">
          <div
            className="
              w-16 h-16 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600
              flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]
            "
          >
            <Calendar className="size-8 text-white" />
          </div>
          <div>
            <p className="text-3xl font-bold text-green-400">{plan.timeline}</p>
            <p className="text-sm text-slate-400 mt-1">Total estimated duration</p>
          </div>
        </div>
      </PlanSection>

      {/* Risk Analysis */}
      <PlanSection title="Risk Analysis" icon={<AlertTriangle className="size-5" />} gradient="yellow">
        <div className="grid grid-cols-2 gap-4">
          {(plan.riskAnalysis || []).map((risk, idx) => (
            <RiskCard
              key={idx}
              risk={risk.risk}
              solution={risk.solution}
            />
          ))}
        </div>
      </PlanSection>

      {/* Recommendations */}
      <PlanSection title="AI Recommendations" icon={<Lightbulb className="size-5" />} gradient="purple">
        <ul className="space-y-3">
          {(plan.recommendations || []).map((rec, idx) => (
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
    </motion.div>
  );
}
