"use client";

import { SendHorizontal, Paperclip, Smile } from "lucide-react";

interface Props {
  onSend: (message: string) => void;
  value: string;
  onChange: (value: string) => void;
  loading?: boolean;
}

export default function ChatInput({
  onSend,
  value,
  onChange,
  loading = false,
}: Props) {
  const send = () => {
    if (!value.trim()) return;
    onSend(value);
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <button className="h-10 w-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
          <Paperclip className="w-5 h-5 text-gray-500" />
        </button>

        <button className="h-10 w-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
          <Smile className="w-5 h-5 text-gray-500" />
        </button>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
          placeholder="Type your message..."
          disabled={loading}
          className="
            flex-1
            rounded-full
            border
            border-gray-300
            bg-gray-50
            px-5
            py-3
            text-gray-800
            placeholder:text-gray-400
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
            outline-none
            transition
            disabled:opacity-50
          "
        />

        <button
          onClick={send}
          disabled={!value.trim() || loading}
          className="
            h-12
            w-12
            rounded-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            flex
            items-center
            justify-center
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          <SendHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}