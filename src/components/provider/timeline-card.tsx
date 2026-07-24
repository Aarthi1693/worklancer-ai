import { Clock, ChevronRight } from "lucide-react";

interface Props {
  phase: string;
  duration: string;
  tasks: string[];
  index: number;
}

export default function TimelineCard({ phase, duration, tasks, index }: Props) {
  return (
    <div className="relative flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className="
            w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600
            flex items-center justify-center text-white font-bold text-sm
            shadow-[0_0_15px_rgba(124,58,237,0.4)]
          "
        >
          {index + 1}
        </div>
        {index < 5 && (
          <div className="w-px h-full min-h-[40px] bg-gradient-to-b from-blue-500/50 to-transparent mt-2" />
        )}
      </div>

      <div
        className="
          flex-1 rounded-2xl border border-white/[0.08] bg-white/[0.03]
          p-4 space-y-3 hover:border-blue-500/20 transition-all mb-4
        "
      >
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-white">{phase}</h4>
          <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
            <Clock className="size-3" />
            {duration}
          </span>
        </div>

        <ul className="space-y-2">
          {tasks.map((task, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
              <ChevronRight className="size-4 text-blue-400 mt-0.5 shrink-0" />
              {task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
