"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  BarChart3,
  CreditCard,
  BrainCircuit,
  CircleUser,
  ClipboardList,
  PlusCircle,
  MessageSquare,
  Bell,
  Upload,
  FolderOpen,
  ClipboardCheck,
  ShieldCheck,
} from "lucide-react";

import UnreadBadge from "@/components/chat/UnreadBadge";
import { useChatUnreadTotal } from "@/lib/chatUnread";
import { useEffect, useState } from "react";
import providerService from "@/services/provider.service";


function getBusinessHealth(projects: { status?: string }[]) {
  if (!projects || projects.length === 0) {
    return { label: "Awaiting project activity.", color: "text-slate-400" };
  }

  const completed = projects.filter((p) => p.status === "COMPLETED").length;
  const inProgress = projects.filter((p) => p.status === "IN_PROGRESS").length;
  const review = projects.filter((p) => p.status === "REVIEW").length;
  const completionRate = completed / projects.length;

  if (completionRate >= 0.7)
    return { label: "Excellent", color: "text-emerald-400" };
  if (completionRate >= 0.4) return { label: "Good", color: "text-blue-400" };
  if (inProgress > 0 || review > 0)
    return { label: "Healthy", color: "text-green-400" };
  return { label: "Needs Attention", color: "text-yellow-400" };
}


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
    title: "Saved Plans",
    icon: FolderOpen,
    href: "/provider/saved-plans",
  },
  {
    title: "Task Management",
    icon: ClipboardList,
    href: "/provider/task-management",
  },
  {
  title: "Applicants",
  href: "/provider/applicants",
  icon: Users,
  },

  {
  title: "Submitted Work",
  icon: ClipboardCheck,
  href: "/provider/submissions",
  },

  {
    title: "Profile",
    icon: CircleUser,
    href: "/provider/profile",
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
    title: "AI KYC Verification",
    icon: ShieldCheck,
    href: "/master/kyc",
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
  title: "Submit Work",
  icon: Upload,
  href: "/master/submit-work",
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
    icon: CircleUser,
    href: "/master/profile",
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
  const chatUnreadCount = useChatUnreadTotal();
  const [health, setHealth] = useState<{ label: string; color: string }>({
    label: "Awaiting project activity.",
    color: "text-slate-400",
  });

  const isMaster = pathname.startsWith("/master");

  useEffect(() => {
    if (isMaster) return;

    const fetchProviderData = async () => {
      try {
        const data = await providerService.getProjects();
        const projects = Array.isArray(data) ? data : data.projects || [];
        setHealth(getBusinessHealth(projects));
      } catch (e) {
        console.error("Failed to load provider health", e);
      }
    };

    fetchProviderData();
  }, [isMaster]);

  const menuItems = isMaster
    ? masterMenu
    : providerMenu;

  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("user");

    localStorage.clear();
    sessionStorage.clear();

    router.push("/login");
  };

  return (
    <aside
      className="
        w-64
        h-full
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

              {item.title === "Chat" && (
                <UnreadBadge count={chatUnreadCount} />
              )}
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
                N/A
              </h3>

              <div className="mt-3 h-2 rounded-full bg-slate-800">

                <div
                  className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-1000"
                  style={{ width: "0%" }}
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

              <h3 className={`text-2xl font-bold mt-2 ${health.color}`}>
                {health.label}
              </h3>

              <div className="mt-3 h-2 rounded-full bg-slate-800">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-1000"
                  style={{
                    width:
                      health.label === "Excellent"
                        ? "90%"
                        : health.label === "Good"
                          ? "70%"
                          : health.label === "Healthy"
                            ? "50%"
                            : health.label === "Needs Attention"
                              ? "25%"
                              : "10%",
                  }}
                />
              </div>

              <p className="text-xs text-slate-500 mt-2">
                {health.label === "Awaiting project activity."
                  ? "Create a project to begin"
                  : health.label === "Excellent"
                    ? "Excellent Performance"
                    : health.label === "Good"
                      ? "Good Performance"
                      : health.label === "Healthy"
                        ? "Growing Well"
                        : "Needs Attention"}
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