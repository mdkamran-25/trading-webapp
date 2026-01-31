import React from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../utils/colors";

const PopularFeaturesSection = ({ navigate: navProp, UserData = {} }) => {
  const routerNavigate = useNavigate();
  const navigate = navProp || routerNavigate;
  const userId = UserData?._id || "";

  return (
    <div className="w-full px-3 mx-auto mb-4 sm:px-4 sm:mb-6 md:px-6 md:mb-8 lg:pl-24 lg:pr-24 xl:pl-32 xl:pr-8 lg:mb-10">
      <h2
        style={{ color: colors.darkPurple }}
        className="mb-3 text-base font-semibold sm:mb-4 sm:text-lg md:text-xl"
      >
        Popular Features
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-5 md:grid-cols-2">
        {/* Lucky Draw */}
        <div
          onClick={() => navigate("/luckydraw", { state: userId })}
          className="relative p-6 overflow-hidden transition-all rounded-lg cursor-pointer sm:p-8 md:p-10 hover:scale-105 hover:shadow-lg"
          style={{
            backgroundColor: colors.lightBgCard,
            border: `1px solid ${colors.lightPurpleOverlay50}`,
            boxShadow: `0 2px 8px ${colors.lightPurpleOverlay15}`,
          }}
        >
          {/* Floating Lottery Balls */}
          <div className="absolute top-4 right-6 sm:top-6 sm:right-8 md:right-14 md:top-10">
            <div
              className="absolute w-4 h-4 rounded-full animate-bounce"
              style={{
                backgroundColor: colors.lightPurple,
                animationDelay: "0s",
                animationDuration: "2s",
              }}
            />
            <div
              className="absolute w-3 h-3 rounded-full left-6 animate-bounce"
              style={{
                backgroundColor: colors.mediumPurple,
                animationDelay: "0.5s",
                animationDuration: "2.5s",
              }}
            />
            <div
              className="absolute w-2 h-2 rounded-full left-3 top-4 animate-bounce"
              style={{
                backgroundColor: colors.darkPurple,
                animationDelay: "1s",
                animationDuration: "3s",
              }}
            />
          </div>

          {/* Treasure Sparkles */}
          <div className="absolute top-8 right-8 sm:top-10 sm:right-10 md:top-12 md:right-12">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 animate-ping"
                style={{
                  backgroundColor: colors.lightPurple,
                  left: `${(i % 3) * 8}px`,
                  top: `${Math.floor(i / 3) * 8}px`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: "1.5s",
                }}
              />
            ))}
          </div>

          <h4
            style={{ color: colors.darkPurple }}
            className="flex items-center gap-2 mb-3 text-base font-semibold sm:gap-3 sm:mb-4 sm:text-lg"
          >
            <div className="relative">
              <img
                src="/Money bag-Rupee.svg"
                alt="Money bag"
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9"
              />
              {/* Golden glow effect */}
              <div
                className="absolute rounded-full -inset-1 animate-pulse"
                style={{
                  backgroundColor: colors.lightPurpleOverlay30,
                  animationDuration: "2s",
                }}
              />
            </div>
            Lucky Draw
          </h4>

          <p
            style={{ color: colors.mediumPurple }}
            className="mb-3 text-sm leading-relaxed"
          >
            Win amazing prizes by staying active
          </p>

          {/* Context Tags */}
          <p
            style={{ color: colors.lightPurple }}
            className="text-xs leading-relaxed"
          >
            Auto-entry • No extra cost • Winners announced weekly
          </p>
        </div>

        {/* Help & Support */}
        <div
          onClick={() => navigate("/support")}
          className="relative p-10 overflow-hidden transition-all rounded-lg cursor-pointer hover:scale-105 hover:shadow-lg"
          style={{
            backgroundColor: colors.lightBgCard,
            border: `1px solid ${colors.lightPurpleOverlay50}`,
            boxShadow: `0 2px 8px ${colors.lightPurpleOverlay15}`,
          }}
        >
          {/* Security Shield Pattern */}
          <div className="absolute top-4 right-4 opacity-10">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L3 7L12 22L21 7L12 2Z"
                stroke={colors.darkPurple}
                strokeWidth="0.5"
                fill={colors.lightPurpleOverlay20}
              />
              <path
                d="M12 8L8 10L12 16L16 10L12 8Z"
                stroke={colors.mediumPurple}
                strokeWidth="0.5"
                fill={colors.lightPurpleOverlay30}
              />
            </svg>
          </div>

          {/* Security dots pattern */}
          <div className="absolute grid grid-cols-3 gap-1 top-6 right-10">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full animate-pulse"
                style={{
                  backgroundColor: colors.lightPurple,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "2s",
                }}
              />
            ))}
          </div>

          <h4
            style={{ color: colors.darkPurple }}
            className="flex items-center gap-3 mb-4 text-lg font-semibold"
          >
            <div className="relative">
              <img
                src="/Secure lock.svg"
                alt="Secure lock"
                className="w-9 h-9"
              />
              {/* Security pulse ring */}
              <div
                className="absolute border border-purple-300 rounded-full -inset-2 animate-ping opacity-20"
                style={{ animationDuration: "3s" }}
              />
              <div
                className="absolute border border-purple-400 rounded-full -inset-1 animate-ping opacity-30"
                style={{ animationDuration: "2s", animationDelay: "0.5s" }}
              />
            </div>
            Support
          </h4>

          <p
            style={{ color: colors.mediumPurple }}
            className="mb-3 text-sm leading-relaxed"
          >
            Get help anytime
          </p>

          {/* Context Tags */}
          <p
            style={{ color: colors.lightPurple }}
            className="text-xs leading-relaxed"
          >
            24/7 assistance • Chat & email support • Fast response
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopularFeaturesSection;
