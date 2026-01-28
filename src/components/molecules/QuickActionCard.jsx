import React from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../utils/colors";

const QuickActionCard = ({ icon, title, description, onClick, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (path) {
      navigate(path);
    }
  };

  // Check if icon is a string (emoji) or a React component (Lucide icon)
  const isEmoji = typeof icon === "string";
  const Icon = !isEmoji ? icon : null;

  return (
    <div
      onClick={handleClick}
      className="p-6 transition-all rounded-lg cursor-pointer hover:scale-105 hover:shadow-lg"
      style={{
        backgroundColor: colors.lightBgCard,
        border: `1px solid ${colors.lightPurpleOverlay50}`,
        boxShadow: `0 2px 8px ${colors.lightPurpleOverlay15}`,
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="p-3 rounded-lg text-2xl flex items-center justify-center"
          style={{ backgroundColor: colors.lightPurple }}
        >
          {isEmoji ? (
            <span>{icon}</span>
          ) : (
            <Icon size={24} style={{ color: colors.darkPurple }} />
          )}
        </div>
        <div className="flex-1">
          <h3
            style={{ color: colors.darkPurple }}
            className="mb-1 font-semibold"
          >
            {title}
          </h3>
          <p style={{ color: colors.mediumPurple }} className="text-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickActionCard;
