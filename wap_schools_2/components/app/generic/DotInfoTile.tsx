import { Circle } from "lucide-react";

interface DotInfoTileProps {
  text: string;
}

export default function DotInfoTile({ text }: DotInfoTileProps) {
  return (
    <div className="flex flex-row items-center">
      <Circle
        className="w-3 h-3 text-slate-900"
        fill="rgb(15 23 42 / var(--tw-text-opacity))"
      />
      <div className="w-2" />
      <div className="font-medium text-sm text-end text-slate-900">{text}</div>
    </div>
  );
}
