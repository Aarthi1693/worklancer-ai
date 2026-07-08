"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  BarChart3,
  CreditCard,
  BrainCircuit,
  Settings,
  ClipboardList,
  PlusCircle,
  MessageSquare,
  Bell,
} from "lucide-react";


const providerMenu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/provider",
  },
  {
  title: "Create Task",
  icon: PlusCircle,
  href: "/provider/create-task",
},

  {
    title: "Task Hub",
    icon: Briefcase,
    href: "/provider/tasks",
  },
  {
    title: "Team",
    icon: Users,
    href: "/provider/team",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/provider/analytics",
  },
  {
    title: "Payments",
    icon: CreditCard,
    href: "/provider/payments",
  },
  {
    title: "AI Planning",
    icon: BrainCircuit,
    href: "/provider/ai-planning",
  },
  {
    title: "Task Management",
    icon: ClipboardList,
    href: "/provider/task-management",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/provider/settings",
  },
  {
    title: "Notifications",
    icon: Bell,
    href: "/provider/notifications",
  },
  {
    title: "Chat",
    icon: MessageSquare,
    href: "/provider/chat",
  },
];

const masterMenu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/master",
  },
  {
  title: "Available Tasks",
  icon: Briefcase,
  href: "/master/available-tasks",
},
  {
    title: "My Tasks",
    icon: Briefcase,
    href: "/master/tasks",
  },
  {
    title: "Earnings",
    icon: CreditCard,
    href: "/master/earnings",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/master/analytics",
  },
  {
    title: "AI Career",
    icon: BrainCircuit,
    href: "/master/ai-career",
  },
  {
    title: "Profile",
    icon: Users,
    href: "/master/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/master/settings",
  },
  {
    title: "Notifications",
    icon: Bell,
    href: "/master/notifications",
  },
  {
    title: "Chat",
    icon: MessageSquare,
    href: "/master/chat",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();

    router.push("/login");
  };

  const isMaster = pathname.startsWith("/master");

  const menuItems = isMaster
    ? masterMenu
    : providerMenu;

  return (
    <aside
      className="
        w-64
        h-[calc(100vh-64px)]
        bg-black/40
        backdrop-blur-xl
        border-r
        border-white/[0.08]
        flex
        flex-col
      "
    >
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div
            className="
              h-12
              w-12
              rounded-2xl
              bg-gradient-to-r
              from-blue-500
              via-indigo-500
              to-purple-600
              flex
              items-center
              justify-center
              text-white
              font-bold
              text-xl
              shadow-lg
            "
          >
            W
          </div>

          <div>
            <h2 className="font-bold text-white text-lg">
              WorkLancer AI
            </h2>

            <p className="text-xs text-slate-500">
              {isMaster
                ? "Master Panel"
                : "Provider Panel"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            (item.href !==
              (isMaster ? "/master" : "/provider") &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`
                group
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                transition-all
                duration-300

                ${
                  isActive
                    ? `
                      bg-gradient-to-r
                      from-blue-500/20
                      to-purple-500/20
                      border
                      border-blue-500/30
                      text-blue-400
                      shadow-[0_0_25px_rgba(59,130,246,0.15)]
                    `
                    : `
                      text-slate-400
                      border
                      border-transparent
                      hover:bg-white/10 hover:border-blue-500/20
                      hover:text-white
                      hover:border-purple-500/20 shadow-[0_0_40px_rgba(124,58,237,0.15)]
                    `
                }
              `}
            >
              <Icon
                size={18}
                className="
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />

              <span className="font-medium">
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Card */}
      <div className="p-4 border-t border-white/[0.08]">
        <div
          className="
            rounded-2xl
            border
            border-purple-500/20 shadow-[0_0_40px_rgba(124,58,237,0.15)]
            bg-gradient-to-br
            from-blue-500/5
            to-purple-500/5
            p-4
          "
        >
          {isMaster ? (
            <>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                AI Skill Match
              </p>

              <h3 className="text-2xl font-bold text-blue-400 mt-2">
                94%
              </h3>

              <div className="mt-3 h-2 rounded-full bg-slate-800">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-1000"
                  style={{ width: "94%" }}
                />
              </div>

              <p className="text-xs text-slate-500 mt-2">
                Market Competitive
              </p>
            </>
          ) : (
            <>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                AI Business Health
              </p>

              <h3 className="text-2xl font-bold text-green-400 mt-2">
                95/100
              </h3>

              <div className="mt-3 h-2 rounded-full bg-slate-800">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-1000"
                  style={{ width: "95%" }}
                />
              </div>

              <p className="text-xs text-slate-500 mt-2">
                Excellent Performance
              </p>
            </>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="
            mt-4
            w-full
            px-4
            py-2
            rounded-xl
            bg-red-600/20
            border
            border-red-500/30
            text-red-400
            hover:bg-red-600/30
            transition-all
            font-medium
          "
        >
          Logout
        </button>
      </div>
    </aside>
  );
}