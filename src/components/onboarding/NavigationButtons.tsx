"use client";

interface Props {
  current: number;
  total: number;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export default function NavigationButtons({
  current,
  total,
  onNext,
  onBack,
  onSkip,
}: Props) {
  return (
    <div className="mt-10 flex items-center justify-between">
      {current === 0 ? (
        <button
          onClick={onSkip}
          className="font-medium text-slate-500 transition hover:text-slate-800"
        >
          Skip
        </button>
      ) : (
        <button
          onClick={onBack}
          className="font-medium text-slate-500 transition hover:text-slate-800"
        >
          Back
        </button>
      )}

      <button
        onClick={onNext}
        className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700"
      >
        {current === total - 1 ? "Get Started" : "Next →"}
      </button>
    </div>
  );
}