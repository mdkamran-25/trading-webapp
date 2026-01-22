import React from "react";

/**
 * Badge Atom Component
 * Reusable status, info, and tag badges with multiple variants
 *
 * @component
 * @example
 * <Badge>Active</Badge>
 * <Badge variant="success" size="lg">Completed</Badge>
 * <Badge variant="warning" icon={AlertIcon}>Warning</Badge>
 */
const Badge = ({
  children,
  variant = "info",
  size = "md",
  icon: Icon,
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center gap-1.5 font-semibold rounded-full transition duration-200";

  const variants = {
    info: "bg-blue-50 text-blue-700 border border-blue-200",
    success: "bg-green-50 text-green-700 border border-green-200",
    error: "bg-red-50 text-red-700 border border-red-200",
    warning: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    primary: "bg-orange-50 text-orange-700 border border-orange-200",
    gray: "bg-gray-100 text-gray-700 border border-gray-300",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const finalClassName = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <div className={finalClassName} {...props}>
      {Icon && <Icon size={16} />}
      {children}
    </div>
  );
};

export default Badge;
