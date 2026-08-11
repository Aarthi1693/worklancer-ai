"use client";

interface Props {
  current: number;
  total: number;
}

export default function ProgressDots({ current, total }: Props) {
  return (
    <div className="flex items-center justify-center gap-3">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`h-3 rounded-full transition-all duration-300 ${
            current === index
              ? "w-10 bg-blue-600"
              : "w-3 bg-slate-300"
          }`}
        />
      ))}
    </div>
  );
}