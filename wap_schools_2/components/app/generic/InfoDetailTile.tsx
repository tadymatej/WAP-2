import { LucideIcon } from "lucide-react";
import InfoTile from "./InfoTile";

interface InfoDetailTileProps {
  Icon: LucideIcon;
  text: string;
  description: string;
  subtext?: string;
}

/**
 * Renders a tile component with an icon, text, description, and optional subtext.
 *
 * @param {Object} props - The component props.
 * @param {React.ElementType} props.Icon - The icon component to be rendered.
 * @param {string} props.text - The main text to be displayed.
 * @param {string} props.description - The description text to be displayed.
 * @param {string} [props.subtext] - The optional subtext to be displayed.
 * @returns {React.ReactNode} The rendered InfoDetailTile component.
 */
export default function InfoDetailTile({
  Icon,
  text,
  description,
  subtext,
}: InfoDetailTileProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-full">
        <div className="flex flex-1">
          <InfoTile Icon={Icon} text={text} />
        </div>
        <div className="w-3" />
        <div className="font-normal text-right text-sm text-slate-600">
          {description}
        </div>
      </div>
      {subtext && (
        <>
          <div className="h-2" />
          <div className="pl-8 font-light text-left text-xs text-slate-600 w-full">
            {subtext}
          </div>
        </>
      )}
    </div>
  );
}
