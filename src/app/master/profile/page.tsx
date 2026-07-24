"use client";

import DesktopLayout from "@/components/layout/desktop-layout";
import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Camera,
  X,
  Loader2,
  Plus,
  Trash2,
  Lock,
  Upload,
  Settings,
  Star,
  TrendingUp,
  Briefcase,
  Clock,
  DollarSign,
  Award,
  FileText,
} from "lucide-react";
import authService from "@/services/auth.service";
import profileService from "@/services/profile.service";
import { ToastProvider, useToast } from "@/components/ui/toast";
import type { ProfileData, MasterStats } from "@/types/profile";

function MasterProfileContent() {
  const toast = useToast();
  const [user, setUser] = useState<{ id: string; name: string; email: string; role: string } | null>(() =>
    authService.getUser()
  );
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"personal" | "skills" | "career" | "settings">("personal");
  const [stats, setStats] = useState<MasterStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    skills: "",
    experience: "",
    portfolioLink: "",
    linkedinUrl: "",
    githubUrl: "",
    availability: "",
    hourlyRate: "",
    preferredRole: "",
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [newSkill, setNewSkill] = useState("");

  const displayProfile = profile ?? {
    id: user?.id ?? "",
    name: user?.name,
    email: user?.email,
    phone: "",
    bio: "",
    location: "",
    skills: [],
    experience: "",
    portfolioLink: "",
    linkedinUrl: "",
    githubUrl: "",
    availability: "",
    hourlyRate: undefined,
    preferredRole: "",
    resume: "",
    role: (user?.role as ProfileData["role"]) ?? "MASTER",
    avatar: "",
    createdAt: "",
  };

  const skillsArray = (displayProfile.skills ?? []).filter(Boolean);

  useEffect(() => {
    async function loadProfile() {
      try {
        const [data, statsData] = await Promise.all([
          profileService.getProfile(),
          profileService.getMasterStats().catch(() => null),
        ]);
        setProfile(data);
        setStats(statsData);
        setForm({
          name: data.name ?? "",
          email: data.email ?? "",
          phone: data.phone ?? "",
          bio: data.bio ?? "",
          location: data.location ?? "",
          skills: data.skills?.join(", ") ?? "",
          experience: data.experience?.toString() ?? "",
          portfolioLink: data.portfolioLink ?? "",
          linkedinUrl: data.linkedinUrl ?? "",
          githubUrl: data.githubUrl ?? "",
          availability: data.availability ?? "",
          hourlyRate: data.hourlyRate?.toString() ?? "",
          preferredRole: data.preferredRole ?? "",
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

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
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
      toast.addToast("Name is required", "error");
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
    if (form.portfolioLink && !validateUrl(form.portfolioLink)) {
      toast.addToast("Invalid portfolio URL", "error");
      return false;
    }
    if (form.linkedinUrl && !validateUrl(form.linkedinUrl)) {
      toast.addToast("Invalid LinkedIn URL", "error");
      return false;
    }
    if (form.githubUrl && !validateUrl(form.githubUrl)) {
      toast.addToast("Invalid GitHub URL", "error");
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
      if (form.bio) updateData.bio = form.bio;
      if (form.location) updateData.location = form.location;
      if (form.skills) updateData.skills = form.skills;
      if (form.experience) updateData.experience = Number(form.experience);
      if (form.portfolioLink) updateData.portfolioLink = form.portfolioLink;
      if (form.linkedinUrl) updateData.linkedinUrl = form.linkedinUrl;
      if (form.githubUrl) updateData.githubUrl = form.githubUrl;
      if (form.availability) updateData.availability = form.availability;
      if (form.hourlyRate) updateData.hourlyRate = Number(form.hourlyRate);
      if (form.preferredRole) updateData.preferredRole = form.preferredRole;

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

      if (resumeFile) {
        await profileService.uploadResume(resumeFile);
        setResumeFile(null);
      }

      setUser(authService.getUser());
      setIsEditing(false);
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
    "rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(168,85,247,0.08)]";

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

  return (
    <DesktopLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Master Profile</h1>
            <p className="text-slate-400 mt-1">Your freelancer portfolio and professional details</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:from-purple-500 hover:to-pink-500 transition text-white font-semibold flex items-center gap-2"
          >
            <Settings size={18} />
            Edit Profile
          </button>
        </div>

        {/* Hero Section */}
        <div className={`${cardBase} overflow-hidden`}>
          <div className="h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 relative">
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <div className="px-6 pb-6 -mt-16 relative">
            <div className="flex flex-col md:flex-row items-end gap-5">
              <div className="relative flex-shrink-0">
                <div className="h-32 w-32 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg overflow-hidden border-4 border-slate-900">
                  {avatarPreview || displayProfile.avatar ? (
                    <img src={avatarPreview || displayProfile.avatar} alt="Avatar" className="h-full w-full object-cover" />
                  ) : (
                    displayProfile.name?.charAt(0)?.toUpperCase() || "U"
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-green-500 flex items-center justify-center border-2 border-slate-900 shadow-lg">
                  <ShieldCheck size={14} className="text-white" />
                </div>
              </div>

              <div className="flex-1 min-w-0 pb-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-2xl font-bold text-white">
                    {displayProfile.name || "Your Name"}
                  </h2>
                  <span className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-semibold flex items-center gap-1">
                    <CheckCircle2 size={12} /> AI Verified
                  </span>
                </div>
                <p className="text-slate-400 mt-1">
                  {displayProfile.availability || "Available for work"} • {displayProfile.experience ? `${displayProfile.experience} years experience` : "Experience N/A"}
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400" />
                    {displayProfile.role === "MASTER" ? "Task Master" : displayProfile.role}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} className="text-red-400" />
                    {displayProfile.location || "Location N/A"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail size={14} className="text-blue-400" />
                    {displayProfile.email || "email@example.com"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone size={14} className="text-green-400" />
                    {displayProfile.phone || "Phone N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Completed Projects", value: statsLoading ? "..." : stats?.completedProjects ?? 0, color: "text-green-400", icon: Briefcase },
            { label: "Success Rate", value: statsLoading ? "..." : `${stats?.successRate ?? 0}%`, color: "text-blue-400", icon: TrendingUp },
            { label: "Total Earnings", value: statsLoading ? "..." : formatCurrency(stats?.totalEarnings ?? 0), color: "text-purple-400", icon: DollarSign },
            { label: "Active Projects", value: statsLoading ? "..." : stats?.activeProjects ?? 0, color: "text-orange-400", icon: Clock },
            { label: "AI Career Score", value: statsLoading ? "..." : (stats?.aiCareerScore ? `${stats.aiCareerScore}/100` : "N/A"), color: "text-pink-400", icon: Award },
          ].map((stat) => (
            <div key={stat.label} className={`${cardBase} p-5`}>
              <div className="flex items-center gap-2 mb-2">
                <stat.icon size={16} className={stat.color} />
                <p className="text-xs uppercase tracking-wide text-slate-500">{stat.label}</p>
              </div>
              <h3 className={`text-2xl font-bold ${stat.color}`}>{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Career Summary */}
        <div className={`${cardBase} p-6`}>
          <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <Award size={20} className="text-purple-400" />
            Career Summary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Experience</p>
              <p className="text-white font-medium">{displayProfile.experience ? `${displayProfile.experience} years` : "N/A"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Preferred Role</p>
              <p className="text-white font-medium">{displayProfile.preferredRole || displayProfile.role === "MASTER" ? "Task Master" : displayProfile.role || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Availability</p>
              <p className="text-white font-medium">{displayProfile.availability || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Hourly Rate</p>
              <p className="text-white font-medium">{displayProfile.hourlyRate ? `$${displayProfile.hourlyRate}/hr` : "N/A"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">AI Career Rating</p>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-lg">{profile?.kycScore ? `${profile.kycScore}/100` : "N/A"}</span>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Overall Rating</p>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-lg">{profile?.rating ?? "N/A"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className={`${cardBase} p-6`}>
          <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <FileText size={20} className="text-pink-400" />
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Full Name</p>
              <p className="text-white font-medium">{displayProfile.name || "N/A"}</p>
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
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Location</p>
              <p className="text-white font-medium">{displayProfile.location || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Portfolio</p>
              <p className="text-white font-medium truncate">
                {displayProfile.portfolioLink ? (
                  <a href={displayProfile.portfolioLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    {displayProfile.portfolioLink}
                  </a>
                ) : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">LinkedIn</p>
              <p className="text-white font-medium truncate">
                {displayProfile.linkedinUrl ? (
                  <a href={displayProfile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    {displayProfile.linkedinUrl}
                  </a>
                ) : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">GitHub</p>
              <p className="text-white font-medium truncate">
                {displayProfile.githubUrl ? (
                  <a href={displayProfile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    {displayProfile.githubUrl}
                  </a>
                ) : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Resume</p>
              <p className="text-white font-medium">
                {displayProfile.resume ? (
                  <a href={displayProfile.resume} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    View Resume
                  </a>
                ) : "N/A"}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Bio</p>
              <p className="text-white font-medium">{displayProfile.bio || "No bio provided."}</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className={`${cardBase} p-6`}>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Star size={20} className="text-yellow-400" />
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skillsArray.length > 0 ? (
              skillsArray.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-200 text-sm font-medium"
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
              <Upload size={18} />
              Upload Resume
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleResumeChange}
              />
            </label>
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
          </div>
        </div>

        {/* Edit Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-950 border border-white/[0.08] rounded-3xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-6 overflow-x-auto">
                {[
                  { key: "personal", label: "Personal Info" },
                  { key: "skills", label: "Skills" },
                  { key: "career", label: "Career" },
                  { key: "settings", label: "Settings" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as typeof activeTab)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap ${
                      activeTab === tab.key
                        ? "bg-purple-600 text-white"
                        : "bg-slate-800 text-slate-400 hover:text-white border border-white/[0.08]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                {activeTab === "personal" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 flex items-center gap-4">
                      <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-xl font-bold shadow-lg overflow-hidden">
                        {avatarPreview ? (
                          <img src={avatarPreview} alt="Avatar" className="h-full w-full object-cover" />
                        ) : (
                          form.name?.charAt(0)?.toUpperCase() || "U"
                        )}
                      </div>
                      <label className="px-4 py-2 rounded-xl bg-slate-800 border border-white/[0.08] hover:bg-slate-700 transition text-white text-sm cursor-pointer flex items-center gap-2">
                        <Camera size={16} />
                        Change Photo
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Location</label>
                      <input
                        type="text"
                        value={form.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none"
                        placeholder="City, Country"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Portfolio Link</label>
                      <input
                        type="url"
                        value={form.portfolioLink}
                        onChange={(e) => handleChange("portfolioLink", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none"
                        placeholder="https://portfolio.example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">LinkedIn URL</label>
                      <input
                        type="url"
                        value={form.linkedinUrl}
                        onChange={(e) => handleChange("linkedinUrl", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">GitHub URL</label>
                      <input
                        type="url"
                        value={form.githubUrl}
                        onChange={(e) => handleChange("githubUrl", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none"
                        placeholder="https://github.com/username"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-slate-400 mb-1.5">Bio</label>
                      <textarea
                        rows={3}
                        value={form.bio}
                        onChange={(e) => handleChange("bio", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none resize-none"
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
                          className="flex-1 p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none"
                          placeholder="e.g. React, Python, UI/UX"
                        />
                        <button
                          onClick={handleAddSkill}
                          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium flex items-center gap-1"
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
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-200 text-sm font-medium"
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

                {activeTab === "career" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Experience (years)</label>
                      <input
                        type="number"
                        value={form.experience}
                        onChange={(e) => handleChange("experience", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none"
                        placeholder="5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Preferred Role</label>
                      <input
                        type="text"
                        value={form.preferredRole}
                        onChange={(e) => handleChange("preferredRole", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none"
                        placeholder="e.g. Full Stack Developer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Availability</label>
                      <input
                        type="text"
                        value={form.availability}
                        onChange={(e) => handleChange("availability", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none"
                        placeholder="Open to opportunities"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Hourly Rate ($)</label>
                      <input
                        type="number"
                        value={form.hourlyRate}
                        onChange={(e) => handleChange("hourlyRate", e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none"
                        placeholder="50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Resume</label>
                      <label className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800 border border-white/[0.08] hover:bg-slate-700 transition text-white text-sm cursor-pointer w-fit">
                        <Upload size={16} />
                        {resumeFile ? resumeFile.name : "Choose File"}
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={handleResumeChange}
                        />
                      </label>
                    </div>
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Change Password</label>
                      <input
                        type="password"
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-1.5">Confirm Password</label>
                      <input
                        type="password"
                        className="w-full p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-white focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 outline-none"
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
                      setActiveTab("personal");
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 border border-white/[0.08] hover:bg-slate-700 text-white transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:from-purple-500 hover:to-pink-500 text-white transition flex items-center gap-2 disabled:opacity-50"
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

export default function MasterProfilePageWithToast() {
  return (
    <ToastProvider>
      <MasterProfileContent />
    </ToastProvider>
  );
}
