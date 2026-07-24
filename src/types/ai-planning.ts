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
  summary: string;
  roadmap: Array<{
    phase: string;
    duration: string;
    tasks: string[];
  }>;
  roles: Array<{
    role: string;
    responsibility: string;
  }>;
  requiredSkills: string[];
  timeline: string;
  riskAnalysis: Array<{
    risk: string;
    solution: string;
  }>;
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
