"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { motion } from "framer-motion";
import { submissionService } from "@/services/submission.service";

interface Submission {
  id: string;
  status: string;
  description: string;
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
    };
  };
}

const statuses = ["PENDING_REVIEW", "APPROVED", "REVISION_REQUIRED", "REJECTED"];
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
];

const statusConfig: Record<string, { color: string; label: string }> = {
  PENDING_REVIEW: { color: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400", label: "Pending Review" },
  APPROVED: { color: "border-green-500/30 bg-green-500/10 text-green-400", label: "Approved" },
  REVISION_REQUIRED: { color: "border-orange-500/30 bg-orange-500/10 text-orange-400", label: "Revision Required" },
  REJECTED: { color: "border-red-500/30 bg-red-500/10 text-red-400", label: "Rejected" },
};

function ProviderSubmissionsContent() {
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

  const filteredSubmissions = useMemo(() => {
    let result = [...submissions];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((s) =>
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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">Submitted Work</h1>
          <p className="text-slate-400 mt-2">Review completed work submitted by Masters.</p>
        </div>
      </div>

      <div
        className="
          rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl
          shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6
        "
      >
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal className="text-blue-400" size={20} />
          <h2 className="text-lg font-semibold">Search & Filter</h2>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <Input
              placeholder="Search by project or freelancer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All Statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>{statusConfig[s]?.label || s}</option>
            ))}
          </Select>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div
          className="
            rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl
            shadow-[0_0_40px_rgba(59,130,246,0.08)] p-12 text-center
          "
        >
          <p className="text-slate-400">No submissions found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSubmissions.map((submission, idx) => (
            <motion.div
              key={submission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="
                h-full rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl
                shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6
                hover:border-blue-500/20 hover:shadow-[0_0_60px_rgba(59,130,246,0.12)]
                transition-all duration-300 flex flex-col
              "
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white line-clamp-2">
                    {submission.application?.project?.title || "Untitled Project"}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Submitted by <span className="text-cyan-400">{submission.application?.user?.name || "Unknown"}</span>
                  </p>
                </div>
                <Badge variant="outline" className={`${statusConfig[submission.status]?.color || "border-white/10 text-slate-300"} rounded-lg`}>
                  {statusConfig[submission.status]?.label || submission.status}
                </Badge>
              </div>

              <div className="space-y-2 mb-4 text-sm text-slate-400">
                <p>Task Type: <span className="text-slate-300">{submission.application?.project?.taskType || "N/A"}</span></p>
                <p>Budget: <span className="text-slate-300">₹{submission.application?.project?.budget || "0"}</span></p>
                <p>Submitted: <span className="text-slate-300">{new Date(submission.createdAt).toLocaleDateString()}</span></p>
              </div>

              <div className="mt-auto">
                <Button
                  onClick={() => router.push(`/provider/submissions/${submission.id}`)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500"
                >
                  <Eye size={16} className="mr-2" />
                  View Submission
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProviderSubmissionsPage() {
  return (
    <DesktopLayout>
      <ToastProvider>
        <ProviderSubmissionsContent />
      </ToastProvider>
    </DesktopLayout>
  );
}
