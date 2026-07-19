"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import authService from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [role, setRole] = useState("provider");

 const handleLogin = async () => {
  try {
    setLoading(true);
    setError("");

    const response = await authService.login({
      email,
      password,
    });

    const user = response.user;

    if (user.role === "PROVIDER") {
      router.push("/provider");
    } else if (user.role === "MASTER") {
      router.push("/master");
    } else {
      router.push("/");
    }
  } catch (err: any) {
    setError(err?.response?.data?.message || "Login Failed");
  } finally {
    setLoading(false);
  }
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
    WorkLancer{" "}
    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
      AI
    </span>
  </h1>

  <p className="mt-2 text-slate-400">
    Welcome back. Sign in to continue.
  </p>

</div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-slate-400">
            Email
          </label>

         <input
  type="email"
  placeholder="Enter email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
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
  placeholder="Enter password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
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
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={() => router.push("/forgot-password")}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        {/* Role */}
        <div className="mb-6">
          <label className="text-sm text-slate-400">
            Login As
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

        {error && (
  <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
    {error}
  </div>
)}

        {/* Login Button */}
        <button
  onClick={handleLogin}
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
  {loading ? "Signing In..." : "Login"}
</button>

        <div className="text-center mt-5">

  <p className="text-slate-500 text-sm">
    Demo Authentication System
  </p>

  <button
    onClick={() => router.push("/register")}
    className="
      mt-3
      text-blue-400
      hover:text-blue-300
      text-sm
    "
  >
    Create New Account
  </button>

</div>
      </div>
    </div>
  );
}