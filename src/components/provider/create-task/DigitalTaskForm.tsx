"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormSection from "./FormSection";
import projectService from "@/services/project.service";
import {
  Globe,
  Smartphone,
  Palette,
  BrainCircuit,
  Database,
  PenTool,
  Video,
  Megaphone,
  Settings,
} from "lucide-react";

const projectCategories = [
  { id: "web", name: "Web Development", icon: Globe },
  { id: "mobile", name: "Mobile App", icon: Smartphone },
  { id: "uiux", name: "UI / UX Design", icon: Palette },
  { id: "ai", name: "AI / ML", icon: BrainCircuit },
  { id: "annotation", name: "Data Annotation", icon: Database },
  { id: "content", name: "Content Writing", icon: PenTool },
  { id: "video", name: "Video Editing", icon: Video },
  { id: "marketing", name: "Digital Marketing", icon: Megaphone },
  { id: "other", name: "Other", icon: Settings },
];

const priorities = ["Low", "Medium", "High", "Urgent"];

export default function DigitalTaskForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "Medium",
    summary: "",
    description: "",
    budget: "",

    skills: "",
    experience: "Intermediate",
    workMode: "Remote",
    hiringType: "Individual",
    professionals: 1,
  });

  const updateField = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const createDigitalTask = async (status?: string) => {
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.budget.trim() ||
      !formData.skills.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      await projectService.createProject({
        title: formData.title,
        description: [formData.summary, formData.description]
          .filter(Boolean)
          .join("\n\n"),
        budget: Number(formData.budget),
        requiredSkills: formData.skills,
        taskType: "DIGITAL",
        ...(status ? { status } : {}),
      });

      alert(
        status === "Draft"
          ? "📝 Digital Task Saved as Draft!"
          : "🎉 Digital Task Created Successfully!"
      );

      router.push("/provider/my-projects");
    } catch (error) {
      console.error(error);
      alert(
        status === "Draft"
          ? "Failed to save draft."
          : "Failed to create digital task."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* ========================= */}
      {/* PROJECT OVERVIEW */}
      {/* ========================= */}

      <FormSection
        title="📋 Project Overview"
        description="Provide a clear overview so professionals understand your project."
      >
        <div className="space-y-7">

          <div>
<label className="block mb-2 text-sm font-semibold text-slate-700">              Project Title *
            </label>

            <input
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Example: AI Recruitment Platform"
              className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
text-slate-900
placeholder:text-slate-400
"
            />
          </div>

          <div>

            <label className="block mb-3 text-sm font-semibold">
              Project Category *
            </label>

            <div className="grid grid-cols-4 gap-4">

              {projectCategories.map((category) => {

                const Icon = category.icon;

                const selected =
                  formData.category === category.id;

                return (

                  <button
                    key={category.id}
                    type="button"
                    onClick={() =>
                      updateField(
                        "category",
                        category.id
                      )
                    }
                    className={`rounded-xl border px-3 py-3 transition${
                      selected
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:border-blue-300"
                    }`}
                  >

                    <div className="flex items-center justify-center gap-2">
  <Icon
    className={`h-5 w-5 ${
      selected ? "text-blue-600" : "text-slate-500"
    }`}
  />

  <p
    className={`text-sm font-medium ${
      selected ? "text-blue-700" : "text-slate-700"
    }`}
  >
    {category.name}
  </p>
</div>
                    

                  </button>

                );
              })}

            </div>

          </div>

          <div>

            <label className="block mb-3 text-sm font-semibold text-slate-700">
              Priority
            </label>

            <div className="flex gap-3 flex-wrap">

              {priorities.map((priority) => (

                <button
                  key={priority}
                  type="button"
                  onClick={() =>
                    updateField(
                      "priority",
                      priority
                    )
                  }
                  className={`rounded-full px-5 py-2 text-sm font-medium transition ${
  formData.priority === priority
    ? "bg-blue-600 text-white"
    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
}`}
                >
                  {priority}
                </button>

              ))}

            </div>

          </div>

          <div>

            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Short Summary
            </label>

            <input
              value={formData.summary}
              onChange={(e) =>
                updateField(
                  "summary",
                  e.target.value
                )
              }
              placeholder="Summarize your project..."
className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
text-slate-900
placeholder:text-slate-400
"            />

          </div>

          <div>

           <label className="block mb-2 text-sm font-semibold text-slate-700">
              Detailed Description
            </label>

            <textarea
              rows={7}
              value={formData.description}
              onChange={(e) =>
                updateField(
                  "description",
                  e.target.value
                )
              }
              placeholder="Describe the project..."
className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
text-slate-900
placeholder:text-slate-400
"            />

          </div>

        </div>

      </FormSection>

      {/* ========================= */}
      {/* TEAM REQUIREMENTS */}
      {/* ========================= */}

      <FormSection
        title="👥 Team Requirements"
        description="Describe the professionals required."
      >

        <div className="space-y-6">

          <div>

            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Required Skills
            </label>

            <input
              value={formData.skills}
              onChange={(e) =>
                updateField(
                  "skills",
                  e.target.value
                )
              }
              placeholder="React, Next.js, Tailwind..."
className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
text-slate-900
placeholder:text-slate-400
"            />

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Experience
              </label>

              <select
                value={formData.experience}
                onChange={(e) =>
                  updateField(
                    "experience",
                    e.target.value
                  )
                }
className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
text-slate-900
placeholder:text-slate-400
"              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Expert</option>
              </select>

            </div>

            <div>

<label className="block mb-2 text-sm font-semibold text-slate-700">                Work Mode
              </label>

              <select
                value={formData.workMode}
                onChange={(e) =>
                  updateField(
                    "workMode",
                    e.target.value
                  )
                }
className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
text-slate-900
placeholder:text-slate-400
"              >
                <option>Remote</option>
                <option>Hybrid</option>
                <option>On-Site</option>
              </select>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

<label className="block mb-2 text-sm font-semibold text-slate-700">                Professionals Needed
              </label>

              <input
                type="number"
                value={formData.professionals}
                onChange={(e) =>
                  updateField(
                    "professionals",
                    Number(e.target.value)
                  )
                }
className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
text-slate-900
placeholder:text-slate-400
"              />

            </div>

            <div>

<label className="block mb-2 text-sm font-semibold text-slate-700">                Hiring Type
              </label>

              <select
                value={formData.hiringType}
                onChange={(e) =>
                  updateField(
                    "hiringType",
                    e.target.value
                  )
                }
className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
text-slate-900
placeholder:text-slate-400
"              >
                <option>Individual</option>
                <option>Team</option>
                <option>Either</option>
              </select>

            </div>

          </div>

        </div>

      </FormSection>


            {/* ========================= */}
      {/* DELIVERABLES */}
      {/* ========================= */}

      <FormSection
        title="📦 Deliverables & Milestones"
        description="Clearly define what should be delivered."
      >
        <div className="space-y-6">

          <div>

<label className="block mb-2 text-sm font-semibold text-slate-700">              Primary Deliverable
            </label>

            <input
              placeholder="Example: Responsive Recruitment Website"
className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
text-slate-900
placeholder:text-slate-400
"            />

          </div>

          <div>

<label className="block mb-2 text-sm font-semibold text-slate-700">              Expected Deliverables
            </label>

            <div className="space-y-3">

              <input
                placeholder="Deliverable 1"
className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
text-slate-900
placeholder:text-slate-400
"              />

              <input
                placeholder="Deliverable 2"
className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
text-slate-900
placeholder:text-slate-400
"              />

              <input
                placeholder="Deliverable 3"
className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
text-slate-900
placeholder:text-slate-400
"              />

            </div>

            <button
              type="button"
              className="mt-4 rounded-xl bg-blue-50 text-blue-600 px-5 py-2 hover:bg-blue-100 transition"
            >
              + Add Deliverable
            </button>

          </div>

          <div>

<label className="block mb-2 text-sm font-semibold text-slate-700">              Acceptance Criteria
            </label>

            <textarea
              rows={5}
              placeholder="Explain when the project should be considered complete..."
className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
text-slate-900
placeholder:text-slate-400
"            />

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

<label className="block mb-2 text-sm font-semibold text-slate-700">
  Number of Revisions
</label>

<select
  className="
    w-full
    rounded-xl
    border
    border-slate-300
    px-4
    py-3
    text-slate-900
  "
>
  <option>1 Revision</option>
  <option>2 Revisions</option>
  <option>3 Revisions</option>
  <option>Unlimited</option>
</select>

            </div>

            <div>

<label className="block mb-2 text-sm font-semibold text-slate-700">                Delivery Format
              </label>

              <select className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
text-slate-900
placeholder:text-slate-400
">

                <option>Source Code</option>
                <option>GitHub Repository</option>
                <option>ZIP File</option>
                <option>Documentation</option>
                <option>All of the Above</option>

              </select>

            </div>

          </div>

        </div>

      </FormSection>

      {/* ========================= */}
      {/* BUDGET & TIMELINE */}
      {/* ========================= */}

      <FormSection
        title="💰 Budget & Timeline"
        description="Specify project budget and timeline."
      >

        <div className="space-y-6">

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Budget
              </label>

              <input
                value={formData.budget}
                onChange={(e) => updateField("budget", e.target.value)}
                type="number"
                placeholder="25000"
                className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
text-slate-900
placeholder:text-slate-400
"              />

            </div>

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Payment Type
              </label>

              <select className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
text-slate-900
placeholder:text-slate-400
">

                <option>Fixed Price</option>
                <option>Hourly</option>
                <option>Milestone Based</option>

              </select>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Start Date
              </label>

              <input
                type="date"
className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
text-slate-900
placeholder:text-slate-400
"              />

            </div>

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Deadline
              </label>

              <input
                type="date"
className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
text-slate-900
placeholder:text-slate-400
"              />

            </div>

          </div>

          <div>

            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Estimated Duration
            </label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

              {[
                "Less than 1 Week",
                "1-2 Weeks",
                "1 Month",
                "2+ Months",
              ].map((item) => (

                <button
                  key={item}
                  type="button"
                  className="rounded-xl border border-slate-300 py-3 hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

          <div>

<label className="block mb-2 text-sm font-semibold text-slate-700">              Budget Notes
            </label>

            <textarea
              rows={4}
              placeholder="Bonus, payment terms, milestone details..."
className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
text-slate-900
placeholder:text-slate-400
"            />

          </div>

        </div>

      </FormSection>


            {/* ========================= */}
      {/* RESOURCES */}
      {/* ========================= */}

      <FormSection
        title="📎 Resources & Additional Information"
        description="Provide reference materials and additional information."
      >

        <div className="space-y-6">

          <div className="grid md:grid-cols-2 gap-6">

            <div>

<label className="block mb-2 text-sm font-semibold text-slate-700">                GitHub Repository
              </label>

              <input
                type="url"
                placeholder="https://github.com/..."
className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
text-slate-900
placeholder:text-slate-400
"              />

            </div>

            <div>

<label className="block mb-2 text-sm font-semibold text-slate-700">                Figma Design
              </label>

              <input
                type="url"
                placeholder="https://figma.com/..."
className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
text-slate-900
placeholder:text-slate-400
"              />

            </div>

          </div>

          <div>

<label className="block mb-2 text-sm font-semibold text-slate-700">              Reference Website
            </label>

            <input
              type="url"
              placeholder="https://example.com"
className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
text-slate-900
placeholder:text-slate-400
"            />

          </div>

          <div>

<label className="block mb-2 text-sm font-semibold text-slate-700">              Supporting Documents
            </label>

            <input
              type="file"
              multiple
className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
text-slate-900
placeholder:text-slate-400
"            />

          </div>

          <div>

<label className="block mb-2 text-sm font-semibold text-slate-700">              Additional Notes
            </label>

            <textarea
              rows={5}
              placeholder="Additional information..."
className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
text-slate-900
placeholder:text-slate-400
"            />

          </div>

        </div>

      </FormSection>

      {/* ========================= */}
      {/* REVIEW */}
      {/* ========================= */}

      <FormSection
        title="🚀 Review & Publish"
        description="Review your project before publishing."
      >

        <div className="space-y-6">

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

            <h3 className="font-semibold text-slate-800 mb-4">
              Project Checklist
            </h3>

            <div className="grid grid-cols-2 gap-3 text-sm text-slate-700">

              <div className="text-slate-700">✅ Project Overview</div>
<div className="text-slate-700">✅ Team Requirements</div>
<div className="text-slate-700">✅ Deliverables</div>
<div className="text-slate-700">✅ Budget</div>
<div className="text-slate-700">✅ Resources</div>
<div className="text-slate-700">✅ Ready to Publish</div>

            </div>

          </div>

          <div className="space-y-3">

            <label className="flex items-center gap-3">

              <input type="checkbox" />

              <span className="text-sm text-slate-700">
  I confirm the project information is accurate.
</span>

            </label>

            <label className="flex items-center gap-3">

              <input type="checkbox" />

              <span className="text-sm text-slate-700">
  I agree to the platform terms.
</span>

            </label>

          </div>

          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={() => createDigitalTask("Draft")}
              disabled={loading}
              className="rounded-xl border border-slate-300 px-6 py-3 text-slate-700 hover:bg-slate-100 transition"
            >
              {loading ? "Saving..." : "Save Draft"}
            </button>

            <button
              type="button"
              onClick={() => createDigitalTask()}
              disabled={loading}
              className="rounded-xl bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition"
            >
              {loading ? "Publishing..." : "Publish Project"}
            </button>

          </div>

        </div>

      </FormSection>

    </div>
  );
}