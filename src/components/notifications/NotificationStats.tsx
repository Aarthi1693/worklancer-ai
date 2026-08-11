"use client";

import { Bell, Mail, CheckCircle2 } from "lucide-react";

interface Props {
  total: number;
  unread: number;
}

export default function NotificationStats({
  total,
  unread,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Total */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">Total Notifications</p>

        <div className="mt-4 flex items-center justify-between">
          <h2 className="text-4xl font-bold">{total}</h2>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            <Bell className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Unread */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">Unread</p>

        <div className="mt-4 flex items-center justify-between">
          <h2 className="text-4xl font-bold">{unread}</h2>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
            <Mail className="h-6 w-6 text-red-500" />
          </div>
        </div>
      </div>

      {/* Read */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">Read</p>

        <div className="mt-4 flex items-center justify-between">
          <h2 className="text-4xl font-bold">{total - unread}</h2>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
}