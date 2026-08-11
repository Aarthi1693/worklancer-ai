"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import authService from "@/services/auth.service";

export default function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.role ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all the required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role as "PROVIDER" | "MASTER",
      });

      alert("🎉 Registration successful!");

      router.push("/login");
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="space-y-5"
    >
      {/* Full Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Full Name
        </label>

        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
  type="text"
  value={formData.name}
  onChange={(e) => updateField("name", e.target.value)}
  placeholder="Enter your full name"
  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none"
/>
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Email
        </label>

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
  type="email"
  value={formData.email}
  onChange={(e) => updateField("email", e.target.value)}
  placeholder="Enter your email"
  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none"
/>
        </div>
      </div>

      {/* Role */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Select Role
        </label>

        <select
  value={formData.role}
  onChange={(e) => updateField("role", e.target.value)}
  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none"
>
  <option value="">Choose Role</option>
  <option value="PROVIDER">Provider</option>
  <option value="MASTER">Worker / Master</option>
</select>
      </div>

      {/* Password */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Password
        </label>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />

          <input
  type={showPassword ? "text" : "password"}
  value={formData.password}
  onChange={(e) => updateField("password", e.target.value)}
  placeholder="Create password"
  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-12 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none"
/>

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Confirm Password
        </label>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />

          <input
  type={showConfirm ? "text" : "password"}
  value={formData.confirmPassword}
  onChange={(e) => updateField("confirmPassword", e.target.value)}
  placeholder="Confirm password"
  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-12 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none"
/>
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Register Button */}
      <button
  type="submit"
  disabled={loading}
  className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
>
  {loading ? "Creating Account..." : "Create Account"}
</button>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-blue-600 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}