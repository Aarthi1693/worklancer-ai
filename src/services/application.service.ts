import api from "@/lib/api";

interface CreateApplicationDto {
  userId: string;
  projectId: string;
}

class ApplicationService {
  async apply(data: CreateApplicationDto) {
    const response = await api.post("/applications", data);
    return response.data;
  }

  async getApplications() {
    const response = await api.get("/applications");
    return response.data;
  }
}

export default new ApplicationService();