"use client";
import { useRouter } from "next/navigation";
import {
  Star,
  BriefcaseBusiness,
  Clock3,
  MessageCircle,
  Eye,
  BadgeCheck,
} from "lucide-react";

interface Master {
  id: number;
  name: string;
  role: string;
  rating: number;
  experience: string;
  skills: string[];
  project: string;
  progress: number;
  payment: string;
  aiScore: number;
  status: "Available" | "Busy" | "Offline";
  avatar: string;
}

interface MasterCardProps {
  master: Master;
}

export default function MasterCard({
  master,
}: MasterCardProps) {
   const router = useRouter();
  const statusStyle = {
    Available: "bg-green-100 text-green-700",
    Busy: "bg-amber-100 text-amber-700",
    Offline: "bg-slate-100 text-slate-700",
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">

      {/* Top */}

      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <img
            src={master.avatar}
            alt={master.name}
            className="h-16 w-16 rounded-2xl object-cover"
          />

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              {master.name}
            </h2>

            <p className="mt-1 text-slate-600">
              {master.role}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-3">

              <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                <Star size={15} fill="currentColor" />
                {master.rating}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  statusStyle[master.status]
                }`}
              >
                {master.status}
              </span>

            </div>

          </div>

        </div>

        <div className="rounded-2xl bg-blue-50 px-4 py-3">

          <p className="text-xs text-slate-500">
            AI Match
          </p>

          <h3 className="text-xl font-bold text-blue-600">
            {master.aiScore}%
          </h3>

        </div>

      </div>

      {/* Information */}

      <div className="mt-8 grid gap-5 md:grid-cols-3">

        <div className="flex items-center gap-3">

          <Clock3
            size={20}
            className="text-blue-600"
          />

          <div>

            <p className="text-sm text-slate-500">
              Experience
            </p>

            <h4 className="font-semibold text-slate-900">
              {master.experience}
            </h4>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <BriefcaseBusiness
            size={20}
            className="text-violet-600"
          />

          <div>

            <p className="text-sm text-slate-500">
              Assigned Project
            </p>

            <h4 className="font-semibold text-slate-900">
              {master.project}
            </h4>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <BadgeCheck
            size={20}
            className="text-green-600"
          />

          <div>

            <p className="text-sm text-slate-500">
              Payment
            </p>

            <h4 className="font-semibold text-slate-900">
              {master.payment}
            </h4>

          </div>

        </div>

      </div>

      {/* Skills */}

      <div className="mt-8">

        <p className="mb-3 text-sm font-medium text-slate-500">
          Skills
        </p>

        <div className="flex flex-wrap gap-2">

          {master.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700"
            >
              {skill}
            </span>
          ))}

        </div>

      </div>

      {/* Progress */}

      <div className="mt-8">

        <div className="mb-2 flex justify-between">

          <span className="text-sm text-slate-600">
            Project Progress
          </span>

          <span className="font-semibold text-blue-600">
            {master.progress}%
          </span>

        </div>

        <div className="h-2 rounded-full bg-slate-200">

          <div
            className="h-2 rounded-full bg-blue-600"
            style={{
              width: `${master.progress}%`,
            }}
          />

        </div>

      </div>

      {/* Actions */}

      <div className="mt-8 flex flex-wrap gap-3">

        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-white transition hover:bg-blue-700">
          <Eye size={18} />
          View Profile
        </button>

        <button
  onClick={() => router.push("/provider/chat")}
  className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
>
          <MessageCircle size={18} />
          Chat
        </button>


      </div>

    </div>
  );
}