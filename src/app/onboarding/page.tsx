"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AnimatePresence } from "framer-motion";

import OnboardingCard from "@/components/onboarding/OnboardingCard";
import NavigationButtons from "@/components/onboarding/NavigationButtons";
import ProgressDots from "@/components/onboarding/ProgressDots";
import { onboardingData } from "@/components/onboarding/onboarding-data";

export default function OnboardingPage() {
  const router = useRouter();

  const [current, setCurrent] = useState(0);

  const total = onboardingData.length;

  const finishOnboarding = () => {
    Cookies.set("hasSeenOnboarding", "true", {
      expires: 365,
    });

    router.replace("/login");
  };

  const handleNext = () => {
    if (current === total - 1) {
      finishOnboarding();
    } else {
      setCurrent((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    finishOnboarding();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F8F6] px-6 py-10">
      <div className="w-full max-w-3xl rounded-[36px] border border-slate-200 bg-white p-8 shadow-xl md:p-12">
        <AnimatePresence mode="wait">
          <OnboardingCard
            key={onboardingData[current].id}
            image={onboardingData[current].image}
            title={onboardingData[current].title}
            description={onboardingData[current].description}
          />
        </AnimatePresence>

        <div className="mt-12">
          <ProgressDots current={current} total={total} />
        </div>

        <NavigationButtons
          current={current}
          total={total}
          onNext={handleNext}
          onBack={handleBack}
          onSkip={handleSkip}
        />
      </div>
    </div>
  );
}