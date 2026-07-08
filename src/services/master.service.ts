import api from "@/lib/api";

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
}

export default new MasterService();