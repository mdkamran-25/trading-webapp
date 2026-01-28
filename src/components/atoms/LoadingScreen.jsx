import React from "react";
import { colors } from "../../utils/colors";

const LoadingScreen = () => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: colors.lightBgContent }}
    >
      {/* Loading Container */}
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div
          className="w-12 h-12 rounded-full border-4 border-t-4 animate-spin"
          style={{
            borderColor: colors.lightPurpleOverlay33,
            borderTopColor: colors.lightPurple,
          }}
        />

        {/* Loading Text */}
        <p
          style={{ color: colors.mediumPurple }}
          className="text-sm font-medium"
        >
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
