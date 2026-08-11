"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import logo from "@/assets/images/logo.png";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenOnboarding = Cookies.get("hasSeenOnboarding");

      if (hasSeenOnboarding) {
        router.replace("/login");
      } else {
        router.replace("/onboarding");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F8F6] px-6">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={logo}
            alt="WorkLancer AI Logo"
            width={180}
            height={180}
            priority
            className="object-contain"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-5xl font-extrabold tracking-tight"
        >
          <span className="text-slate-900">WorkLancer </span>
          <span className="text-blue-600">AI</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 text-xl font-medium text-slate-500"
        >
          Intelligent Workforce Platform
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 90 }}
          transition={{ delay: 0.8 }}
          className="mt-6 h-1 rounded-full bg-blue-600"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 max-w-sm text-base leading-7 text-slate-600"
        >
          Connect Providers & Skilled Workers
          <br />
          with AI-powered collaboration.
        </motion.p>

        {/* Loading Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-14 flex items-center gap-3"
        >
          <span
            className="h-3 w-3 animate-bounce rounded-full bg-blue-300"
            style={{ animationDelay: "0s" }}
          />
          <span
            className="h-3 w-3 animate-bounce rounded-full bg-blue-600"
            style={{ animationDelay: "0.15s" }}
          />
          <span
            className="h-3 w-3 animate-bounce rounded-full bg-violet-500"
            style={{ animationDelay: "0.3s" }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-5 text-base font-medium text-slate-500"
        >
          Loading...
        </motion.p>

        {/* Version */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-12 text-xs uppercase tracking-widest text-slate-400"
        >
          Version 1.0.0
        </motion.p>
      </div>
    </div>
  );
}