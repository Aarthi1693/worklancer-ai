import api from "@/lib/api";

interface CreateSubmissionDto {
  applicationId: string;
  githubLink: string;
  deploymentLink?: string;
  description: string;
}

interface UpdateSubmissionDto {
  status: "APPROVED" | "REJECTED";
}

class SubmissionService {
  async submit(data: CreateSubmissionDto) {
    const response = await api.post("/submission", data);
    return response.data;
  }

  async getAll() {
    const response = await api.get("/submission");
    return response.data;
  }

  async getOne(id: string) {
    const response = await api.get(`/submission/${id}`);
    return response.data;
  }

  async review(id: string, data: UpdateSubmissionDto) {
    const response = await api.patch(`/submission/${id}`, data);
    return response.data;
  }

  async getProviderSubmissions() {
    const response = await api.get("/submission/provider");
    return response.data;
  }

  async approveSubmission(id: string, feedback?: string) {
    const response = await api.patch(`/submission/${id}/approve`, { feedback });
    return response.data;
  }

  async releasePayment(submissionId: string) {
    const response = await api.post(`/submission/${submissionId}/release-payment`);
    return response.data;
  }

  async requestChanges(id: string, feedback: string) {
    const response = await api.patch(`/submission/${id}/request-changes`, { feedback });
    return response.data;
  }

  async rejectSubmission(id: string, feedback: string, reason: string) {
    const response = await api.patch(`/submission/${id}/reject`, { feedback, reason });
    return response.data;
  }

  async delete(id: string) {
    const response = await api.delete(`/submission/${id}`);
    return response.data;
  }
}

export const submissionService = new SubmissionService();
