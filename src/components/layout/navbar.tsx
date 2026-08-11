"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Bell,
  Search,
  ChevronDown,
  ClipboardList,
  Briefcase,
  MessageCircle,
  FolderKanban,
  PlusCircle,
  UserCheck,
  BrainCircuit,
  FolderOpen,
  User,
  LogOut,
  Upload
} from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import authService from "@/services/auth.service";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const tasksActive =
  pathname.startsWith("/master/tasks") ||
  pathname.startsWith("/master/available-tasks") ||
  pathname.startsWith("/master/submit-work") 
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUser(authService.getUser());
  }, []);

 const providerNav = [
  { name: "Dashboard", href: "/provider" },
  { name: "Projects", dropdown: true },
  { name: "Payments", paymentDropdown: true },
  { name: "AI", aiDropdown: true },
  { name: "Chat", href: "/provider/chat" },
];

const masterNav = [
  { name: "Dashboard", href: "/master" },
  { name: "KYC", href: "/master/kyc" },
  { name: "Earnings", href: "/master/earnings" },
  { name: "AI Career", href: "/master/ai-career" },
  { name: "Chat", href: "/master/chat" },
];
const isMaster = pathname.startsWith("/master");

const navItems = isMaster ? masterNav : providerNav;

const projectsActive =
  pathname.startsWith("/provider/create-task") ||
  pathname.startsWith("/provider/my-projects") ||
  pathname.startsWith("/provider/applicants") ||
  pathname.startsWith("/provider/assigned-masters");

const aiActive =
  pathname.startsWith("/provider/ai-planning") ||
  pathname.startsWith("/provider/saved-ai-plans");

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("user");
    localStorage.clear();
    sessionStorage.clear();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto h-20 px-8 flex items-center justify-between">

        {/* Logo */}
<div className="flex items-center gap-3">
  <Image
    src={Logo}
    alt="WorkLancer AI"
    width={44}
    height={44}
    className="rounded-xl object-contain"
  />

  <div>
    <h1 className="font-semibold text-slate-900">
      WorkLancer AI
    </h1>

    <p className="text-xs text-slate-500">
      {isMaster ? "Task Master" : "Provider"}
    </p>
  </div>
