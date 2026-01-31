import React from "react";
import { colors } from "../../utils/colors";

const PortfolioCard = ({ balance = "0", teamSize = 0, withdraw = "0" }) => {
  return (
    <div
      className="flex flex-col justify-between p-4 rounded-2xl sm:p-5 md:p-6"
      style={{
        background: `linear-gradient(135deg, ${colors.darkPurple} 0%, ${colors.mediumPurple} 100%)`,
        boxShadow: `0 8px 24px ${colors.lightPurpleOverlay30}`,
        minHeight: "240px",
      }}
    >
      <div>
        <h2
          style={{ color: "white" }}
          className="mb-3 text-lg font-bold sm:mb-4 sm:text-xl"
        >
          Your Portfolio
        </h2>

        {/* Stats Grid */}
        <div className="space-y-3 sm:space-y-4">
          {/* Total Balance */}
          <div
            className="pb-2.5 border-b sm:pb-3"
            style={{ borderColor: "rgba(255,255,255,0.2)" }}
          >
            <p
              style={{ color: "rgba(255,255,255,0.7)" }}
              className="mb-1 text-xs"
            >
              Total Balance
            </p>
            <p
              style={{ color: "white" }}
              className="text-xl font-bold sm:text-2xl"
            >
              ₹{balance}
            </p>
          </div>

          {/* Team Members */}
          <div
            className="pb-2.5 border-b sm:pb-3"
            style={{ borderColor: "rgba(255,255,255,0.2)" }}
          >
            <p
              style={{ color: "rgba(255,255,255,0.7)" }}
              className="mb-1 text-xs"
            >
              Team Members
            </p>
            <p
              style={{ color: "white" }}
              className="text-xl font-bold sm:text-2xl"
            >
              {teamSize}
            </p>
          </div>

          {/* Withdrawable */}
          <div className="pb-2.5 sm:pb-3">
            <p
              style={{ color: "rgba(255,255,255,0.7)" }}
              className="mb-1 text-xs"
            >
              Withdrawable
            </p>
            <p
              style={{ color: "white" }}
              className="text-xl font-bold sm:text-2xl"
            >
              ₹{withdraw}
            </p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button
        className="w-full py-2.5 mt-3 font-bold transition-all duration-300 rounded-lg sm:mt-4 hover:opacity-90 hover:shadow-lg active:scale-95 text-sm sm:text-base"
        style={{
          backgroundColor: "white",
          color: colors.darkPurple,
        }}
      >
        Withdraw Now
      </button>
    </div>
  );
};

export default PortfolioCard;
