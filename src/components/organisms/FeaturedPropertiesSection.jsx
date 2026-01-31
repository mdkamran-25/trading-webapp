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
    <div className="w-full pl-32 pr-8 mx-auto mb-12">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Featured
            <br />
            Investment Properties
          </h2>
          <p className="max-w-lg text-gray-600">
            Discover handpicked investment properties selected for prime
            locations, strong returns, and exceptional value
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <button
            className="flex items-center justify-center w-12 h-12 transition-colors border rounded-full hover:bg-gray-50"
            style={{ borderColor: colors.mediumPurple }}
          >
            <ChevronLeft size={20} style={{ color: colors.mediumPurple }} />
          </button>
          <button
            className="flex items-center justify-center w-12 h-12 transition-colors rounded-full"
            style={{
              background: `linear-gradient(135deg, ${colors.darkPurple} 0%, ${colors.mediumPurple} 100%)`,
            }}
          >
            <ChevronRight size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <div key={property.id} className="relative cursor-pointer group">
            {/* Property Card */}
            <div className="relative overflow-hidden transition-shadow duration-300 bg-white shadow-sm rounded-2xl hover:shadow-lg">
              {/* Property Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={property.image}
                  alt="Property"
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />

                {/* Badges and Icons Overlay */}
                <div className="absolute flex items-start justify-between top-4 left-4 right-4">
                  {/* Status Badge */}
                  <div
                    className="px-3 py-1 text-sm font-medium text-white rounded-full"
                    style={{
                      background: property.isOpenForInvestment
                        ? `linear-gradient(135deg, ${colors.darkPurple} 0%, ${colors.mediumPurple} 100%)`
                        : `linear-gradient(135deg, ${colors.mediumPurple} 0%, ${colors.darkPurple} 100%)`,
                    }}
                  >
                    ● {property.status}
                  </div>

                  {/* Heart Icon */}
                  <button className="flex items-center justify-center w-8 h-8 transition-all bg-white rounded-full bg-opacity-90 hover:bg-opacity-100">
                    <Heart size={16} className="text-gray-600" />
                  </button>
                </div>

                {/* Property Location Bottom Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-center px-4 py-2 text-sm text-white bg-black rounded-lg bg-opacity-80">
                    <span className="font-semibold text-center">{property.title}</span>
                  </div>
                </div>
              </div>

              {/* Property Info */}
              <div className="p-4">
                <div className="mb-2 text-2xl font-bold text-gray-900">
                  Property Value ₹{property.propertyValue} cr
                </div>
                
                {/* Investment Details */}
                <div className="grid grid-cols-3 gap-3 p-3 mb-3 rounded-lg bg-gray-50">
                  <div className="text-center">
                    <div className="mb-1 text-xs text-gray-500">Expected Return</div>
                    <div className="text-sm font-semibold">{property.expectedReturn}% p.a.</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 text-xs text-gray-500">Min Investment</div>
                    <div className="text-sm font-semibold">₹{property.minInvestment.toLocaleString()}</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 text-xs text-gray-500">Funded</div>
                    <div 
                      className="text-sm font-semibold"
                      style={{
                        color: property.fundedPercentage === 100 
                          ? '#ef4444' // red for 100% funded
                          : property.fundedPercentage >= 60 
                          ? '#f59e0b' // yellow for 60% or above
                          : '#10b981' // green for below 60%
                      }}
                    >
                      {property.fundedPercentage}%
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{property.investmentType}</span>
                  <span>{property.investorsCount} investors</span>
                </div>

                {/* Invest Button */}
                <button 
                  className={`w-full px-6 py-3 mt-4 font-semibold transition-all duration-300 rounded-lg ${
                    property.fundedPercentage === 100 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'text-white hover:opacity-90 hover:shadow-lg'
                  }`}
                  style={{
                    background: property.fundedPercentage === 100 
                      ? '#d1d5db' 
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
                  {property.fundedPercentage === 100 ? 'Fully Funded' : 'Invest Now'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Watch More Button */}
      <div className="flex justify-center mt-8">
        <button
          className="px-8 py-3 font-semibold text-white transition-all duration-300 rounded-full hover:opacity-90 hover:shadow-lg"
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
