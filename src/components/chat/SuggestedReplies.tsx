"use client";

import { motion } from "framer-motion";

interface Props {
  onSelect: (message: string) => void;
}

const replies = [
  "Great work! Keep going 🚀",
  "Please update today's progress.",
  "Let's schedule a review meeting.",
  "Can you push the latest code?",
  "Task completed successfully.",
  "Please check the submitted work.",
];

export default function SuggestedReplies({
  onSelect,
}: Props) {
  return (
    <div
      className="
        flex-shrink-0
        px-5
        py-4
        border-t
        border-white/10
      "
    >
      <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
        AI Suggested Replies
      </h3>

      <div className="flex flex-wrap gap-2">
        {replies.map((reply) => (
          <motion.button
            key={reply}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(reply)}
            className="
              px-4
              py-2
              rounded-xl
              bg-slate-800/60
              hover:bg-slate-700/80
              border
              border-white/10
              text-sm
              text-slate-300
              transition-all
              duration-200
            "
          >
            {reply}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
