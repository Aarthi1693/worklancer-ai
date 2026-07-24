"use client";

import DesktopLayout from "@/components/layout/desktop-layout";
import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  Building2,
  Users,
  Briefcase,
  Calendar,
  ShieldCheck,
  Camera,
  X,
  Loader2,
  Plus,
  Trash2,
  Lock,
  Download,
  Settings,
  IndianRupee,
  Star,
  TrendingUp,
} from "lucide-react";
import authService from "@/services/auth.service";
import profileService from "@/services/profile.service";
import { ToastProvider, useToast } from "@/components/ui/toast";
import type { ProfileData, ProviderStats } from "@/types/profile";

function ProviderProfileContent() {
  const toast = useToast();
  const [user, setUser] = useState<{ id: string; name: string; email: string; role: string } | null>(() =>
    authService.getUser()
  );
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "skills" | "settings">("info");
  const [stats, setStats] = useState<ProviderStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    contactPerson: "",
    companySize: "",
    providerType: "",
    industry: "",
    website: "",
    businessAddress: "",
    companyDescription: "",
    skills: "",
    experience: "",
    bio: "",
    location: "",
    gstNumber: "",
    companyRegistrationNumber: "",
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState("");

  const displayProfile = profile ?? {
    id: user?.id ?? "",
    name: user?.name,
    email: user?.email,
    phone: "",
    companyName: "",
    contactPerson: "",
    companySize: "",
    providerType: "",
    industry: "",
    website: "",
    businessAddress: "",
    companyDescription: "",
    skills: [],
    experience: "",
    bio: "",
    location: "",
    gstNumber: "",
    companyRegistrationNumber: "",
    role: (user?.role as ProfileData["role"]) ?? "PROVIDER",
    avatar: "",
    createdAt: "",
  };

  const skillsArray = (displayProfile.skills ?? []).filter(Boolean);

  useEffect(() => {
    async function loadProfile() {
      try {
        const [data, statsData] = await Promise.all([
          profileService.getProfile(),
          profileService.getProviderStats().catch(() => null),
        ]);
        setProfile(data);
        setStats(statsData);
        setForm({
          name: data.name ?? "",
          email: data.email ?? "",
          phone: data.phone ?? "",
          companyName: data.companyName ?? "",
          contactPerson: data.contactPerson ?? "",
          companySize: data.companySize ?? "",
          providerType: data.providerType ?? "",
          industry: data.industry ?? "",
          website: data.website ?? "",
          businessAddress: data.businessAddress ?? "",
          companyDescription: data.companyDescription ?? "",
          skills: data.skills?.join(", ") ?? "",
          experience: data.experience?.toString() ?? "",
          bio: data.bio ?? "",
          location: data.location ?? "",
          gstNumber: data.gstNumber ?? "",
          companyRegistrationNumber: data.companyRegistrationNumber ?? "",
        });
        if (data.avatar) {
          setAvatarPreview(data.avatar);
        }
      } catch (error) {
        console.error(error);
        toast.addToast("Failed to load profile", "error");
      } finally {
        setLoading(false);
        setStatsLoading(false);
      }
    }

    loadProfile();
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateUrl = (url: string): boolean => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validate = () => {
    if (!form.name.trim()) {
      toast.addToast("Contact person name is required", "error");
      return false;
    }
    if (!form.email.trim()) {
      toast.addToast("Email is required", "error");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.addToast("Invalid email format", "error");
      return false;
    }
    if (!form.companyName.trim()) {
      toast.addToast("Company name is required", "error");
      return false;
    }
    if (form.website && !validateUrl(form.website)) {
      toast.addToast("Invalid website URL", "error");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;

    setSaving(true);
    try {
      const updateData: Parameters<typeof profileService.updateProfile>[0] = {};
      if (form.name) updateData.name = form.name;
      if (form.email) updateData.email = form.email;
      if (form.phone) updateData.phone = form.phone;
      if (form.companyName) updateData.companyName = form.companyName;
      if (form.contactPerson) updateData.contactPerson = form.contactPerson;
      if (form.companySize) updateData.companySize = form.companySize;
      if (form.providerType) updateData.providerType = form.providerType;
      if (form.industry) updateData.industry = form.industry;
      if (form.website) updateData.website = form.website;
      if (form.businessAddress) updateData.businessAddress = form.businessAddress;
      if (form.companyDescription) updateData.companyDescription = form.companyDescription;
      if (form.skills) updateData.skills = form.skills;
      if (form.experience) updateData.experience = Number(form.experience);
      if (form.bio) updateData.bio = form.bio;
      if (form.location) updateData.location = form.location;
      if (form.gstNumber) updateData.gstNumber = form.gstNumber;
      if (form.companyRegistrationNumber) updateData.companyRegistrationNumber = form.companyRegistrationNumber;

      const updated = await profileService.updateProfile(updateData);

      if (avatarFile) {
        await profileService.uploadAvatar(avatarFile);
        const finalData = { ...updated, avatar: avatarPreview ?? updated.avatar };
        setProfile(finalData);
        authService.setUser({
          ...user!,
          name: finalData.name,
          email: finalData.email,
        });
      } else {
        setProfile(updated);
        authService.setUser({
          ...user!,
          name: updated.name,
          email: updated.email,
        });
      }

      setUser(authService.getUser());
      setIsEditing(false);
      setAvatarFile(null);
      toast.addToast("Profile updated successfully", "success");
    } catch (error) {
      console.error(error);
      toast.addToast("Failed to update profile", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skillsArray.includes(newSkill.trim())) {
      const updated = [...skillsArray, newSkill.trim()];
      setForm((prev) => ({ ...prev, skills: updated.join(", ") }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    const updated = skillsArray.filter((s) => s !== skill);
    setForm((prev) => ({ ...prev, skills: updated.join(", ") }));
  };

  if (loading) {
    return (
      <DesktopLayout>
        <div className="flex justify-center items-center h-[70vh] text-white text-xl">
          Loading profile...
        </div>
      </DesktopLayout>
    );
  }

  const cardBase =
    "rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]";

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

  return (
    <DesktopLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Provider Profile</h1>
            <p className="text-slate-400 mt-1">Manage your company profile and business details</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:from-blue-500 hover:to-cyan-500 transition text-white font-semibold flex items-center gap-2"
          >
            <Settings size={18} />
            Edit Profile
          </button>
        </div>

        {/* Profile Header Card */}
        <div className={`${cardBase} p-6`}>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="relative flex-shrink-0">
              <div className="h-28 w-28 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg overflow-hidden">
                {avatarPreview || displayProfile.avatar ? (
                  <img src={avatarPreview || displayProfile.avatar} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                  displayProfile.companyName?.charAt(0)?.toUpperCase() || displayProfile.name?.charAt(0)?.toUpperCase() || "C"
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-green-500 flex items-center justify-center border-2 border-slate-900 shadow-lg">
                <ShieldCheck size={14} className="text-white" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-bold text-white truncate">
                  {displayProfile.companyName || "Company Name"}
                </h2>
                <span className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-semibold">
                  Verified
                </span>
              </div>
              <p className="text-slate-400 mt-1 text-sm">
                {displayProfile.providerType ? `${displayProfile.providerType} • ` : ""}
                {displayProfile.industry || "Industry"}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                <div className="flex items-center gap-2 text-slate-400">
                  <Mail size={16} className="text-blue-400" />
                  <span className="text-sm truncate">{displayProfile.email || "user@example.com"}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Phone size={16} className="text-green-400" />
                  <span className="text-sm">{displayProfile.phone || "Not provided"}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Globe size={16} className="text-cyan-400" />
                  <span className="text-sm truncate">{displayProfile.website || "No website"}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin size={16} className="text-red-400" />
                  <span className="text-sm truncate">{displayProfile.location || "No location"}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  Member since {displayProfile.createdAt ? new Date(displayProfile.createdAt).toLocaleDateString() : "N/A"}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 size={14} />
                  {displayProfile.contactPerson || displayProfile.name || "Contact Person"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Projects Posted", value: statsLoading ? "..." : stats?.projectsPosted ?? 0, color: "text-blue-400" },
            { label: "Active Projects", value: statsLoading ? "..." : stats?.activeProjects ?? 0, color: "text-cyan-400" },
            { label: "Completed Projects", value: statsLoading ? "..." : stats?.completedProjects ?? 0, color: "text-green-400" },
            { label: "Total Budget", value: statsLoading ? "..." : formatCurrency(stats?.totalBudget ?? 0), color: "text-purple-400" },
            { label: "Total Payments", value: statsLoading ? "..." : formatCurrency(stats?.totalPayments ?? 0), color: "text-orange-400" },
          ].map((stat) => (
            <div key={stat.label} className={`${cardBase} p-5 text-center`}>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">{stat.label}</p>
              <h3 className={`text-2xl font-bold ${stat.color}`}>{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Company Information */}
        <div className={`${cardBase} p-6`}>
          <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <Building2 size={20} className="text-blue-400" />
            Company Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Company Name</p>
              <p className="text-white font-medium">{displayProfile.companyName || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Contact Person</p>
              <p className="text-white font-medium">{displayProfile.contactPerson || displayProfile.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Provider Type</p>
              <p className="text-white font-medium">{displayProfile.providerType || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Industry</p>
              <p className="text-white font-medium">{displayProfile.industry || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Company Size</p>
              <p className="text-white font-medium">{displayProfile.companySize || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Email</p>
              <p className="text-white font-medium">{displayProfile.email || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Phone</p>
              <p className="text-white font-medium">{displayProfile.phone || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Website</p>
              <p className="text-white font-medium">{displayProfile.website ? <a href={displayProfile.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{displayProfile.website}</a> : "N/A"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">GST Number</p>
              <p className="text-white font-medium">{displayProfile.gstNumber || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Company Registration</p>
              <p className="text-white font-medium">{displayProfile.companyRegistrationNumber || "N/A"}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Business Address</p>
              <p className="text-white font-medium">{displayProfile.businessAddress || "N/A"}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">About Company</p>
              <p className="text-white font-medium">{displayProfile.companyDescription || "No description provided."}</p>
            </div>
          </div>
        </div>

        {/* Skills Required */}
        <div className={`${cardBase} p-6`}>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Briefcase size={20} className="text-cyan-400" />
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skillsArray.length > 0 ? (
              skillsArray.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-medium"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-slate-400 text-sm">No skills added yet.</p>
            )}
          </div>
        </div>

        {/* Settings */}
        <div className={`${cardBase} p-6`}>
          <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <Settings size={20} className="text-slate-400" />
            Settings
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button className="px-5 py-3 rounded-xl bg-slate-800 border border-white/[0.08] hover:bg-slate-700 transition text-white font-medium flex items-center justify-center gap-2">
              <Lock size={18} />
              Change Password
            </button>
            <label className="px-5 py-3 rounded-xl bg-slate-800 border border-white/[0.08] hover:bg-slate-700 transition text-white font-medium flex items-center justify-center gap-2 cursor-pointer">
              <Camera size={18} />
              Change Profile Picture
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <button className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:from-blue-500 hover:to-cyan-500 transition text-white font-medium flex items-center justify-center gap-2">
              <Download size={18} />
              Download Summary
            </button>
          </div>
        </div>

        {/* Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-950 border border-white/[0.08] rounded-3xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Edit Company Profile</h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-6">
                {[
                  { key: "info", label: "Company Info" },
                  { key: "skills", label: "Skills" },
                  { key: "settings", label: "Settings" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as typeof activeTab)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                      activeTab === tab.key
                        ? "bg-blue-600 text-white"
                        : "bg-slate-800 text-slate-400 hover:text-white border border-white/[0.08]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                {activeTab === "info" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 flex items-center gap-4">
                      <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-xl font-bold shadow-lg overflow-hidden">
                        {avatarPreview ? (
                          <img src={avatarPreview} alt="Avatar" className="h-full w-full object-cover" />
                        ) : (
                          form.companyName?.charAt(0)?.toUpperCase() || "C"
                        )}
                      </div>
                      <label className="px-4 py-2 rounded-xl bg-slate-800 border border-white/[0.08] hover:bg-slate-700 transition text-white text-sm cursor-pointer flex items-center gap-2">
                        <Camera size={16} />
                        Change Logo
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Contact Person Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none"
                        placeholder="Contact person name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none"
                        placeholder="contact@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Company Name</label>
                      <input
                        type="text"
                        value={form.companyName}
                        onChange={(e) => handleChange("companyName", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none"
                        placeholder="Acme Inc"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Provider Type</label>
                      <input
                        type="text"
                        value={form.providerType}
                        onChange={(e) => handleChange("providerType", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none"
                        placeholder="Agency / Freelancer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Industry</label>
                      <input
                        type="text"
                        value={form.industry}
                        onChange={(e) => handleChange("industry", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none"
                        placeholder="Information Technology"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Company Size</label>
                      <input
                        type="text"
                        value={form.companySize}
                        onChange={(e) => handleChange("companySize", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none"
                        placeholder="10-50 employees"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Website</label>
                      <input
                        type="url"
                        value={form.website}
                        onChange={(e) => handleChange("website", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none"
                        placeholder="https://example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Location</label>
                      <input
                        type="text"
                        value={form.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none"
                        placeholder="City, Country"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-slate-400 mb-1.5">Business Address</label>
                      <input
                        type="text"
                        value={form.businessAddress}
                        onChange={(e) => handleChange("businessAddress", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none"
                        placeholder="Full business address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">GST Number</label>
                      <input
                        type="text"
                        value={form.gstNumber}
                        onChange={(e) => handleChange("gstNumber", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none"
                        placeholder="22AAAAA0000A1Z5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Company Registration Number</label>
                      <input
                        type="text"
                        value={form.companyRegistrationNumber}
                        onChange={(e) => handleChange("companyRegistrationNumber", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none"
                        placeholder="U12345TN2020PTC123456"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-slate-400 mb-1.5">About Company</label>
                      <textarea
                        rows={3}
                        value={form.companyDescription}
                        onChange={(e) => handleChange("companyDescription", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
                        placeholder="Brief company overview..."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-slate-400 mb-1.5">Bio</label>
                      <textarea
                        rows={3}
                        value={form.bio}
                        onChange={(e) => handleChange("bio", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                )}

                {activeTab === "skills" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Add Skill</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                          className="flex-1 p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none"
                          placeholder="e.g. React, Node.js, AWS"
                        />
                        <button
                          onClick={handleAddSkill}
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-1"
                        >
                          <Plus size={18} />
                          Add
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillsArray.map((skill, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-medium"
                        >
                          {skill}
                          <button
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-1 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Change Password</label>
                      <input
                        type="password"
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Confirm Password</label>
                      <input
                        type="password"
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none"
                        placeholder="Confirm new password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Profile Picture</label>
                      <label className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800 border border-white/[0.08] hover:bg-slate-700 transition text-white text-sm cursor-pointer w-fit">
                        <Camera size={16} />
                        Choose Image
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                      {avatarPreview && (
                        <p className="text-xs text-slate-400 mt-1">New image selected</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.08]">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setActiveTab("info");
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 border border-white/[0.08] hover:bg-slate-700 text-white transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:from-blue-500 hover:to-cyan-500 text-white transition flex items-center gap-2 disabled:opacity-50"
                  >
                    {saving && <Loader2 size={18} className="animate-spin" />}
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DesktopLayout>
  );
}

export default function ProviderProfilePageWithToast() {
  return (
    <ToastProvider>
      <ProviderProfileContent />
    </ToastProvider>
  );
}
