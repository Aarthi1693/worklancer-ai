import api from "@/lib/api";

class MasterAnalyticsService {
  async getAnalytics() {
    const response = await api.get("/master/analytics");
    return response.data;
  }
}

export default new MasterAnalyticsService();