import { LucideIcon } from "lucide-react";

interface InfoTileProps {
  Icon: LucideIcon;
  text: string;
}

/**
 * Renders an information tile with an icon and text.
 *
 * @param {object} props - The component props.
 * @param {React.ElementType} props.Icon - The icon component to be rendered.
 * @param {string} props.text - The text to be displayed in the tile.
 * @returns {React.ReactElement} The rendered information tile.
 */
export default function InfoTile({ Icon, text }: InfoTileProps) {
  return (
    <div className="flex flex-row items-center">
      <Icon className="w-5 h-5 text-slate-600 " />
      <div className="w-2" />
      <div className="font-normal text-sm text-slate-600">{text}</div>
    </div>
  );
}
