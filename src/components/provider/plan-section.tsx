import { ReactNode } from "react";

interface Props {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  gradient?: "blue" | "purple" | "green" | "yellow";
}

const gradients = {
  blue: "from-blue-500/10 to-cyan-500/10 border-blue-500/20",
  purple: "from-purple-500/10 to-pink-500/10 border-purple-500/20",
  green: "from-green-500/10 to-emerald-500/10 border-green-500/20",
  yellow: "from-yellow-500/10 to-orange-500/10 border-yellow-500/20",
};

export default function PlanSection({ title, icon, children, className, gradient = "blue" }: Props) {
  return (
    <div
      className={`
        rounded-3xl border bg-gradient-to-br ${gradients[gradient]}
        backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.08)] p-6
        ${className ?? ""}
      `}
    >
      <div className="flex items-center gap-3 mb-5">
        {icon && <span className="text-blue-400">{icon}</span>}
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      {children}
    </div>
  );
}
