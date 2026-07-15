import api from "@/lib/api";

class ProviderService {
  // Dashboard
  async getDashboard() {
    const response = await api.get("/provider/dashboard");
    return response.data;
  }

  // Provider Projects
  async getProjects() {
    const response = await api.get("/provider/projects");
    return response.data;
  }

  // Applicants
  async getApplicants(projectId: string) {
    const response = await api.get(
      `/projects/${projectId}/applicants`
    );
    return response.data;
  }

  // Accept Applicant
  async acceptApplicant(applicationId: string) {
    const response = await api.patch(
      `/applications/${applicationId}/accept`
    );
    return response.data;
  }

  // Reject Applicant
  async rejectApplicant(applicationId: string) {
    const response = await api.patch(
      `/applications/${applicationId}/reject`
    );
    return response.data;
  }
}

export default new ProviderService();
