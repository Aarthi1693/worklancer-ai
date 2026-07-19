"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import authService from "@/services/auth.service";

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "Uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "Lowercase letter", test: (v: string) => /[a-z]/.test(v) },
  { label: "A number", test: (v: string) => /[0-9]/.test(v) },
  {
    label: "Special character",
    test: (v: string) => /[^A-Za-z0-9]/.test(v),
  },
];

function ResetPasswordInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);

  useEffect(() => {
    const e = searchParams.get("email");
    if (e) {
      setEmail(e);
    } else {
      setInvalidLink(true);
    }
  }, [searchParams]);

  const passedRules = PASSWORD_RULES.filter((r) => r.test(password)).length;
  const passwordsMatch = password.length > 0 && password === confirm;
  const isStrong = passedRules === PASSWORD_RULES.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Invalid or missing email.");
      return;
    }

    if (!isStrong) {
      setError("Please meet all password requirements.");
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await authService.resetPassword({ email, newPassword: password });
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Failed to reset password."
      );
    } finally {
      setLoading(false);
    }
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
            Set a new password for your account.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_30px_rgba(59,130,246,0.4)]"
              >
                <CheckCircle2 className="h-10 w-10 text-white" />
              </motion.div>

              <h2 className="text-2xl font-bold text-white">Password updated</h2>

              <p className="mt-3 max-w-sm text-slate-400">
                Your password has been reset successfully. Redirecting to login...
              </p>
            </motion.div>
          ) : invalidLink ? (
            <motion.div
              key="invalid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-white">
                Invalid reset link
              </h2>
              <p className="mt-3 text-slate-400">
                This password reset link is missing or invalid. Please request a
                new one.
              </p>
              <button
                onClick={() => router.push("/forgot-password")}
                className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition font-semibold"
              >
                Request New Link
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label className="text-sm text-slate-400">Email</label>

                <div className="relative mt-2">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    readOnly
                    className="
                      w-full
                      p-3
                      pl-11
                      rounded-xl
                      bg-slate-800
                      border
                      border-white/[0.08]
                      outline-none
                      text-slate-400
                      cursor-not-allowed
                    "
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm text-slate-400">New Password</label>

                <div className="relative mt-2">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="
                      w-full
                      p-3
                      pl-11
                      pr-11
                      rounded-xl
                      bg-slate-800
                      border
                      border-white/[0.08]
                      outline-none
                      focus:border-blue-500/50
                      transition
                    "
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm text-slate-400">
                  Confirm Password
                </label>

                <div className="relative mt-2">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
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

              {/* Password strength meter */}
              <div className="mb-4">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                    animate={{ width: `${(passedRules / PASSWORD_RULES.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {PASSWORD_RULES.map((rule) => {
                    const ok = rule.test(password);
                    return (
                      <li
                        key={rule.label}
                        className={`flex items-center gap-2 text-xs ${
                          ok ? "text-green-400" : "text-slate-500"
                        }`}
                      >
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${
                            ok
                              ? "bg-green-500/20 text-green-400"
                              : "bg-slate-700 text-slate-400"
                          }`}
                        >
                          {ok ? "✓" : "•"}
                        </span>
                        {rule.label}
                      </li>
                    );
                  })}
                </ul>

                {confirm.length > 0 && !passwordsMatch && (
                  <p className="mt-2 text-xs text-red-400">
                    Passwords do not match.
                  </p>
                )}
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
                disabled={loading}
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
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Resetting...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordInner />
    </Suspense>
  );
}
