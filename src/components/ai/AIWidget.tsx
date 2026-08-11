"use client";

import { useRouter, usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function AIWidget() {
  const router = useRouter();
  const pathname = usePathname();

  const isMaster = pathname.startsWith("/master");

  const handleClick = () => {
    router.push(
      isMaster
        ? "/master/ai-assistant"
        : "/provider/ai"
    );
  };

  return (
    <>
      {/* AI Button */}
      <button
        onClick={handleClick}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-5 py-4 text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-blue-300"
      >
        <Sparkles className="h-6 w-6" />

        <div className="text-left">
          <p className="text-sm font-semibold">
            Need Help?
          </p>

          <p className="text-xs text-blue-100">
            Ask Me
          </p>
        </div>
      </button>

      {/* Pulse Ring */}
      <div className="pointer-events-none fixed bottom-8 right-8 z-40 h-16 w-16 animate-ping rounded-full bg-blue-400 opacity-20" />
    </>
  );
}