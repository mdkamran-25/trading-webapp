import React from "react";
import { Text } from "../atoms";

/**
 * MetricRow Molecule Component
 * Displays label-value pairs with optional border and styling
 *
 * @component
 * @example
 * <MetricRow label="Total Balance" value="₹5,000" />
 * <MetricRow label="Status" value="Active" highlight />
 */
const MetricRow = ({
  label,
  value,
  icon: Icon,
  highlight = false,
  border = true,
  onClick,
  className = "",
  ...props
}) => {
  const borderClass = border ? "border-b border-gray-200" : "";
  const highlightClass = highlight ? "bg-orange-50" : "";
  const hoverClass = onClick ? "cursor-pointer hover:bg-gray-50" : "";

  return (
    <div
      className={`flex items-center justify-between p-3 gap-4 ${borderClass} ${highlightClass} ${hoverClass} transition duration-200 ${className}`}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-center gap-3">
        {Icon && <Icon size={20} className="text-orange-500" />}
        <Text variant="label" color="secondary">
          {label}
        </Text>
      </div>
      <Text variant="body" weight="semibold" color="primary">
        {value}
      </Text>
    </div>
  );
};

export default MetricRow;
