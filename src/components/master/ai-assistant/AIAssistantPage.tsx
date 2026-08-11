"use client";

import AssistantHeader from "./AssistantHeader";
import ChatWindow from "./ChatWindow";
import PromptSuggestions from "./PromptSuggestions";
import QuickActions from "./QuickActions";
import AIInsights from "./AIInsights";

export default function AIAssistantPage() {
  return (
    <div className="space-y-8">

      <AssistantHeader />

      <PromptSuggestions />

      <div className="grid gap-8 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <ChatWindow />
        </div>

        <div>
          <QuickActions />
        </div>

      </div>

      <AIInsights />

    </div>
  );
}