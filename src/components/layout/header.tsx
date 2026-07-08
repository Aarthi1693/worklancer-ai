"use client";
import { useState } from "react";

import {
  Bell,
  Search,
  ChevronRight,
} from "lucide-react";import { usePathname } from "next/navigation";


export default function Header() {
  const [showNotifications, setShowNotifications] =
  useState(false);
  const notifications = [
  {
    icon: "🤖",
    title: "AI Recommendation Available",
    time: "2 min ago",
  },
  {
    icon: "💰",
    title: "Payment Received",
    time: "15 min ago",
  },
  {
    icon: "📋",
    title: "New Task Assigned",
    time: "1 hour ago",
  },
  {
    icon: "📈",
    title: "Profile Score Improved",
    time: "Today",
  },
  {
    icon: "⏰",
    title: "Project Deadline Reminder",
    time: "Tomorrow",
  },
];
  const pathname = usePathname();

  const isMaster = pathname.startsWith("/master");

  return (
    <header
      className="
        h-16
        border-b
        border-white/[0.08]
        px-6
        flex
        items-center
        justify-between
        bg-black/40 backdrop-blur-xl
      "
    >
      {/* Left Section */}
      <div className="flex items-center gap-8">

        {/* Breadcrumb */}
        <div className="hidden md:flex items-center gap-2 text-sm">
          <span className="text-slate-500">
            {isMaster
              ? "Master Workspace"
              : "Provider Workspace"}
          </span>

          <ChevronRight
            size={14}
            className="text-slate-600"
          />

          <span className="text-blue-400 font-medium">
            Dashboard
          </span>
        </div>

        {/* Search */}
        <div
          className="
            flex
            items-center
            gap-3
            px-4
            py-2
            rounded-xl
            bg-white/[0.03] backdrop-blur-xl
            border
            border-white/[0.08]
            min-w-[300px]
          "
        >
          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            placeholder={
              isMaster
                ? "Search tasks, projects..."
                : "Search tasks, users..."
            }
            className="
              bg-transparent
              outline-none
              text-sm
              w-full
              text-white
              placeholder:text-slate-500
            "
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        <button
  onClick={() =>
    setShowNotifications(!showNotifications)
  }
  className="
    relative
    p-2
    rounded-xl
    hover:bg-white/5
    transition
  "
>
          <Bell
            size={20}
            className="text-slate-300"
          />

          <span
            className="
              absolute
              top-1
              right-1
              h-2
              w-2
              rounded-full
              bg-red-500
            "
          />
        </button>

        {showNotifications && (
  <div
    className="
      absolute
      top-16
      right-6
      w-96
      rounded-2xl
      border
      border-white/[0.08]
      bg-black/40 backdrop-blur-xl
      shadow-2xl
      overflow-hidden
      z-50
    "
  >
    <div className="flex items-center justify-between">
  <h2 className="font-bold text-white">
    Notifications
  </h2>

  <span className="text-xs text-blue-400">
    5 New
  </span>
</div>

    {notifications.map((item, index) => (
      <div
        key={index}
        className="
          p-4
          border-b
          border-white/5
          hover:bg-white/5
        "
      >
        <div className="flex gap-3 items-start">
  <span className="text-xl">
    {item.icon}
  </span>

  <div>
    <p className="text-white">
      {item.title}
    </p>

    <p className="text-xs text-slate-500 mt-1">
      {item.time}
    </p>
  </div>
</div>

        <p className="text-xs text-slate-500 mt-1">
          {item.time}
        </p>
      </div>
    ))}
  </div>
)}
        <div
          className="
            flex
            items-center
            gap-3
            px-3
            py-2
            rounded-xl
            bg-white/[0.03] backdrop-blur-xl
            border
            border-white/[0.08]
          "
        >
          <div
            className="
              h-10
              w-10
              rounded-full
              bg-gradient-to-r
              from-blue-500
              to-purple-600
              flex
              items-center
              justify-center
              text-white
              font-bold
            "
          >
            A
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-medium text-white">
              Aarthi
            </p>

            <p className="text-xs text-slate-500">
              {isMaster
                ? "Task Master"
                : "Task Provider"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}