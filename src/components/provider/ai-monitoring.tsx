import { Bot } from "lucide-react";

export default function AIMonitoring() {
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
      <div className="flex items-center gap-2 mb-4">
        <Bot size={20} />
        <h2 className="font-semibold">
          AI Monitoring Center
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">
            Productivity Score
          </p>

          <h3 className="text-3xl font-bold mt-2">
            92%
          </h3>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">
            Team Efficiency
          </p>

          <h3 className="text-3xl font-bold mt-2">
            88%
          </h3>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">
            AI Health Score
          </p>

          <h3 className="text-3xl font-bold mt-2">
            97%
          </h3>
        </div>
      </div>
    </div>
  );
}