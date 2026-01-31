import React from "react";
import { Text } from "../atoms";

/**
 * InfoRow Molecule Component
 * Display info with icon, label, and value
 *
 * @component
 * @example
 * <InfoRow icon={Mail} label="Email" value="user@example.com" />
 * <InfoRow icon={Phone} label="Phone" value="+91 98765 43210" copyable />
 */
const InfoRow = ({
  icon: Icon,
  label,
  value,
  copyable = false,
  onCopy,
  border = true,
  className = "",
  ...props
}) => {
  const borderClass = border ? "border-b border-gray-100 last:border-b-0" : "";

  const handleCopy = () => {
    if (copyable && onCopy) {
      onCopy(value);
    }
  };

  return (
    <div
      className={`flex items-center justify-between p-3 gap-3 ${borderClass} ${className}`}
      {...props}
    >
      <div className="flex items-center gap-3">
        {Icon && <Icon size={20} className="text-orange-500 flex-shrink-0" />}
        <div>
          <Text variant="caption" color="secondary">
            {label}
          </Text>
          <Text variant="body" weight="semibold" color="primary">
            {value}
          </Text>
        </div>
      </div>
      {copyable && (
        <button
          onClick={handleCopy}
          className="p-1.5 hover:bg-gray-100 rounded-full transition text-gray-400 hover:text-gray-600"
          title="Copy"
        >
          📋
        </button>
      )}
    </div>
  );
};

export default InfoRow;
