"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

export default function ForgotPasswordForm() {
  return (
    <form className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Email Address
        </label>

        <div className="relative">
          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="email"
            placeholder="Enter your registered email"
            className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Send Reset Link
      </button>

      <p className="text-center">
        <Link
          href="/login"
          className="text-blue-600 font-semibold hover:underline"
        >
          ← Back to Login
        </Link>
      </p>
    </form>
  );
}