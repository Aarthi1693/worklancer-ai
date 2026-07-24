export interface ProfileData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  skills?: string[];
  experience?: number;
  companyName?: string;
  contactPerson?: string;
  companySize?: string;
  providerType?: string;
  industry?: string;
  website?: string;
  businessAddress?: string;
  companyDescription?: string;
  portfolioLink?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  hourlyRate?: number;
  availability?: string;
  resume?: string;
  gstNumber?: string;
  companyRegistrationNumber?: string;
  preferredRole?: string;
  role: "PROVIDER" | "MASTER" | "ADMIN";
  createdAt?: string;
  updatedAt?: string;
  kycStatus?: string;
  kycScore?: number;
  rating?: number;
}

export interface UpdateProfileDto {
  name?: string;
  email?: string;
  phone?: string;
  bio?: string;
  location?: string;
  skills?: string;
  experience?: number;
  companyName?: string;
  contactPerson?: string;
  companySize?: string;
  providerType?: string;
  industry?: string;
  website?: string;
  businessAddress?: string;
  companyDescription?: string;
  portfolioLink?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  hourlyRate?: number;
  availability?: string;
  preferredRole?: string;
  gstNumber?: string;
  companyRegistrationNumber?: string;
}

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
