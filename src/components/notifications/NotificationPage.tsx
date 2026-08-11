"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import NotificationHeader from "./NotificationHeader";
import NotificationStats from "./NotificationStats";
import NotificationFilters from "./NotificationFilters";
import NotificationCard from "./NotificationCard";

import api from "@/lib/api";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filtered, setFiltered] = useState<Notification[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    if (filter === "ALL") {
      setFiltered(notifications);
    } else if (filter === "UNREAD") {
      setFiltered(notifications.filter((n) => !n.isRead));
    } else {
      setFiltered(
        notifications.filter((n) => n.type === filter)
      );
    }
  }, [notifications, filter]);

  useEffect(() => {
  console.log("Notifications State:", notifications);
  console.log("Filtered State:", filtered);
}, [notifications, filtered]);

  async function loadNotifications() {
  try {
    const user = JSON.parse(Cookies.get("user") || "{}");

    console.log("USER =", user);

    const res = await api.get(`/notifications/${user.id}`);

    console.log("NOTIFICATIONS =", res.data);

    setNotifications(res.data);
  } catch (err) {
    console.error("Notification Error:", err);
  } finally {
    setLoading(false);
  }
}

  async function markRead(id: string) {
    try {
      await api.patch(`/notifications/${id}/read`);

      setNotifications((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, isRead: true }
            : item
        )
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function markAllRead() {
  try {
    const user = JSON.parse(Cookies.get("user") || "{}");

    await api.patch(`/notifications/read-all/${user.id}`);

    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        isRead: true,
      }))
    );
  } catch (err) {
    console.error(err);
  }
}

async function clearAll() {
  try {
    const user = JSON.parse(Cookies.get("user") || "{}");

    await api.delete(`/notifications/clear-all/${user.id}`);

    setNotifications([]);
  } catch (err) {
    console.error(err);
  }
}

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading Notifications...
      </div>
    );
  }

  

  return (
    <div className="space-y-8">

     <NotificationHeader
  total={notifications.length}
  unread={notifications.filter((n) => !n.isRead).length}
  onMarkAllRead={markAllRead}
  onClearAll={clearAll}
/>

      <NotificationStats
        total={notifications.length}
        unread={notifications.filter((n) => !n.isRead).length}
      />

      <NotificationFilters
  value={filter}
  onChange={setFilter}
/>

      <div className="space-y-5">

        {filtered.length === 0 ? (

          <div className="rounded-3xl border border-dashed p-12 text-center text-slate-500">
            No notifications found.
          </div>

        ) : (

          filtered.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onMarkRead={() => markRead(notification.id)}
            />
          ))

        )}

      </div>

    </div>
  );
}