export interface ProjectPlanRequest {
  title: string;
  description: string;
  category: string;
  projectType: string;
  budget: string;
  deadline: string;
  requiredSkills: string;
  teamSize: string;
  priority: string;
}

export interface ProjectPlanResponse {
  summary?: string;
  projectSummary?: string;
  roadmap?: Array<{
    phase: string;
    duration?: string;
    tasks?: string[];
    description?: string;
  }>;
  developmentRoadmap?: Array<{
    phase: string;
    duration?: string;
    tasks?: string[];
    description?: string;
  }>;
  roles?: Array<{
    role: string;
    responsibility: string;
  }>;
  recommendedTeamRoles?: string[];
  requiredSkills: string[];
  timeline?: string;
  estimatedTimeline?: string;
  budgetSuggestion?: string;
  milestones?: Array<{
    name: string;
    date: string;
  }>;
  riskAnalysis: string[];
  recommendations: string[];
}

export interface SavedPlan {
  id: string;
  title: string;
  description: string;
  category?: string;
  projectType?: string;
  budget?: string;
  deadline?: string;
  requiredSkills?: string;
  teamSize?: string;
  priority?: string;
  status?: string;
  planData: ProjectPlanResponse;
  createdAt: string;
}

export interface UpdatePlanInput {
  title?: string;
  category?: string;
  priority?: string;
}
