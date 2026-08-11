"use client";

import { useState, useEffect, useCallback } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, XCircle, RefreshCw, ExternalLink, FileText, Calendar, User, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { motion } from "framer-motion";
import { submissionService } from "@/services/submission.service";
import { paymentService } from "@/services/payment.service";
import { Payment, PaymentStatus } from "@/types/payment";
import { useSubmissionSocket } from "@/hooks/useSubmissionSocket";
import {
  emitSubmissionUpdated,
  SubmissionEventPayload,
} from "@/services/socket.service";

interface SubmissionDetail {
  id: string;
  status: string;
  description: string;
  feedback?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  approvedAt?: string;
  githubLink?: string;
  deploymentLink?: string;
  reportFile?: string;
  createdAt: string;
  application: {
    user: {
      name: string;
      email: string;
    };
    project: {
      title: string;
      taskType: string;
      budget: number;
      status: string;
    };
  };
}

const statusConfig: Record<string, { color: string; label: string }> = {
  PENDING: { color: "bg-amber-100 text-amber-700", label: "Pending Review" },
  PENDING_REVIEW: { color: "bg-amber-100 text-amber-700", label: "Pending Review" },
  APPROVED: { color: "bg-green-100 text-green-700", label: "Approved" },
  REVISION_REQUIRED: { color: "bg-orange-100 text-orange-700", label: "Revision Required" },
  REJECTED: { color: "bg-red-100 text-red-700", label: "Rejected" },
};

