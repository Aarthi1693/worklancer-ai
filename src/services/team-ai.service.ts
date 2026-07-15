import api from "@/lib/api";

class TeamAIService {
  async recommend(projectTitle: string, projectDescription: string) {
    const response = await api.post("/ai/team-recommendation", {
      projectTitle,
      projectDescription,
    });

    return response.data;
  }
}

export default new TeamAIService();