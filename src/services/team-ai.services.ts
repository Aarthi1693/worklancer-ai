import api from "@/lib/api";

class TeamAIService {
  async recommend(data: {
    projectTitle: string;
    projectDescription: string;
    members: unknown[];
  }) {
    const response = await api.post(
      "/ai/team-recommendation",
      data
    );

    return response.data;
  }
}

export default new TeamAIService();