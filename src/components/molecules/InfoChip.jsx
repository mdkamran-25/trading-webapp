import React from "react";
import { Text } from "../atoms";

/**
 * InfoChip Molecule Component
 * Icon + text combination for info display
 *
 * @component
 * @example
 * <InfoChip icon={Users} label="5K Users" color="orange" />
 * <InfoChip icon={TrendingUp} label="Active" color="green" />
 */
const InfoChip = ({
  icon: Icon,
  label,
  color = "orange",
  size = "md",
  onClick,
  className = "",
  ...props
}) => {
  const sizeClasses = {
    sm: "px-2.5 py-1 gap-2",
    md: "px-3 py-1.5 gap-2",
    lg: "px-4 py-2 gap-3",
  };

  const colorClasses = {
    orange: "bg-orange-50 text-orange-700 border-orange-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
    green: "bg-green-50 text-green-700 border-green-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
  };

  const iconSize = size === "sm" ? 16 : size === "md" ? 18 : 20;

  return (
    <div
      className={`inline-flex items-center ${sizeClasses[size]} rounded-full border ${colorClasses[color]} font-semibold text-xs transition cursor-pointer hover:shadow-md ${className}`}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon size={iconSize} />}
      <span>{label}</span>
    </div>
  );
};

export default InfoChip;
