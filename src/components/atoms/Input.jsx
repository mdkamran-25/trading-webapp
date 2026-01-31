import React from "react";

/**
 * Input Atom Component
 * Reusable input field with label, error states, and validation
 *
 * @component
 * @example
 * <Input label="Email" type="email" placeholder="Enter email" />
 * <Input type="password" label="Password" error="Password is required" />
 */
const Input = ({
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  icon: Icon,
  size = "md",
  className = "",
  ...props
}) => {
  const baseInputClasses =
    "w-full px-3 sm:px-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm sm:text-base";

  const sizes = {
    sm: "py-2 min-h-[36px]",
    md: "py-2.5 sm:py-3 min-h-[40px]",
    lg: "py-3 sm:py-4 min-h-[44px]",
  };

  const borderColor = error
    ? "border-red-500 focus:border-red-600 focus:ring-red-200"
    : "";

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`${baseInputClasses} ${sizes[size]} ${borderColor} ${className}`}
          {...props}
        />
        {Icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={20} />
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>
      )}
    </div>
  );
};

export default Input;
