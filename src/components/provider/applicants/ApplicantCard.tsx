"use client";

import {
  Brain,
  CheckCircle2,
  Eye,
  MessageCircle,
  Star,
  XCircle,
} from "lucide-react";

interface Applicant {
  id: string;
  applicationId: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  aiScore: number;
  availability: string;
  userId: string;
  projectId: string;

  projectTitle: string; // <-- ADD THIS
}

interface ApplicantCardProps {
  applicant: Applicant;
  onAccept: (applicationId: string) => Promise<void>;
  onReject: (applicationId: string) => Promise<void>;
  onChat?: (applicant: Applicant) => void;
  actionLoadingId: string | null;
}

export default function ApplicantCard({
  applicant,
  onAccept,
  onReject,
  onChat,
  actionLoadingId,
}: ApplicantCardProps) {
  const isAcceptLoading = actionLoadingId === `accept:${applicant.applicationId}`;
  const isRejectLoading = actionLoadingId === `reject:${applicant.applicationId}`;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={applicant.avatar}
            alt={applicant.name}
            className="h-16 w-16 rounded-2xl object-cover"
          />

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              {applicant.name}
            </h2>

            <p className="mt-1 text-slate-600">
              {applicant.role}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">

              <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                <Star
                  size={15}
                  fill="currentColor"
                />
                {applicant.rating}
              </span>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                {applicant.availability}
              </span>

            </div>

          </div>

        </div>

        {/* AI Score */}

        <div className="rounded-2xl bg-blue-50 px-4 py-3 text-center">

          <Brain
            size={24}
            className="mx-auto text-blue-600"
          />

          <p className="mt-1 text-xs text-slate-500">
            AI Match
          </p>

          <h3 className="text-2xl font-bold text-blue-600">
            {applicant.aiScore}%
          </h3>

        </div>

      </div>


      {/* AI Recommendation */}

      <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">

        <div className="flex items-center gap-2">

          <Brain
            size={22}
            className="text-blue-600"
          />

          <h3 className="font-semibold text-slate-900">
            AI Recommendation
          </h3>

        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">

          <div className="rounded-xl bg-white p-3 shadow-sm">
            <p className="text-sm text-slate-500">
              Skill Match
            </p>
            <p className="font-bold text-green-600">
              Excellent
            </p>
          </div>

          <div className="rounded-xl bg-white p-3 shadow-sm">
            <p className="text-sm text-slate-500">
              Experience Match
            </p>
            <p className="font-bold text-blue-600">
              High
            </p>
          </div>

          <div className="rounded-xl bg-white p-3 shadow-sm">
            <p className="text-sm text-slate-500">
              Budget Match
            </p>
            <p className="font-bold text-violet-600">
              Suitable
            </p>
          </div>

          <div className="rounded-xl bg-white p-3 shadow-sm">
            <p className="text-sm text-slate-500">
              Overall
            </p>
            <p className="font-bold text-green-600">
              Highly Recommended
            </p>
          </div>

        </div>

      </div>

      {/* Project Applied */}

<div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
  <p className="text-sm text-slate-500 mb-2">
    Project Applied For
  </p>

  <h3 className="text-lg font-semibold text-slate-900">
    {applicant.projectTitle}
  </h3>
</div>

      {/* Actions */}

      <div className="mt-8 flex flex-wrap gap-3">

        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700">
          <Eye size={18} />
          View Profile
        </button>

<button
          onClick={() => onChat?.(applicant)}
          className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-slate-700 transition hover:border-blue-400 hover:text-blue-600"
        >
          <MessageCircle size={18} />
          Chat
        </button>

        <button
          onClick={() => onAccept(applicant.applicationId)}
          disabled={isAcceptLoading || isRejectLoading}
          className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white transition hover:bg-green-700"
        >
          <CheckCircle2 size={18} />
          {isAcceptLoading ? "Accepting..." : "Accept"}
        </button>

        <button
          onClick={() => onReject(applicant.applicationId)}
          disabled={isAcceptLoading || isRejectLoading}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white transition hover:bg-red-700"
        >
          <XCircle size={18} />
          {isRejectLoading ? "Rejecting..." : "Reject"}
        </button>

      </div>

    </div>
  );
}