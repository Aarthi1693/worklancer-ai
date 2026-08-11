"use client";

import {
  ShieldCheck,
  Trophy,
  BadgeCheck,
  Wallet,
  Flame,
} from "lucide-react";

interface AchievementBadgesProps {
  certifications: Array<{
    name: string;
    provider: string;
  }>;
}

const defaultBadges = [
  {
    title: "Verified Worker",
    icon: ShieldCheck,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    title: "Top Rated",
    icon: Trophy,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
  },
  {
    title: "10+ Tasks Completed",
    icon: BadgeCheck,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    title: "₹50K Earnings",
    icon: Wallet,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    title: "Active Worker",
    icon: Flame,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
];

export default function AchievementBadges({ certifications }: AchievementBadgesProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">
        Recommended Certifications
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Certifications that can boost your career profile and earnings.
      </p>

      <div className="mt-6 space-y-4">
        {certifications.length > 0 ? (
          certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 hover:bg-slate-50 transition"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <BadgeCheck className="h-6 w-6 text-blue-600" />
              </div>

              <div>
                <span className="font-medium text-slate-800">
                  {cert.name}
                </span>
                <p className="text-sm text-slate-500">{cert.provider}</p>
              </div>
            </div>
          ))
        ) : (
          defaultBadges.map((badge) => {
            const Icon = badge.icon;

            return (
              <div
                key={badge.title}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 hover:bg-slate-50 transition"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${badge.bg}`}
                >
                  <Icon className={`h-6 w-6 ${badge.color}`} />
                </div>

                <span className="font-medium text-slate-800">
                  {badge.title}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}