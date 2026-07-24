"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import DesktopLayout from "@/components/layout/desktop-layout";
import {
  ShieldCheck,
  Upload,
  User,
  Calendar,
  Briefcase,
  MapPin,
  FileText,
  Camera,
  IdCard,
  FileCheck,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Trash2,
} from "lucide-react";
import kycService from "@/services/kyc.service";
import authService from "@/services/auth.service";
import { ToastProvider, useToast } from "@/components/ui/toast";

interface KycStatusData {
  status: string;
  verifiedAt: string | null;
  score: number | null;
  report: any;
  documents: {
    idPhoto: string | null;
    panCard: string | null;
    selfie: string | null;
    profilePhoto: string | null;
  };
  personalInfo: {
    fullName: string;
    email: string;
    dob: string;
    gender: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
    githubUrl?: string;
    linkedinUrl?: string;
  };
}

const verificationSteps = [
  "Uploading documents...",
  "Reading identity document...",
  "Running OCR analysis...",
  "Comparing entered details...",
  "Checking image quality...",
  "Running AI identity verification...",
  "Performing fraud risk analysis...",
  "Generating verification report...",
  "Verification completed.",
];

function KycContent() {
  const toast = useToast();
  const router = useRouter();
  const [status, setStatus] = useState<KycStatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [report, setReport] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    githubUrl: "",
    linkedinUrl: "",
  });

  const [documents, setDocuments] = useState({
    profilePhoto: "",
    selfie: "",
    idPhoto: "",
    panCard: "",
  });

  const previews = useRef<{ [key: string]: string | null }>({});
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  useEffect(() => {
    const currentUser = authService.getUser();

    if (!currentUser) {
      router.replace("/login");
      return;
    }

    if (currentUser.role !== "MASTER") {
      toast.addToast("Master KYC is only available for master accounts", "error");
      router.replace("/provider");
      return;
    }

    loadStatus();
  }, [router, toast]);

  async function loadStatus() {
    try {
      const data = await kycService.getStatus();
      setStatus(data);
      if (data.personalInfo) {
        setPersonalInfo({
          fullName: data.personalInfo.fullName || "",
          dob: data.personalInfo.dob || "",
          gender: data.personalInfo.gender || "",
          address: data.personalInfo.address || "",
          city: data.personalInfo.city || "",
          state: data.personalInfo.state || "",
          pincode: data.personalInfo.pincode || "",
          phone: data.personalInfo.phone || "",
          githubUrl: data.personalInfo.githubUrl || "",
          linkedinUrl: data.personalInfo.linkedinUrl || "",
        });
      }
      if (data.documents) {
        setDocuments({
          profilePhoto: data.documents.profilePhoto || "",
          selfie: data.documents.selfie || "",
          idPhoto: data.documents.idPhoto || "",
          panCard: data.documents.panCard || "",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSavePersonalInfo() {
    const requiredFields = [
      personalInfo.fullName,
      personalInfo.dob,
      personalInfo.gender,
      personalInfo.address,
      personalInfo.city,
      personalInfo.state,
      personalInfo.pincode,
      personalInfo.phone,
    ];

    if (requiredFields.some((value) => !value.trim())) {
      toast.addToast("Please complete all required personal information fields", "error");
      return;
    }

    if (!validateUrl(personalInfo.githubUrl) || !validateUrl(personalInfo.linkedinUrl)) {
      toast.addToast("Please fix invalid social profile URLs", "error");
      return;
    }

    setSaving(true);
    setSavedMessage(false);
    try {
      await kycService.updatePersonalInfo(personalInfo);
      setSavedMessage(true);
      setTimeout(() => setSavedMessage(false), 3000);
      toast.addToast("Personal information saved", "success");
    } catch (error) {
      console.error(error);
      toast.addToast("Failed to save personal information", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleFileChange(field: string, file: File | null) {
    if (file) {
      const url = URL.createObjectURL(file);
      previews.current[field] = url;
      const updatedDocuments = { ...documents, [field]: file.name };
      setDocuments(updatedDocuments);
      try {
        const formData = new FormData();
        formData.append(field, file);

        await kycService.uploadDocuments(formData);
        toast.addToast("Document uploaded successfully", "success");
      } catch (error) {
        console.error("Failed to upload document:", error);
        toast.addToast("Failed to upload document", "error");
      }
    }
  }

  function handleRemoveDoc(field: string) {
    if (previews.current[field]) {
      URL.revokeObjectURL(previews.current[field]);
      previews.current[field] = null;
    }
    setDocuments((prev) => ({ ...prev, [field]: "" }));
  }

  const validateUrl = (url: string): boolean => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleVerify = useCallback(async () => {
    setVerifying(true);
    setCurrentStep(0);
    setReport(null);

    for (let i = 0; i < verificationSteps.length; i++) {
      setCurrentStep(i);
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }

    try {
      const result = await kycService.verify();
      setReport(result.report);
      toast.addToast("Verification completed", "success");
    } catch (error) {
      console.error(error);
      toast.addToast("Verification failed", "error");
    } finally {
      setVerifying(false);
      loadStatus();
    }
  }, []);

  function getStatusColor(status: string) {
    switch (status) {
      case "VERIFIED":
        return "text-green-400 border-green-500/30 bg-green-500/10";
      case "REJECTED":
        return "text-red-400 border-red-500/30 bg-red-500/10";
      case "PENDING":
        return "text-yellow-400 border-yellow-500/30 bg-yellow-500/10";
      default:
        return "text-slate-400 border-white/[0.08] bg-white/[0.03]";
    }
  }

  function getScoreColor(score: number | null) {
    if (score === null) return "text-slate-400";
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  }

  const documentFields = [
    { key: "profilePhoto", label: "Profile Photo", icon: Camera, accept: "image/*" },
    { key: "selfie", label: "Selfie", icon: Camera, accept: "image/*" },
    { key: "idPhoto", label: "Government ID (Aadhaar)", icon: IdCard, accept: "image/*,.pdf" },
    { key: "panCard", label: "PAN Card", icon: FileText, accept: "image/*,.pdf" },
  ] as const;

  if (loading) {
    return (
      <DesktopLayout>
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20 text-slate-400">Loading...</div>
        </div>
      </DesktopLayout>
    );
  }

  return (
    <DesktopLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-5xl font-bold text-white flex items-center gap-3">
            <ShieldCheck className="text-green-400" size={48} />
            AI KYC Verification
          </h1>
          <p className="text-slate-400 mt-3 text-lg">
            Complete identity verification to unlock project applications.
          </p>
        </div>

        {/* SECTION 1: KYC STATUS */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
          <h2 className="text-2xl font-bold mb-6 text-white">KYC Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`rounded-2xl border p-5 ${getStatusColor(status?.status || "NOT_STARTED")}`}>
              <p className="text-sm uppercase tracking-wide opacity-80">Status</p>
              <h3 className="text-2xl font-bold mt-2">
                {status?.status === "VERIFIED" ? "🟢 VERIFIED" : status?.status?.replace("_", " ") || "NOT STARTED"}
              </h3>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
              <p className="text-sm uppercase tracking-wide text-slate-500">Verification Score</p>
              <h3 className={`text-3xl font-bold mt-2 ${getScoreColor(status?.score || null)}`}>
                {status?.score ? `${status.score}/100` : "N/A"}
              </h3>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
              <p className="text-sm uppercase tracking-wide text-slate-500">Verification Date</p>
              <h3 className="text-xl font-bold mt-2 text-white">
                {status?.verifiedAt ? new Date(status.verifiedAt).toLocaleDateString() : "Not Verified"}
              </h3>
            </div>
          </div>
        </div>

        {/* SECTION 2: PERSONAL INFORMATION */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Personal Information</h2>
            {savedMessage && (
              <span className="text-sm text-green-400 flex items-center gap-2">
                <CheckCircle2 size={16} /> Saved
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                <User size={16} className="text-blue-400" /> Full Name
              </label>
              <input
                type="text"
                value={personalInfo.fullName}
                onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/[0.08] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                <Calendar size={16} className="text-purple-400" /> Date of Birth
              </label>
              <input
                type="date"
                value={personalInfo.dob}
                onChange={(e) => setPersonalInfo({ ...personalInfo, dob: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/[0.08] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                <Briefcase size={16} className="text-green-400" /> Gender
              </label>
              <select
                value={personalInfo.gender}
                onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/[0.08] text-white focus:outline-none focus:border-blue-500/50"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                <MapPin size={16} className="text-cyan-400" /> Address
              </label>
              <input
                type="text"
                value={personalInfo.address}
                onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/[0.08] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                placeholder="Enter your address"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                <MapPin size={16} className="text-cyan-400" /> City
              </label>
              <input
                type="text"
                value={personalInfo.city}
                onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/[0.08] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                placeholder="Enter your city"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                <MapPin size={16} className="text-cyan-400" /> State
              </label>
              <input
                type="text"
                value={personalInfo.state}
                onChange={(e) => setPersonalInfo({ ...personalInfo, state: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/[0.08] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                placeholder="Enter your state"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                <FileText size={16} className="text-cyan-400" /> Pincode
              </label>
              <input
                type="text"
                value={personalInfo.pincode}
                onChange={(e) => setPersonalInfo({ ...personalInfo, pincode: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/[0.08] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                placeholder="Enter your pincode"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                <User size={16} className="text-cyan-400" /> Phone Number
              </label>
              <input
                type="tel"
                value={personalInfo.phone}
                onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/[0.08] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                <FileText size={16} className="text-slate-400" /> GitHub Profile URL
              </label>
              <input
                type="url"
                value={personalInfo.githubUrl}
                onChange={(e) => setPersonalInfo({ ...personalInfo, githubUrl: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 ${personalInfo.githubUrl && !validateUrl(personalInfo.githubUrl) ? "border-red-500" : "border-white/[0.08]"}`}
                placeholder="https://github.com/username"
              />
              {personalInfo.githubUrl && !validateUrl(personalInfo.githubUrl) && (
                <p className="text-xs text-red-400 mt-1">Invalid GitHub URL</p>
              )}
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                <FileText size={16} className="text-blue-400" /> LinkedIn Profile URL
              </label>
              <input
                type="url"
                value={personalInfo.linkedinUrl}
                onChange={(e) => setPersonalInfo({ ...personalInfo, linkedinUrl: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 ${personalInfo.linkedinUrl && !validateUrl(personalInfo.linkedinUrl) ? "border-red-500" : "border-white/[0.08]"}`}
                placeholder="https://linkedin.com/in/username"
              />
              {personalInfo.linkedinUrl && !validateUrl(personalInfo.linkedinUrl) && (
                <p className="text-xs text-red-400 mt-1">Invalid LinkedIn URL</p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={handleSavePersonalInfo}
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:from-blue-500 hover:to-indigo-500 text-white font-semibold transition-all disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Personal Information"}
            </button>
          </div>
        </div>

        {/* SECTION 3: DOCUMENT UPLOAD */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
          <h2 className="text-2xl font-bold mb-6 text-white">Document Upload</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documentFields.map((doc) => (
              <div key={doc.key}>
                <label className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                  <doc.icon size={16} className="text-cyan-400" /> {doc.label}
                </label>
                <input
                  ref={(el) => { fileInputRefs.current[doc.key] = el; }}
                  type="file"
                  accept={doc.accept}
                  className="hidden"
                  onChange={(e) => handleFileChange(doc.key, e.target.files?.[0] || null)}
                />
                {documents[doc.key] ? (
                  <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
                    <div className="flex items-center gap-3">
                      <FileCheck size={20} className="text-green-400" />
                      <div className="flex-1">
                        <p className="text-sm text-green-400 font-medium">
                          {documents[doc.key]}
                        </p>
                        {previews.current[doc.key] && doc.accept.startsWith("image") && (
                          <img
                            src={previews.current[doc.key] || ""}
                            alt={doc.label}
                            className="mt-2 h-24 w-24 object-cover rounded-lg border border-white/10"
                          />
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveDoc(doc.key)}
                        className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRefs.current[doc.key]?.click()}
                    className="w-full px-4 py-6 rounded-xl border border-dashed border-white/10 bg-slate-900 text-slate-400 hover:border-blue-500/30 hover:text-blue-400 transition"
                  >
                    <Upload size={20} className="mx-auto mb-2" />
                    <span className="text-sm">Click to upload {doc.label.toLowerCase()}</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: AI VERIFICATION */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6">
          <h2 className="text-2xl font-bold mb-6 text-white">AI Verification</h2>
          <button
            onClick={handleVerify}
            disabled={verifying}
            className={`
              px-6 py-4 rounded-xl font-semibold text-lg transition-all flex items-center gap-3
              ${
                verifying
                  ? "bg-slate-700 border border-white/[0.08] text-slate-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:from-green-500 hover:to-emerald-500 text-white"
              }
            `}
          >
            {verifying ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <ShieldCheck size={20} />
                🛡️ Start AI Identity Verification
              </>
            )}
          </button>

          {verifying && (
            <div className="mt-8 space-y-3">
              {verificationSteps.map((step, index) => (
                <div
                  key={step}
                  className={`
                    flex items-center gap-3 p-4 rounded-xl border transition-all
                    ${index <= currentStep ? "border-green-500/30 bg-green-500/5" : "border-white/[0.08] bg-white/[0.02]"}
                  `}
                >
                  {index < currentStep ? (
                    <CheckCircle2 size={20} className="text-green-400" />
                  ) : index === currentStep ? (
                    <Loader2 size={20} className="text-green-400 animate-spin" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-white/20" />
                  )}
                  <span className={index <= currentStep ? "text-white" : "text-slate-500"}>{step}</span>
                </div>
              ))}
            </div>
          )}

          {report && (
            <div className="mt-8">
              {report.status === "VERIFIED" ? (
                <div className="rounded-3xl border border-green-500/30 bg-green-500/5 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle2 size={32} className="text-green-400" />
                    <h3 className="text-2xl font-bold text-green-400">🟢 VERIFIED</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries({
                      "Identity Match": report.identityMatch,
                      "OCR Confidence": report.ocrConfidence,
                      "Document Quality": report.documentQuality,
                      "Face Match": report.faceMatch,
                      "Fraud Risk": report.fraudRisk,
                      "Verification Score": report.verificationScore,
                    }).map(([k, v]) => (
                      <div key={k} className="rounded-xl bg-slate-900/50 border border-white/[0.08] p-4">
                        <p className="text-xs text-slate-500">{k}</p>
                        <p className="text-lg font-bold text-white">{v ?? "N/A"}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-3xl border border-red-500/30 bg-red-500/5 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <XCircle size={32} className="text-red-400" />
                    <h3 className="text-2xl font-bold text-red-400">REJECTED</h3>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle size={20} className="text-yellow-400" />
                    <span className="text-yellow-400 font-medium">{report.recommendation}</span>
                  </div>
                  <div className="space-y-2">
                    {report.reasons?.map((reason: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-red-300 bg-red-500/5 px-4 py-2 rounded-lg">
                        <XCircle size={16} />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DesktopLayout>
  );
}

export default function KycPageWithToast() {
  return (
    <ToastProvider>
      <KycContent />
    </ToastProvider>
  );
}
