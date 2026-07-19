"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();

  const [role, setRole] = useState("provider");

  const handleRegister = () => {
    router.push("/login");
  };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-blue-950
        p-6
      "
    >
      <div
        className="
          w-full
          max-w-lg
          rounded-3xl
          border
          border-white/[0.08]
          bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
          backdrop-blur-xl
          p-8
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
    Create Your{" "}
    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
      Account
    </span>
  </h1>

  <p className="mt-2 text-slate-400">
    Join WorkLancer AI and start collaborating smarter.
  </p>

</div>

        {/* Full Name */}
        <div className="mb-4">
          <label className="text-sm text-slate-400">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter full name"
            className="
              w-full
              mt-2
              p-3
              rounded-xl
              bg-slate-800
              border
              border-white/[0.08]
              outline-none
            "
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-slate-400">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter email"
            className="
              w-full
              mt-2
              p-3
              rounded-xl
              bg-slate-800
              border
              border-white/[0.08]
              outline-none
            "
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm text-slate-400">
            Password
          </label>

          <input
            type="password"
            placeholder="Create password"
            className="
              w-full
              mt-2
              p-3
              rounded-xl
              bg-slate-800
              border
              border-white/[0.08]
              outline-none
            "
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="text-sm text-slate-400">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm password"
            className="
              w-full
              mt-2
              p-3
              rounded-xl
              bg-slate-800
              border
              border-white/[0.08]
              outline-none
            "
          />
        </div>

        {/* Role */}
        <div className="mb-6">
          <label className="text-sm text-slate-400">
            Register As
          </label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="
              w-full
              mt-2
              p-3
              rounded-xl
              bg-slate-800
              border
              border-white/[0.08]
            "
          >
            <option value="provider">
              Task Provider
            </option>

            <option value="master">
              Task Master
            </option>
          </select>
        </div>

        {/* Create Account */}
        <button
          onClick={handleRegister}
          className="
            w-full
            py-3
            rounded-xl
            bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)]
            hover:from-blue-500 hover:to-purple-500
            transition
            font-semibold
          "
        >
          Create Account
        </button>

        {/* Login Link */}
        <div className="text-center mt-5">

          <p className="text-slate-500 text-sm">
            Already have an account?
          </p>

          <button
            onClick={() => router.push("/login")}
            className="
              mt-2
              text-blue-400
              hover:text-blue-300
              text-sm
            "
          >
            Already have an account? Sign In
          </button>

        </div>

      </div>
    </div>
  );
}