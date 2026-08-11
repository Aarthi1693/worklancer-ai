"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ClipboardList,
  CheckCircle2,
  RefreshCcw,
  FolderCheck,
} from "lucide-react";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { submissionService } from "@/services/submission.service";
import { useSubmissionSocket } from "@/hooks/useSubmissionSocket";
import { SubmissionEventPayload } from "@/services/socket.service";
import SubmittedWorkHeader from "./SubmittedWorkHeader";
import SubmittedWorkStats from "./SubmittedWorkStats";
import SubmittedWorkFilters from "./SubmittedWorkFilters";
import SubmissionCard from "./SubmissionCard";

interface Submission {
  id: string;
  status: string;
  description?: string;
  feedback?: string;
  githubLink?: string;
  deploymentLink?: string;
  reportFile?: string;
  createdAt: string;
  application?: {
    user?: {
      name?: string;
      email?: string;
    };
    project?: {
      title?: string;
      taskType?: string;
      budget?: number;
      status?: string;
    };
  };
}

interface StatItem {
  title: string;
  value: number | string;
  icon: React.ElementType;
}

function SubmittedWorkContent() {
  const router = useRouter();
  const { addToast } = useToast();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const loadSubmissions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await submissionService.getProviderSubmissions();
      setSubmissions(data);
    } catch (error) {
      console.error("Failed to load submissions:", error);
      addToast("Failed to load submissions.", "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    loadSubmissions();
  }, [loadSubmissions]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const patchSubmission = useCallback(
    (payload: SubmissionEventPayload) => {
      const { submissionId, status, feedback } = payload;
      if (!submissionId) return;
      setSubmissions((prev) =>
        prev.map((s) =>
          s.id === submissionId
            ? {
                ...s,
                status: status ?? s.status,
                ...(feedback !== undefined ? { feedback } : {}),
              }
            : s
        )
      );
    },
    []
  );

  const appendSubmission = useCallback(
    async (payload: SubmissionEventPayload) => {
      const { submissionId } = payload;
      if (!submissionId) {
        loadSubmissions();
        return;
      }
      try {
        const fetched = await submissionService.getOne(submissionId);
        setSubmissions((prev) =>
          prev.some((s) => s.id === submissionId)
            ? prev
            : [...prev, fetched as Submission]
        );
      } catch (error) {
        console.error("Failed to load new submission:", error);
        loadSubmissions();
      }
    },
    [loadSubmissions]
  );

  useSubmissionSocket({
    onCreated: appendSubmission,
    onUpdated: patchSubmission,
  });

  const handleApprove = useCallback(
    (id: string) => {
      setSubmissions((prev) =>
        prev.map((s) =>
          s.id === id
            ? { ...s, status: "APPROVED" }
            : s
        )
      );
    },
    []
  );

  const handleReject = useCallback(
    (id: string) => {
      setSubmissions((prev) =>
        prev.map((s) =>
          s.id === id
            ? { ...s, status: "REJECTED" }
            : s
        )
      );
    },
    []
  );

  const handleRequestChanges = useCallback(
    (id: string) => {
      setSubmissions((prev) =>
        prev.map((s) =>
          s.id === id
            ? { ...s, status: "REVISION_REQUIRED" }
            : s
        )
      );
    },
    []
  );

  const filteredSubmissions = useMemo(() => {
    let result = [...submissions];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.application?.project?.title?.toLowerCase().includes(query) ||
          s.application?.user?.name?.toLowerCase().includes(query)
      );
    }

    if (filterStatus) {
      result = result.filter((s) => s.status === filterStatus);
    }

    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [submissions, searchQuery, filterStatus, sortBy]);

  const stats = useMemo<StatItem[]>(
    () => [
      {
        title: "Pending Review",
        value: submissions.filter(
          (s) => s.status === "PENDING" || s.status === "PENDING_REVIEW"
        ).length,
        icon: ClipboardList,
      },
      {
        title: "Approved",
        value: submissions.filter((s) => s.status === "APPROVED").length,
        icon: CheckCircle2,
      },
      {
        title: "Revision Requested",
        value: submissions.filter((s) => s.status === "REVISION_REQUIRED").length,
        icon: RefreshCcw,
      },
      {
        title: "Completed",
        value: submissions.filter((s) => s.status === "APPROVED").length,
        icon: FolderCheck,
      },
    ],
    [submissions]
  );

  return (
    <div className="space-y-8">
      <SubmittedWorkHeader />
      <SubmittedWorkStats stats={stats} />
      <SubmittedWorkFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterStatus={filterStatus}
        onFilterStatusChange={setFilterStatus}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <p className="text-slate-500">No submissions found.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredSubmissions.map((submission) => (
            <SubmissionCard
              key={submission.id}
              submission={submission}
              onView={(id) => router.push(`/provider/submissions/${id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SubmittedWorkPage() {
  return (
    <ToastProvider>
      <SubmittedWorkContent />
    </ToastProvider>
  );
}