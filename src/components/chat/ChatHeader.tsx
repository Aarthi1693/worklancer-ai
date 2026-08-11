"use client";

import { Phone, Video, MoreVertical } from "lucide-react";
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
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
            {getInitials(otherUser.name)}
          </div>

          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900 text-lg">
            {otherUser.name}
          </h2>

          <p className="text-sm text-gray-500">
            {conversation.project.title}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="h-10 w-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
          <Phone size={18} className="text-gray-600" />
        </button>

        <button className="h-10 w-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
          <Video size={18} className="text-gray-600" />
        </button>

        <button className="h-10 w-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
          <MoreVertical size={18} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}