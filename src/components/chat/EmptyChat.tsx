"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function EmptyChat() {
  return (
    <div className="flex-1 flex items-center justify-center bg-[#0f172a]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="text-center max-w-md"
      >
        <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-2xl shadow-blue-500/20">
          <MessageCircle className="w-11 h-11 text-white" />
        </div>

        <h2 className="mt-8 text-3xl font-bold text-white">
          Welcome to WorkLancer Chat
        </h2>

        <p className="mt-4 text-slate-400 leading-7">
          Select a conversation from the left to start chatting with
          your client or freelancer.
        </p>

        <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/10 px-5 py-3">
          <span className="text-xl">🤖</span>

          <span className="text-sm text-blue-300">
            AI-powered collaboration & communication
          </span>
        </div>
      </motion.div>
    </div>
  );
}