</div>

        {/* Navigation */}

        <nav className="hidden lg:flex items-center gap-8">

  {navItems.map((item) => {

    if (!isMaster && item.dropdown) {
  return (
    <DropdownMenu key="projects">
  <DropdownMenuTrigger asChild>
    <button
      className={`flex items-center gap-1 text-sm font-medium transition ${
        projectsActive
          ? "text-blue-600"
          : "text-gray-500 hover:text-blue-600"
      }`}
    >
      Projects
      <ChevronDown size={15} />
    </button>
  </DropdownMenuTrigger>

  <DropdownMenuContent
  align="start"
  className="w-72 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl"
>
  <DropdownMenuItem
    onSelect={() => router.push("/provider/create-task")}
    className="cursor-pointer rounded-xl p-3 focus:bg-blue-50"
  >
    <div className="flex items-start gap-3">
      <PlusCircle className="h-5 w-5 text-blue-600 mt-0.5" />
      <div>
        <p className="font-medium text-gray-900">Create Task</p>
        <p className="text-xs text-gray-500">Publish a new task</p>
      </div>
    </div>
  </DropdownMenuItem>

  <DropdownMenuItem
    onSelect={() => router.push("/provider/my-projects")}
    className="cursor-pointer rounded-xl p-3 focus:bg-green-50"
  >
    <div className="flex items-start gap-3">
      <FolderKanban className="h-5 w-5 text-green-600 mt-0.5" />
      <div>
        <p className="font-medium text-gray-900">My Projects</p>
        <p className="text-xs text-gray-500">Manage your projects</p>
      </div>
    </div>
  </DropdownMenuItem>

  <DropdownMenuItem
  onSelect={() => router.push("/provider/applicants")}
  className="cursor-pointer rounded-xl p-3 focus:bg-cyan-50"
>
  <div className="flex items-start gap-3">
    <UserCheck className="h-5 w-5 text-cyan-600 mt-0.5" />

    <div>
      <p className="font-medium text-gray-900">
        Applicants
      </p>

      <p className="text-xs text-gray-500">
        Review applications received
      </p>
    </div>
  </div>
</DropdownMenuItem>

  <DropdownMenuItem
    onSelect={() => router.push("/provider/assigned-masters")}
    className="cursor-pointer rounded-xl p-3 focus:bg-purple-50"
  >
    <div className="flex items-start gap-3">
      <UserCheck className="h-5 w-5 text-purple-600 mt-0.5" />
      <div>
        <p className="font-medium text-gray-900">Assigned Masters</p>
        <p className="text-xs text-gray-500">
          Track assigned freelancers
        </p>
      </div>
    </div>
  </DropdownMenuItem>

  <DropdownMenuItem
  onSelect={() => router.push("/provider/submitted-work")}
  className="cursor-pointer rounded-xl p-3 focus:bg-emerald-50"
>
  <div className="flex items-start gap-3">
    <ClipboardList className="mt-0.5 h-5 w-5 text-emerald-600" />

    <div>
      <p className="font-medium text-gray-900">
        Submitted Work
      </p>

      <p className="text-xs text-gray-500">
        Review completed submissions
      </p>
    </div>
  </div>
</DropdownMenuItem>

</DropdownMenuContent>
</DropdownMenu>
  );
}

if (!isMaster && item.paymentDropdown) {
  return (
    <DropdownMenu key="payments">
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 text-sm font-medium text-gray-500 transition hover:text-blue-600">
          Payments
          <ChevronDown size={15} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-72 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl"
      >
        <DropdownMenuItem
          onSelect={() => router.push("/provider/payments")}
          className="cursor-pointer rounded-xl p-3 focus:bg-green-50"
        >
          <div className="flex items-start gap-3">
            <Briefcase className="mt-0.5 h-5 w-5 text-green-600" />

            <div>
              <p className="font-medium text-gray-900">
                Escrow Payments
              </p>

              <p className="text-xs text-gray-500">
                Manage escrow & transactions
              </p>
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

if (!isMaster && item.aiDropdown) {
  return (
    <DropdownMenu key="ai">
      <DropdownMenuTrigger asChild>
        <button
          className={`flex items-center gap-1 text-sm font-medium transition ${
            aiActive
              ? "text-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
        >
          AI
          <ChevronDown size={15} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-72 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl"
      >
        <DropdownMenuItem
          onSelect={() => router.push("/provider/ai-planning")}
          className="cursor-pointer rounded-xl p-3 focus:bg-blue-50"
        >
          <div className="flex items-start gap-3">
            <BrainCircuit className="mt-0.5 h-5 w-5 text-blue-600" />

            <div>
              <p className="font-medium text-gray-900">
                AI Planning
              </p>

              <p className="text-xs text-gray-500">
                Generate intelligent project plans
              </p>
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => router.push("/provider/saved-ai-plans")}
          className="cursor-pointer rounded-xl p-3 focus:bg-green-50"
        >
          <div className="flex items-start gap-3">
            <FolderOpen className="mt-0.5 h-5 w-5 text-green-600" />

            <div>
              <p className="font-medium text-gray-900">
                Saved AI Plans
              </p>

              <p className="text-xs text-gray-500">
                View previously generated plans
              </p>
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

  const active =
  item.href === "/provider"
    ? pathname === "/provider"
    : item.href === "/master"
    ? pathname === "/master"
    : pathname === item.href ||
      pathname.startsWith(item.href + "/");

    return (
      <div key={item.name} className="flex items-center">

        <Link
          href={item.href}
          className={`relative text-sm font-medium transition ${
            active
              ? "text-blue-600"
              : "text-gray-500 hover:text-blue-600"
          }`}
        >
          <div className="flex items-center gap-2">
  {item.name === "Chat" && <MessageCircle size={16} />}

  {item.name === "AI Assistant" && (
    <BrainCircuit size={16} />
  )}

  {item.name}
</div>

          {active && (
            <span className="absolute left-0 -bottom-2 h-[2px] w-full rounded-full bg-blue-600" />
          )}
        </Link>

        {/* Show Tasks dropdown immediately after Dashboard */}
        {isMaster && item.name === "Dashboard" && (
          <DropdownMenu>

            <DropdownMenuTrigger
              className={`ml-8 flex items-center gap-1 text-sm font-medium transition ${
                tasksActive
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              Tasks
              <ChevronDown size={15} />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="start"
              className="w-64 rounded-2xl p-2"
            >
              <DropdownMenuItem
  asChild
  className="cursor-pointer rounded-xl focus:bg-gray-100"
>
                <Link
                  href="/master/available-tasks"
                  className="flex items-start gap-3 rounded-xl p-3"
                >
                  <Briefcase className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium">Available Tasks</p>
                    <p className="text-xs text-gray-500">
                      Browse and apply for new projects
                    </p>
                  </div>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
  asChild
  className="cursor-pointer rounded-xl focus:bg-gray-100"
>
                <Link
                  href="/master/tasks"
                  className="flex items-start gap-3 rounded-xl p-3"
                >
                  <ClipboardList className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-medium">My Tasks</p>
                    <p className="text-xs text-gray-500">
                      View accepted assignments
                    </p>
                  </div>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
  asChild
  className="cursor-pointer rounded-xl focus:bg-gray-100"
>
  <Link
    href="/master/submit-work"
    className="flex items-start gap-3 rounded-xl p-3"
  >
    <Upload className="mt-1 h-5 w-5 text-purple-600" />

    <div>
      <p className="font-medium">Submit Work</p>

      <p className="text-xs text-gray-500">
        Upload completed project deliverables
      </p>
    </div>
  </Link>
</DropdownMenuItem>


            </DropdownMenuContent>

          </DropdownMenu>
        )}

      </div>
    );
  })}



</nav>

        {/* Right */}

        <div className="flex items-center gap-4">

          {/* Search */}

          <div className="hidden md:flex items-center gap-2 border rounded-xl px-3 py-2 bg-gray-50">
            <Search size={16} className="text-gray-500" />

            <input
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-40"
            />
          </div>

          {/* Notifications */}

         <button
  onClick={() =>
    router.push(
      isMaster
        ? "/master/notifications"
        : "/provider/notifications"
    )
  }
  className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50"
>
  <div className="relative">
  <Bell className="h-5 w-5" />

  <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white" />
</div>
</button>

          {/* User */}

          {/* User */}

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <button className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:bg-slate-50">

      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black font-semibold text-white">
        {mounted && user?.name
          ? user.name.charAt(0).toUpperCase()
          : "U"}
      </div>

      <div className="hidden text-left md:block">
        <p className="text-sm font-medium text-slate-900">
          {mounted && user?.name ? user.name : "User"}
        </p>

        <p className="text-xs text-slate-500">
          {isMaster ? "Task Master" : "Provider"}
        </p>
      </div>

      <ChevronDown
        size={16}
        className="text-slate-500"
      />
    </button>
  </DropdownMenuTrigger>

  <DropdownMenuContent
    align="end"
    className="w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
  >
    <DropdownMenuItem
      onSelect={() =>
        router.push(
          isMaster
            ? "/master/profile"
            : "/provider/profile"
        )
      }
      className="cursor-pointer rounded-xl py-3"
    >
      <User className="mr-2 h-4 w-4 text-blue-600" />
      Profile
    </DropdownMenuItem>

    <DropdownMenuItem
      onSelect={logout}
      className="cursor-pointer rounded-xl py-3 text-red-600 focus:bg-red-50"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
        </div>
      </div>
    </header>
  );
}