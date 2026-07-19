"use client";

interface Props {
  name?: string;
}

export default function TypingIndicator({ name = "Aarth" }: Props) {
  return (
    <div className="flex justify-start">
      <div
        className="
          max-w-[70%]
          px-5
          py-3
          rounded-2xl
          shadow-lg
          shadow-black/20
          bg-slate-800
          text-white
        "
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
          </div>

          <p className="text-xs opacity-80 font-medium">
            {name} is typing...
          </p>
        </div>
      </div>
    </div>
  );
}
