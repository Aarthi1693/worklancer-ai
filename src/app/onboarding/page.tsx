"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  BrainCircuit,
  Rocket,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const slides = [
  {
    icon: Sparkles,
    title: "Welcome to\nWorkLancer AI",
    subtitle: "Where AI Connects Talent with Opportunity",
    description:
      "An intelligent workforce platform built to connect businesses with skilled professionals through AI-powered collaboration.",

    features: [
      "AI Smart Matching",
      "Verified Professionals",
      "Secure Collaboration",
    ],

    gradient: "from-cyan-500 to-blue-600",
  },

  {
    icon: BrainCircuit,

    title: "AI That Works\nWith You",

    subtitle: "Smarter Recommendations. Better Productivity.",

    description:
      "Experience intelligent project matching, personalized recommendations, and AI-powered productivity insights.",

    features: [
      "Project Recommendations",
      "Smart Analytics",
      "Productivity Insights",
    ],

    gradient: "from-violet-500 to-indigo-600",
  },

  {
    icon: Rocket,

    title: "Build.\nCollaborate.\nGrow.",

    subtitle: "Everything You Need In One Platform",

    description:
      "Manage projects, communicate, submit work, receive payments, and grow your professional journey effortlessly.",

    features: [
      "Real-time Collaboration",
      "Project Management",
      "Secure Payments",
    ],

    gradient: "from-emerald-500 to-teal-500",
  },
];

export default function OnboardingPage() {
  const router = useRouter();

  const [index, setIndex] = useState(0);

  const finish = () => {
    localStorage.setItem("onboardingCompleted", "true");
    router.replace("/login");
  };

  const next = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      finish();
    }
  };

  const slide = slides[index];

  const Icon = slide.icon;

  const [stars, setStars] = useState<
    { left: string; top: string; duration: number }[]
  >([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 28 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 2 + Math.random() * 3,
      }))
    );
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">

      {/* Background Glow */}

      <div className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full bg-purple-600/20 blur-[120px]" />

      {/* Floating Stars */}

      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute h-[2px] w-[2px] rounded-full bg-white/40"
          style={{
  left: star.left,
  top: star.top,
}}
          animate={{
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Skip Button */}

      

      <div className="relative z-10 w-full max-w-3xl px-8">

        <AnimatePresence mode="wait">

          <motion.div
            key={index}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.55 }}
            className="rounded-[36px] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,.45)] ring-1 ring-white/10 text-center"
          >

            {/* Icon */}

            <motion.div
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mb-8 flex justify-center"
            >
              <div
                className={`flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r ${slide.gradient} shadow-[0_0_35px_rgba(59,130,246,.45)]`}
              >
                <Icon size={48} className="text-white" />
              </div>
            </motion.div>

            {/* Title */}

            <h1 className="text-[44px] font-extrabold leading-tight tracking-[-0.03em] text-white whitespace-pre-line">
  {slide.title}
</h1>

            {/* Subtitle */}

            <p className="mt-4 text-xl text-slate-200">
              {slide.subtitle}
            </p>

            {/* Description */}

            <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-slate-400">
              {slide.description}
            </p>

            {/* Feature Card */}

            <div className="mt-10 rounded-3xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl">

                          <div className="grid gap-3 md:grid-cols-3">
                {slide.features.map((feature) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-left"
                  >
                    <CheckCircle2 className="h-5 w-5 text-cyan-400" />

                    <span className="text-sm font-medium text-slate-200">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </AnimatePresence>

        {/* Progress */}

        <div className="mt-12 flex justify-center gap-3">
          {slides.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === index ? 56 : 10,
              }}
              transition={{ duration: 0.35 }}
              className={`h-2 rounded-full ${
                i === index
                  ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                  : "bg-white/20"
              }`}
            />
          ))}
        </div>

        {/* Bottom Buttons */}

        <div className="mt-12 flex items-center justify-center gap-4">

          <button
            onClick={finish}
            className="rounded-xl border border-white/10 bg-slate-800/60  hover:bg-slate-700 px-6 py-3 text-sm font-medium text-slate-300 backdrop-blur-xl transition hover:bg-white/10 hover:text-white"
          >
            Skip
          </button>

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={next}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-[0_15px_35px_rgba(59,130,246,.35)] hover:shadow-cyan-500/40 transition-all duration-300"
          >
            {index === slides.length - 1
              ? "Get Started"
              : "Next"}

            <ArrowRight size={20} />
          </motion.button>

        </div>

      </div>

    </div>
  );
}
