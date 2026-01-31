import React from "react";
import { API_BASE_URL2 } from "../../api";
import { Card, Text } from "../../components";
import { colors } from "../../utils/colors";

const MetricItem = ({
  label,
  value,
  valueColor,
  isPrimary = false,
  isLarge = false,
}) => {
  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.6rem 0.2rem 0 0.2rem",
    borderBottom: !isPrimary ? `1px solid ${colors.borderLight}` : "none",
  };

  const labelStyle = {
    color: colors.textLight,
    fontWeight: "500",
    fontSize: isLarge ? "1.125rem" : "1rem",
  };

  let finalValueColor = colors.darkPurple;
  if (valueColor === "text-green-800") finalValueColor = colors.darkPurple;
  else if (valueColor === "text-green-600")
    finalValueColor = colors.mediumPurple;
  else if (valueColor === "text-red-600") finalValueColor = colors.success;

  return (
    <div style={containerStyle}>
      <span style={labelStyle}>{label}</span>

      <span
        style={{
          fontWeight: "bold",
          fontSize: isLarge ? "1.1rem" : "1rem",
          color: finalValueColor,
        }}
      >
        {(() => {
          // Remove commas and convert to number
          const cleaned = (value || "").toString().replace(/,/g, "");
          const num = Number(cleaned);

          // If not a valid number, show raw string WITHOUT ₹ sign
          if (isNaN(num)) {
            return value; // directly show string value
          }

          // Otherwise, show formatted number WITH ₹ sign
          return (
            <>
              <span style={{ fontFamily: "sans-serif" }}>₹</span>
              {num >= 1000000
                ? (num / 1000000).toFixed(1) + "M"
                : num.toFixed(1)}
            </>
          );
        })()}
      </span>
    </div>
  );
};

const ProductCard = ({ productData, onBuy }) => {
  const {
    title,
    price,
    dailyEarnings,
    totalGain,
    durationDays,
    cycleType,
    img,
  } = productData;

  return (
    <Card
      className="relative w-full min-h-[33vh] overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
      style={{
        backgroundColor: colors.background,
        border: `1px solid ${colors.lightPurpleOverlay20}`,
      }}
    >
      {/* Duration badge */}
      <div
        className="absolute top-0 left-0 px-4 py-1 text-xs font-semibold text-white shadow-md rounded-br-2xl"
        style={{
          background: `linear-gradient(135deg, ${colors.darkPurple} 0%, ${colors.mediumPurple} 100%)`,
        }}
      >
        {durationDays} {cycleType === "hour" ? "Hours" : "Days"}
      </div>

      <div className="pt-2">
        {/* Product image */}
        <div
          className="w-full h-[18vh] rounded-lg flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: colors.backgroundLight }}
        >
          <img
            src={`${API_BASE_URL2}${img}`}
            alt="Product"
            className="object-cover w-full h-full"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/150x150/9ca3af/fff?text=Product";
            }}
          />
        </div>

        {/* Product Info */}
        <div className="pt-2">
          <Text variant="h3">{title}</Text>

          <MetricItem
            label="Plan Price"
            value={price}
            valueColor="text-green-800"
            isPrimary
          />
          <MetricItem
            label={cycleType === "hour" ? "Hours Earning" : "Days Earning"}
            value={dailyEarnings}
            valueColor="text-green-600"
          />
          <MetricItem
            label="Total Earning"
            value={totalGain}
            valueColor="text-red-600"
            isPrimary
            isLarge
          />
        </div>
      </div>

      <div className="flex justify-center px-0 py-3">
        <button
          className="w-full py-3 mx-4 text-sm font-semibold text-white transition-all duration-300 shadow-md rounded-xl sm:text-base hover:opacity-90 hover:scale-105 active:scale-95"
          style={{
            background: `linear-gradient(135deg, ${colors.darkPurple} 0%, ${colors.mediumPurple} 100%)`,
          }}
          onClick={onBuy}
        >
          BUY NOW
        </button>
      </div>
    </Card>
  );
};

export default ProductCard;
