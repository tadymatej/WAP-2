import { Circle } from "lucide-react";

interface DotInfoTileProps {
  text: string;
}

/**
 * Renders a dot info tile component.
 *
 * @param {DotInfoTileProps} props - The props for the DotInfoTile component.
 * @param {string} props.text - The text to be displayed in the tile.
 * @returns {JSX.Element} The rendered DotInfoTile component.
 */
export default function DotInfoTile({ text }: DotInfoTileProps) {
  return (
    <div className="flex flex-row items-center">
      <Circle
        className="w-3 h-3 text-slate-900"
        fill="rgb(15 23 42 / var(--tw-text-opacity))"
      />
      <div className="w-2" />
      <div className="font-medium text-sm text-start text-slate-900">
        {text}
      </div>
    </div>
  );
}
