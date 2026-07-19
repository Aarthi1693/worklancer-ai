"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  count: number;
  max?: number;
  className?: string;
}

export default function UnreadBadge({
  count,
  max = 99,
  className = "",
}: Props) {
  const display =
    count > max ? `${max}+` : count > 0 ? `${count}` : null;

  return (
    <AnimatePresence>
      {display && (
        <motion.span
          key={display}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{
            scale: [0.5, 1.25, 1],
            opacity: 1,
          }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{
            duration: 0.35,
            times: [0, 0.6, 1],
            ease: "easeOut",
          }}
          className={`
            inline-flex
            items-center
            justify-center
            min-w-[18px]
            h-[18px]
            px-1
            rounded-full
            bg-red-500
            text-white
            text-[10px]
            font-bold
            leading-none
            shadow-lg
            shadow-red-500/30
            ${className}
          `}
        >
          {display}
        </motion.span>
      )}
    </AnimatePresence>
  );
}
