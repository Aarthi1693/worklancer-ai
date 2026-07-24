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
  PENDING: { color: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400", label: "Pending Review" },
  PENDING_REVIEW: { color: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400", label: "Pending Review" },
  APPROVED: { color: "border-green-500/30 bg-green-500/10 text-green-400", label: "Approved" },
  REVISION_REQUIRED: { color: "border-orange-500/30 bg-orange-500/10 text-orange-400", label: "Revision Required" },
  REJECTED: { color: "border-red-500/30 bg-red-500/10 text-red-400", label: "Rejected" },
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

  const handleApprove = async () => {
    try {
      setActionLoading(true);
      await submissionService.approveSubmission(submissionId, feedback);
      addToast("Submission approved successfully!", "success");
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
      await submissionService.requestChanges(submissionId, feedback);
      addToast("Changes requested successfully!", "success");
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
      await submissionService.rejectSubmission(submissionId, feedback, rejectReason);
      addToast("Submission rejected.", "success");
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
        <h2 className="text-2xl font-bold text-white mb-4">Submission Not Found</h2>
        <p className="text-slate-400 mb-6">The requested submission could not be found.</p>
        <Button onClick={() => router.push("/provider/submissions")}>Back to Submissions</Button>
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
              onClick={() => router.push("/provider/submissions")}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-3xl font-bold text-white">Submission Review</h1>
          </div>
          <p className="text-slate-400 ml-9">Review and take action on this submission.</p>
        </div>
        <Badge variant="outline" className={`${statusConfig[submission.status]?.color || "border-white/10 text-slate-300"} rounded-lg text-sm`}>
          {statusConfig[submission.status]?.label || submission.status}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl
              shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6
            "
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="text-blue-400" size={20} />
              Project Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-400">Project Title</p>
                <p className="text-white font-medium">{project.title || "N/A"}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Task Type</p>
                  <p className="text-white">{project.taskType || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Budget</p>
                  <p className="text-white">₹{project.budget || "0"}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-400">Project Status</p>
                <p className="text-white">{project.status || "N/A"}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="
              rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl
              shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6
            "
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="text-purple-400" size={20} />
              Freelancer Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-400">Name</p>
                <p className="text-white font-medium">{applicant.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Email</p>
                <p className="text-white">{applicant.email || "N/A"}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="
              rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl
              shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6
            "
          >
            <h2 className="text-xl font-semibold mb-4">Submission Notes</h2>
            <p className="text-slate-300 whitespace-pre-wrap">{submission.description || "No description provided."}</p>
          </motion.div>

          {(submission.githubLink || submission.deploymentLink || submission.reportFile) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="
                rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl
                shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6
              "
            >
              <h2 className="text-xl font-semibold mb-4">Links & Files</h2>
              <div className="space-y-3">
                {submission.githubLink && (
                  <a href={submission.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                    <ExternalLink size={16} />
                    GitHub Repository
                  </a>
                )}
                {submission.deploymentLink && (
                  <a href={submission.deploymentLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-400 hover:text-green-300">
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
                {submission.reportFile && (
                  <a href={submission.reportFile} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-purple-400 hover:text-purple-300">
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
                rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl
                shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6
              "
            >
              <h2 className="text-xl font-semibold mb-4">Feedback</h2>
              <p className="text-slate-300 whitespace-pre-wrap">{submission.feedback}</p>
            </motion.div>
          )}

          {payment && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl
                shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6
              "
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="text-green-400" size={20} />
                Payment Status
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Amount</span>
                  <span className="text-white font-semibold">₹{(payment.amount ?? 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Status</span>
                  <Badge
                    variant="outline"
                    className={`${
                      payment.status === PaymentStatus.RELEASED
                        ? "border-green-500/30 bg-green-500/10 text-green-400"
                        : payment.status === PaymentStatus.PENDING || payment.status === PaymentStatus.HELD
                        ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                        : "border-red-500/30 bg-red-500/10 text-red-400"
                    } rounded-lg`}
                  >
                    {payment.status}
                  </Badge>
                </div>
                {payment.transactionId && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Transaction ID</span>
                    <span className="text-white font-mono text-sm">{payment.transactionId}</span>
                  </div>
                )}
                {payment.status === PaymentStatus.RELEASED && (
                  <div className="space-y-3 mt-4 p-4 rounded-xl border border-green-500/20 bg-green-500/5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-400" size={18} />
                      <span className="text-slate-400">Payment Status:</span>
                      <span className="text-green-400 font-semibold">✅ Released</span>
                    </div>
                    {payment.releasedAt && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Released On:</span>
                        <span className="text-white">{new Date(payment.releasedAt).toLocaleString()}</span>
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
              rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl
              shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6
            "
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="text-blue-400" size={18} />
              Timeline
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-slate-400">Submitted Date</p>
                <p className="text-white">{new Date(submission.createdAt).toLocaleString()}</p>
              </div>
              {submission.reviewedAt && (
                <div>
                  <p className="text-slate-400">Reviewed Date</p>
                  <p className="text-white">{new Date(submission.reviewedAt).toLocaleString()}</p>
                </div>
              )}
              {submission.approvedAt && (
                <div>
                  <p className="text-slate-400">Approved Date</p>
                  <p className="text-white">{new Date(submission.approvedAt).toLocaleString()}</p>
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
          <label className="block text-sm font-medium text-slate-300 mb-2">Feedback (optional)</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={3}
            className="w-full p-3 rounded-xl bg-slate-800 border border-white/10 text-white text-sm"
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
          <label className="block text-sm font-medium text-slate-300 mb-2">Feedback *</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-xl bg-slate-800 border border-white/10 text-white text-sm"
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
            <label className="block text-sm font-medium text-slate-300 mb-2">Feedback *</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={3}
              className="w-full p-3 rounded-xl bg-slate-800 border border-white/10 text-white text-sm"
              placeholder="Provide feedback..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Reason *</label>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={2}
              className="w-full p-3 rounded-xl bg-slate-800 border border-white/10 text-white text-sm"
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
