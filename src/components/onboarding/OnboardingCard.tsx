"use client";

import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

interface Props {
  image: StaticImageData;
  title: string;
  description: string;
}

export default function OnboardingCard({
  image,
  title,
  description,
}: Props) {
  return (
    <motion.div
      key={title}
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <Image
        src={image}
        alt={title}
        width={320}
        height={320}
        className="mb-10 rounded-3xl object-contain"
        priority
      />

      <h1 className="text-center text-3xl font-bold text-slate-900">
        {title}
      </h1>

      <p className="mt-5 max-w-md text-center text-lg leading-8 text-slate-500">
        {description}
      </p>
    </motion.div>
  );
}