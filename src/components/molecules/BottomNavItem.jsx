import React from "react";
import { Text } from "../atoms";

/**
 * BottomNavItem Molecule Component
 * Single navigation item for bottom navigation bar
 *
 * @component
 * @example
 * <BottomNavItem icon={Home} label="Home" isActive={true} onClick={handleClick} />
 */
const BottomNavItem = ({
  icon: Icon,
  label,
  isActive = false,
  onClick,
  badge,
  className = "",
  ...props
}) => {
  const baseClasses =
    "flex flex-col items-center justify-center py-2 px-3 gap-1.5 relative rounded-xl transition duration-200";
  const activeClass = isActive
    ? "text-orange-500"
    : "text-gray-600 hover:text-orange-400";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${activeClass} ${className}`}
      {...props}
    >
      <div className="relative">
        {Icon && <Icon size={24} />}
        {badge && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {badge}
          </div>
        )}
      </div>
      <Text
        variant="caption"
        color={isActive ? "primary" : "secondary"}
        weight="semibold"
      >
        {label}
      </Text>
    </button>
  );
};

export default BottomNavItem;
