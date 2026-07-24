"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";
import { useRouter } from "next/navigation";
import {
  DollarSign,
  Wallet,
  CreditCard,
  TrendingUp,
  Eye,
  Download,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { motion } from "framer-motion";
import { paymentService } from "@/services/payment.service";
import { Payment, PaymentStatus } from "@/types/payment";

const statusConfig: Record<PaymentStatus, { color: string; label: string }> = {
  [PaymentStatus.PENDING]: {
    color: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
    label: "Pending",
  },
  [PaymentStatus.HELD]: {
    color: "border-orange-500/30 bg-orange-500/10 text-orange-400",
    label: "Held in Escrow",
  },
  [PaymentStatus.RELEASED]: {
    color: "border-green-500/30 bg-green-500/10 text-green-400",
    label: "Released",
  },
  [PaymentStatus.FAILED]: {
    color: "border-red-500/30 bg-red-500/10 text-red-400",
    label: "Failed",
  },
};

function PaymentsContent() {
  const router = useRouter();
  const { addToast } = useToast();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [releasingId, setReleasingId] = useState<string | null>(null);
  const [showReleaseDialog, setShowReleaseDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const loadPayments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await paymentService.getProviderPayments();
      console.log("Provider payments API response:", data);
      setPayments(data);
    } catch (error) {
      console.error("Failed to load payments:", error);
      addToast("Failed to load payments.", "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  const paymentList = useMemo((): Payment[] => {
    if (Array.isArray(payments)) {
      return payments;
    }
    const list = (payments as any)?.payments || (payments as any)?.data;
    if (Array.isArray(list)) {
      return list;
    }
    return [];
  }, [payments]);

  const summary = useMemo(() => {
    const totalBudget = paymentList.reduce((sum, p) => sum + p.amount, 0);
    const released = paymentList
      .filter((p) => p.status === PaymentStatus.RELEASED)
      .reduce((sum, p) => sum + p.amount, 0);
    const pending = paymentList
      .filter((p) => p.status === PaymentStatus.PENDING || p.status === PaymentStatus.HELD)
      .reduce((sum, p) => sum + p.amount, 0);
    return { totalBudget, released, pending, totalPayments: paymentList.length };
  }, [paymentList]);

  const handleReleaseClick = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowReleaseDialog(true);
  };

  const handleReleaseConfirm = async () => {
    if (!selectedPayment) return;
    try {
      setReleasingId(selectedPayment.id);
      await paymentService.releasePayment(selectedPayment.id);
      addToast("Payment released successfully!", "success");
      loadPayments();
    } catch (error) {
      console.error("Failed to release payment:", error);
      addToast("Failed to release payment.", "error");
    } finally {
      setReleasingId(null);
      setShowReleaseDialog(false);
      setSelectedPayment(null);
    }
  };

  const isReleasable = (payment: Payment) => {
    return payment.status === PaymentStatus.PENDING || payment.status === PaymentStatus.HELD;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          Payments & Revenue
        </h1>
        <p className="text-slate-400 mt-2">
          Track earnings, transactions and payment insights.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-5">
          <Wallet className="text-green-400 mb-3" />
          <p className="text-slate-400 text-sm">Total Budget</p>
          <h2 className="text-3xl font-bold text-green-400 mt-2">
            ₹{summary.totalBudget.toLocaleString()}
          </h2>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-5">
          <DollarSign className="text-blue-400 mb-3" />
          <p className="text-slate-400 text-sm">Released</p>
          <h2 className="text-3xl font-bold text-blue-400 mt-2">
            ₹{summary.released.toLocaleString()}
          </h2>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-5">
          <CreditCard className="text-purple-400 mb-3" />
          <p className="text-slate-400 text-sm">Pending</p>
          <h2 className="text-3xl font-bold text-purple-400 mt-2">
            ₹{summary.pending.toLocaleString()}
          </h2>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-5">
          <TrendingUp className="text-yellow-400 mb-3" />
          <p className="text-slate-400 text-sm">Total Payments</p>
          <h2 className="text-3xl font-bold text-yellow-400 mt-2">
            {summary.totalPayments}
          </h2>
        </div>
      </div>

      {/* Payment History */}
      <div
        className="
          rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl
          shadow-[0_0_40px_rgba(59,130,246,0.08)] overflow-hidden
        "
      >
        <div className="p-6 border-b border-white/[0.08]">
          <h2 className="text-2xl font-bold">Payment History</h2>
        </div>

        {paymentList.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-400">No payments found.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {paymentList.map((payment, idx) => (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="p-6 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-white">
                        {payment.project?.title || "Untitled Project"}
                      </h3>
                      <Badge
                        variant="outline"
                        className={`${statusConfig[payment.status]?.color || "border-white/10 text-slate-300"} rounded-lg`}
                      >
                        {statusConfig[payment.status]?.label || payment.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400">
                      Master: <span className="text-cyan-400">{payment.master?.name || "N/A"}</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {payment.transactionId && `Transaction ID: ${payment.transactionId}`}
                      {payment.releasedAt && ` • Released: ${new Date(payment.releasedAt).toLocaleDateString()}`}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <h3 className="text-xl font-bold text-white">
                         ₹{(payment.amount ?? 0).toLocaleString()}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedPayment(payment)}
                        className="
                          bg-green-500
                          hover:bg-green-600
                          text-white
                          rounded-lg
                          px-4
                          py-2
                          font-medium
                          transition-all
                          duration-200
                          shadow-sm
                          hover:scale-105
                        "
                      >
                        <Eye size={14} className="mr-1" />
                        View
                      </button>

                      {isReleasable(payment) && (
                        <Button
                          size="sm"
                          onClick={() => handleReleaseClick(payment)}
                          disabled={releasingId === payment.id}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle2 size={14} className="mr-1" />
                          {releasingId === payment.id ? "Releasing..." : "Release Payment"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Payment Detail Modal */}
      {selectedPayment && (
        <div
          className="
            fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50
          "
          onClick={() => setSelectedPayment(null)}
        >
          <div
            className="
              w-[500px] rounded-3xl bg-slate-950 border border-white/[0.08] p-8
            "
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-400">Project</p>
                <p className="text-white font-medium">{selectedPayment.project?.title || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Master</p>
                <p className="text-white">{selectedPayment.master?.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Amount</p>
                <p className="text-white font-semibold">₹{(selectedPayment.amount ?? 0).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Status</p>
                <Badge
                  variant="outline"
                  className={`${statusConfig[selectedPayment.status]?.color || "border-white/10 text-slate-300"} rounded-lg`}
                >
                  {statusConfig[selectedPayment.status]?.label || selectedPayment.status}
                </Badge>
              </div>
              {selectedPayment.transactionId && (
                <div>
                  <p className="text-sm text-slate-400">Transaction ID</p>
                  <p className="text-white font-mono text-sm">{selectedPayment.transactionId}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-slate-400">Created</p>
                <p className="text-white">{new Date(selectedPayment.createdAt).toLocaleString()}</p>
              </div>
              {selectedPayment.releasedAt && (
                <div>
                  <p className="text-sm text-slate-400">Released At</p>
                  <p className="text-white">{new Date(selectedPayment.releasedAt).toLocaleString()}</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setSelectedPayment(null)}
              className="
                mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600
                text-white hover:from-blue-500 hover:to-purple-500 transition
              "
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Release Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showReleaseDialog}
        onClose={() => {
          setShowReleaseDialog(false);
          setSelectedPayment(null);
        }}
        onConfirm={handleReleaseConfirm}
        title="Release Payment"
        message={
          selectedPayment
              ? `Are you sure you want to release ₹${(selectedPayment.amount ?? 0).toLocaleString()} to ${selectedPayment.master?.name || "the master"}? This action cannot be undone.`
            : ""
        }
        confirmText="Release Payment"
        variant="primary"
      />
    </div>
  );
}

export default function PaymentsPage() {
  return (
    <DesktopLayout>
      <ToastProvider>
        <PaymentsContent />
      </ToastProvider>
    </DesktopLayout>
  );
}
