import { ReactNode } from "react";

interface Props {
  title: string;
  value: string;
  icon: ReactNode;
}

export default function DashboardCard({
  title,
  value,
  icon,
}: Props) {
  return (
    <div
  className="
  rounded-3xl
  border
  border-white/[0.08]
  bg-white/[0.03]
  backdrop-blur-xl
  shadow-[0_0_40px_rgba(59,130,246,0.08)]
  p-6
  hover:scale-[1.02]
  transition-all
  duration-300
  "
>
      <div className="flex items-center justify-between">
        <div
          className="
            w-12 h-12
            rounded-xl
            bg-blue-500/20
            flex
            items-center
            justify-center
            shadow-[0_0_20px_rgba(59,130,246,0.4)]
          "
        >
          {icon}
        </div>

        <span className="text-xs text-emerald-400">
  ● Live
</span>
      </div>

      <h3 className="mt-4 text-sm text-muted-foreground">
        {title}
      </h3>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}