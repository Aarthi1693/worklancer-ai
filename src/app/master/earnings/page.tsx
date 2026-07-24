"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";
import {
  DollarSign,
  Wallet,
  TrendingUp,
  Download,
  Eye,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
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

function EarningsContent() {
  const { addToast } = useToast();
  const [earnings, setEarnings] = useState<{
    totalEarnings: number;
    pendingEarnings: number;
    releasedEarnings: number;
    payments: Payment[];
  } | null>({
    totalEarnings: 0,
    pendingEarnings: 0,
    releasedEarnings: 0,
    payments: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const loadEarnings = useCallback(async () => {
    try {
      setLoading(true);
      const data = await paymentService.getMasterEarnings();
      setEarnings(data);
    } catch (error) {
      console.error("Failed to load earnings:", error);
      addToast("Failed to load earnings.", "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    loadEarnings();
  }, [loadEarnings]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!earnings) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">No earnings data available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          Earnings Dashboard
        </h1>
        <p className="text-slate-400 mt-2">
          Track income, payments and financial growth.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-6">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
          <p className="text-slate-400 text-sm">Total Earnings</p>
          <p className="text-green-400 text-sm mt-2">
            N/A
          </p>
          <h2 className="text-3xl font-bold mt-2">
            ₹{earnings.totalEarnings.toLocaleString()}
          </h2>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
          <p className="text-slate-400 text-sm">Released Earnings</p>
          <h2 className="text-3xl font-bold mt-2 text-blue-400">
            ₹{earnings.releasedEarnings.toLocaleString()}
          </h2>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
          <p className="text-slate-400 text-sm">Pending Earnings</p>
          <h2 className="text-3xl font-bold mt-2 text-yellow-400">
            ₹{earnings.pendingEarnings.toLocaleString()}
          </h2>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
          <p className="text-slate-400 text-sm">Withdrawable Balance</p>
          <h2 className="text-3xl font-bold mt-2 text-green-400">
            ₹{earnings.releasedEarnings.toLocaleString()}
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

        {(earnings.payments || []).length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-400">No payments found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-white/[0.08]">
                  <th className="p-5 text-slate-400">Project</th>
                  <th className="p-5 text-slate-400">Provider</th>
                  <th className="p-5 text-slate-400">Amount</th>
                  <th className="p-5 text-slate-400">Released Date</th>
                  <th className="p-5 text-slate-400">Status</th>
                  <th className="p-5 text-slate-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {earnings.payments.map((payment, idx) => (
                  <motion.tr
                    key={payment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="border-b border-white/5 hover:bg-white/5"
                  >
                    <td className="p-5">
                      <p className="text-white font-medium">
                        {payment.project?.title || "Untitled Project"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {payment.project?.taskType || "N/A"}
                      </p>
                    </td>
                    <td className="p-5">
                      <p className="text-cyan-400">{payment.provider?.name || "N/A"}</p>
                    </td>
                    <td className="p-5 font-semibold text-white">
                      ₹{(payment.amount ?? 0).toLocaleString()}
                    </td>
                    <td className="p-5 text-slate-400">
                      {payment.releasedAt
                        ? new Date(payment.releasedAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="p-5">
                      <Badge
                        variant="outline"
                        className={`${statusConfig[payment.status]?.color || "border-white/10 text-slate-300"} rounded-lg`}
                      >
                        {statusConfig[payment.status]?.label || payment.status}
                      </Badge>
                    </td>
                    <td className="p-5">
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
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Withdraw Card */}
      <div
        className="
          rounded-3xl border border-green-500/20 bg-white/[0.03] backdrop-blur-xl
          shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6
        "
      >
        <h2 className="text-2xl font-bold mb-4">Withdraw Funds</h2>
        <p className="text-slate-400">Available Balance</p>
        <h3 className="text-4xl font-bold text-green-400 mt-3">
          ₹{earnings.releasedEarnings.toLocaleString()}
        </h3>
        <button
          className="
            mt-6 w-full py-3 rounded-xl bg-green-600 hover:bg-green-700
            transition font-semibold
          "
        >
          Withdraw Funds
        </button>
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
                <p className="text-sm text-slate-400">Provider</p>
                <p className="text-white">{selectedPayment.provider?.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Amount</p>
                <p className="text-white font-semibold">₹{selectedPayment.amount.toLocaleString()}</p>
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
    </div>
  );
}

export default function EarningsPage() {
  return (
    <DesktopLayout>
      <ToastProvider>
        <EarningsContent />
      </ToastProvider>
    </DesktopLayout>
  );
}
