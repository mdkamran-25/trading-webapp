import React from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../utils/colors";

const HomePromotionalCard = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full mb-6 sm:mb-8 md:mb-12">
      <div
        className="relative flex flex-col items-start justify-between p-4 overflow-hidden sm:flex-row sm:items-center sm:gap-6 sm:p-6 md:p-8 lg:p-10 rounded-xl min-h-[160px] sm:min-h-[200px] md:min-h-[240px] lg:min-h-[280px]"
        style={{
          background: `linear-gradient(135deg, ${colors.darkPurple} 0%, ${colors.mediumPurple} 100%)`,
        }}
      >
        {/* Left Content */}
        <div className="z-10 flex-1 w-full mb-4 text-center sm:mb-0 sm:text-left sm:w-auto sm:max-w-[50%] md:max-w-[55%]">
          <h2 className="mb-3 text-2xl font-bold leading-snug text-white sm:mb-3 sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl sm:leading-tight">
            Enjoy your
            <br />
            first home
            <br />
            investment
          </h2>
          <button
            onClick={() => navigate("/invest")}
            className="w-full px-5 py-2 text-sm font-semibold transition-all duration-300 rounded-full sm:w-auto sm:px-5 sm:py-2 sm:text-sm md:px-6 md:py-2.5 md:text-base lg:px-8 lg:py-3 lg:text-lg hover:opacity-90 hover:shadow-xl active:scale-95"
            style={{
              backgroundColor: "white",
              color: colors.darkPurple,
            }}
          >
            Explore Now
          </button>
        </div>

        {/* Right Image */}
        <div className="relative flex-shrink-0 w-full sm:w-auto sm:flex-1 sm:max-w-[45%] md:max-w-[40%] h-24 sm:h-40 md:h-48 lg:h-56">
          <img
            src="/images/HomeImage.png"
            alt="Home Investment"
            className="absolute bottom-0 right-0 object-contain w-full h-full sm:relative"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePromotionalCard;
