import React from "react";

/**
 * Button Atom Component
 * Primary reusable button with multiple variants
 *
 * @component
 * @example
 * <Button>Click Me</Button>
 * <Button variant="secondary" size="lg">Large Secondary</Button>
 * <Button variant="gradient" disabled>Disabled</Button>
 */
const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  className = "",
  onClick,
  type = "button",
  ...props
}) => {
  const baseClasses =
    "font-semibold rounded-full transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-lg",
    secondary:
      "bg-white text-gray-900 border-2 border-gray-300 hover:bg-gray-50",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg",
    ghost: "bg-transparent text-gray-900 hover:bg-gray-100",
    gradient:
      "bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-bold shadow-md hover:shadow-lg",
  };

  const sizes = {
    sm: "px-3 py-2 text-xs sm:text-sm min-h-[36px]",
    md: "px-4 py-2.5 text-sm sm:text-base min-h-[40px]",
    lg: "px-6 py-3 text-base sm:text-lg min-h-[44px]",
  };

  const widthClass = fullWidth ? "w-full" : "";

  const finalClassName = `${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={finalClassName}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
