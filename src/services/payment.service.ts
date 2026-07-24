import api from "@/lib/api";
import { Payment, MasterEarnings } from "@/types/payment";

class PaymentService {
  async getProviderPayments(): Promise<Payment[]> {
    const response = await api.get("/payments/provider");
    return response.data;
  }

  async getMasterEarnings(): Promise<MasterEarnings> {
    const response = await api.get("/payments/master");
    return response.data;
  }

  async getPaymentDetails(id: string): Promise<Payment> {
    const response = await api.get(`/payments/${id}`);
    return response.data;
  }

  async releasePayment(id: string): Promise<Payment> {
    const response = await api.patch(`/payments/${id}/release`);
    return response.data;
  }
}

export const paymentService = new PaymentService();
