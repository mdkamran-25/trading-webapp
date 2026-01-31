import React from "react";
import HomePromotionalCard from "./HomePromotionalCard";
import QuickActionsGrid from "./QuickActionsGrid";
import PortfolioCard from "./PortfolioCard";
import ReferralCard from "./ReferralCard";
import PopularFeaturesSection from "./PopularFeaturesSection";
import FeaturedPropertiesSection from "./FeaturedPropertiesSection";

const HomeContent = ({ balance, TeamSize, withdraw, UserData, navigate }) => {
  return (
    <div className="pb-6 sm:pb-8 md:pb-10 lg:pb-12">
      {/* First Row: Promotional Card + Portfolio Card */}
      <div className="w-full px-3 mx-auto mb-4 sm:px-4 sm:mb-6 md:px-6 md:mb-8 lg:pl-24 lg:pr-24 xl:pl-32 xl:pr-8">
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-5 lg:grid-cols-3 lg:gap-6">
          {/* Left side - Promotional Card */}
          <div className="lg:col-span-2">
            <HomePromotionalCard />
          </div>

          {/* Right side - Portfolio Card */}
          <div className="lg:col-span-1">
            <PortfolioCard
              balance={balance}
              teamSize={TeamSize}
              withdraw={withdraw}
            />
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <FeaturedPropertiesSection />

      {/* Second Row: Quick Actions Grid */}
      <QuickActionsGrid />

      {/* Referral/Invitation Card */}
      <div className="w-full max-w-6xl px-3 mx-auto mb-4 sm:px-4 sm:mb-6 md:px-6 md:mb-8 lg:pl-24 lg:pr-24 xl:pl-32 xl:pr-8 lg:mb-10">
        <ReferralCard UserData={UserData} />
      </div>

      {/* Popular Features Section */}
      <div className="w-full max-w-6xl mx-auto">
        <PopularFeaturesSection navigate={navigate} UserData={UserData} />
      </div>
    </div>
  );
};

export default HomeContent;
