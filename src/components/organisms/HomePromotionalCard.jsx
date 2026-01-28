import React from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../utils/colors";

const HomePromotionalCard = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto mb-12">
      <div
        className="relative flex items-center justify-between gap-6 p-8 overflow-hidden rounded-xl"
        style={{
          background: `linear-gradient(135deg, ${colors.darkPurple} 0%, ${colors.mediumPurple} 100%)`,
          minHeight: "280px",
        }}
      >
        {/* Left Content */}
        <div className="z-10 flex-1">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Enjoy your
            <br />
            first home
            <br />
            investment
          </h2>
          <button
            onClick={() => navigate("/invest")}
            className="px-8 py-3 font-semibold transition-all duration-300 rounded-full hover:opacity-80 hover:shadow-lg"
            style={{
              backgroundColor: "white",
              color: colors.darkPurple,
            }}
          >
            Explore Now
          </button>
        </div>

        {/* Right Image */}
        <div className="relative flex-1 hidden md:flex h-72">
          <img
            src="/images/HomeImage.png"
            alt="Home Investment"
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePromotionalCard;
