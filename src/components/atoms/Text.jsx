import React from "react";

/**
 * Text Atom Component
 * Reusable typography component for consistent text rendering
 *
 * @component
 * @example
 * <Text variant="h1">Heading 1</Text>
 * <Text variant="body" color="secondary">Secondary text</Text>
 * <Text variant="label" weight="semibold">Form label</Text>
 */
const Text = ({
  children,
  variant = "body",
  weight = "normal",
  color = "primary",
  align = "left",
  className = "",
  as: Component = "span",
  ...props
}) => {
  const variants = {
    h1: "text-3xl font-bold",
    h2: "text-2xl font-bold",
    h3: "text-xl font-bold",
    h4: "text-lg font-semibold",
    h5: "text-base font-semibold",
    h6: "text-sm font-semibold",
    body: "text-base",
    label: "text-sm",
    caption: "text-xs",
    small: "text-xs",
  };

  const weights = {
    light: "font-light",
    normal: "font-normal",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const colors = {
    primary: "text-gray-900",
    secondary: "text-gray-600",
    tertiary: "text-gray-500",
    success: "text-green-700",
    error: "text-red-700",
    warning: "text-yellow-700",
    info: "text-blue-700",
    white: "text-white",
  };

  const aligns = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const finalClassName = `${variants[variant]} ${weights[weight]} ${colors[color]} ${aligns[align]} ${className}`;

  return (
    <Component className={finalClassName} {...props}>
      {children}
    </Component>
  );
};

export default Text;
