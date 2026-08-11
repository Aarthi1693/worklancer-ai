"use client";

import { useState } from "react";

import AIHeader from "./header/AIHeader";
import QuickActions from "./actions/QuickActions";
import SuggestedPrompts from "./actions/SuggestedPrompts";
import AIWelcomeCard from "./cards/AIWelcomeCard";
import ChatMessages, { ChatMessage } from "./chat/ChatMessages";
import ChatInput from "./chat/ChatInput";
import { sendMessage } from "@/services/ai.service";

interface AIPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function AIPopup({
  open,
  onClose,
}: AIPopupProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

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

  setMessages((prev) => [...prev, userMessage]);

  const prompt = input;
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
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Sorry, I couldn't process your request. Please try again.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed bottom-24 right-8 z-50 flex h-[760px] w-[520px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">

      <AIHeader onClose={onClose} />

      {messages.length === 0 ? (
        <>

          <AIWelcomeCard />

          <QuickActions
            onSelect={(text) => setInput(text)}
          />

          <SuggestedPrompts
            onSelect={(text) => setInput(text)}
          />

        </>
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
  );
}