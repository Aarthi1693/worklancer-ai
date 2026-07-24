import { Users } from "lucide-react";

interface Props {
  role: string;
  responsibility: string;
}

export default function RoleCard({ role, responsibility }: Props) {
  return (
    <div
      className="
        rounded-2xl border border-white/[0.08] bg-white/[0.03]
        p-4 space-y-2 hover:border-purple-500/30 transition-all
      "
    >
      <div className="flex items-center gap-2">
        <Users className="size-4 text-purple-400" />
        <h4 className="font-semibold text-purple-300">{role}</h4>
      </div>
      <p className="text-sm text-slate-400 pl-6">{responsibility}</p>
    </div>
  );
}
