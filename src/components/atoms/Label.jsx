import React from "react";

/**
 * Label Atom Component
 * Reusable form label with optional required indicator
 *
 * @component
 * @example
 * <Label>Email Address</Label>
 * <Label required>Password</Label>
 */
const Label = ({
  children,
  required = false,
  error = false,
  htmlFor,
  className = "",
  ...props
}) => {
  const baseClasses = "block text-sm font-semibold mb-2";
  const textColor = error ? "text-red-700" : "text-gray-900";

  return (
    <label
      htmlFor={htmlFor}
      className={`${baseClasses} ${textColor} ${className}`}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export default Label;
