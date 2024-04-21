import { Circle } from "lucide-react";

interface DotInfoDetailTileProps {
  text: string;
  description: string;
}

/**
 * Renders a dot info detail tile component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to display.
 * @param {string} props.description - The description to display.
 * @returns {JSX.Element} The dot info detail tile component.
 */
export default function DotInfoDetailTile({
  text,
  description,
}: DotInfoDetailTileProps) {
  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-1">
        <div className="flex flex-row items-center">
          <Circle
            fill="rgb(148 163 184 / var(--tw-text-opacity))"
            className="w-3 h-3 text-slate-400 "
          />
          <div className="w-3" />
          <div className="font-normal text-sm text-slate-600">{text}</div>
        </div>
      </div>
      <div className="w-4" />
      <div className="font-normal text-sm text-end text-slate-600">
        {description}
      </div>
    </div>
  );
}
