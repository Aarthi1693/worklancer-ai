"use client";

import { Bell, CheckCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  total: number;
  unread: number;
  onMarkAllRead: () => void;
  onClearAll: () => void;
}

export default function NotificationHeader({
  total,
  unread,
  onMarkAllRead,
  onClearAll,
}: Props) {
  return (
    <div className="mb-8 rounded-3xl border border-slate-200 bg-white shadow-sm p-8">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        {/* Left */}

        <div className="flex items-center gap-5">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg">

            <Bell className="h-8 w-8 text-white" />

          </div>

          <div>

            <h1 className="text-3xl font-bold text-slate-900">
              Notifications
            </h1>

            <p className="mt-1 text-slate-600">
              Stay updated with your latest activities
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-wrap items-center gap-3">

          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 px-5 py-3">

            <p className="text-xs uppercase tracking-wide text-slate-500">
              Total
            </p>

            <h2 className="text-2xl font-bold text-blue-600">
              {total}
            </h2>

          </div>

          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 px-5 py-3">

            <p className="text-xs uppercase tracking-wide text-slate-400">
              Unread
            </p>

            <h2 className="text-2xl font-bold text-red-600">
              {unread}
            </h2>

          </div>

        </div>

      </div>

      {/* Actions */}

      <div className="mt-8 flex flex-wrap gap-3">

        <Button
          onClick={onMarkAllRead}
          className="bg-gradient-to-r from-green-600 to-emerald-600"
        >
          <CheckCheck className="mr-2 h-4 w-4" />
          Mark All Read
        </Button>

        <Button
          variant="destructive"
          onClick={onClearAll}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear All
        </Button>

      </div>

    </div>
  );
}