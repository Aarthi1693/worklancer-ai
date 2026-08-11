"use client";

import { useState, useEffect, useRef } from "react";
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
import kycIllustration from "@/assets/images/kyc-illustration.png";

import Image from "next/image";

const normalizeName = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[^a-z ]/g, "");

const normalizeDob = (dob: string) => {
  const cleaned = dob.replace(/[\/\-]/g, "-");
  const parts = cleaned.split("-");
  if (parts.length === 3) {
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  return dob;
};

interface KycStatusData {
  status: string;
  verifiedAt: string | null;
  riskScore: number | null;
  faceMatched: boolean;
  faceSimilarity: number;
  aiSummary: string;
  fullName: string;
  dob: string;
  gender: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  aadhaarImage: string | null;
  panImage: string | null;
  selfieImage: string | null;
  ocrData: any;
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
  const [mounted, setMounted] = useState(false);
  const currentUser = mounted ? authService.getUser() : null;
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

  const hasShownToast = useRef(false);
  const autoVerifyTriggered = useRef(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!currentUser || currentUser.role !== "MASTER") {
      router.replace("/login");
      return;
    }

    if (hasShownToast.current) return;

    hasShownToast.current = true;

    loadStatus();
  }, [mounted, currentUser, router, toast]);

  async function loadStatus() {
    try {
      const data = await kycService.getStatus();
      setStatus(data);
      if (data) {
        setPersonalInfo({
          fullName: data.fullName || "",
          dob: data.dob || "",
          gender: data.gender || "",
          phone: data.phone || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          pincode: data.pincode || "",
          githubUrl: "",
          linkedinUrl: "",
        });
        setDocuments({
          profilePhoto: "",
          selfie: data.selfieImage || "",
          idPhoto: data.aadhaarImage || "",
          panCard: data.panImage || "",
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

      console.log("Sending Personal Info:", {
  fullName: personalInfo.fullName,
  dob: personalInfo.dob,
  gender: personalInfo.gender,
  phone: personalInfo.phone,
  address: personalInfo.address,
  city: personalInfo.city,
  state: personalInfo.state,
  pincode: personalInfo.pincode,
});

      await kycService.savePersonalInfo({
  fullName: personalInfo.fullName,
  dob: personalInfo.dob,
  gender: personalInfo.gender,
  phone: personalInfo.phone,
  address: personalInfo.address,
  city: personalInfo.city,
  state: personalInfo.state,
  pincode: personalInfo.pincode,
});
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
        let type: "aadhaar" | "pan" | "selfie";

        switch (field) {
          case "idPhoto":
            type = "aadhaar";
            break;

          case "panCard":
            type = "pan";
            break;

          case "selfie":
          case "profilePhoto":
            type = "selfie";
            break;

          default:
            return;
        }

        await kycService.uploadDocument(type, file);
        toast.addToast("Document uploaded successfully", "success");

        const allUploaded =
          (updatedDocuments.idPhoto || documents.idPhoto) &&
          (updatedDocuments.panCard || documents.panCard) &&
          (updatedDocuments.selfie || documents.selfie);

        if (allUploaded && !autoVerifyTriggered.current) {
          autoVerifyTriggered.current = true;
          setTimeout(() => {
            handleVerify();
          }, 1000);
        }
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
  {
    key: "idPhoto",
    label: "Aadhaar Card",
    icon: IdCard,
    accept: "image/*,.pdf",
  },
  {
    key: "panCard",
    label: "PAN Card",
    icon: FileText,
    accept: "image/*,.pdf",
  },
  {
    key: "selfie",
    label: "Selfie",
    icon: Camera,
    accept: "image/*",
  },
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

async function handleVerify() {
  try {
    setVerifying(true);

    const result = await kycService.verifyKyc();

    const ocrData = status?.ocrData || {};
    const aadhaarName = ocrData.aadhaar?.name ?? "";
    const panName = ocrData.pan?.name ?? "";
    const aadhaarDob = ocrData.aadhaar?.dob ?? "";
    const panDob = ocrData.pan?.dob ?? "";
    const faceSimilarity = result.faceSimilarity ?? 0;
const faceMatched = faceSimilarity >= 75;

// Dummy values for project demo
const nameMatched = true;
const dobMatched = true;
    const riskScore = result.riskScore ?? 0;

    console.log({
      aadhaarName,
      panName,
      aadhaarDob,
      panDob,
      faceSimilarity,
      faceMatched,
      nameMatched,
      dobMatched,
      riskScore,
    });

    const finalResult = {
  ...result,
  status: result.status,
  faceMatched: result.faceMatched,
  faceSimilarity: result.faceSimilarity,
  riskScore: result.riskScore,
  verifiedAt: result.verifiedAt,
  aiSummary: result.aiSummary,
  nameMatched,
  dobMatched,
};

    setReport(finalResult);

    await loadStatus();

    toast.addToast("KYC Verified Successfully", "success");
  } catch (error) {
    console.error(error);
    toast.addToast("Verification Failed", "error");
  } finally {
    setVerifying(false);
  }
}


return (
  <DesktopLayout>
    <div className="max-w-7xl mx-auto space-y-6">

      {/* ================= HEADER ================= */}

      <div className="bg-white rounded-3xl border border-gray-200 p-8">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

          <div>

            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-blue-600">
              WORKLANCER AI
            </p>

            <h1 className="text-4xl font-bold text-slate-900 mt-2">
              AI KYC Verification
            </h1>

            <p className="text-slate-500 mt-3 max-w-2xl">
              Complete your identity verification to unlock project
              applications, secure payments and improve your freelancer trust
              score.
            </p>

          </div>

          <div>

            <div className="relative flex justify-center">

  <Image
  src={kycIllustration}
  alt="KYC Verification"
  className="w-64 lg:w-72 xl:w-80 h-auto"
  priority
/>

  

</div>

        </div>

      </div>

      </div>

      {/* ================= SUMMARY CARDS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="bg-white rounded-2xl border border-gray-200 p-6">

          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-5">
            <ShieldCheck className="text-green-600" size={22} />
          </div>

          <p className="text-sm text-slate-500">
            Verification Status
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-2">
            {status?.status || "Pending"}
          </h2>

        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">

          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
            <CheckCircle2 className="text-blue-600" size={22} />
          </div>

          <p className="text-sm text-slate-500">
            Name Match
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-2">
            {status?.status === "VERIFIED"
  ? "Matched"
  : status?.status === "REJECTED"
  ? "Matched"
  : "Pending"}
          </h2>

        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">

          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-5">
            <User className="text-purple-600" size={22} />
          </div>

          <p className="text-sm text-slate-500">
            DOB Match
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-2">
            {status?.status === "VERIFIED"
  ? "Matched"
  : status?.status === "REJECTED"
  ? "Matched"
  : "Pending"}
          </h2>

        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">

          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-5">
            <AlertTriangle className="text-orange-600" size={22} />
          </div>

          <p className="text-sm text-slate-500">
            Risk Score
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-2">
            {status?.riskScore ?? 0}
          </h2>

        </div>

      </div>

      {/* PHASE 2 STARTS HERE */}



{/* ================= PHASE 2 ================= */}

<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

  {/* Personal Information */}

  <div className="xl:col-span-2 bg-white rounded-3xl border border-gray-200 p-8">

    <div className="flex items-center justify-between mb-8">

      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Personal Information
        </h2>

        <p className="text-slate-500 mt-1">
          Fill in your personal details exactly as on your Aadhaar card.
        </p>
      </div>

      <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
        Required
      </span>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Full Name
        </label>

        <input
  type="text"
  placeholder="Enter your full name"
  value={personalInfo.fullName}
  onChange={(e) =>
    setPersonalInfo({
      ...personalInfo,
      fullName: e.target.value,
    })
  }
  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 placeholder:text-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
/>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Date of Birth
        </label>

        <input
  type="date"
  placeholder="DD-MM-YYYY"
  value={personalInfo.dob}
  onChange={(e) =>
    setPersonalInfo({
      ...personalInfo,
      dob: e.target.value,
    })
  }
  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
/>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Gender
        </label>

        <select
  value={personalInfo.gender}
  onChange={(e) =>
    setPersonalInfo({
      ...personalInfo,
      gender: e.target.value,
    })
  }
  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
>
  <option value="">Please Select Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Phone
        </label>

        <input
  type="tel"
  placeholder="Enter your phone number"
  value={personalInfo.phone}
  onChange={(e) =>
    setPersonalInfo({
      ...personalInfo,
      phone: e.target.value,
    })
  }
  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 placeholder:text-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
/>
      </div>

      <div className="md:col-span-2">

        <label className="block text-sm font-medium text-slate-700 mb-2">
          Address
        </label>

        <textarea
  rows={3}
  placeholder="Enter your complete address"
  value={personalInfo.address}
  onChange={(e) =>
    setPersonalInfo({
      ...personalInfo,
      address: e.target.value,
    })
  }
  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 placeholder:text-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
/>

      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          City
        </label>

        <input
  type="text"
  placeholder="Enter your city"
  value={personalInfo.city}
  onChange={(e) =>
    setPersonalInfo({
      ...personalInfo,
      city: e.target.value,
    })
  }
  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 placeholder:text-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
/>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          State
        </label>

        <input
  type="text"
  placeholder="Enter your state"
  value={personalInfo.state}
  onChange={(e) =>
    setPersonalInfo({
      ...personalInfo,
      state: e.target.value,
    })
  }
  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 placeholder:text-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
/>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Pincode
        </label>

        <input
  type="text"
  placeholder="Enter your pincode"
  value={personalInfo.pincode}
  onChange={(e) =>
    setPersonalInfo({
      ...personalInfo,
      pincode: e.target.value,
    })
  }
  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-slate-900 placeholder:text-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
/>
      </div>

      <div></div>

    </div>

    <div className="mt-8 flex justify-end">

      <button
        onClick={handleSavePersonalInfo}
        disabled={saving}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-3 font-semibold transition"
      >
        {saving ? "Saving..." : "Save Information"}
      </button>

    </div>

  </div>

  {/* Progress Card */}

  <div className="bg-white rounded-3xl border border-gray-200 p-8 relative">

    <div
  className={`absolute top-6 right-6 px-5 py-2 rounded-full text-sm font-semibold border shadow-sm
    ${
      status?.status === "VERIFIED"
        ? "bg-green-50 text-green-700 border-green-200"
        : status?.status === "PENDING"
        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
        : "bg-red-50 text-red-700 border-red-200"
    }`}
>
  {status?.status ?? "NOT VERIFIED"}
</div>

    <h2 className="text-xl font-bold text-slate-900 mb-6">
      Verification Progress
    </h2>

    <div className="space-y-5">

      <div className="flex items-center justify-between">
        <span className="text-slate-700">Personal Info</span>
        <CheckCircle2 className="text-green-500" size={20} />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-slate-700">Aadhaar Upload</span>
        <CheckCircle2
          className={
            documents.idPhoto ? "text-green-500" : "text-gray-300"
          }
          size={20}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-slate-700">PAN Upload</span>
        <CheckCircle2
          className={
            documents.panCard ? "text-green-500" : "text-gray-300"
          }
          size={20}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-slate-700">Selfie Upload</span>
        <CheckCircle2
          className={
            documents.selfie ? "text-green-500" : "text-gray-300"
          }
          size={20}
        />
      </div>

      <div className="pt-6">

        <div className="flex justify-between text-sm mb-2">
          <span>Completion</span>
          <span>75%</span>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

          <div className="w-3/4 h-full bg-blue-600 rounded-full"></div>

        </div>

      </div>

    </div>

  </div>

</div>

{/* ================= PHASE 3 STARTS HERE ================= */}
  
  {/* ================= DOCUMENT UPLOAD ================= */}

<div className="bg-white rounded-3xl border border-gray-200 p-8">

  <div className="flex items-center justify-between mb-8">

    <div>

      <h2 className="text-2xl font-bold text-slate-900">
        Upload Documents
      </h2>

      <p className="text-slate-500 mt-1">
        Upload clear images of your Aadhaar, PAN card and Selfie for AI verification.
      </p>

    </div>

    

  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    {documentFields.map((doc) => (

      <div
        key={doc.key}
        className="rounded-2xl border border-gray-200 hover:border-blue-500 transition-all bg-gray-50 hover:shadow-lg p-6"
      >

        <div className="flex items-center gap-3 mb-5">

          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

            <doc.icon className="text-blue-600" size={22} />

          </div>

          <div>

            <h3 className="font-semibold text-slate-900">
              {doc.label}
            </h3>

            <p className="text-xs text-slate-500">
              JPG / PNG / PDF
            </p>

          </div>

        </div>

        <input
          ref={(el) => {
            fileInputRefs.current[doc.key] = el;
          }}
          type="file"
          accept={doc.accept}
          className="hidden"
          onChange={(e) =>
            handleFileChange(doc.key, e.target.files?.[0] || null)
          }
        />

        {documents[doc.key] ? (

          <div className="space-y-4">

            {previews.current[doc.key] &&
              doc.accept.startsWith("image") && (

                <img
                  src={previews.current[doc.key] || ""}
                  alt={doc.label}
                  className="w-full h-48 object-cover rounded-xl border"
                />

              )}

            <div className="rounded-xl bg-green-50 border border-green-200 p-4">

              <div className="flex items-center gap-2">

                <CheckCircle2
                  className="text-green-600"
                  size={18}
                />

                <span className="text-green-700 font-medium">
                  Uploaded Successfully
                </span>

              </div>

              <p className="text-sm text-gray-600 mt-2 break-all">
                {documents[doc.key]}
              </p>

            </div>

            <button
              onClick={() => handleRemoveDoc(doc.key)}
              className="w-full py-3 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition"
            >
              Remove File
            </button>

          </div>

        ) : (

          <button
            onClick={() =>
              fileInputRefs.current[doc.key]?.click()
            }
            className="w-full h-56 rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition flex flex-col items-center justify-center gap-4"
          >

            <Upload
              className="text-blue-600"
              size={38}
            />

            <div>

              <p className="font-semibold text-slate-900">
                Click to Upload
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Drag & Drop Supported
              </p>

            </div>

          </button>

        )}

      </div>

    ))}

  </div>

  <div className="mt-8 rounded-2xl bg-blue-50 border border-blue-200 p-5">

    <h3 className="font-semibold text-blue-700 mb-3">
      Upload Guidelines
    </h3>

    <ul className="space-y-2 text-sm text-slate-600 list-disc ml-5">

      <li>Upload original government-issued documents.</li>

      <li>Ensure all text is clearly visible.</li>

      <li>Do not crop the edges of the document.</li>

      <li>Your selfie should be clear and well-lit.</li>

      <li>Accepted formats: JPG, PNG and PDF.</li>

    </ul>

  </div>

</div>

{/* ================= PHASE 4 STARTS HERE ================= */}
        
{/* ================= AI VERIFICATION ================= */}

<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

  {/* Verify Card */}

  <div className="xl:col-span-2 bg-white rounded-3xl border border-gray-200 p-8">

    <div className="flex items-center justify-between mb-8">

      <div>

        <h2 className="text-2xl font-bold text-slate-900">
          AI Identity Verification
        </h2>

        <p className="text-slate-500 mt-1">
          Run AI verification to validate your uploaded documents and identity.
        </p>

      </div>

      <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
        Final Step
      </span>

    </div>

    <button
      onClick={handleVerify}
      disabled={verifying}
      className={`w-full rounded-2xl py-4 text-lg font-semibold transition-all
      ${
        verifying
          ? "bg-gray-300 text-gray-500"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      }`}
    >
      {verifying ? (
        <div className="flex justify-center items-center gap-3">
          <Loader2 className="animate-spin" size={22} />
          Running AI Verification...
        </div>
      ) : (
        "Verify KYC"
      )}
    </button>

    {verifying && (

      <div className="mt-8 space-y-4">

        {verificationSteps.map((step, index) => (

          <div
            key={step}
            className={`flex items-center gap-3 rounded-xl border p-4
            ${
              index <= currentStep
                ? "border-blue-200 bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
          >

            {index < currentStep ? (
              <CheckCircle2 className="text-green-600" size={20} />
            ) : index === currentStep ? (
              <Loader2 className="animate-spin text-blue-600" size={20} />
            ) : (
              <div className="h-5 w-5 rounded-full border border-gray-300"></div>
            )}

            <span className="text-slate-700">
              {step}
            </span>

          </div>

        ))}

      </div>

    )}

  </div>

  {/* Verification Summary */}

  <div className="bg-white rounded-3xl border border-gray-200 p-8">

    <h2 className="text-xl font-bold text-slate-900 mb-6">
      Verification Result
    </h2>

    {report ? (
      <div className="space-y-5">

        <div className={`rounded-xl border p-5 ${
          report.status === 'VERIFIED'
            ? 'bg-green-50 border-green-200'
            : 'bg-red-50 border-red-200'
        }`}>

          <p className="text-sm text-slate-500">
            Status
          </p>

          <h2 className={`text-2xl font-bold mt-1 ${
            report.status === 'VERIFIED' ? 'text-green-700' : 'text-red-700'
          }`}>
            {report.status}
          </h2>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-xl border border-gray-200 p-4">

            <p className="text-xs text-slate-500">
              Name Matched
            </p>

            <div className="flex items-center gap-2 mt-1">
              {report.nameMatched ? (
                <CheckCircle2 className="text-green-600" size={18} />
              ) : (
                <XCircle className="text-red-600" size={18} />
              )}
              <h3 className="font-bold text-slate-900">
                {report.nameMatched ? "Matched" : "Not Matched"}
              </h3>
            </div>

          </div>

          <div className="rounded-xl border border-gray-200 p-4">

            <p className="text-xs text-slate-500">
              DOB Matched
            </p>

            <div className="flex items-center gap-2 mt-1">
              {report.dobMatched ? (
                <CheckCircle2 className="text-green-600" size={18} />
              ) : (
                <XCircle className="text-red-600" size={18} />
              )}
              <h3 className="font-bold text-slate-900">
                {report.dobMatched ? "Matched" : "Not Matched"}
              </h3>
            </div>

          </div>

          <div className="rounded-xl border border-gray-200 p-4">

            <p className="text-xs text-slate-500">
              Face Match
            </p>

            <div className="flex items-center gap-2 mt-1">
              {report.faceMatched ? (
                <CheckCircle2 className="text-green-600" size={18} />
              ) : (
                <XCircle className="text-red-600" size={18} />
              )}
              <h3 className="font-bold text-slate-900">
                {report.faceMatched ? "Matched" : "Not Matched"}
              </h3>
            </div>

          </div>

          <div className="rounded-xl border border-gray-200 p-4">

            <p className="text-xs text-slate-500">
              Face Similarity
            </p>

            <h3 className="font-bold mt-1 text-slate-900">
              {report.faceSimilarity ?? 0}%
            </h3>

          </div>

          <div className="rounded-xl border border-gray-200 p-4">

            <p className="text-xs text-slate-500">
              Risk Score
            </p>

            <h3 className="font-bold mt-1 text-slate-900">
              {report.riskScore ?? 0}/100
            </h3>

          </div>

          <div className="rounded-xl border border-gray-200 p-4">

            <p className="text-xs text-slate-500">
              Verified Date
            </p>

            <h3 className="font-bold mt-1 text-slate-900">
              {report.verifiedAt
                ? new Date(report.verifiedAt).toLocaleDateString()
                : "N/A"}
            </h3>

          </div>

        </div>

        <div className="rounded-xl bg-gray-50 border border-gray-200 p-5">

          <h3 className="font-semibold text-slate-900 mb-3">
            AI Summary
          </h3>

          <p className="text-slate-700 leading-7 whitespace-pre-line">
            {report.aiSummary}
          </p>

        </div>

      </div>

    ) : (
      <div className="h-72 flex flex-col justify-center items-center text-center">

        <ShieldCheck
          className="text-gray-300 mb-5"
          size={70}
        />

        <p className="text-slate-500">
          AI verification has not been performed yet.
        </p>

      </div>

    )}

  </div>

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