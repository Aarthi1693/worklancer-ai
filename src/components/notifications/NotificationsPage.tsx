"use client";

import { useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";

import DesktopLayout from "@/components/layout/desktop-layout";
import { NotificationService } from "@/services/notification.service";

type Props = {
  role: "provider" | "master";
};

type Notification = {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
};

export default function NotificationsPage({ role }: Props) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const cookie = Cookies.get("user");

      if (!cookie) {
        setLoading(false);
        return;
      }

      const user = JSON.parse(cookie);

      const data = await NotificationService.getNotifications(user.id);

      setNotifications(data);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await NotificationService.markAsRead(id);

      setNotifications((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                isRead: true,
              }
            : item
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const markAllRead = async () => {
    try {
      const cookie = Cookies.get("user");

      if (!cookie) return;

      const user = JSON.parse(cookie);

      await NotificationService.markAll(user.id);

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          isRead: true,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  const getIcon = (type: string) => {
    switch (type) {
      case "CHAT":
        return "💬";

      case "APPLICATION":
        return "📄";

      case "PROJECT":
        return "📁";

      case "PAYMENT":
        return "💰";

      default:
        return "🔔";
    }
  };

  return (
    <DesktopLayout>
      <div className="space-y-8">
              {/* Header */}

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold text-white">
              {role === "provider"
                ? "Notifications Center"
                : "Notifications"}
            </h1>

            <p className="text-slate-400 mt-2">
              Stay updated with all your recent activities.
            </p>
          </div>

          <button
            onClick={markAllRead}
            className="
              px-5
              py-3
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              hover:opacity-90
              transition
            "
          >
            Mark All Read
          </button>

        </div>

        {/* Statistics */}

        <div
          className={`grid gap-6 ${
            role === "provider"
              ? "grid-cols-3"
              : "grid-cols-4"
          }`}
        >

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">

            <p className="text-slate-400">
              Total Notifications
            </p>

            <h2 className="text-3xl font-bold mt-2 text-white">
              {notifications.length}
            </h2>

          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">

            <p className="text-slate-400">
              Unread
            </p>

            <h2 className="text-3xl font-bold mt-2 text-yellow-400">
              {unreadCount}
            </h2>

          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">

            <p className="text-slate-400">
              Read
            </p>

            <h2 className="text-3xl font-bold mt-2 text-green-400">
              {notifications.length - unreadCount}
            </h2>

          </div>

          {role === "master" && (

            <div className="rounded-3xl bg-white/5 border border-white/10 p-6">

              <p className="text-slate-400">
                Tasks
              </p>

              <h2 className="text-3xl font-bold mt-2 text-blue-400">
                0
              </h2>

            </div>

          )}

        </div>

        {/* Loading */}

        {loading && (

          <div className="py-20 text-center text-slate-400">
            Loading notifications...
          </div>

        )}

        {/* Empty State */}

        {!loading && notifications.length === 0 && (

          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">

            <div className="text-6xl mb-4">
              🔔
            </div>

            <h2 className="text-2xl font-bold text-white">
              No Notifications
            </h2>

            <p className="text-slate-400 mt-3">
              You're all caught up!
            </p>

          </div>

        )}

        {/* Notification List */}

        {!loading && notifications.length > 0 && (

          <div className="space-y-5">
                        {notifications.map((notification) => (

              <div
                key={notification.id}
                className={`
                  rounded-3xl
                  border
                  p-6
                  transition-all
                  duration-300
                  hover:border-blue-500/40
                  ${
                    notification.isRead
                      ? "bg-white/5 border-white/10"
                      : "bg-blue-500/10 border-blue-500/30"
                  }
                `}
              >

                <div className="flex items-start justify-between gap-6">

                  <div className="flex gap-4">

                    <div className="text-4xl">
                      {getIcon(notification.type)}
                    </div>

                    <div>

                      <div className="flex items-center gap-3">

                        <h3 className="text-xl font-semibold text-white">
                          {notification.title}
                        </h3>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            notification.isRead
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-300"
                          }`}
                        >
                          {notification.isRead ? "Read" : "Unread"}
                        </span>

                      </div>

                      <p className="text-slate-400 mt-3">
                        {notification.message}
                      </p>

                      <p className="text-xs text-slate-500 mt-4">
                        {new Date(
                          notification.createdAt
                        ).toLocaleString()}
                      </p>

                    </div>

                  </div>

                  <div className="flex flex-col gap-3">

                    <button
                      onClick={() =>
                        setSelectedNotification(notification)
                      }
                      className="
                        px-4
                        py-2
                        rounded-xl
                        border
                        border-white/10
                        hover:bg-white/10
                        transition
                      "
                    >
                      View
                    </button>

                    {!notification.isRead && (

                      <button
                        onClick={() =>
                          markAsRead(notification.id)
                        }
                        className="
                          px-4
                          py-2
                          rounded-xl
                          bg-gradient-to-r
                          from-green-500
                          to-emerald-600
                          hover:opacity-90
                          transition
                        "
                      >
                        Mark Read
                      </button>

                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}
                {/* Notification Detail Modal */}

        {selectedNotification && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

            <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">

              <div className="flex items-center gap-4">

                <div className="text-5xl">
                  {getIcon(selectedNotification.type)}
                </div>

                <div>

                  <h2 className="text-2xl font-bold text-white">
                    {selectedNotification.title}
                  </h2>

                  <p className="text-slate-400">
                    {selectedNotification.type}
                  </p>

                </div>

              </div>

              <div className="mt-8">

                <p className="text-slate-300 leading-8">
                  {selectedNotification.message}
                </p>

                <p className="mt-6 text-sm text-slate-500">
                  {new Date(
                    selectedNotification.createdAt
                  ).toLocaleString()}
                </p>

              </div>

              <div className="mt-8 flex justify-end gap-4">

                {!selectedNotification.isRead && (

                  <button
                    onClick={async () => {
                      await markAsRead(selectedNotification.id);

                      setSelectedNotification({
                        ...selectedNotification,
                        isRead: true,
                      });
                    }}
                    className="rounded-xl bg-green-600 px-5 py-2 hover:bg-green-700"
                  >
                    Mark Read
                  </button>

                )}

                <button
                  onClick={() => setSelectedNotification(null)}
                  className="rounded-xl border border-white/10 px-5 py-2 hover:bg-white/10"
                >
                  Close
                </button>

              </div>

            </div>

          </div>
        )}

      </div>
    </DesktopLayout>
  );
}