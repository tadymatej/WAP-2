"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/state/useStore";
import { LucideIcon } from "lucide-react";
import React from "react";

type CustomNavItemProps = {
  name: string;
  Icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
};

/**
 *  Renders a custom navigation item.
 * @param props - The props for the CustomNavItem component.
 * @returns The rendered CustomNavItem component.
 */
const CustomNavItem: React.FC<CustomNavItemProps> = ({
  name,
  Icon,
  isActive,
  onClick,
}) => {
  const windowWidth = useStore((state) => state.filter.windowWidth);
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex cursor-pointer overflow-hidden whitespace-nowrap h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
        isActive ? "bg-muted font-medium text-primary" : "text-muted-foreground"
      )}
    >
      <Icon className="h-4 w-4 mr-2" />
      <span className="text-ellipsis">{name}</span>
    </div>
  );
};

export default CustomNavItem;
