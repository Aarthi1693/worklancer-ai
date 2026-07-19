"use client";

import { motion } from "framer-motion";

import { getInitials } from "@/lib/utils";
import UnreadBadge from "@/components/chat/UnreadBadge";

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
}

export default function ChatSidebar({
  conversations,
  selectedConversation,
  currentUserId,
  onSelect,
  loading = false,
}: Props) {
  return (
    <div
      className="
      w-[320px]
      flex-shrink-0
      rounded-3xl
      border
      border-white/10
      bg-white/[0.03]
      backdrop-blur-xl
      p-5
      flex
      flex-col
    "
    >
      <h2 className="text-xl font-bold text-white mb-5">
        Chats
      </h2>

      <div className="space-y-2 overflow-y-auto flex-1">

        {loading &&
          [...Array(5)].map((_, i) => (
            <div
              key={i}
              className="p-3 rounded-2xl bg-slate-800/30 animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-700/50 shrink-0" />

                <div className="flex-1 min-w-0">
                  <div className="h-3.5 bg-slate-700/50 rounded w-24 mb-2" />
                  <div className="h-2.5 bg-slate-700/40 rounded w-16" />
                </div>
              </div>
            </div>
          ))}

        {!loading && conversations.length === 0 && (
          <div className="text-slate-400 text-center py-10 text-sm">
            No conversations
          </div>
        )}

        {!loading &&
          conversations.map((conversation) => {
            const otherUser =
              conversation.provider.id === currentUserId
                ? conversation.master
                : conversation.provider;

            const lastMessage =
              conversation.messages.length > 0
                ? conversation.messages[0]
                : null;

            const isSelected =
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
                  p-3
                  transition-all
                  duration-200
                  ${
                    isSelected
                      ? "bg-blue-600/20 border border-blue-500/40 shadow-lg shadow-blue-500/10"
                      : "hover:bg-slate-800/60 border border-transparent"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-blue-500/20">
                      {getInitials(otherUser.name)}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0f172a]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-white truncate text-sm">
                        {otherUser.name}
                      </h3>

                      <div className="flex items-center gap-2 shrink-0">
                        <UnreadBadge
                          count={conversation.unreadCount ?? 0}
                        />

                        {lastMessage?.createdAt && (
                          <span className="text-[10px] text-slate-500">
                            {new Date(lastMessage.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 mt-0.5 truncate">
                      {conversation.project.title}
                    </p>

                    <p className="text-xs text-slate-500 mt-1 truncate">
                      {lastMessage ? lastMessage.message : "No messages yet"}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
}
