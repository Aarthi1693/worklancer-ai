"use client";

interface Props {
  own: boolean;
  message: string;
  time: string;
}

export default function MessageBubble({
  own,
  message,
  time,
}: Props) {
  return (
    <div
      className={`
        max-w-[70%]
        px-5
        py-3
        rounded-2xl
        shadow-lg
        ${
          own
            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-blue-500/20"
            : "bg-slate-800 text-white shadow-black/20"
        }
      `}
    >
      <p className="text-sm leading-relaxed">{message}</p>

      <p className="text-[10px] opacity-70 mt-1.5 text-right font-medium">
        {time}
      </p>
    </div>
  );
}