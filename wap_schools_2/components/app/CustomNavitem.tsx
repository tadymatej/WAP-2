import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

type CustomNavItemProps = {
  name: string;
  Icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
};

const CustomNavItem: React.FC<CustomNavItemProps> = ({
  name,
  Icon,
  isActive,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
        isActive ? "bg-muted font-medium text-primary" : "text-muted-foreground"
      )}
    >
      <Icon className="h-4 w-4 mr-2" />
      {name}
    </div>
  );
};

export default CustomNavItem;
