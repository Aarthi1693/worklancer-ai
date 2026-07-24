import { Badge } from "@/components/ui/badge";

interface Props {
  skills: string[];
}

export default function SkillBadge({ skills }: Props) {
  if (!skills || skills.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, idx) => (
        <Badge
          key={idx}
          variant="outline"
          className="
            rounded-lg border-blue-500/30 bg-blue-500/10 text-blue-300
            px-3 py-1 text-sm font-medium
          "
        >
          {skill}
        </Badge>
      ))}
    </div>
  );
}
