"use client";

import Link from "next/link";

export default function OTPForm() {
  return (
    <form className="space-y-8">
      <input
        type="text"
        maxLength={6}
        placeholder="Enter 6-digit OTP"
        className="w-full rounded-xl border border-slate-300 py-4 text-center text-2xl tracking-[12px] outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
      />

      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Verify OTP
      </button>

      <p className="text-center text-sm text-slate-500">
        Didn't receive the code?{" "}
        <button
          type="button"
          className="font-semibold text-blue-600"
        >
          Resend
        </button>
      </p>

      <p className="text-center">
        <Link
          href="/login"
          className="text-blue-600 font-semibold hover:underline"
        >
          Back to Login
        </Link>
      </p>
    </form>
  );
}