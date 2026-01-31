import React from "react";
import { colors } from "../../utils/colors";

/**
 * AuthLayout Component
 * Simple layout for authentication pages (Login, Register, etc.)
 * No Navbar, Sidebar, or Footer - just the content
 */
const AuthLayout = ({ children }) => {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.lightBgContent }}
    >
      {children}
    </div>
  );
};

export default AuthLayout;
