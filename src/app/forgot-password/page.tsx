"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    router.push(`/reset-password?email=${encodeURIComponent(email)}`);
  };

  return (
    <div
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-blue-950
        p-6
      "
    >
      {/* Aurora Glow */}
      <motion.div
        animate={{ x: [-30, 30, -30], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]"
      />
      <motion.div
        animate={{ x: [30, -30, 30], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-purple-600/20 blur-[140px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
          relative
          z-10
          w-full
          max-w-lg
          rounded-3xl
          border
          border-white/[0.08]
          bg-white/[0.03]
          p-8
          shadow-[0_0_40px_rgba(59,130,246,0.08)]
          backdrop-blur-xl
        "
      >
        <div className="mb-10 flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-blue-500/20 blur-2xl" />
            <Image
              src="/logo/logo.png"
              alt="WorkLancer AI"
              width={84}
              height={84}
              className="relative rounded-2xl bg-white p-2 shadow-2xl"
            />
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-white">
            WorkLancer{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              AI
            </span>
          </h1>

          <p className="mt-2 text-center text-slate-400">
            Forgot your password? No worries.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-sm text-slate-400">Email</label>

            <div className="relative mt-2">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full
                  p-3
                  pl-11
                  rounded-xl
                  bg-slate-800
                  border
                  border-white/[0.08]
                  outline-none
                  focus:border-blue-500/50
                  transition
                "
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            className="
              w-full
              py-3
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-purple-600
              hover:from-blue-500
              hover:to-purple-500
              transition
              font-semibold
            "
          >
            Continue
          </button>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              Back to Login
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
