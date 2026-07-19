"use client";

import { getInitials } from "@/lib/utils";

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
}

interface Props {
  conversation: Conversation;
  currentUserId: string;
}

export default function ChatHeader({
  conversation,
  currentUserId,
}: Props) {
  const otherUser =
    conversation.provider.id === currentUserId
      ? conversation.master
      : conversation.provider;

  return (
    <div
      className="
        p-5
        border-b
        border-white/10
        flex
        items-center
        justify-between
      "
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
            {getInitials(otherUser.name)}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#0f172a]" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-white leading-tight">
            {otherUser.name}
          </h2>

          <p className="text-sm text-slate-400 mt-0.5">
            {conversation.project.title}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-medium text-green-400">
          Online
        </span>
      </div>
    </div>
  );
}
