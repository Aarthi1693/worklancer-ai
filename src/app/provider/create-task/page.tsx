"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import DesktopLayout from "@/components/layout/desktop-layout";

import CreateTaskHeader from "@/components/provider/create-task/CreateTaskHeader";
import TaskTypeSelector from "@/components/provider/create-task/TaskTypeSelector";
import DigitalTaskForm from "@/components/provider/create-task/DigitalTaskForm";
import FieldTaskForm from "@/components/provider/create-task/FieldTaskForm";
import AIInsights from "@/components/provider/create-task/AIInsights";

export default function CreateTaskPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [taskType, setTaskType] = useState<"digital" | "field">("digital");

  useEffect(() => {
    const requestedTaskType = searchParams.get("taskType");
    if (requestedTaskType === "field") {
      setTaskType("field");
      return;
    }

    if (requestedTaskType === "digital") {
      setTaskType("digital");
    }
  }, [searchParams]);

  return (
    <DesktopLayout>
      <div className="space-y-8">

        <CreateTaskHeader
          onBack={() => router.push("/provider")}
        />

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