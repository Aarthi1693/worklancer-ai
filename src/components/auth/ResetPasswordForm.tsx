"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function ResetPasswordForm() {
  const [show, setShow] = useState(false);

  return (
    <form className="space-y-6">
      <div className="relative">
        <Lock
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type={show ? "text" : "password"}
          placeholder="New Password"
          className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-12 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <div className="relative">
        <Lock
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type={show ? "text" : "password"}
          placeholder="Confirm Password"
          className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-12 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Reset Password
      </button>
    </form>
  );
}