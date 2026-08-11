"use client";

import Image from "next/image";
import logo from "@/assets/images/logo.png";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F8F8F6] flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md rounded-[32px] border border-slate-200 bg-white p-10 shadow-xl">

        <div className="flex justify-center">
          <Image
            src={logo}
            alt="WorkLancer AI"
            width={90}
            height={90}
            priority
          />
        </div>

        <h1 className="mt-6 text-center text-3xl font-bold text-slate-900">
          {title}
        </h1>

        <p className="mt-2 text-center text-slate-500">
          {subtitle}
        </p>

        <div className="mt-10">
          {children}
        </div>

      </div>
    </div>
  );
}