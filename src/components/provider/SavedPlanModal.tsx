"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
  plan: any;
}

export default function SavedPlanModal({
  open,
  onClose,
  plan,
}: Props) {
  if (!open || !plan) return null;

  const data = plan.planData || {};

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center p-6">
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">

        {/* Header */}

        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-start">

          <div>

            <h2 className="text-3xl font-bold">
              {plan.title}
            </h2>

            <p className="mt-2 text-slate-600">
              {plan.description}
            </p>

          </div>

          <Button
            variant="ghost"
            onClick={onClose}
          >
            <X size={22}/>
          </Button>

        </div>

        <div className="space-y-8 p-8">

          {/* Summary */}

          <section>

            <h3 className="text-xl font-semibold mb-3">
              Project Summary
            </h3>

            <p className="text-slate-700">
              {data.projectSummary}
            </p>

          </section>

          {/* Roadmap */}

          <section>

            <h3 className="text-xl font-semibold mb-3">
              Development Roadmap
            </h3>

            <div className="space-y-4">

              {(data.developmentRoadmap || []).map(
                (item: any, index: number) => (

                  <div
                    key={index}
                    className="border rounded-xl p-4"
                  >
                    <h4 className="font-semibold">
                      {item.phase}
                    </h4>

                    <p className="text-slate-600 mt-2">
                      {item.description}
                    </p>

                  </div>

                )
              )}

            </div>

          </section>

          {/* Skills */}

          <section>

            <h3 className="text-xl font-semibold mb-3">
              Required Skills
            </h3>

            <div className="flex flex-wrap gap-2">

              {(data.requiredSkills || []).map(
                (skill: string, index: number) => (

                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-blue-100 text-blue-700"
                  >
                    {skill}
                  </span>

                )
              )}

            </div>

          </section>

          {/* Roles */}

          <section>

            <h3 className="text-xl font-semibold mb-3">
              Recommended Team Roles
            </h3>

            <ul className="space-y-2">

              {(data.recommendedTeamRoles || []).map(
                (role: string, index: number) => (

                  <li key={index}>
                    • {role}
                  </li>

                )
              )}

            </ul>

          </section>

          {/* Timeline */}

          <section>

            <h3 className="text-xl font-semibold mb-3">
              Estimated Timeline
            </h3>

            <p className="text-green-600 font-bold">
              {data.estimatedTimeline}
            </p>

          </section>

          {/* Risks */}

          <section>

            <h3 className="text-xl font-semibold mb-3">
              Risk Analysis
            </h3>

            <ul className="space-y-2">

              {(data.riskAnalysis || []).map(
                (risk: string, index: number) => (

                  <li key={index}>
                    ⚠️ {risk}
                  </li>

                )
              )}

            </ul>

          </section>

          {/* Recommendations */}

          <section>

            <h3 className="text-xl font-semibold mb-3">
              AI Recommendations
            </h3>

            <ul className="space-y-2">

              {(data.recommendations || []).map(
                (rec: string, index: number) => (

                  <li key={index}>
                    • {rec}
                  </li>

                )
              )}

            </ul>

          </section>

        </div>

      </div>
    </div>
  );
}