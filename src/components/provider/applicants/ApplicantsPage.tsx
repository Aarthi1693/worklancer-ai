"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import ApplicantsHeader from "./ApplicantsHeader";
import ApplicantStats from "./ApplicantStats";
import ApplicantFilters from "./ApplicantFilters";
import ApplicantCard from "./ApplicantCard";
import providerService from "@/services/provider.service";
import chatService from "@/services/chat.service";
import authService from "@/services/auth.service";

type Applicant = {
  id: string;
  applicationId: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  experience: string;
  skills: string[];
  budget: string;
  delivery: string;
  aiScore: number;
  proposal: string;
  availability: string;
  status: string;
  userId: string;
  projectId: string;

  projectTitle: string;   // <-- ADD THIS
};

function readText(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function readNumber(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function readId(value: unknown) {
  if (typeof value === "string" && value.trim().length > 0) return value;
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

function formatCurrency(value: unknown) {
  return `₹${readNumber(value, 0).toLocaleString()}`;
}

function formatSkills(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item)).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeStatus(value: unknown) {
  const status = readText(value, "NEW").toUpperCase();

  if (status.includes("REJECT")) return "Rejected";
  if (status.includes("SHORTLIST")) return "Shortlisted";
  if (status.includes("ACCEPT")) return "Accepted";
  if (status.includes("PENDING")) return "New";
  if (status.includes("NEW")) return "New";

  return status.charAt(0) + status.slice(1).toLowerCase();
}

function extractProjects(data: unknown): Record<string, unknown>[] {
  if (Array.isArray(data)) return data as Record<string, unknown>[];

  if (data && typeof data === "object") {
    const response = data as { projects?: unknown[]; data?: unknown[] };

    if (Array.isArray(response.projects)) return response.projects as Record<string, unknown>[];
    if (Array.isArray(response.data)) return response.data as Record<string, unknown>[];
  }

  return [];
}

function extractApplicants(data: unknown): Record<string, unknown>[] {
  if (Array.isArray(data)) return data as Record<string, unknown>[];

  if (data && typeof data === "object") {
    const response = data as {
      applicants?: unknown[];
      applications?: unknown[];
      data?: unknown[];
      items?: unknown[];
    };

    if (Array.isArray(response.applicants)) return response.applicants as Record<string, unknown>[];
    if (Array.isArray(response.applications)) return response.applications as Record<string, unknown>[];
    if (Array.isArray(response.items)) return response.items as Record<string, unknown>[];
    if (Array.isArray(response.data)) return response.data as Record<string, unknown>[];
  }

  return [];
}

function mapApplicants(data: unknown): Applicant[] {
  return extractApplicants(data).map((item, index) => {
    const user = (item.user as Record<string, unknown> | undefined) || {};
    const master = (item.master as Record<string, unknown> | undefined) || {};
    const project = (item.project as Record<string, unknown> | undefined) || {};
    const applicationId =
      readId(item.id) ||
      readId(item.applicationId) ||
      readId(item.application_id) ||
      readId(item.uuid);

const projectId = readId(item.projectId || project.id);

return {
  id: applicationId || `${projectId}-${index}`,
  applicationId,
  userId: readId(user.id),
  projectId,

  projectTitle: readText(
    item.projectTitle,
    readText(project.title, "Unknown Project")
  ),

  name: readText(
    item.name,
    readText(user.name, readText(master.name, "Anonymous Applicant"))
  ),

  role: readText(
    item.role,
    readText(user.role, readText(master.role, "Professional"))
  ),

  avatar: readText(
    item.avatar,
    readText(
      user.avatar,
      readText(master.avatar, `https://i.pravatar.cc/150?img=${(index % 70) + 1}`)
    )
  ),

  rating: readNumber(item.rating ?? user.rating ?? master.rating, 4.8),

  experience: readText(
    item.experience,
    readText(
      item.yearsExperience,
      readText(user.experience, readText(master.experience, "N/A"))
    )
  ),

  skills: formatSkills(item.skills ?? user.skills ?? master.skills),

  budget: readText(
    item.budget,
    formatCurrency(item.expectedBudget ?? item.bidAmount ?? item.quotedAmount)
  ),

  delivery: readText(
    item.delivery,
    readText(item.deliveryTime, readText(item.eta, "N/A"))
  ),

  aiScore: readNumber(item.aiScore ?? item.matchScore ?? item.matchingScore, 0),

  proposal: readText(
    item.proposal,
    readText(item.coverLetter, readText(item.message, "No proposal available."))
  ),

  availability: readText(item.availability, "Available"),

  status: normalizeStatus(item.status ?? item.applicationStatus),
};
  });
}

export default function ApplicantsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeFilter, setActiveFilter] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

const loadApplicants = async () => {
  try {
    setError(false);
    setLoading(true);

    const projectsData = await providerService.getProjects();
    const projects = extractProjects(projectsData);

    console.log("Projects:", projects);

    const allApplicants: Applicant[] = [];

    for (const project of projects) {
      const projectId = readText(project.id, "");

      if (!projectId) continue;

      try {
        const response = await providerService.getApplicants(projectId);

        const mapped = mapApplicants(response);

        console.log(
          `Project ${projectId} has ${mapped.length} applicants`
        );

        allApplicants.push(...mapped);
      } catch (err) {
        console.log(`No applicants for project ${projectId}`);
      }
    }

    console.log("Total Applicants:", allApplicants.length);

    // Remove duplicate applications
    const uniqueApplicants = Array.from(
      new Map(
        allApplicants.map((applicant) => [
          applicant.applicationId,
          applicant,
        ])
      ).values()
    );

    console.log("Unique Applicants:", uniqueApplicants.length);

   console.table(
  uniqueApplicants.map((a) => ({
    applicationId: a.applicationId,
    projectId: a.projectId,
    projectTitle: a.projectTitle,
    userId: a.userId,
    name: a.name,
  }))
);

    setApplicants(uniqueApplicants);
  } catch (err) {
    console.error(err);
    setError(true);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadApplicants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch =
      searchValue.trim().length === 0 ||
      [
        applicant.name,
        applicant.role,
        applicant.skills.join(" "),
        applicant.status,
        applicant.proposal,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchValue.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === "All") return true;
    if (activeFilter === "Recommended") return applicant.aiScore >= 95;
    if (activeFilter === "Shortlisted") {
      return applicant.status.toLowerCase() === "shortlisted" || applicant.rating >= 4.8;
    }
    if (activeFilter === "Rejected") return applicant.status.toLowerCase() === "rejected";
    if (activeFilter === "New") {
      const status = applicant.status.toLowerCase();
      return status === "new" || status.includes("pending");
    }

    return true;
  });

  const totalApplicants = applicants.length;
  const aiRecommended = applicants.filter((applicant) => applicant.aiScore >= 95).length;
  const shortlisted = applicants.filter(
    (applicant) => applicant.status.toLowerCase() === "shortlisted" || applicant.rating >= 4.8
  ).length;
  const rejected = applicants.filter((applicant) => applicant.status.toLowerCase() === "rejected").length;

  const handleAcceptApplicant = async (applicationId: string) => {
  if (!applicationId) {
    alert("Application ID is missing.");
    return;
  }

  if (!window.confirm("Accept this applicant?")) return;

  try {
    setActionLoadingId(`accept:${applicationId}`);

    await providerService.acceptApplicant(applicationId);

    // Remove from current list
    setApplicants((prev) =>
      prev.filter((a) => a.applicationId !== applicationId)
    );

    alert("Applicant accepted successfully.");
  } catch (error) {
    console.error(error);
    alert("Failed to accept applicant.");
  } finally {
    setActionLoadingId(null);
  }
};

  const handleRejectApplicant = async (applicationId: string) => {
  if (!applicationId) {
    alert("Application ID is missing.");
    return;
  }

  if (!window.confirm("Reject this applicant?")) return;

  try {
    setActionLoadingId(`reject:${applicationId}`);

    await providerService.rejectApplicant(applicationId);

    // Remove from current list
    setApplicants((prev) =>
      prev.filter((a) => a.applicationId !== applicationId)
    );

    alert("Applicant rejected successfully.");
  } catch (error) {
    console.error(error);
    alert("Failed to reject applicant.");
  } finally {
    setActionLoadingId(null);
  }
};
  const handleChat = async (applicant: Applicant) => {
    try {
      const user = authService.getUser();
      const providerId = user?.id || "";

      const conversation = await chatService.createConversation({
        projectId: applicant.projectId,
        providerId,
        masterId: applicant.userId,
      });

      router.push(
        `/provider/chat?conversationId=${conversation.id}`,
      );
    } catch (error) {
      console.error("Failed to start chat", error);
    }
  };

  console.log("Applicants:", applicants);
console.log("Filtered Applicants:", filteredApplicants);
console.log({
  totalApplicants,
  aiRecommended,
  shortlisted,
  rejected,
});
  return (
    <div className="space-y-6">

      {/* Hero */}

      <ApplicantsHeader />

      {/* Statistics */}

      <ApplicantStats
        totalApplicants={totalApplicants}
        aiRecommended={aiRecommended}
        shortlisted={shortlisted}
        rejected={rejected}
      />

      {/* Search & Filters */}

      <ApplicantFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      {/* Applicants */}

      {loading ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-24 text-center shadow-sm">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-5xl">
            ⏳
          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            Loading Applicants
          </h2>

          <p className="mt-3 text-slate-600">
            Fetching applicants from the backend.
          </p>

        </div>
      ) : error ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-24 text-center shadow-sm">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-5xl">
            ⚠️
          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            Unable to Load Applicants
          </h2>

          <p className="mt-3 text-slate-600">
            Please try again to refresh applications.
          </p>

          <button
            onClick={loadApplicants}
            className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Refresh Applications
          </button>

        </div>
      ) : filteredApplicants.length > 0 ? (
        <div className="grid gap-6 xl:grid-cols-2">
          {filteredApplicants.map((applicant) => (
  <ApplicantCard
    key={applicant.id}
    applicant={applicant}
    onAccept={handleAcceptApplicant}
    onReject={handleRejectApplicant}
    onChat={handleChat}
    actionLoadingId={actionLoadingId}
  />
))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-24 text-center shadow-sm">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-5xl">
            📋
          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            No Applicants Found
          </h2>

          <p className="mt-3 text-slate-600">
            There are no applicants matching your selected filter.
          </p>

          <button className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
            Refresh Applications
          </button>

        </div>
      )}

      {/* Pagination */}

      <div className="flex items-center justify-center gap-3">

        <button className="rounded-xl border border-slate-300 bg-white px-5 py-2 text-slate-600 transition hover:bg-slate-100">
          Previous
        </button>

        <button className="rounded-xl bg-blue-600 px-5 py-2 text-white">
          1
        </button>

        <button className="rounded-xl border border-slate-300 bg-white px-5 py-2 text-slate-600 transition hover:bg-slate-100">
          2
        </button>

        <button className="rounded-xl border border-slate-300 bg-white px-5 py-2 text-slate-600 transition hover:bg-slate-100">
          3
        </button>

        <button className="rounded-xl border border-slate-300 bg-white px-5 py-2 text-slate-600 transition hover:bg-slate-100">
          Next
        </button>

      </div>

    </div>
  );
}