import React from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../utils/colors";

const QuickActionCard = ({
  icon,
  title,
  description,
  details,
  onClick,
  path,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (path) {
      navigate(path);
    }
  };

  // Check if icon is a string (emoji or SVG path), a React component (Lucide icon), or SVG file
  const isEmoji = typeof icon === "string" && !icon.includes(".svg");
  const isSVG = typeof icon === "string" && icon.includes(".svg");
  const Icon = !isEmoji && !isSVG ? icon : null;

  return (
    <div
      onClick={handleClick}
      className="p-4 transition-all rounded-lg cursor-pointer sm:p-5 md:p-6 hover:scale-105 hover:shadow-lg active:scale-95"
      style={{
        backgroundColor: colors.lightBgCard,
        border: `1px solid ${colors.lightPurpleOverlay50}`,
        boxShadow: `0 2px 8px ${colors.lightPurpleOverlay15}`,
      }}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div
          className="flex items-center justify-center flex-shrink-0 p-2.5 text-xl rounded-lg sm:p-3 sm:text-2xl"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
          }}
        >
          {isEmoji ? (
            <span>{icon}</span>
          ) : isSVG ? (
            <img src={icon} alt={title} className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <Icon
              size={20}
              className="sm:w-6 sm:h-6"
              style={{ color: colors.darkPurple }}
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3
            style={{ color: colors.darkPurple }}
            className="mb-1 text-sm font-semibold truncate sm:text-base"
          >
            {title}
          </h3>
          <p
            style={{ color: colors.mediumPurple }}
            className="mb-2 text-xs leading-relaxed sm:text-sm"
          >
            {description}
          </p>
          {details && (
            <p
              style={{ color: colors.mediumPurple }}
              className="text-xs leading-relaxed opacity-75 line-clamp-2"
            >
              {details}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickActionCard;
