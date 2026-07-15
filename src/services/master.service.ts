import api from "@/lib/api";

interface SubmitWorkDto {
  applicationId: string;
  githubLink: string;
  deploymentLink?: string;
  description: string;
}

class MasterService {
  async getDashboard() {
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

  async getMyTasks() {
  const response = await api.get("/master/my-tasks");
  return response.data;
}

 async submitWork(data: SubmitWorkDto)
  {
  const response = await api.post("/submission", data);
  return response.data;
}
}

export default new MasterService();
