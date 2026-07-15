import api from "@/lib/api";

class CareerAIService {
  async analyze(userId: string) {
    const response = await api.get(`/career-ai/${userId}`);
    return response.data;
  }
}

export default new CareerAIService();