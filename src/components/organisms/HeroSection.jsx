import React from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../utils/colors";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full px-4 pt-20 pb-8 mb-8 text-center sm:px-6 sm:py-10 sm:mb-10 md:py-12 md:mb-12 lg:mb-16">
      <h1
        style={{ color: colors.darkPurple }}
        className="mb-4 text-4xl font-bold leading-tight sm:mb-5 sm:text-3xl md:text-4xl md:mb-6 lg:text-5xl xl:text-6xl"
      >
        Invest in Real Estate and
        <br className="hidden sm:block" />
        <span className="sm:hidden"> </span>
        Build Your Future
      </h1>
      <p
        style={{ color: colors.mediumPurple }}
        className="max-w-2xl px-2 mx-auto mb-6 text-sm leading-relaxed sm:mb-8 sm:text-base md:text-lg md:mb-10 lg:text-xl"
      >
        Start your wealth journey with smart real estate investments
      </p>
      <div className="flex flex-col justify-center w-full gap-3 px-4 sm:flex-row sm:flex-wrap sm:gap-4 md:gap-6">
        <button
          onClick={() => navigate("/login")}
          className="w-full px-8 py-3 text-base font-bold transition-all duration-300 rounded-lg sm:w-auto sm:px-10 sm:py-3.5 md:px-12 md:py-4 md:text-lg hover:opacity-80 hover:shadow-lg active:scale-95"
          style={{
            color: colors.darkPurple,
            backgroundColor: colors.lightPurpleOverlay15,
            border: `2px solid ${colors.lightPurple}`,
          }}
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="w-full px-8 py-3 text-base font-bold transition-all duration-300 rounded-lg sm:w-auto sm:px-10 sm:py-3.5 md:px-12 md:py-4 md:text-lg hover:opacity-80 hover:shadow-lg active:scale-95"
          style={{
            color: "white",
            backgroundColor: colors.darkPurple,
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
