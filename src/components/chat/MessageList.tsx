"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

interface Message {
  id: string;
  message: string;
  senderId: string;
  createdAt: string;
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
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    console.log("====== MESSAGE DEBUG ======");
    console.log("Current User:", currentUserId);

    messages.forEach((m) => {
      console.log({
        message: m.message,
        senderId: m.senderId,
        own: m.senderId === currentUserId,
      });
    });
  }, [messages, currentUserId]);

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}
          >
            <div className="max-w-[70%] px-5 py-3 rounded-2xl bg-slate-800/40 animate-pulse">
              <div className="h-3 bg-slate-700/40 rounded w-32 mb-3" />
              <div className="h-2.5 bg-slate-700/30 rounded w-12 ml-auto" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
        No messages yet. Start the conversation!
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3">
      {messages.map((msg, index) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.25,
            delay: Math.min(index * 0.04, 0.4),
          }}
          className={`flex w-full ${
            msg.senderId === currentUserId
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <MessageBubble
            own={msg.senderId === currentUserId}
            message={msg.message}
            time={new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          />
        </motion.div>
      ))}

      {isTyping && <TypingIndicator name={typingName} />}

      <div ref={bottomRef} />
    </div>
  );
}