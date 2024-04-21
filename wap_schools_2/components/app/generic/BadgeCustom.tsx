import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface BadgeCustomProps {
  Icon?: LucideIcon;
  iconColor?: string;
  text: string;
}

/**
 * Renders a custom badge component.
 *
 * @param {Object} props - The component props.
 * @param {React.ElementType} [props.Icon] - The icon component to be rendered.
 * @param {string} [props.iconColor] - The color of the icon.
 * @param {string} props.text - The text to be displayed in the badge.
 * @returns {React.ReactElement} The rendered badge component.
 */
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
