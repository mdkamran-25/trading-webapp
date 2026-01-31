import React from "react";
import { Card, Text } from "../atoms";

/**
 * StatCard Molecule Component
 * Displays metric with icon, label, and value
 *
 * @component
 * @example
 * <StatCard icon={TrendingUp} label="Total Buy" value="₹5,000" />
 * <StatCard icon={Wallet} label="Balance" value="₹1,000" variant="orange" />
 */
const StatCard = ({
  icon: Icon,
  label,
  value,
  variant = "default",
  onClick,
  className = "",
  ...props
}) => {
  const variants = {
    default: "bg-white border border-gray-200",
    orange: "bg-orange-50 border border-orange-200",
    yellow: "bg-yellow-50 border border-yellow-200",
    green: "bg-green-50 border border-green-200",
  };

  const textColor = {
    default: "text-gray-900",
    orange: "text-orange-700",
    yellow: "text-yellow-700",
    green: "text-green-700",
  };

  return (
    <Card
      variant="flat"
      padding="md"
      className={`${variants[variant]} cursor-pointer hover:shadow-md transition-all active:scale-95 ${className}`}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-start gap-2.5 sm:gap-3">
        {Icon && (
          <div className="flex-shrink-0 p-1.5 bg-opacity-10 rounded-lg sm:p-2">
            <Icon size={20} className={`sm:w-6 sm:h-6 ${textColor[variant]}`} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <Text variant="caption" color="secondary">
            {label}
          </Text>
          <Text variant="h4" weight="bold" color="primary" className="mt-1">
            {value}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
