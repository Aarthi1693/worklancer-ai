"use client";

import { Bell, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "info" | "success" | "warning";
  read: boolean;
}

interface Props {
  notification: Notification;
  onMarkRead?: (id: string) => void;
}

export default function NotificationCard({
  notification,
  onMarkRead,
}: Props) {
  const borderColor = {
    info: "border-blue-500/20",
    success: "border-green-500/20",
    warning: "border-yellow-500/20",
  };

  const iconColor = {
    info: "text-blue-400",
    success: "text-green-400",
    warning: "text-yellow-400",
  };

  return (
    <div
      className={`rounded-2xl border ${
        borderColor[notification.type]
      } bg-[#111827] p-5 transition-all hover:border-blue-500/40`}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="rounded-xl bg-slate-800 p-3">
            <Bell className={`h-5 w-5 ${iconColor[notification.type]}`} />
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {notification.title}
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              {notification.message}
            </p>

            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <Clock className="h-3 w-3" />
              {notification.time}
            </div>
          </div>
        </div>

        {!notification.read && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onMarkRead?.(notification.id)}
            className="border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Mark Read
          </Button>
        )}
      </div>
    </div>
  );
}