"use client";

import DesktopLayout from "@/components/layout/desktop-layout";
import AIHeader from "@/components/ai/header/AIHeader";
import QuickActions from "@/components/ai/actions/QuickActions";
import SuggestedPrompts from "@/components/ai/actions/SuggestedPrompts";
import AIWelcomeCard from "@/components/ai/cards/AIWelcomeCard";
import ChatMessages, {
  ChatMessage,
} from "@/components/ai/chat/ChatMessages";
import ChatInput from "@/components/ai/chat/ChatInput";
import ConversationHistory from "@/components/ai/history/ConversationHistory";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { sendMessage } from "@/services/ai.service";
import { ToastProvider, useToast } from "@/components/ui/toast";

function AIChatContent() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const router = useRouter();
  const { addToast } = useToast();

  const [history, setHistory] = useState([
    {
      id: "1",
      title: "E-Commerce Roadmap",
      date: "Today",
    },
    {
      id: "2",
      title: "Budget Estimation",
      date: "Yesterday",
    },
    {
      id: "3",
      title: "Healthcare Proposal",
      date: "2 days ago",
    },
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const prompt = input;

    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    setLoading(true);

    try {
      const result = await sendMessage(prompt);

      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: result.response,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);

      setHistory((prev) => [
        {
          id: crypto.randomUUID(),
          title:
            prompt.length > 40
              ? prompt.slice(0, 40) + "..."
              : prompt,
          date: "Today",
        },
        ...prev.slice(0, 9),
      ]);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to get a response from AI.";

      addToast(message, "error");

      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `I'm sorry, but I encountered an error:\n\n${message}`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-90px)] gap-6">

      {/* History */}

      <div className="w-80 rounded-3xl border border-slate-200 bg-white shadow-sm">

        <ConversationHistory
          conversations={history}
          selectedId=""
          onSelect={(id) => console.log(id)}
          onDelete={(id) =>
            setHistory((prev) =>
              prev.filter((item) => item.id !== id)
            )
          }
        />

      </div>

      {/* Main AI */}

      <div className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <AIHeader onClose={() => router.push("/provider")} />

        {messages.length === 0 ? (
          <div className="flex-1 overflow-y-auto">

            <AIWelcomeCard />

            <QuickActions
              onSelect={(text) => setInput(text)}
            />

            <SuggestedPrompts
              onSelect={(text) => setInput(text)}
            />

          </div>
        ) : (
          <ChatMessages
            messages={messages}
            isTyping={loading}
          />
        )}

        <ChatInput
          value={input}
          onChange={setInput}
          onSend={handleSend}
          loading={loading}
        />

      </div>

    </div>
  );
}

export default function ProviderAIPage() {
  return (
    <ToastProvider>
      <DesktopLayout>
        <AIChatContent />
      </DesktopLayout>
    </ToastProvider>
  );
}
