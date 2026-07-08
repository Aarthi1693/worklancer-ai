import { Users } from "lucide-react";

export default function TeamRecommendation() {
  return (
    <div
  className="
  rounded-3xl
  border
  border-purple-500/20
  bg-white/[0.03] backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)]
  backdrop-blur-xl
  p-6
  "
>
      <div className="flex items-center gap-2 mb-4">
        <Users size={20} />
        <h2 className="font-semibold">
          Team Recommendations
        </h2>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border p-4">
          UI/UX Designer
          <p className="text-sm text-muted-foreground">
            98% skill match
          </p>
        </div>

        <div className="rounded-xl border p-4">
          Frontend Developer
          <p className="text-sm text-muted-foreground">
            95% skill match
          </p>
        </div>

        <div className="rounded-xl border p-4">
          AI Engineer
          <p className="text-sm text-muted-foreground">
            91% skill match
          </p>
        </div>
      </div>
    </div>
  );
}