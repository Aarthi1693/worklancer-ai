"use client";

import { motion } from "framer-motion";

export default function EmptyChat() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 flex items-center justify-center text-4xl">
          💬
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">
          Welcome to WorkLancer Chat
        </h2>

        <p className="text-slate-400 leading-relaxed">
          Select a conversation from the left to start chatting with your Task Master.
        </p>

        <div className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-800/50 border border-white/10">
          <span className="text-blue-400">🤖</span>
          <span className="text-sm text-slate-300">AI-powered project communication</span>
        </div>
      </motion.div>
    </div>
  );
}
