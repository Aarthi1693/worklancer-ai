"use client";

import { Clock3, Trash2 } from "lucide-react";

interface Conversation {
  id: string;
  title: string;
  date: string;
}

interface ConversationHistoryProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ConversationHistory({
  conversations,
  selectedId,
  onSelect,
  onDelete,
}: ConversationHistoryProps) {
  return (
    <div className="border-t border-slate-200 bg-slate-50">

      <div className="flex items-center justify-between px-6 py-4">
        <h3 className="text-sm font-semibold text-slate-700">
          Recent Conversations
        </h3>

        <Clock3
          size={18}
          className="text-slate-400"
        />
      </div>

      <div className="max-h-56 overflow-y-auto">

        {conversations.length === 0 ? (
          <p className="px-6 pb-5 text-sm text-slate-400">
            No previous conversations.
          </p>
        ) : (
          conversations.map((chat) => (
            <div
              key={chat.id}
              className={`group flex cursor-pointer items-center justify-between px-6 py-4 transition ${
                selectedId === chat.id
                  ? "bg-blue-50"
                  : "hover:bg-white"
              }`}
              onClick={() => onSelect(chat.id)}
            >
              <div>
                <p className="font-medium text-slate-800">
                  {chat.title}
                </p>

                <p className="text-xs text-slate-500">
                  {chat.date}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(chat.id);
                }}
                className="rounded-lg p-2 opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}

      </div>
    </div>
  );
}