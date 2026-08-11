"use client";

import DesktopLayout from "@/components/layout/desktop-layout";
import AIAssistantPage from "@/components/master/ai-assistant/AIAssistantPage";
import { ToastProvider } from "@/components/ui/toast";

export default function Page() {
  return (
    <ToastProvider>
      <DesktopLayout>
        <AIAssistantPage />
      </DesktopLayout>
    </ToastProvider>
  );
}