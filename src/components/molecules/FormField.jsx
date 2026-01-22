import React from "react";
import { Input, Label } from "../atoms";

/**
 * FormField Molecule Component
 * Combines Label + Input with shared state and validation
 *
 * @component
 * @example
 * <FormField
 *   label="Email"
 *   type="email"
 *   value={email}
 *   onChange={setEmail}
 *   required
 * />
 */
const FormField = ({
  label,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  placeholder,
  icon,
  size = "md",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <Label required={required} error={!!error}>
          {label}
        </Label>
      )}
      <Input
        type={type}
        value={value}
        onChange={onChange}
        error={error}
        placeholder={placeholder}
        icon={icon}
        size={size}
        {...props}
      />
    </div>
  );
};

export default FormField;
