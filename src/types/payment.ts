export enum PaymentStatus {
  PENDING = "PENDING",
  HELD = "HELD",
  RELEASED = "RELEASED",
  FAILED = "FAILED",
}

export interface Payment {
  id: string;
  projectId: string;
  providerId: string;
  masterId: string;
  amount: number;
  status: PaymentStatus;
  transactionId?: string;
  releasedAt?: string;
  createdAt: string;
  updatedAt: string;
  project?: {
    id: string;
    title: string;
    taskType: string;
  };
  master?: {
    id: string;
    name: string;
    email: string;
  };
  provider?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface PaymentSummary {
  totalBudget: number;
  released: number;
  pending: number;
  totalPayments: number;
}

export interface MasterEarnings {
  totalEarnings: number;
  pendingEarnings: number;
  releasedEarnings: number;
  payments: Payment[];
}
