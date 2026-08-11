"use client";

import { useEffect, useRef } from "react";
import { Paperclip, SendHorizontal, Smile } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  loading?: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  loading = false,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      `${textareaRef.current.scrollHeight}px`;
  }, [value]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (value.trim() && !loading) {
        onSend();
      }
    }
  };

  return (
    <div className="border-t border-slate-200 bg-white p-5">

      <div className="flex items-end gap-3 rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">

        {/* Attachment Button */}

        <button
          type="button"
          className="rounded-xl p-2 transition hover:bg-slate-200"
        >
          <Paperclip
            size={20}
            className="text-slate-500"
          />
        </button>

        {/* Input */}

        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask WorkLancer AI anything..."
          className="max-h-40 flex-1 resize-none bg-transparent text-[15px] text-slate-800 outline-none placeholder:text-slate-400"
        />

        {/* Emoji */}

        <button
          type="button"
          className="rounded-xl p-2 transition hover:bg-slate-200"
        >
          <Smile
            size={20}
            className="text-slate-500"
          />
        </button>

        {/* Send */}

        <button
          onClick={onSend}
          disabled={!value.trim() || loading}
          className="rounded-2xl bg-blue-600 p-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <SendHorizontal size={20} />
        </button>

      </div>

      <div className="mt-2 flex justify-between px-2 text-xs text-slate-400">

        <span>
          Press <b>Enter</b> to send ·{" "}
          <b>Shift + Enter</b> for a new line
        </span>

        <span>
          Powered by Qwen AI
        </span>

      </div>

    </div>
  );
}