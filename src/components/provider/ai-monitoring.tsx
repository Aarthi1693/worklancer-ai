import { Bot } from "lucide-react";

interface ProjectItem {
  status?: string;
}

interface Insight {
  label: string;
  value: string;
  width: string;
  colorClass: string;
}

interface Props {
  projects?: ProjectItem[];
}

const INSIGHTS: Insight[] = [
  { label: "Average Completion Time", value: "4.2 Days", width: "70%", colorClass: "text-white" },
  { label: "AI Recommendation Score", value: "94%", width: "94%", colorClass: "text-emerald-400" },
  { label: "Project Success Probability", value: "91%", width: "91%", colorClass: "text-blue-400" },
  { label: "Worker Satisfaction", value: "96%", width: "96%", colorClass: "text-purple-400" },
];

export default function AIMonitoring({ projects = [] }: Props) {
  const completedCount = projects.filter((p) => p.status === "COMPLETED").length;

  const insights = INSIGHTS.map((insight) => {
    if (insight.label === "Project Success Probability" && projects.length > 0) {
      const prob = Math.min(100, Math.round((completedCount / projects.length) * 100));
      return { ...insight, value: `${prob}%`, width: `${prob}%` };
    }
    return insight;
  });

  return (
    <div
      className="
        rounded-3xl
        border
        border-purple-500/20
        shadow-[0_0_40px_rgba(124,58,237,0.15)]
        bg-white/[0.03]
        backdrop-blur-xl
        p-6
      "
    >
      <div className="flex items-center gap-2 mb-6">
        <Bot size={20} />
        <h2 className="font-semibold text-white">
          AI Monitoring Center
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight) => (
          <div key={insight.label} className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
            <p className="text-sm text-slate-400 mb-2">{insight.label}</p>
            <h3 className={`text-2xl font-bold ${insight.colorClass}`}>{insight.value}</h3>
            <div className="mt-3 h-1 rounded-full bg-slate-800">
              <div
                className="h-1 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500"
                style={{ width: insight.width }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
