import api from "@/lib/api";

class ProviderService {
  async getProjects() {
    const response = await api.get("/provider/projects");
    return response.data;
  }

  async getApplicants(projectId: string) {
    const response = await api.get(
      `/projects/${projectId}/applicants`
    );
    return response.data;
  }

  async acceptApplicant(applicationId: string) {
    const response = await api.patch(
      `/applications/${applicationId}/accept`
    );
    return response.data;
  }

  async rejectApplicant(applicationId: string) {
    const response = await api.patch(
      `/applications/${applicationId}/reject`
    );
    return response.data;
  }
}

export default new ProviderService();