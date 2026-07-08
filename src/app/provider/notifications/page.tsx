"use client";

import { useState } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";

type Notification = {
  id: number;
  title: string;
  time: string;
  status: "Unread" | "Read";
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Rahul Sharma accepted your project invitation.",
    time: "2 mins ago",
    status: "Unread",
  },
  {
    id: 2,
    title: "Payment of ₹18,500 has been released.",
    time: "15 mins ago",
    status: "Unread",
  },
  {
    id: 3,
    title: "AI recommends hiring one Frontend Developer.",
    time: "1 hour ago",
    status: "Unread",
  },
  {
    id: 4,
    title: "Mobile App UI task is showing delay indicators.",
    time: "3 hours ago",
    status: "Read",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              status: "Read",
            }
          : notification
      )
    );
  };

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        status: "Read",
      }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <DesktopLayout>
      <div className="space-y-8">

        {/* Header */}

        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-4xl font-bold text-white">
              Notifications Center
            </h1>

            <p className="text-slate-400 mt-2">
              Stay updated with project activities,
              payments and AI insights.
            </p>
          </div>

          <div className="flex gap-3">

            <button
              onClick={markAllRead}
              className="
                px-5
                py-3
                rounded-xl
                border
                border-white/[0.08]
              "
            >
              Mark All Read
            </button>

            <button
              onClick={clearAll}
              className="
                px-5
                py-3
                rounded-xl
                bg-red-600
                hover:bg-red-700
              "
            >
              Clear All
            </button>

          </div>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-3 gap-6">

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400">
              Total Notifications
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {notifications.length}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400">
              Unread
            </p>

            <h2 className="text-3xl font-bold text-yellow-400 mt-2">
              {
                notifications.filter(
                  (n) => n.status === "Unread"
                ).length
              }
            </h2>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
            <p className="text-slate-400">
              AI Alerts
            </p>

            <h2 className="text-3xl font-bold text-blue-400 mt-2">
              3
            </h2>
          </div>

        </div>

        {/* Notification List */}

        <div className="space-y-4">

          {notifications.map((notification) => (

            <div
              key={notification.id}
              className="
                rounded-3xl
                border
                border-white/[0.08]
                bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
                p-6
              "
            >

              <div className="flex justify-between items-start">

                <div>

                  <h3 className="text-lg font-semibold">
                    🔔 {notification.title}
                  </h3>

                  <p className="text-slate-400 mt-2">
                    {notification.time}
                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    notification.status === "Unread"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {notification.status}
                </span>

              </div>

              <div className="flex gap-3 mt-5">

                <button
                  onClick={() =>
                    setSelectedNotification(
                      notification
                    )
                  }
                  className="
                    px-4
                    py-2
                    rounded-xl
                    border
                    border-white/[0.08]
                  "
                >
                  View
                </button>

                <button
                  onClick={() =>
                    markAsRead(notification.id)
                  }
                  className="
                    px-4
                    py-2
                    rounded-xl
                    bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)]
                  "
                >
                  Mark Read
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* Notification Detail Modal */}

        {selectedNotification && (

          <div
            className="
              fixed
              inset-0
              bg-black/60
              flex
              items-center
              justify-center
              z-50
            "
          >

            <div
              className="
                w-[550px]
                rounded-3xl
                bg-slate-950
                border
                border-white/[0.08]
                p-8
              "
            >

              <h2 className="text-2xl font-bold mb-6">
                Notification Details
              </h2>

              <p className="text-lg">
                {selectedNotification.title}
              </p>

              <p className="text-slate-400 mt-4">
                Received:
                {" "}
                {selectedNotification.time}
              </p>

              <button
                onClick={() =>
                  setSelectedNotification(
                    null
                  )
                }
                className="
                  mt-6
                  w-full
                  py-3
                  rounded-xl
                  bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)]
                "
              >
                Close
              </button>

            </div>

          </div>

        )}

      </div>
    </DesktopLayout>
  );
}