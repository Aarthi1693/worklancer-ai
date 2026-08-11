"use client";

import DesktopLayout from "@/components/layout/desktop-layout";
import { ToastProvider } from "@/components/ui/toast";
import { AIPlanningContent } from "@/components/provider/ai-planning/AIPlanningPage";

export default function Page() {
  return (
    <DesktopLayout>
      <ToastProvider>
        <AIPlanningContent />
      </ToastProvider>
    </DesktopLayout>
  );
}