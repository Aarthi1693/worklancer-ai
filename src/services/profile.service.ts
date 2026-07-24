import api from "@/lib/api";
import type { UpdateProfileDto, ProfileData } from "@/types/profile";

export interface ProviderStats {
  projectsPosted: number;
  activeProjects: number;
  completedProjects: number;
  totalBudget: number;
  totalPayments: number;
  averageRating: number;
}

export interface MasterStats {
  completedProjects: number;
  activeProjects: number;
  successRate: number;
  totalEarnings: number;
  aiCareerScore: number | null;
  overallRating: number;
}

class ProfileService {
  async getProfile() {
    const response = await api.get("/profile");
    return response.data as ProfileData;
  }

  async updateProfile(data: UpdateProfileDto) {
    const payload: UpdateProfileDto = { ...data };

    if (payload.skills && Array.isArray(payload.skills)) {
      payload.skills = payload.skills.join(",");
    }

    if (payload.experience !== undefined && payload.experience !== null) {
      payload.experience = Number(payload.experience);
    }

    if (payload.hourlyRate !== undefined && payload.hourlyRate !== null) {
      payload.hourlyRate = Number(payload.hourlyRate);
    }

    const response = await api.put("/profile", payload);
    return response.data as ProfileData;
  }

  async uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append("avatar", file);
    const response = await api.patch("/profile/image", formData);
    return response.data as { avatarUrl: string };
  }

  async uploadResume(file: File) {
    const formData = new FormData();
    formData.append("resume", file);
    const response = await api.patch("/profile/resume", formData);
    return response.data as { resumeUrl: string };
  }

  async getProviderStats() {
    const response = await api.get("/profile/stats/provider");
    return response.data as ProviderStats;
  }

  async getMasterStats() {
    const response = await api.get("/profile/stats/master");
    return response.data as MasterStats;
  }
}

const profileService = new ProfileService();

export default profileService;