function SubmissionDetailContent() {
  const router = useRouter();
  const params = useParams();
  const { addToast } = useToast();
  const [submission, setSubmission] = useState<SubmissionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showChangesDialog, setShowChangesDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [showReleaseDialog, setShowReleaseDialog] = useState(false);

  const submissionId = params.id as string;

  const loadSubmission = useCallback(async () => {
    try {
      setLoading(true);
      const data = await submissionService.getOne(submissionId);
      setSubmission(data);
    } catch (error) {
      console.error("Failed to load submission:", error);
      addToast("Failed to load submission details.", "error");
    } finally {
      setLoading(false);
    }
  }, [submissionId, addToast]);

  const loadPayment = useCallback(async () => {
    try {
      setLoadingPayment(true);
      const data = await paymentService.getPaymentDetails(submissionId);
      setPayment(data);
    } catch (error) {
      console.error("Failed to load payment:", error);
    } finally {
      setLoadingPayment(false);
    }
  }, [submissionId]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (submissionId) {
      loadSubmission();
      loadPayment();
    }
  }, [submissionId, loadSubmission, loadPayment]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useSubmissionSocket({
    onUpdated: (payload: SubmissionEventPayload) => {
      if (payload.submissionId !== submissionId) return;
      setSubmission((prev) =>
        prev
          ? {
              ...prev,
              status: payload.status ?? prev.status,
              feedback: payload.feedback ?? prev.feedback,
            }
          : prev
      );
    },
  });

  const handleApprove = async () => {
    try {
      setActionLoading(true);
      await submissionService.approveSubmission(submissionId);
      addToast("Submission approved successfully!", "success");
      emitSubmissionUpdated({ submissionId, status: "APPROVED" });
      loadSubmission();
      loadPayment();
    } catch (error) {
      console.error("Failed to approve:", error);
      addToast("Failed to approve submission.", "error");
    } finally {
      setActionLoading(false);
      setShowApproveDialog(false);
      setFeedback("");
    }
  };

  const handleRequestChanges = async () => {
    if (!feedback.trim()) {
      addToast("Please provide feedback.", "warning");
      return;
    }
    try {
      setActionLoading(true);
      await submissionService.requestChanges(submissionId);
      addToast("Changes requested successfully!", "success");
      emitSubmissionUpdated({ submissionId, status: "REVISION_REQUIRED" });
      loadSubmission();
    } catch (error) {
      console.error("Failed to request changes:", error);
      addToast("Failed to request changes.", "error");
    } finally {
      setActionLoading(false);
      setShowChangesDialog(false);
      setFeedback("");
    }
  };

  const handleReject = async () => {
    if (!feedback.trim() || !rejectReason.trim()) {
      addToast("Please provide feedback and reason.", "warning");
      return;
    }
    try {
      setActionLoading(true);
      await submissionService.rejectSubmission(submissionId);
      addToast("Submission rejected.", "success");
      emitSubmissionUpdated({ submissionId, status: "REJECTED" });
      loadSubmission();
    } catch (error) {
      console.error("Failed to reject:", error);
      addToast("Failed to reject submission.", "error");
    } finally {
      setActionLoading(false);
      setShowRejectDialog(false);
      setFeedback("");
      setRejectReason("");
    }
  };

  const handleReleasePayment = async () => {
    if (!payment) return;
    try {
      setActionLoading(true);
      await paymentService.releasePayment(payment.id);
      addToast("Payment released successfully.", "success");
      loadPayment();
      loadSubmission();
    } catch (error) {
      console.error("Failed to release payment:", error);
      addToast("Failed to release payment.", "error");
    } finally {
      setActionLoading(false);
      setShowReleaseDialog(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Submission Not Found</h2>
        <p className="text-slate-500 mb-6">The requested submission could not be found.</p>
        <Button onClick={() => router.back()}>
  Back
</Button>
      </div>
    );
  }

  const project = submission.application?.project || {};
  const applicant = submission.application?.user || {};
  const isPending = submission.status === "PENDING" || submission.status === "PENDING_REVIEW";

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <button
  onClick={() => router.back()}
  className="text-slate-400 hover:text-slate-900 transition-colors"
>
  <ArrowLeft size={24} />
</button>
            <h1 className="text-3xl font-bold text-slate-900">Submission Review</h1>
          </div>
          <p className="text-slate-500 ml-9">Review and take action on this submission.</p>
        </div>
        <Badge variant="outline" className={`${statusConfig[submission.status]?.color || "border-slate-200 text-slate-500"} rounded-lg text-sm`}>
          {statusConfig[submission.status]?.label || submission.status}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              rounded-3xl border border-slate-200 bg-white backdrop-blur-xl
              shadow-md p-6
            "
          >
            <h2 className="text-xl font-semibold mb-4 text-slate-900 flex items-center gap-2">
              <FileText className="text-blue-600" size={20} />
              Project Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-500">Project Title</p>
                <p className="text-slate-900 font-medium">{project.title || "N/A"}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Task Type</p>
                  <p className="text-slate-900">{project.taskType || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Budget</p>
                  <p className="text-slate-900">₹{project.budget || "0"}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500">Project Status</p>
                <p className="text-slate-900">{project.status || "N/A"}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="
              rounded-3xl border border-slate-200 bg-white backdrop-blur-xl
              shadow-md p-6
            "
          >
            <h2 className="text-xl font-semibold mb-4 text-slate-900 flex items-center gap-2">
              <User className="text-purple-600" size={20} />
              Freelancer Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-500">Name</p>
                <p className="text-slate-900 font-medium">{applicant.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="text-slate-900">{applicant.email || "N/A"}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="
              rounded-3xl border border-slate-200 bg-white backdrop-blur-xl
              shadow-md p-6
            "
          >
            <h2 className="text-xl font-semibold mb-4 text-slate-900">Submission Notes</h2>
            <p className="text-slate-900 whitespace-pre-wrap">{submission.description || "No description provided."}</p>
          </motion.div>

          {(submission.githubLink || submission.deploymentLink || submission.reportFile) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="
                rounded-3xl border border-slate-200 bg-white backdrop-blur-xl
                shadow-md p-6
              "
            >
              <h2 className="text-xl font-semibold mb-4 text-slate-900">Links & Files</h2>
              <div className="space-y-3">
                {submission.githubLink && (
                  <a href={submission.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                    <ExternalLink size={16} />
                    GitHub Repository
                  </a>
                )}
                {submission.deploymentLink && (
                  <a href={submission.deploymentLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-600 hover:text-green-700">
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
                {submission.reportFile && (
                  <a href={submission.reportFile} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-purple-600 hover:text-purple-700">
                    <FileText size={16} />
                    Uploaded File
                  </a>
                )}
              </div>
            </motion.div>
          )}

          {submission.feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                rounded-3xl border border-slate-200 bg-white backdrop-blur-xl
                shadow-md p-6
              "
            >
              <h2 className="text-xl font-semibold mb-4 text-slate-900">Feedback</h2>
              <p className="text-slate-900 whitespace-pre-wrap">{submission.feedback}</p>
            </motion.div>
          )}

          {payment && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                rounded-3xl border border-slate-200 bg-white backdrop-blur-xl
                shadow-md p-6
              "
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-900">
                <CreditCard className="text-green-600" size={20} />
                Payment Status
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Amount</span>
                  <span className="text-slate-900 font-semibold">₹{(payment.amount ?? 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Status</span>
                  <Badge
                    variant="outline"
                    className={`${
                      payment.status === PaymentStatus.RELEASED
                        ? "border-green-200 bg-green-50 text-green-700"
                        : payment.status === PaymentStatus.PENDING || payment.status === PaymentStatus.HELD
                        ? "border-yellow-200 bg-yellow-50 text-yellow-700"
                        : "border-red-200 bg-red-50 text-red-700"
                    } rounded-lg`}
                  >
                    {payment.status}
                  </Badge>
                </div>
                {payment.transactionId && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Transaction ID</span>
                    <span className="text-slate-900 font-mono text-sm">{payment.transactionId}</span>
                  </div>
                )}
                {payment.status === PaymentStatus.RELEASED && (
                  <div className="space-y-3 mt-4 p-4 rounded-xl border border-green-200 bg-green-50">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-600" size={18} />
                      <span className="text-slate-500">Payment Status:</span>
                      <span className="text-green-700 font-semibold">✅ Released</span>
                    </div>
                    {payment.releasedAt && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Released On:</span>
                        <span className="text-slate-900">{new Date(payment.releasedAt).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                )}
                {submission.status === "APPROVED" && payment.status === PaymentStatus.PENDING && (
                  <Button
                    onClick={() => setShowReleaseDialog(true)}
                    disabled={actionLoading}
                    className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:from-green-500 hover:to-emerald-500 disabled:opacity-50"
                  >
                    <CheckCircle2 size={18} className="mr-2" />
                    Release Payment
                  </Button>
                )}
              </div>
            </motion.div>
          )}

          {isPending && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4"
            >
              <Button
                onClick={() => setShowApproveDialog(true)}
                disabled={actionLoading}
                className="flex-1 h-12 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:from-green-500 hover:to-emerald-500 disabled:opacity-50"
              >
                <CheckCircle2 size={18} className="mr-2" />
                Approve
              </Button>
              <Button
                onClick={() => setShowChangesDialog(true)}
                disabled={actionLoading}
                className="flex-1 h-12 rounded-xl bg-gradient-to-r from-orange-600 to-yellow-600 text-white font-semibold shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:from-orange-500 hover:to-yellow-500 disabled:opacity-50"
              >
                <RefreshCw size={18} className="mr-2" />
                Request Changes
              </Button>
              <Button
                onClick={() => setShowRejectDialog(true)}
                disabled={actionLoading}
                className="flex-1 h-12 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:from-red-500 hover:to-rose-500 disabled:opacity-50"
              >
                <XCircle size={18} className="mr-2" />
                Reject
              </Button>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="
              rounded-3xl border border-slate-200 bg-white backdrop-blur-xl
              shadow-md p-6
            "
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Calendar className="text-blue-600" size={18} />
              Timeline
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-slate-500">Submitted Date</p>
                <p className="text-slate-900">{new Date(submission.createdAt).toLocaleString()}</p>
              </div>
              {submission.reviewedAt && (
                <div>
                  <p className="text-slate-500">Reviewed Date</p>
                  <p className="text-slate-900">{new Date(submission.reviewedAt).toLocaleString()}</p>
                </div>
              )}
              {submission.approvedAt && (
                <div>
                  <p className="text-slate-500">Approved Date</p>
                  <p className="text-slate-900">{new Date(submission.approvedAt).toLocaleString()}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Approve Dialog */}
      <ConfirmDialog
        isOpen={showApproveDialog}
        onClose={() => { setShowApproveDialog(false); setFeedback(""); }}
        onConfirm={handleApprove}
        title="Approve Submission"
        message="Are you sure you want to approve this submission? This will mark the project as completed."
        confirmText="Approve"
        variant="primary"
      >
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-500 mb-2">Feedback (optional)</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={3}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              p-3
              text-sm
              text-slate-900
              placeholder:text-slate-400
              focus:border-blue-500
              focus:outline-none
              focus:ring-2
              focus:ring-blue-100
            "
            placeholder="Add optional feedback..."
          />
        </div>
      </ConfirmDialog>

      {/* Request Changes Dialog */}
      <ConfirmDialog
        isOpen={showChangesDialog}
        onClose={() => { setShowChangesDialog(false); setFeedback(""); }}
        onConfirm={handleRequestChanges}
        title="Request Changes"
        message="Please provide feedback for the freelancer."
        confirmText="Request Changes"
        variant="primary"
      >
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-500 mb-2">Feedback *</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm"
            placeholder="Describe what needs to be improved..."
          />
        </div>
      </ConfirmDialog>

      {/* Reject Dialog */}
      <ConfirmDialog
        isOpen={showRejectDialog}
        onClose={() => { setShowRejectDialog(false); setFeedback(""); setRejectReason(""); }}
        onConfirm={handleReject}
        title="Reject Submission"
        message="Are you sure you want to reject this submission? This action cannot be undone."
        confirmText="Reject"
        variant="danger"
      >
        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-2">Feedback *</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={3}
              className="w-full p-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm"
              placeholder="Provide feedback..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-2">Reason *</label>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={2}
              className="w-full p-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm"
              placeholder="Reason for rejection..."
            />
          </div>
        </div>
      </ConfirmDialog>

      {/* Release Payment Dialog */}
      <ConfirmDialog
        isOpen={showReleaseDialog}
        onClose={() => setShowReleaseDialog(false)}
        onConfirm={handleReleasePayment}
        title="Release Payment"
        message={
          payment
            ? `Are you sure you want to release ₹${(payment.amount ?? 0).toLocaleString()} to the master? This action cannot be undone.`
            : ""
        }
        confirmText="Release Payment"
        variant="primary"
      />
    </div>
  );
}

export default function SubmissionDetailPage() {
  return (
    <DesktopLayout>
      <ToastProvider>
        <SubmissionDetailContent />
      </ToastProvider>
    </DesktopLayout>
  );
}
