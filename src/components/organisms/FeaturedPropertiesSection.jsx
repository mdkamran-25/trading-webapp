import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Bed,
  Bath,
  Square,
} from "lucide-react";
import { colors } from "../../utils/colors";

const FeaturedPropertiesSection = () => {
  const properties = [
    {
      id: 1,
      image: "/images/realstate1.png",
      title: "Luxury Apartment · Billings, MT",
      propertyValue: 3.6, // in crores
      expectedReturn: 12.5, // % p.a.
      minInvestment: 1000,
      investmentType: "Rental Income",
      holdingPeriod: "5 Years",
      fundedPercentage: 65,
      investorsCount: 142,
      status: "High Demand",
      isOpenForInvestment: true,
    },
    {
      id: 2,
      image: "/images/realstate2.png",
      title: "Family Villa · Billings, MT",
      propertyValue: 4.2, // in crores
      expectedReturn: 10.8,
      minInvestment: 1500,
      investmentType: "Capital Growth",
      holdingPeriod: "7 Years",
      fundedPercentage: 100,
      investorsCount: 210,
      status: "Fully Funded",
      isOpenForInvestment: false,
    },
    {
      id: 3,
      image: "/images/realstate3.png",
      title: "Commercial Building · Downtown MT",
      propertyValue: 7.8, // in crores
      expectedReturn: 14.2,
      minInvestment: 2500,
      investmentType: "Rental + Growth",
      holdingPeriod: "6 Years",
      fundedPercentage: 42,
      investorsCount: 87,
      status: "Open for Investment",
      isOpenForInvestment: true,
    },
  ];

  return (
    <div className="w-full px-3 mx-auto mb-6 sm:px-4 sm:mb-8 md:px-6 md:mb-10 lg:pl-24 lg:pr-24 xl:pl-32 xl:pr-8 lg:mb-12">
      {/* Header Section */}
      <div className="flex flex-col items-start justify-between gap-4 mb-6 sm:flex-row sm:items-start sm:gap-6 sm:mb-8">
        <div className="flex-1">
          <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 sm:mb-3 sm:text-2xl md:text-3xl lg:text-4xl">
            Featured Investment Properties
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-gray-600 sm:text-base">
            Discover handpicked investment properties selected for prime
            locations, strong returns, and exceptional value
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="flex flex-shrink-0 gap-2">
          <button
            className="flex items-center justify-center w-10 h-10 transition-colors border rounded-full sm:w-12 sm:h-12 hover:bg-gray-50 active:scale-95"
            style={{ borderColor: colors.mediumPurple }}
          >
            <ChevronLeft
              size={18}
              className="sm:w-5 sm:h-5"
              style={{ color: colors.mediumPurple }}
            />
          </button>
          <button
            className="flex items-center justify-center w-10 h-10 transition-colors rounded-full sm:w-12 sm:h-12 active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${colors.darkPurple} 0%, ${colors.mediumPurple} 100%)`,
            }}
          >
            <ChevronRight size={18} className="text-white sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <div key={property.id} className="relative cursor-pointer group">
            {/* Property Card */}
            <div className="relative overflow-hidden transition-shadow duration-300 bg-white shadow-sm rounded-2xl hover:shadow-lg">
              {/* Property Image */}
              <div className="relative h-48 overflow-hidden sm:h-56 md:h-64">
                <img
                  src={property.image}
                  alt="Property"
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />

                {/* Badges and Icons Overlay */}
                <div className="absolute flex items-start justify-between top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4">
                  {/* Status Badge */}
                  <div
                    className="px-2 py-1 text-xs font-medium text-white rounded-full sm:px-3 sm:text-sm"
                    style={{
                      background: property.isOpenForInvestment
                        ? `linear-gradient(135deg, ${colors.darkPurple} 0%, ${colors.mediumPurple} 100%)`
                        : `linear-gradient(135deg, ${colors.mediumPurple} 0%, ${colors.darkPurple} 100%)`,
                    }}
                  >
                    ● {property.status}
                  </div>

                  {/* Heart Icon */}
                  <button className="flex items-center justify-center transition-all bg-white rounded-full w-7 h-7 sm:w-8 sm:h-8 bg-opacity-90 hover:bg-opacity-100 active:scale-95">
                    <Heart size={14} className="text-gray-600 sm:w-4 sm:h-4" />
                  </button>
                </div>

                {/* Property Location Bottom Overlay */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                  <div className="flex items-center justify-center px-3 py-1.5 text-xs text-white bg-black rounded-lg sm:px-4 sm:py-2 sm:text-sm bg-opacity-80">
                    <span className="font-semibold text-center truncate">
                      {property.title}
                    </span>
                  </div>
                </div>
              </div>

              {/* Property Info */}
              <div className="p-3 sm:p-4">
                <div className="mb-2 text-lg font-bold text-gray-900 sm:text-xl md:text-2xl">
                  Property Value ₹{property.propertyValue} cr
                </div>

                {/* Investment Details */}
                <div className="grid grid-cols-3 gap-2 p-2 mb-3 rounded-lg sm:gap-3 sm:p-3 bg-gray-50">
                  <div className="text-center">
                    <div className="mb-0.5 text-[10px] text-gray-500 sm:text-xs sm:mb-1">
                      Expected Return
                    </div>
                    <div className="text-xs font-semibold sm:text-sm">
                      {property.expectedReturn}% p.a.
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="mb-0.5 text-[10px] text-gray-500 sm:text-xs sm:mb-1">
                      Min Investment
                    </div>
                    <div className="text-xs font-semibold sm:text-sm">
                      ₹{property.minInvestment.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="mb-0.5 text-[10px] text-gray-500 sm:text-xs sm:mb-1">
                      Funded
                    </div>
                    <div
                      className="text-xs font-semibold sm:text-sm"
                      style={{
                        color:
                          property.fundedPercentage === 100
                            ? "#ef4444" // red for 100% funded
                            : property.fundedPercentage >= 60
                              ? "#f59e0b" // yellow for 60% or above
                              : "#10b981", // green for below 60%
                      }}
                    >
                      {property.fundedPercentage}%
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 sm:text-sm">
                  <span className="truncate">{property.investmentType}</span>
                  <span className="flex-shrink-0 ml-2">
                    {property.investorsCount} investors
                  </span>
                </div>

                {/* Invest Button */}
                <button
                  className={`w-full px-4 py-2 mt-3 text-sm font-semibold transition-all duration-300 rounded-lg sm:px-6 sm:py-3 sm:mt-4 sm:text-base active:scale-95 ${
                    property.fundedPercentage === 100
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "text-white hover:opacity-90 hover:shadow-lg"
                  }`}
                  style={{
                    background:
                      property.fundedPercentage === 100
                        ? "#d1d5db"
                        : `linear-gradient(135deg, ${colors.darkPurple} 0%, ${colors.mediumPurple} 100%)`,
                  }}
                  disabled={property.fundedPercentage === 100}
                  onClick={() => {
                    if (property.fundedPercentage !== 100) {
                      // Add navigation to property investment page
                      console.log(`Invest in property ${property.id}`);
                    }
                  }}
                >
                  {property.fundedPercentage === 100
                    ? "Fully Funded"
                    : "Invest Now"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Watch More Button */}
      <div className="flex justify-center mt-6 sm:mt-8">
        <button
          className="w-full px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 rounded-full sm:w-auto sm:px-8 sm:py-3 sm:text-base hover:opacity-90 hover:shadow-lg active:scale-95"
          style={{
            background: `linear-gradient(135deg, ${colors.darkPurple} 0%, ${colors.mediumPurple} 100%)`,
          }}
        >
          Watch More
        </button>
      </div>
    </div>
  );
};

export default FeaturedPropertiesSection;
