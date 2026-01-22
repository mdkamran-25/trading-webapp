import React from "react";

/**
 * Divider Atom Component
 * Reusable horizontal or vertical divider
 *
 * @component
 * @example
 * <Divider />
 * <Divider direction="vertical" />
 * <Divider color="orange" />
 */
const Divider = ({
  direction = "horizontal",
  color = "gray",
  thickness = "sm",
  margin = "md",
  className = "",
  ...props
}) => {
  const colors = {
    gray: "bg-gray-200",
    orange: "bg-orange-300",
    yellow: "bg-yellow-300",
    light: "bg-gray-100",
  };

  const thicknesses = {
    sm: "1px",
    md: "2px",
    lg: "3px",
  };

  const margins = {
    sm: "my-2",
    md: "my-4",
    lg: "my-6",
  };

  if (direction === "vertical") {
    return (
      <div
        className={`inline-block ${colors[color]} mx-2 ${className}`}
        style={{
          width: thicknesses[thickness],
          height: "24px",
        }}
        {...props}
      />
    );
  }

  return (
    <div
      className={`w-full ${colors[color]} ${margins[margin]} ${className}`}
      style={{ height: thicknesses[thickness] }}
      {...props}
    />
  );
};

export default Divider;
