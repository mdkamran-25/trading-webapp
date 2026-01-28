import React from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../utils/colors";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full py-12 mb-16 text-center">
      <h1
        style={{ color: colors.darkPurple }}
        className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
      >
        Invest in Real Estate and
        <br />
        Build Your Future
      </h1>
      <p
        style={{ color: colors.mediumPurple }}
        className="max-w-2xl mx-auto mb-10 text-lg md:text-xl"
      >
        Start your wealth journey with smart real estate investments
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        <button
          onClick={() => navigate("/login")}
          className="px-12 py-4 text-lg font-bold transition-all duration-300 rounded-lg hover:opacity-80 hover:shadow-lg"
          style={{
            color: colors.darkPurple,
            backgroundColor: colors.lightPurpleOverlay15,
            border: `3px solid ${colors.lightPurple}`,
          }}
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="px-12 py-4 text-lg font-bold transition-all duration-300 rounded-lg hover:opacity-80 hover:shadow-lg"
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
