import React from "react";

/**
 * Card Atom Component
 * Reusable container with consistent styling, shadow, and padding
 *
 * @component
 * @example
 * <Card>Content here</Card>
 * <Card variant="elevated" className="p-6">Data card</Card>
 */
const Card = ({
  children,
  variant = "default",
  padding = "md",
  className = "",
  ...props
}) => {
  const baseClasses = "bg-white rounded-2xl transition duration-200";

  const variants = {
    default: "shadow-md border border-gray-200",
    elevated: "shadow-lg border border-gray-100",
    flat: "border border-gray-200",
    gradient:
      "bg-gradient-to-br from-yellow-50 to-orange-50 border border-orange-200",
  };

  const paddings = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
    xl: "p-8",
  };

  const finalClassName = `${baseClasses} ${variants[variant]} ${paddings[padding]} ${className}`;

  return (
    <div className={finalClassName} {...props}>
      {children}
    </div>
  );
};

export default Card;
