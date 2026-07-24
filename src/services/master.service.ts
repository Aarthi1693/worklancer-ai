import api from "@/lib/api";

interface SubmitWorkDto {
  applicationId: string;
  githubLink: string;
  deploymentLink?: string;
  description: string;
}

interface DashboardResponse {
  activeProjects: number;
  completedProjects: number;
  pendingProjects: number;
  earnings: number;
  performance: number;
  successRate: number;
  averageRating: number;
  onTimeDelivery: number;
  currentTasks: Array<{
    id: string;
    title: string;
    budget: number;
    status: string;
    progress: number;
    submissionStatus: string;
  }>;
  earningsBreakdown: {
    totalEarnings: number;
    pendingEarnings: number;
    releasedEarnings: number;
  };
}

class MasterService {
  async getDashboard(): Promise<DashboardResponse> {
    const response = await api.get("/master/dashboard");
    return response.data;
  }

  async getProjects() {
    const response = await api.get("/master/projects");
    return response.data;
  }

  async getApplications() {
    const response = await api.get("/master/applications");
    return response.data;
  }

  async getMyTasks(userId: string) {
  const response = await api.get(`/master/my-tasks?userId=${userId}`);
  return response.data;
}

 async submitWork(data: SubmitWorkDto)
  {
  const response = await api.post("/submission", data);
  return response.data;
}
}

export default new MasterService();
