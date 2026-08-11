"use client";

import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingAnimation from "./TypingAnimation";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
  isTyping?: boolean;
}

export default function ChatMessages({
  messages,
  isTyping = false,
}: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">

      <div className="space-y-6">

        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role}
            message={message.content}
            timestamp={message.timestamp}
          />
        ))}

        {isTyping && <TypingAnimation />}

        <div ref={bottomRef} />

      </div>

    </div>
  );
}