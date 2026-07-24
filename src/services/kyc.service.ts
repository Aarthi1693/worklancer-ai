import axios from "axios";
import api from "@/lib/api";

export interface KycStatus {
  status: string;
  verifiedAt: string | null;
  score: number | null;
  report: any;
  documents: {
    idPhoto: string | null;
    panCard: string | null;
    selfie: string | null;
    profilePhoto: string | null;
  };
  personalInfo: {
    fullName: string;
    email: string;
    dob: string;
    gender: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
    githubUrl?: string;
    linkedinUrl?: string;
  };
}

export interface KycVerificationReport {
  identityMatch?: string;
  ocrConfidence?: string;
  documentQuality?: string;
  faceMatch?: string;
  fraudRisk?: string;
  verificationScore?: string;
  status?: string;
  reasons?: string[];
  recommendation?: string;
}

class KycService {
  async getStatus(): Promise<KycStatus> {
    try {
      const response = await api.get("/kyc/status");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        return {
          status: "NOT_STARTED",
          verifiedAt: null,
          score: null,
          report: null,
          documents: {
            idPhoto: null,
            panCard: null,
            selfie: null,
            profilePhoto: null,
          },
          personalInfo: {
            fullName: "",
            email: "",
            dob: "",
            gender: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            phone: "",
            githubUrl: "",
            linkedinUrl: "",
          },
        };
      }

      throw error;
    }
  }

  async updatePersonalInfo(data: {
    fullName: string;
    dob: string;
    gender: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
    githubUrl?: string;
    linkedinUrl?: string;
  }) {
    const response = await api.post("/kyc/personal-info", data);
    return response.data;
  }

  async uploadDocuments(data: FormData) {
    const response = await api.post("/kyc/documents", data);
    return response.data;
  }

  async verify(): Promise<{ steps: string[]; report: KycVerificationReport }> {
    const response = await api.post("/kyc/verify");
    return response.data;
  }
}

export default new KycService();
