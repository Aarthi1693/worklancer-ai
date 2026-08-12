"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

import authService from "@/services/auth.service";

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      console.log({
  email,
  password,
});

      const response = await authService.login({
        email,
        password,
      });

      const role = response.user.role;

      if (role === "PROVIDER") {
        router.push("/provider");
      } else if (role === "MASTER") {
        router.push("/master");
      } else if (role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="space-y-6"
    >
      {/* Email */}
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
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter your email"
  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
/>
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Password
        </label>

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
  type={showPassword ? "text" : "password"}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Enter your password"
  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-12 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
/>

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Remember Me + Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input type="checkbox" className="rounded" />
          Remember Me
        </label>

        <Link
          href="/forgot-password"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Login */}
      <button
  type="submit"
  disabled={loading}
  className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
>
  {loading ? "Signing In..." : "Sign In"}
</button>

      {/* Divider */}
      <div className="relative text-center">
        <div className="absolute inset-0 top-1/2 border-t border-slate-200"></div>
        <span className="relative bg-white px-4 text-sm text-slate-400">
          OR
        </span>
      </div>

      {/* Google */}
      <button
        type="button"
        className="w-full rounded-xl border border-slate-300 bg-white py-3 font-medium text-slate-700 transition hover:bg-slate-50"
      >
        Continue with Google
      </button>

      {/* Register */}
      <p className="text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-blue-600 hover:underline"
        >
          Create Account
        </Link>
      </p>
    </form>
  );
}