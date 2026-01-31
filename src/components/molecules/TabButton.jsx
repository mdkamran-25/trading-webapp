import React from "react";

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
    "px-4 py-2.5 font-semibold text-sm rounded-2xl transition duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const activeClass = isActive
    ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 shadow-md"
    : "bg-white text-gray-600 border-2 border-gray-200 hover:border-orange-300";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${activeClass} ${className}`}
      {...props}
    >
      {Icon && <Icon size={18} />}
      <span>{label}</span>
    </button>
  );
};

export default TabButton;
