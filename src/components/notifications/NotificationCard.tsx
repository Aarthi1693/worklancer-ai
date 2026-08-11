"use client";

import {
  Bell,
  Clock,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  notification: {
    id: string;
    title: string;
    message: string;
    type: string;
    isRead: boolean;
    createdAt: string;
  };

  onMarkRead: () => void;
}

const icons: Record<string, any> = {
  TASK: CheckCircle2,
  PAYMENT: Bell,
  CHAT: MessageSquare,
  WARNING: AlertTriangle,
};

export default function NotificationCard({
  notification,
  onMarkRead,
}: Props) {
  const Icon = icons[notification.type] || Bell;

  return (
    <div
      className={`
        rounded-3xl border p-6 transition-all
        ${
          notification.isRead
            ? "bg-white border-slate-200"
            : "bg-blue-50 border-blue-200 shadow-md"
        }
      `}
    >
      <div className="flex items-start gap-4">

        <div
          className={`
            flex h-12 w-12 items-center justify-center rounded-2xl
            ${
              notification.isRead
                ? "bg-slate-100"
                : "bg-blue-100"
            }
          `}
        >
          <Icon className="h-6 w-6 text-blue-600" />
        </div>

        <div className="flex-1">

          <div className="flex items-center justify-between">

            <h3 className="font-semibold text-slate-900">
              {notification.title}
            </h3>

            {!notification.isRead && (
              <span className="h-3 w-3 rounded-full bg-blue-600" />
            )}

          </div>

          <p className="mt-2 text-slate-600">
            {notification.message}
          </p>

          <div className="mt-4 flex items-center justify-between">

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Clock size={15} />
              {new Date(notification.createdAt).toLocaleString()}
            </div>

            {!notification.isRead && (
              <Button
                size="sm"
                onClick={onMarkRead}
              >
                Mark as Read
              </Button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}