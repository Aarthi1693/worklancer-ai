"use client";

import { motion } from "framer-motion";
import { Eye, Pencil, Trash2, Play, Calendar, Tag, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props {
  plan: {
    id: string;
    title: string;
    description: string;
    category?: string;
    priority?: string;
    requiredSkills?: string;
    createdAt: string;
    planData: {
      timeline?: string;
      requiredSkills?: string[];
    };
  };
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onCreateTask: () => void;
}

const priorityColors: Record<string, string> = {
  High: "border-red-500/30 bg-red-500/10 text-red-400",
  Medium: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
  Low: "border-green-500/30 bg-green-500/10 text-green-400",
};

export default function SavedPlanCard({ plan, onView, onEdit, onDelete, onCreateTask }: Props) {
  const skills = (plan.requiredSkills || "")
    .split(",").map((s) => s.trim()).filter(Boolean)
    .concat(plan.planData?.requiredSkills || []);
  const uniqueSkills = Array.from(new Set(skills));

  const date = plan.createdAt ? new Date(plan.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }) : "N/A";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="
        h-full rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl
        shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6
        hover:border-blue-500/20 hover:shadow-[0_0_60px_rgba(59,130,246,0.12)]
        transition-all duration-300 flex flex-col
      "
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white line-clamp-2 mb-2">{plan.title}</h3>
          <p className="text-sm text-slate-400 line-clamp-2">{plan.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {plan.priority && (
          <Badge variant="outline" className={`${priorityColors[plan.priority] || "border-white/10 text-slate-300"} rounded-lg`}>
            <AlertTriangle className="size-3 mr-1" />
            {plan.priority}
          </Badge>
        )}
        {(plan as any).status && (
          <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300 rounded-lg">
            {(plan as any).status}
          </Badge>
        )}
        {plan.category && (
          <Badge variant="outline" className="border-blue-500/30 bg-blue-500/10 text-blue-300 rounded-lg">
            <Tag className="size-3 mr-1" />
            {plan.category}
          </Badge>
        )}
        <Badge variant="outline" className="border-white/10 text-slate-400 rounded-lg">
          <Calendar className="size-3 mr-1" />
          {date}
        </Badge>
      </div>

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.slice(0, 4).map((skill, idx) => (
            <Badge key={idx} variant="outline" className="border-purple-500/30 bg-purple-500/10 text-purple-300 rounded-lg text-xs">
              {skill}
            </Badge>
          ))}
          {skills.length > 4 && (
            <Badge variant="outline" className="border-white/10 text-slate-400 rounded-lg text-xs">
              +{skills.length - 4}
            </Badge>
          )}
        </div>
      )}

      {plan.planData?.timeline && (
        <p className="text-xs text-slate-500 mb-4">
          Timeline: {plan.planData.timeline}
        </p>
      )}

      <div className="mt-auto flex items-center gap-2 pt-4 border-t border-white/[0.08]">
        <Button
          onClick={onView}
          variant="ghost"
          size="sm"
          className="flex-1 text-slate-300 hover:text-white hover:bg-white/10"
        >
          <Eye size={16} className="mr-1" />
          View
        </Button>
        <Button
          onClick={onEdit}
          variant="ghost"
          size="sm"
          className="flex-1 text-slate-300 hover:text-white hover:bg-white/10"
        >
          <Pencil size={16} className="mr-1" />
          Edit
        </Button>
        <Button
          onClick={onDelete}
          variant="ghost"
          size="sm"
          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
        >
          <Trash2 size={16} />
        </Button>
        <Button
          onClick={onCreateTask}
          size="sm"
          className="
            bg-gradient-to-r from-green-600 to-emerald-600 text-white
            hover:from-green-500 hover:to-emerald-500
          "
        >
          <Play size={16} className="mr-1" />
          Create Task
        </Button>
      </div>
    </motion.div>
  );
}
