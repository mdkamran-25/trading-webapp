import React from "react";

/**
 * Icon Atom Component
 * Wrapper for lucide icons with consistent sizing and styling
 *
 * @component
 * @example
 * <Icon icon={Home} size="md" />
 * <Icon icon={ArrowLeft} color="orange" size="lg" />
 */
const Icon = ({
  icon: IconComponent,
  size = "md",
  color = "gray",
  className = "",
  ...props
}) => {
  const sizes = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40,
  };

  const colors = {
    gray: "text-gray-700",
    orange: "text-orange-500",
    white: "text-white",
    red: "text-red-500",
    green: "text-green-600",
    yellow: "text-yellow-500",
  };

  if (!IconComponent) return null;

  return (
    <IconComponent
      size={sizes[size]}
      className={`${colors[color]} ${className}`}
      {...props}
    />
  );
};

export default Icon;
