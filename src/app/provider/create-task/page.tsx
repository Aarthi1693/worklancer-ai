"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DesktopLayout from "@/components/layout/desktop-layout";

import CreateTaskHeader from "@/components/provider/create-task/CreateTaskHeader";
import TaskTypeSelector from "@/components/provider/create-task/TaskTypeSelector";
import DigitalTaskForm from "@/components/provider/create-task/DigitalTaskForm";
import FieldTaskForm from "@/components/provider/create-task/FieldTaskForm";
import AIInsights from "@/components/provider/create-task/AIInsights";

export default function CreateTaskPage() {
  const router = useRouter();

  const [taskType, setTaskType] = useState<"digital" | "field">("digital");

  useEffect(() => {
  const requestedTaskType =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("taskType")
      : null;

  if (requestedTaskType === "field") {
    setTaskType("field");
  } else if (requestedTaskType === "digital") {
    setTaskType("digital");
  }
}, []);

  return (
    <DesktopLayout>
      <div className="space-y-8">

        <CreateTaskHeader />

        <TaskTypeSelector
          taskType={taskType}
          setTaskType={setTaskType}
        />

        <div className="grid grid-cols-12 gap-6">

          <div className="col-span-8">

            {taskType === "digital" ? (
              <DigitalTaskForm />
            ) : (
              <FieldTaskForm />
            )}

          </div>

          <div className="col-span-4">

            <AIInsights />

          </div>

        </div>

      </div>
    </DesktopLayout>
  );
}