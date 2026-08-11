"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

interface Message {
  id: string;
  message: string;
  senderId: string;
  senderName?: string;
  createdAt: string;
  status?: string;
}

interface Props {
  messages: Message[];
  currentUserId: string;
  loading?: boolean;
  typingName?: string;
  isTyping?: boolean;
}

export default function MessageList({
  messages,
  currentUserId,
  loading = false,
  typingName,
  isTyping = false,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto bg-gray-50 p-6 space-y-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`flex ${
              i % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <div className="w-56 h-16 rounded-2xl bg-gray-200 animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-5xl mb-3">💬</div>

          <h3 className="text-lg font-semibold text-gray-700">
            No messages yet
          </h3>

          <p className="text-gray-500 mt-2">
            Start the conversation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6 space-y-4">
      {messages.map((msg, index) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.25,
            delay: Math.min(index * 0.04, 0.3),
          }}
          className={`flex ${
            msg.senderId === currentUserId
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <MessageBubble
            own={msg.senderId === currentUserId}
            message={msg.message}
            senderName={msg.senderName}
            status={msg.status}
            time={new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          />
        </motion.div>
      ))}

      {isTyping && (
        <TypingIndicator name={typingName} />
      )}

      <div ref={bottomRef} />
    </div>
  );
}