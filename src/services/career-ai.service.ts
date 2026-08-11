import api from "@/lib/api";

interface CareerPlanRequest {
  userId: string;
}

interface SkillAnalysis {
  strengths: string[];
  weaknesses: string[];
  recommendedSkills: string[];
}

interface LearningRoadmapItem {
  title: string;
  duration: string;
  level: string;
}

interface WeeklyPlanItem {
  title: string;
  completed: boolean;
}

interface Certification {
  name: string;
  provider: string;
}

interface CareerPlanResponse {
  careerScore: number;
  skillAnalysis: SkillAnalysis;
  learningRoadmap: LearningRoadmapItem[];
  weeklyPlan: WeeklyPlanItem[];
  recommendedCertifications: Certification[];
  strengths: string[];
  weaknesses: string[];
  improvementSuggestions: string[];
}

interface BackendCareerResponse {
  careerScore?: number;
  marketDemand?: number;
  salaryPrediction?: { current?: string; future?: string };
  strongSkills?: string[];
  skillsToImprove?: string[];
  roadmap?: string[];
  report?: string;
  suggestions?: string[];
}

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  return [];
}

function extractJson(raw: string): BackendCareerResponse {
  const fence = raw.match(/```[a-zA-Z]*\n?([\s\S]*?)\n?```/);
  const candidate = fence ? fence[1] : raw;

  try {
    const value = JSON.parse(candidate.trim());
    if (value && typeof value === "object") {
      return value as BackendCareerResponse;
    }
  } catch {
    // fall through
  }

  try {
    const value = JSON.parse(raw.trim());
    if (value && typeof value === "object") {
      return value as BackendCareerResponse;
    }
  } catch {
    // fall through
  }

  return {};
}

function mapCareerResponse(
  backend: BackendCareerResponse | string
): CareerPlanResponse {
  let parsed: BackendCareerResponse = {};

  if (typeof backend === "string") {
    parsed = extractJson(backend);
  } else if (backend && typeof backend === "object") {
    const raw = (backend as { rawResponse?: unknown }).rawResponse;

    if (typeof raw === "string") {
      parsed = extractJson(raw);
    } else {
      parsed = backend as BackendCareerResponse;
    }
  }

  const strongSkills = toArray(parsed.strongSkills);
  const skillsToImprove = toArray(parsed.skillsToImprove);
  const roadmap = toArray(parsed.roadmap);
  const suggestions = toArray(parsed.suggestions);

  return {
    careerScore: parsed.careerScore ?? 0,
    skillAnalysis: {
      strengths: strongSkills,
      weaknesses: skillsToImprove,
      recommendedSkills: [],
    },
    learningRoadmap: roadmap.map((item) => ({
      title: item,
      duration: "Ongoing",
      level: "Intermediate",
    })),
    weeklyPlan: [],
    recommendedCertifications: [],
    strengths: strongSkills,
    weaknesses: skillsToImprove,
    improvementSuggestions: suggestions,
  };
}

class CareerAIService {
  async analyze(userId: string) {
    const response = await api.get(`/career-ai/${userId}`);
    return response.data;
  }

  async generateCareerPlan(data: CareerPlanRequest): Promise<CareerPlanResponse> {
    const response = await api.get(`/career-ai/${data.userId}`);
    return mapCareerResponse(response.data);
  }
}

export default new CareerAIService();
