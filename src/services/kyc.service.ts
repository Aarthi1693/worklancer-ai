import api from "@/lib/api";
import authService from "./auth.service";

class KycService {
  private getUserId() {
    const user = authService.getUser();

    if (!user) {
      throw new Error("User not logged in");
    }

    return user.id;
  }

  async getStatus() {
    const userId = this.getUserId();

    const response = await api.get(`/kyc/status/${userId}`);

    return response.data;
  }

  async savePersonalInfo(data: {
    fullName: string;
    dob: string;
    gender: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  }) {
    const userId = this.getUserId();

    const response = await api.post(
      `/kyc/personal-info/${userId}`,
      data,
    );

    return response.data;
  }

  async uploadDocument(
    type: "aadhaar" | "pan" | "selfie",
    file: File,
  ) {
    const userId = this.getUserId();

    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
      `/kyc/documents/${type}/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  }

  // 👇 ADD THIS METHOD
  async verifyKyc() {
    const userId = this.getUserId();

    const response = await api.post(`/kyc/verify/${userId}`);

    return response.data;
  }
}

export default new KycService();