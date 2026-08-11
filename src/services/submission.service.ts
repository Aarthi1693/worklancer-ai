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

interface SubmissionUpdateDto {
  description?: string;
  githubLink?: string;
  deploymentLink?: string;
  reportFile?: string;
  status?: string;
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

  async approveSubmission(id: string) {
  const response = await api.patch(`/submission/${id}`, {
    status: "APPROVED",
  });

  return response.data;
}

  async releasePayment(submissionId: string) {
    const response = await api.post(`/submission/${submissionId}/release-payment`);
    return response.data;
  }

  async requestChanges(id: string) {
  return api.patch(`/submission/${id}`, {
    status: "REVISION_REQUIRED",
  });
}
  
async rejectSubmission(id: string) {
  return api.patch(`/submission/${id}`, {
    status: "REJECTED",
  });
}

  async delete(id: string) {
    const response = await api.delete(`/submission/${id}`);
    return response.data;
  }

  async updateSubmission(
    id: string,
    data: Partial<SubmissionUpdateDto>,
  ) {
    const response = await api.patch(`/submission/${id}`, data);
    return response.data;
  }

  async uploadFiles(files: File[]): Promise<string[]> {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file); // MUST match FilesInterceptor("files")
  });

  const response = await api.post("/submission/files", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.map((item: { url: string }) => item.url);
}
}

export const submissionService = new SubmissionService();
