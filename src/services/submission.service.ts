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

  console.log("Provider submissions:", response.data);

  return response.data;
}

  async delete(id: string) {
    const response = await api.delete(`/submission/${id}`);
    return response.data;
  }
}

export default new SubmissionService();
