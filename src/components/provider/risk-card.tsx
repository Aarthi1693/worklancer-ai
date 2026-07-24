import { AlertTriangle, Lightbulb } from "lucide-react";

interface Props {
  risk: string;
  solution: string;
}

export default function RiskCard({ risk, solution }: Props) {
  return (
    <div
      className="
        rounded-2xl border border-yellow-500/20 bg-yellow-500/5
        p-4 space-y-2
      "
    >
      <div className="flex items-start gap-2">
        <AlertTriangle className="size-4 text-yellow-400 mt-0.5 shrink-0" />
        <p className="text-sm font-medium text-yellow-300">{risk}</p>
      </div>
      <div className="flex items-start gap-2 pl-6">
        <Lightbulb className="size-4 text-green-400 mt-0.5 shrink-0" />
        <p className="text-sm text-slate-400">{solution}</p>
      </div>
    </div>
  );
}
