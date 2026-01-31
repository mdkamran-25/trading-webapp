import React from "react";
import { colors } from "../../utils/colors";

/**
 * TabButton Molecule Component
 * Individual tab button with active state
 *
 * @component
 * @example
 * <TabButton label="Active" isActive={true} onClick={handleClick} />
 * <TabButton label="Inactive" isActive={false} onClick={handleClick} />
 */
const TabButton = ({
  label,
  isActive = false,
  icon: Icon,
  onClick,
  disabled = false,
  className = "",
  ...props
}) => {
  const baseClasses =
    "px-4 py-2.5 font-semibold text-sm rounded-2xl transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const activeStyle = isActive
    ? {
        background: `linear-gradient(135deg, ${colors.darkPurple} 0%, ${colors.mediumPurple} 100%)`,
        color: "white",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }
    : {
        backgroundColor: "white",
        color: colors.textLight,
        border: `2px solid ${colors.borderLight}`,
      };

  const hoverClass = !isActive
    ? "hover:border-purple-300 hover:text-purple-600"
    : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${hoverClass} ${className}`}
      style={activeStyle}
      {...props}
    >
      {Icon && <Icon size={18} />}
      <span>{label}</span>
    </button>
  );
};

export default TabButton;
