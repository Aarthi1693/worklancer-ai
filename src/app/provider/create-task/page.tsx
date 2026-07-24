"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import DesktopLayout from "@/components/layout/desktop-layout";
import { useRouter, useSearchParams } from "next/navigation";
import projectService from "@/services/project.service";

function CreateTaskContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [taskType, setTaskType] =
    useState("digital");

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");

  const [fieldTitle, setFieldTitle] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [fieldDescription, setFieldDescription] = useState("");
  const [rewardAmount, setRewardAmount] = useState("");

  useEffect(() => {
    const planTitle = searchParams.get("title");
    const planDesc = searchParams.get("description");
    const planSkills = searchParams.get("skills");
    const planBudget = searchParams.get("budget");

    if (planTitle) setTitle(planTitle);
    if (planDesc) setDescription(planDesc);
    if (planSkills) setRequiredSkills(planSkills);
    if (planBudget) setBudget(planBudget);
  }, [searchParams]);

  const handleCreateTask = async () => {
  // -----------------------------
  // DIGITAL TASK
  // -----------------------------
  if (taskType === "digital") {
    if (!title || !description || !budget || !requiredSkills) {
      alert("Please fill all the required fields.");
      return;
    }

    try {
      setLoading(true);

      await projectService.createProject({
  title,
  description,
  budget: Number(budget),
  requiredSkills,
  taskType: "DIGITAL",
});

      setShowSuccess(true);

      setTitle("");
      setDescription("");
      setBudget("");
      setRequiredSkills("");

      setTimeout(() => {
        setShowSuccess(false);
        router.push("/provider");
      }, 2000);
    } catch (error) {
      console.error(error);
      alert("Failed to create project.");
    } finally {
      setLoading(false);
    }

    return;
  }

  // -----------------------------
// ON-FIELD TASK
// -----------------------------
if (
  !fieldTitle ||
  !pickupLocation ||
  !dropLocation ||
  !fieldDescription ||
  !rewardAmount
) {
  alert("Please fill all the required fields.");
  return;
}

try {
  setLoading(true);

  await projectService.createProject({
    title: fieldTitle,
    description: `${fieldDescription}

Pickup: ${pickupLocation}

Drop: ${dropLocation}`,
    budget: Number(rewardAmount),
    requiredSkills: "Field Work",
    taskType: "FIELD",
  });

  setShowSuccess(true);

  setFieldTitle("");
  setPickupLocation("");
  setDropLocation("");
  setFieldDescription("");
  setRewardAmount("");

  setTimeout(() => {
    setShowSuccess(false);
    router.push("/provider");
  }, 2000);
} catch (error) {
  console.error(error);
  alert("Failed to create field task.");
} finally {
  setLoading(false);
}
};

  return (
    <DesktopLayout>
      <div className="space-y-6">

        {/* Header */}

        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-5xl font-bold text-white">
              Create New Task
            </h1>

            <p className="text-slate-400 mt-2">
              Create digital or on-field tasks with AI recommendations.
            </p>
          </div>

          <button
            onClick={() =>
              router.push("/provider")
            }
            className="
              px-5
              py-3
              rounded-xl
              border
              border-white/[0.08]
              hover:bg-white/5
            "
          >
            ← Dashboard
          </button>

        </div>

        {/* Task Type */}

        <div
          className="
            bg-slate-900/50
            border
            border-white/[0.08]
            rounded-3xl
            p-6
          "
        >
          <h2 className="text-xl font-semibold mb-4">
            Select Task Type
          </h2>

          <div className="flex gap-4">

            <button
              onClick={() =>
                setTaskType("digital")
              }
              className={`px-6 py-3 rounded-xl ${
                taskType === "digital"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_20px_rgba(124,58,237,0.4)] text-white"
                  : "bg-slate-800"
              }`}
            >
              Digital Task
            </button>

            <button
              onClick={() =>
                setTaskType("field")
              }
              className={`px-6 py-3 rounded-xl ${
                taskType === "field"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-800"
              }`}
            >
              On-Field Task
            </button>

          </div>
        </div>

        {/* Main Content */}

        <div className="grid grid-cols-3 gap-6">

          {/* Form */}

          <div
            className="
              col-span-2
              bg-slate-900/50
              border
              border-white/[0.08]
              rounded-3xl
              p-6
            "
          >
            <h2 className="text-xl font-semibold mb-6">
              Task Information
            </h2>

            {taskType === "digital" ? (
              <div className="space-y-4">

               <input
  placeholder="Project Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  className="w-full p-4 rounded-xl bg-slate-800 border border-white/[0.08]"
/>
                <textarea
  rows={5}
  placeholder="Project Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="w-full p-4 rounded-xl bg-slate-800 border border-white/[0.08]"
/>

                <input
  placeholder="Required Skills"
  value={requiredSkills}
  onChange={(e) => setRequiredSkills(e.target.value)}
  className="w-full p-4 rounded-xl bg-slate-800 border border-white/[0.08]"
/>

                <div className="grid grid-cols-2 gap-4">

                  <input
  type="number"
  placeholder="Budget ₹"
  value={budget}
  onChange={(e) => setBudget(e.target.value)}
  className="p-4 rounded-xl bg-slate-800 border border-white/[0.08]"
/>

                  <input
                    type="date"
                    className="p-4 rounded-xl bg-slate-800 border border-white/[0.08]"
                  />

                </div>

              </div>
            ) : (
              <div className="space-y-4">

                <input
  placeholder="Task Title"
  value={fieldTitle}
  onChange={(e) => setFieldTitle(e.target.value)}
  className="w-full p-4 rounded-xl bg-slate-800 border border-white/[0.08]"
/>

                <input
  placeholder="Pickup Location"
  value={pickupLocation}
  onChange={(e) => setPickupLocation(e.target.value)}
  className="w-full p-4 rounded-xl bg-slate-800 border border-white/[0.08]"
/>

                <input
  placeholder="Drop Location"
  value={dropLocation}
  onChange={(e) => setDropLocation(e.target.value)}
  className="w-full p-4 rounded-xl bg-slate-800 border border-white/[0.08]"
/>

                <textarea
  rows={4}
  placeholder="Task Description"
  value={fieldDescription}
  onChange={(e) => setFieldDescription(e.target.value)}
  className="w-full p-4 rounded-xl bg-slate-800 border border-white/[0.08]"
/>
                <div className="grid grid-cols-2 gap-4">

                  <input
  placeholder="Reward Amount ₹"
  value={rewardAmount}
  onChange={(e) => setRewardAmount(e.target.value)}
  className="p-4 rounded-xl bg-slate-800 border border-white/[0.08]"
/>

                  <input
                    type="date"
                    className="p-4 rounded-xl bg-slate-800 border border-white/[0.08]"
                  />

                </div>

              </div>
            )}

            <button
  onClick={handleCreateTask}
  disabled={loading}
  className="
    mt-6
    px-6
    py-3
    rounded-xl
    bg-gradient-to-r
    from-blue-600
    to-purple-600
    shadow-[0_0_20px_rgba(124,58,237,0.4)]
    hover:from-blue-500
    hover:to-purple-500
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
>
  {loading ? "Creating..." : "Create Task"}
</button>

          </div>

          {/* AI Panel */}

          <div
            className="
              bg-slate-900/50
              border
              border-white/[0.08]
              rounded-3xl
              p-6
            "
          >
            <h2 className="text-xl font-semibold mb-6">
              AI Recommendations
            </h2>

            {taskType === "digital" ? (
              <div className="space-y-5">

                <div>
                  <p className="text-slate-400">
                    Suggested Budget
                  </p>

                  <h3 className="text-2xl font-bold text-green-400">
                    N/A
                  </h3>
                </div>

                <div>
                  <p className="text-slate-400">
                    Recommended Team
                  </p>

                  <h3>
                    N/A
                  </h3>
                </div>

                <div>
                  <p className="text-slate-400">
                    Success Probability
                  </p>

                  <h3 className="text-2xl text-blue-400">
                    N/A
                  </h3>
                </div>

              </div>
            ) : (
              <div className="space-y-5">

                <div>
                  <p className="text-slate-400">
                    Distance
                  </p>

                  <h3 className="text-2xl text-blue-400">
                    N/A
                  </h3>
                </div>

                <div>
                  <p className="text-slate-400">
                    Estimated Time
                  </p>

                  <h3 className="text-2xl text-green-400">
                    N/A
                  </h3>
                </div>

                <div>
                  <p className="text-slate-400">
                    Suggested Reward
                  </p>

                  <h3 className="text-2xl text-yellow-400">
                    N/A
                  </h3>
                </div>

              </div>
            )}

          </div>

        </div>

        {/* Success Popup */}

        {showSuccess && (
          <div
            className="
              fixed
              inset-0
              bg-black/60
              flex
              items-center
              justify-center
              z-50
            "
          >
            <div
              className="
                bg-slate-950
                border
                border-green-500/20
                rounded-3xl
                p-8
                text-center
                w-[420px]
              "
            >
              <div className="text-6xl mb-4">
                ✅
              </div>

              <h2 className="text-2xl font-bold text-green-400">
                Task Created
              </h2>

              <p className="text-slate-400 mt-3">
                Your task has been published successfully.
              </p>
            </div>
          </div>
        )}

      </div>
    </DesktopLayout>
  );
}

export default function CreateTaskPage() {
  return (
    <Suspense>
      <CreateTaskContent />
    </Suspense>
  );
}