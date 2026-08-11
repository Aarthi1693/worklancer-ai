import api from "@/lib/api";
import type {
  ProjectPlanRequest,
  ProjectPlanResponse,
  SavedPlan,
  UpdatePlanInput,
} from "@/types/ai-planning";

class AIPlanningService {
  async generatePlan(data: ProjectPlanRequest): Promise<ProjectPlanResponse> {
    const payload = {
      ...data,

      budget:
        data.budget && data.budget !== ""
          ? Number(data.budget)
          : undefined,

      teamSize:
        data.teamSize && data.teamSize !== ""
          ? Number(data.teamSize)
          : undefined,
    };

    console.log("AI Planning Payload:", payload);

    const response = await api.post<ProjectPlanResponse>(
      "/ai/project-plan",
      payload
    );

    console.log("AI Planning Response:", response.data);

    return response.data;
  }

  async savePlan(data: ProjectPlanRequest & {
    planData: ProjectPlanResponse;
    projectId?: string;
    userId?: string;
  }): Promise<SavedPlan> {
    const response = await api.post<SavedPlan>("/ai/project-plan/save", data);
    return response.data;
  }

  async getSavedPlans(): Promise<SavedPlan[]> {
    const response = await api.get<SavedPlan[]>("/ai/project-plan");
    return response.data;
  }

  async getSavedPlan(id: string): Promise<SavedPlan> {
    const response = await api.get<SavedPlan>(`/ai/project-plan/${id}`);
    return response.data;
  }

  async updateSavedPlan(id: string, data: UpdatePlanInput): Promise<SavedPlan> {
    const response = await api.patch<SavedPlan>(
      `/ai/project-plan/${id}`,
      data
    );
    return response.data;
  }

  async deleteSavedPlan(id: string): Promise<void> {
    await api.delete(`/ai/project-plan/${id}`);
  }
}

export const aiPlanningService = new AIPlanningService();