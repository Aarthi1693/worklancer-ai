"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormSection from "./FormSection";
import projectService from "@/services/project.service";

import {
  Truck,
  ClipboardCheck,
  Wrench,
  Users,
  Building2,
  Briefcase,
} from "lucide-react";

const taskCategories = [
  { id: "delivery", name: "Delivery", icon: Truck },
  { id: "survey", name: "Survey", icon: ClipboardCheck },
  { id: "installation", name: "Installation", icon: Wrench },
  { id: "inspection", name: "Inspection", icon: ClipboardCheck },
  { id: "event", name: "Event Support", icon: Users },
  { id: "maintenance", name: "Maintenance", icon: Wrench },
  { id: "sales", name: "Field Sales", icon: Briefcase },
  { id: "other", name: "Other", icon: Building2 },
];

const priorities = ["Low", "Medium", "High", "Urgent"];

export default function FieldTaskForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "Medium",
    summary: "",
    description: "",

    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    mapLink: "",

    budget: "",
    requiredSkills: "",
  });

  const updateField = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePublish = async () => {
    if (
      !formData.title ||
      !formData.description ||
      !formData.budget ||
      !formData.requiredSkills
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      await projectService.createProject({
        title: formData.title,
        description: formData.description,
        budget: Number(formData.budget),
        requiredSkills: formData.requiredSkills,
        taskType: "FIELD",
      });

      alert("🎉 Field Task Created Successfully!");

      router.push("/provider/my-projects");
    } catch (error) {
      console.error(error);
      alert("Failed to create field task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* ================================= */}
      {/* TASK OVERVIEW */}
      {/* ================================= */}

      <FormSection
        title="📍 Task Overview"
        description="Provide the basic information about your field task."
      >

        <div className="space-y-6">

          {/* Task Title */}

          <div>

            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Task Title *
            </label>

            <input
              value={formData.title}
              onChange={(e) =>
                updateField("title", e.target.value)
              }
              placeholder="Example: Laptop Installation at Client Office"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
            />

          </div>

          {/* Category */}

          <div>

            <label className="block mb-3 text-sm font-semibold text-slate-700">
              Task Category *
            </label>

            <div className="grid grid-cols-4 gap-4">

              {taskCategories.map((category) => {

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
                    className={`rounded-xl border px-4 py-3 transition ${
                      selected
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                    }`}
                  >

                    <div className="flex items-center justify-center gap-2">

                      <Icon
                        className={`h-5 w-5 ${
                          selected
                            ? "text-blue-600"
                            : "text-slate-500"
                        }`}
                      />

                      <p
                        className={`text-sm font-medium ${
                          selected
                            ? "text-blue-700"
                            : "text-slate-700"
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

          {/* Priority */}

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

          {/* Summary */}

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
              placeholder="Summarize the field task..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
            />

          </div>

          {/* Description */}

          <div>

            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Detailed Description
            </label>

            <textarea
              rows={6}
              value={formData.description}
              onChange={(e) =>
                updateField(
                  "description",
                  e.target.value
                )
              }
              placeholder="Describe the task, work involved, expected outcome and important instructions..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 resize-none text-slate-900 placeholder:text-slate-400"
            />

          </div>

        </div>

      </FormSection>

      {/* ================================= */}
      {/* LOCATION DETAILS */}
      {/* ================================= */}

      <FormSection
        title="📍 Location Details"
        description="Specify where the work needs to be completed."
      >

        <div className="space-y-6">

          <div>

            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Work Address
            </label>

            <textarea
              rows={3}
              value={formData.address}
              onChange={(e) =>
                updateField(
                  "address",
                  e.target.value
                )
              }
              placeholder="Enter complete address..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 resize-none text-slate-900 placeholder:text-slate-400"
            />

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                City
              </label>

              <input
                value={formData.city}
                onChange={(e) =>
                  updateField(
                    "city",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900"
              />

            </div>

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                State
              </label>

              <input
                value={formData.state}
                onChange={(e) =>
                  updateField(
                    "state",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900"
              />

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Pincode
              </label>

              <input
                value={formData.pincode}
                onChange={(e) =>
                  updateField(
                    "pincode",
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900"
              />

            </div>

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Landmark
              </label>

              <input
                value={formData.landmark}
                onChange={(e) =>
                  updateField(
                    "landmark",
                    e.target.value
                  )
                }
                placeholder="Near Metro Station"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
              />

            </div>

          </div>

          <div>

            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Google Maps Link
            </label>

            <input
              value={formData.mapLink}
              onChange={(e) =>
                updateField(
                  "mapLink",
                  e.target.value
                )
              }
              placeholder="https://maps.google.com/..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
            />

          </div>

        </div>

      </FormSection>

            {/* ================================= */}
      {/* SCHEDULE & DURATION */}
      {/* ================================= */}

      <FormSection
        title="📅 Schedule & Duration"
        description="Specify when the work should be completed."
      >

        <div className="space-y-6">

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Start Date
              </label>

              <input
                type="date"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900"
              />

            </div>

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                End Date
              </label>

              <input
                type="date"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900"
              />

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Start Time
              </label>

              <input
                type="time"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900"
              />

            </div>

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                End Time
              </label>

              <input
                type="time"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900"
              />

            </div>

          </div>

          <div>

            <label className="block mb-3 text-sm font-semibold text-slate-700">
              Preferred Shift
            </label>

            <div className="flex flex-wrap gap-3">

              {[
                "Morning",
                "Afternoon",
                "Evening",
                "Night",
                "Flexible",
              ].map((shift) => (

                <button
                  key={shift}
                  type="button"
                  className="rounded-full bg-slate-100 text-slate-700 px-5 py-2 text-sm hover:bg-blue-100 transition"
                >
                  {shift}
                </button>

              ))}

            </div>

          </div>

          <div>

            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Expected Duration
            </label>

            <input
              placeholder="Example: 5 Working Days"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
            />

          </div>

        </div>

      </FormSection>

      {/* ================================= */}
      {/* WORKER REQUIREMENTS */}
      {/* ================================= */}

      <FormSection
        title="👷 Worker Requirements"
        description="Describe the professionals needed for this task."
      >

        <div className="space-y-6">

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Number of Workers
              </label>

              <input
                type="number"
                placeholder="2"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900"
              />

            </div>

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Experience Required
              </label>

              <select className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900">

                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Experienced</option>

              </select>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Gender Preference
              </label>

              <select className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900">

                <option>No Preference</option>
                <option>Male</option>
                <option>Female</option>

              </select>

            </div>

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Languages Required
              </label>

              <input
                placeholder="English, Hindi, Tamil..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
              />

            </div>

          </div>

          <div>

            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Required Skills
            </label>

            <textarea
  rows={4}
  value={formData.requiredSkills}
  onChange={(e) =>
    updateField("requiredSkills", e.target.value)
  }
  placeholder="Driving, Electrical, Customer Support, Survey..."
  className="w-full rounded-xl border border-slate-300 px-4 py-3 resize-none text-slate-900 placeholder:text-slate-400"
/>

          </div>

        </div>

      </FormSection>

      {/* ================================= */}
      {/* PAYMENT DETAILS */}
      {/* ================================= */}

      <FormSection
        title="💰 Payment Details"
        description="Specify payment information for the task."
      >

        <div className="space-y-6">

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Budget
              </label>

              <input
  type="number"
  value={formData.budget}
  onChange={(e) => updateField("budget", e.target.value)}
  placeholder="5000"
  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900"
/>

            </div>

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Payment Type
              </label>

              <select className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900">

                <option>Fixed</option>
                <option>Daily</option>
                <option>Hourly</option>
                <option>Per Task</option>

              </select>

            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Travel Allowance
              </label>

              <select className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900">

                <option>Yes</option>
                <option>No</option>

              </select>

            </div>

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Food Provided
              </label>

              <select className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900">

                <option>Yes</option>
                <option>No</option>

              </select>

            </div>

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Accommodation
              </label>

              <select className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900">

                <option>Yes</option>
                <option>No</option>

              </select>

            </div>

          </div>

          <div>

            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Bonus / Payment Notes
            </label>

            <textarea
              rows={4}
              placeholder="Mention incentives, bonus or payment conditions..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 resize-none text-slate-900 placeholder:text-slate-400"
            />

          </div>

        </div>

      </FormSection>

            {/* ================================= */}
      {/* EQUIPMENT & INSTRUCTIONS */}
      {/* ================================= */}

      <FormSection
        title="🧰 Equipment & Instructions"
        description="Specify equipment, safety requirements and additional instructions."
      >

        <div className="space-y-6">

          <div>

            <label className="block mb-3 text-sm font-semibold text-slate-700">
              Safety & Equipment
            </label>

            <div className="grid md:grid-cols-2 gap-4">

              {[
                "Safety Shoes Required",
                "Helmet Required",
                "ID Card Mandatory",
                "Own Vehicle Required",
                "Own Smartphone Required",
                "Driving License Required",
              ].map((item) => (

                <label
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 hover:bg-slate-50 cursor-pointer"
                >

                  <input
                    type="checkbox"
                    className="h-4 w-4"
                  />

                  <span className="text-sm text-slate-700">
                    {item}
                  </span>

                </label>

              ))}

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Reference Images
              </label>

              <input
                type="file"
                multiple
                className="w-full rounded-xl border border-dashed border-slate-300 p-4"
              />

            </div>

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Supporting Documents
              </label>

              <input
                type="file"
                multiple
                className="w-full rounded-xl border border-dashed border-slate-300 p-4"
              />

            </div>

          </div>

          <div>

            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Special Instructions
            </label>

            <textarea
              rows={6}
              placeholder="Mention site rules, reporting process, dress code, contact person or any other important instructions..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 resize-none text-slate-900 placeholder:text-slate-400"
            />

          </div>

        </div>

      </FormSection>

      {/* ================================= */}
      {/* REVIEW & PUBLISH */}
      {/* ================================= */}

      <FormSection
        title="🚀 Review & Publish"
        description="Review your task before publishing."
      >

        <div className="space-y-6">

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

            <h3 className="font-semibold text-slate-800 mb-4">
              Task Checklist
            </h3>

            <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-700">

              <div>✅ Task Overview</div>
              <div>✅ Location Details</div>
              <div>✅ Schedule & Duration</div>
              <div>✅ Worker Requirements</div>
              <div>✅ Payment Details</div>
              <div>✅ Equipment & Instructions</div>

            </div>

          </div>

          <div className="space-y-3">

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                className="h-4 w-4"
              />

              <span className="text-sm text-slate-700">
                I confirm that all task details are accurate.
              </span>

            </label>

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                className="h-4 w-4"
              />

              <span className="text-sm text-slate-700">
                I agree to the platform terms and conditions.
              </span>

            </label>

          </div>

          <div className="flex justify-end gap-4">

            <button
              type="button"
              className="rounded-xl border border-slate-300 px-6 py-3 text-slate-700 hover:bg-slate-100 transition"
            >
              Save Draft
            </button>

            <button
  type="button"
  onClick={handlePublish}
  disabled={loading}
  className="rounded-xl bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition disabled:opacity-50"
>
  {loading ? "Publishing..." : "Publish Task"}
</button>

          </div>

        </div>

      </FormSection>

    </div>
  );
}