"use client";

import {
  Eye,
  Trash2,
  Play,
  Calendar,
  Tag,
  AlertTriangle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props {
  plan: any;
  onView: () => void;
  onDelete: () => void;
  onCreateTask: () => void;
}

const priorityColors: Record<string, string> = {
  High: "border-red-200 bg-red-50 text-red-600",
  Medium: "border-yellow-200 bg-yellow-50 text-yellow-600",
  Low: "border-green-200 bg-green-50 text-green-600",
};

export default function SavedPlanCard({
  plan,
  onView,
  onDelete,
  onCreateTask,
}: Props) {
  const date = plan.createdAt
    ? new Date(plan.createdAt).toLocaleDateString()
    : "N/A";

  const skills = [
    ...(plan.requiredSkills
      ? plan.requiredSkills.split(",").map((s: string) => s.trim())
      : []),
    ...(plan.planData?.requiredSkills || []),
  ];

  const uniqueSkills = [...new Set(skills)];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">

      {/* Title */}

      <h2 className="text-xl font-bold text-slate-900">
        {plan.title}
      </h2>

      <p className="mt-2 line-clamp-3 text-slate-600">
        {plan.description}
      </p>

      {/* Badges */}

      <div className="mt-5 flex flex-wrap gap-2">

        {plan.priority && (
          <Badge
            variant="outline"
            className={priorityColors[plan.priority]}
          >
            <AlertTriangle className="mr-1 h-3 w-3" />
            {plan.priority}
          </Badge>
        )}

        {plan.category && (
          <Badge
            variant="outline"
            className="border-blue-200 bg-blue-50 text-blue-600"
          >
            <Tag className="mr-1 h-3 w-3" />
            {plan.category}
          </Badge>
        )}

        <Badge
          variant="outline"
          className="border-slate-200 bg-slate-50 text-slate-600"
        >
          <Calendar className="mr-1 h-3 w-3" />
          {date}
        </Badge>

      </div>

      {/* Skills */}

      {uniqueSkills.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {uniqueSkills.slice(0, 4).map((skill, index) => (
            <Badge
              key={index}
              className="bg-purple-100 text-purple-700"
            >
              {skill}
            </Badge>
          ))}

          {uniqueSkills.length > 4 && (
            <Badge variant="outline">
              +{uniqueSkills.length - 4}
            </Badge>
          )}
        </div>
      )}

      {/* Timeline */}

      {plan.planData?.estimatedTimeline && (
        <p className="mt-5 text-sm text-slate-500">
          Timeline: {plan.planData.estimatedTimeline}
        </p>
      )}

      {/* Buttons */}

      <div className="mt-6 flex flex-wrap gap-2">

        <Button
          onClick={onView}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>

        <Button
          variant="outline"
          onClick={onCreateTask}
        >
          <Play className="mr-2 h-4 w-4" />
          Create Task
        </Button>

        <Button
          variant="destructive"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>

      </div>

    </div>
  );
}