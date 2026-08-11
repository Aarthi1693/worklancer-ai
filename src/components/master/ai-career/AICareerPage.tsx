"use client";

import { useState } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import CareerHeader from "./CareerHeader";
import CareerOverview from "./CareerOverview";
import SkillGrowth from "./SkillGrowth";
import CareerOpportunities from "./CareerOpportunities";
import LearningRecommendations from "./LearningRecommendations";
import CareerInsights from "./CareerInsights";
import WeeklyGoals from "./WeeklyGoals";
import AchievementBadges from "./AchievementBadges";
import careerAiService from "@/services/career-ai.service";
import authService from "@/services/auth.service";

export default function AICareerPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [careerPlan, setCareerPlan] = useState<{
    careerScore: number;
    skillAnalysis: {
      strengths: string[];
      weaknesses: string[];
      recommendedSkills: string[];
    };
    learningRoadmap: Array<{
      title: string;
      duration: string;
      level: string;
    }>;
    weeklyPlan: Array<{
      title: string;
      completed: boolean;
    }>;
    recommendedCertifications: Array<{
      name: string;
      provider: string;
    }>;
    strengths: string[];
    weaknesses: string[];
    improvementSuggestions: string[];
  } | null>(null);

  const handleGeneratePlan = async () => {
    setLoading(true);
    setError(null);
    setCareerPlan(null);

    try {
      const user = authService.getUser();
      const userId = user?.id || "";
      const response = await careerAiService.generateCareerPlan({ userId });
      setCareerPlan(response);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to generate career plan. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const retryGenerate = () => {
    handleGeneratePlan();
  };

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-500" size={20} />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
          <button
            onClick={retryGenerate}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition text-sm font-medium"
          >
            <RefreshCw size={16} />
            Retry
          </button>
        </div>
      )}

      <CareerHeader
        onGeneratePlan={handleGeneratePlan}
        loading={loading}
      />

      <CareerOverview careerScore={careerPlan?.careerScore} />

      <div className="grid gap-8 xl:grid-cols-2">
        <SkillGrowth
  strengths={
    careerPlan?.skillAnalysis?.strengths &&
    careerPlan.skillAnalysis.strengths.length > 0
      ? careerPlan.skillAnalysis.strengths
      : [
          "React.js",
          "Next.js",
          "UI/UX Design",
          "TypeScript",
          "Problem Solving",
          "Team Collaboration",
          "Customer Communication",
          "Field Service Management",
        ]
  }
  weaknesses={
    careerPlan?.skillAnalysis?.weaknesses &&
    careerPlan.skillAnalysis.weaknesses.length > 0
      ? careerPlan.skillAnalysis.weaknesses
      : [
          "Backend Development",
          "Cloud Deployment (Azure)",
          "System Design",
          "DevOps",
          "Industrial Safety Standards",
          "Advanced Electrical Troubleshooting",
        ]
  }
  recommendedSkills={
    careerPlan?.skillAnalysis?.recommendedSkills &&
    careerPlan.skillAnalysis.recommendedSkills.length > 0
      ? careerPlan.skillAnalysis.recommendedSkills
      : [
          "Node.js",
          "Docker",
          "MongoDB",
          "REST API Development",
          "Azure AI Services",
          "Home Appliance Installation",
          "Site Inspection & Reporting",
          "Project Management",
        ]
  }
/>
        <CareerOpportunities />
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        <LearningRecommendations roadmap={careerPlan?.learningRoadmap || []} />
        <CareerInsights
          strengths={careerPlan?.strengths || []}
          weaknesses={careerPlan?.weaknesses || []}
          improvementSuggestions={careerPlan?.improvementSuggestions || []}
        />
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        <WeeklyGoals weeklyPlan={careerPlan?.weeklyPlan || []} />
        <AchievementBadges
          certifications={careerPlan?.recommendedCertifications || []}
        />
      </div>
    </div>
  );
}