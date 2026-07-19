"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const completed = localStorage.getItem("onboardingCompleted");

      if (completed) {
        router.replace("/login");
      } else {
        router.replace("/onboarding");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617]">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />

      {/* Aurora Glow */}
      <motion.div
        animate={{
          x: [-30, 30, -30],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]"
      />

      <motion.div
        animate={{
          x: [30, -30, 30],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-purple-600/20 blur-[140px]"
      />

      <motion.div
        animate={{
          y: [0, -25, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]"
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white/20"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6"
      >
        {/* Logo */}
        <motion.div
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{
    scale: [0.9, 1.05, 1],
    opacity: 1,
    y: [0, -3, 0],
  }}
  transition={{
    duration: 1.3,
    y: {
      duration: 4.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
  className="mb-8 flex justify-center"
>
  <div
    className="
      rounded-[28px]
      bg-white
      p-2
      shadow-[0_0_30px_rgba(59,130,246,0.30)]
      ring-1
      ring-white/20
    "
  >
    <Image
      src="/logo/logo.png"
      alt="WorkLancer AI"
      width={115}
      height={115}
      priority
      className="rounded-[20px]"
    />
  </div>
</motion.div>
        {/* Title */}
        <motion.h1
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5 }}
  className="text-6xl font-extrabold tracking-[-0.04em] drop-shadow-[0_0_15px_rgba(255,255,255,0.08)]"
>
  <span className="text-white">WorkLancer </span>

  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
    AI
  </span>
</motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-7 text-xl font-medium text-slate-300"
        >
          Where AI Connects Talent with Opportunity
        </motion.p>

        {/* Loading Bar */}
        <div className="mx-auto mt-14 w-72 overflow-hidden rounded-full bg-slate-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2.8,
              ease: "easeInOut",
            }}
            className="h-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_18px_rgba(59,130,246,.9)]"
          />
        </div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            delay: 1,
            duration: 2,
            repeat: Infinity,
          }}
          className="mt-7 text-sm uppercase tracking-[0.35em] text-slate-400"
        >
          Initializing AI Platform...
        </motion.p>
      </motion.div>
    </div>
  );
}