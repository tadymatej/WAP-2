import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface BadgeCustomProps {
  Icon?: LucideIcon;
  iconColor?: string;
  text: string;
}

export default function BadgeCustom({
  Icon = undefined,
  iconColor = undefined,
  text,
}: BadgeCustomProps) {
  return (
    <Badge variant="secondary" className="flex flex-row">
      {Icon && <Icon className="w-4 h-4" fill={iconColor} color={iconColor} />}
      {Icon && <div className="w-1.5" />}
      <div className="font-medium text-xs text-foreground">{text}</div>
    </Badge>
  );
}
