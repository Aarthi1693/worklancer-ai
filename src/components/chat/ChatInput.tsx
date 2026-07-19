"use client";

interface Props {
  onSend: (message: string) => void;
  value: string;
  onChange: (value: string) => void;
  loading?: boolean;
}

export default function ChatInput({ onSend, value, onChange, loading = false }: Props) {
  const send = () => {
    if (!value.trim()) return;
    onSend(value);
  };

  return (
    <div
      className="
        flex-shrink-0
        p-5
        border-t
        border-white/10
        flex
        gap-4
        items-center
      "
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            send();
          }
        }}
        placeholder="Type your message..."
        disabled={loading}
        className="
          flex-1
          bg-slate-900
          border
          border-white/10
          rounded-2xl
          px-5
          py-4
          outline-none
          focus:border-blue-500
          transition
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      />

      <button
        onClick={send}
        disabled={!value.trim() || loading}
        className="
          px-8
          py-4
          rounded-2xl
          bg-gradient-to-r
          from-blue-600
          to-purple-600
          hover:from-blue-500
          hover:to-purple-500
          transition-all
          font-semibold
          shadow-[0_0_25px_rgba(59,130,246,0.4)]
          disabled:opacity-50
          disabled:cursor-not-allowed
          disabled:shadow-none
        "
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
