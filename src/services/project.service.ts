import api from "@/lib/api";

export interface CreateProjectDto {
  title: string;
  description: string;
  budget: number;
  requiredSkills: string;
  taskType: "DIGITAL" | "FIELD";
}

class ProjectService {
  async createProject(data: CreateProjectDto) {
    const response = await api.post("/projects", data);
    return response.data;
  }

  async getProjects() {
    const response = await api.get("/projects");
    return response.data;
  }

  async updateProject(id: string, data: Partial<CreateProjectDto>) {
    const response = await api.patch(`/projects/${id}`, data);
    return response.data;
  }

  async deleteProject(id: string) {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  }
}

export default new ProjectService();
