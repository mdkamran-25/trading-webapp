import React from "react";
import { colors } from "../../utils/colors";

const PortfolioCard = ({ balance = "0", teamSize = 0, withdraw = "0" }) => {
  return (
    <div
      className="p-8 rounded-2xl"
      style={{
        backgroundColor: colors.lightPurple,
        boxShadow: `0 8px 24px ${colors.lightPurpleOverlay30}`,
      }}
    >
      <h2 style={{ color: "white" }} className="mb-8 text-2xl font-bold">
        Your Portfolio
      </h2>

      {/* Stats Grid */}
      <div className="space-y-6">
        {/* Total Balance */}
        <div
          className="pb-6 border-b"
          style={{ borderColor: "rgba(255,255,255,0.2)" }}
        >
          <p
            style={{ color: "rgba(255,255,255,0.7)" }}
            className="text-sm mb-2"
          >
            Total Balance
          </p>
          <p style={{ color: "white" }} className="text-3xl font-bold">
            ₹{balance}
          </p>
        </div>

        {/* Team Members */}
        <div
          className="pb-6 border-b"
          style={{ borderColor: "rgba(255,255,255,0.2)" }}
        >
          <p
            style={{ color: "rgba(255,255,255,0.7)" }}
            className="text-sm mb-2"
          >
            Team Members
          </p>
          <p style={{ color: "white" }} className="text-3xl font-bold">
            {teamSize}
          </p>
        </div>

        {/* Withdrawable */}
        <div className="pb-6">
          <p
            style={{ color: "rgba(255,255,255,0.7)" }}
            className="text-sm mb-2"
          >
            Withdrawable
          </p>
          <p style={{ color: "white" }} className="text-3xl font-bold">
            ₹{withdraw}
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <button
        className="w-full mt-8 py-3 rounded-lg font-bold transition-all duration-300 hover:opacity-90"
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
