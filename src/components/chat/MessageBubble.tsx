"use client";

import { Check, CheckCheck } from "lucide-react";

interface Props {
  own: boolean;
  message: string;
  time: string;
  senderName?: string;
  status?: string;
}

export default function MessageBubble({
  own,
  message,
  time,
  senderName,
  status,
}: Props) {
  const renderStatus = () => {
    if (!own) return null;

    if (status === "read") {
      return <CheckCheck size={14} className="text-blue-200" />;
    }

    if (status === "delivered") {
      return <CheckCheck size={14} className="text-gray-200" />;
    }

    return <Check size={14} className="text-gray-200" />;
  };

  return (
    <div
      className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${
        own
          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-md"
          : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
      }`}
    >
      {!own && senderName && (
        <p className="text-xs font-semibold text-blue-600 mb-1">
          {senderName}
        </p>
      )}

      <p className="text-sm leading-6 break-words">
        {message}
      </p>

      <div
        className={`mt-2 flex items-center gap-1 text-xs ${
          own
            ? "justify-end text-blue-100"
            : "justify-end text-gray-500"
        }`}
      >
        <span>{time}</span>
        {renderStatus()}
      </div>
    </div>
  );
}