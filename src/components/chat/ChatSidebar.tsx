"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

import { getInitials } from "@/lib/utils";
import UnreadBadge from "./UnreadBadge";

interface Conversation {
  id: string;

  project: {
    title: string;
  };

  provider: {
    id: string;
    name: string;
  };

  master: {
    id: string;
    name: string;
  };

  messages: {
    message: string;
    createdAt?: string;
  }[];

  unreadCount?: number;
}

interface Props {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  currentUserId: string;
  onSelect: (conversation: Conversation) => void;
  loading?: boolean;
  error?: string | null;
}

export default function ChatSidebar({
  conversations,
  selectedConversation,
  currentUserId,
  onSelect,
  loading = false,
  error = null,
}: Props) {
  return (
    <div className="w-[340px] bg-white border-r border-gray-200 flex flex-col">

      {/* Header */}
      <div className="p-5 border-b border-gray-200">

        <h2 className="text-2xl font-bold text-gray-900">
          Chats
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Project Conversations
        </p>

        <div className="relative mt-5">
          <Search
            className="absolute left-4 top-3.5 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search conversation..."
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              bg-gray-50
              py-3
              pl-11
              pr-4
              text-sm
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
            "
          />
        </div>
      </div>

      {error && (
        <div className="m-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-3 space-y-2">

        {loading &&
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-20 rounded-2xl bg-gray-100 animate-pulse"
            />
          ))}

        {!loading &&
          conversations.length === 0 && (
            <div className="text-center text-gray-500 py-10">
              No conversations
            </div>
          )}

        {!loading &&
          conversations.map((conversation) => {

            const otherUser =
              conversation.provider.id === currentUserId
                ? conversation.master
                : conversation.provider;

            const last =
              conversation.messages.length > 0
                ? conversation.messages[0]
                : null;

            const selected =
              selectedConversation?.id === conversation.id;

            return (
              <motion.div
                key={conversation.id}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onSelect(conversation)}
                className={`
                  cursor-pointer
                  rounded-2xl
                  border
                  p-4
                  transition
                  ${
                    selected
                      ? "border-blue-500 bg-blue-50"
                      : "border-transparent hover:bg-gray-50"
                  }
                `}
              >
                <div className="flex gap-3">

                  <div className="relative">

                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                      {getInitials(otherUser.name)}
                    </div>

                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>

                  </div>

                  <div className="flex-1 min-w-0">

                    <div className="flex items-center justify-between">

                      <h3 className="font-semibold text-gray-900 truncate">
                        {otherUser.name}
                      </h3>

                      <UnreadBadge
                        count={conversation.unreadCount ?? 0}
                      />

                    </div>

                    <p className="text-xs text-blue-600 mt-1 truncate">
                      {conversation.project.title}
                    </p>

                    <p className="text-sm text-gray-500 truncate mt-1">
                      {last?.message || "No messages yet"}
                    </p>

                    {last?.createdAt && (
                      <p className="text-[11px] text-gray-400 mt-2">
                        {new Date(last.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    )}

                  </div>

                </div>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
}