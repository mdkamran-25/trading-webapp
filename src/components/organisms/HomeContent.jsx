import React from "react";
import HomePromotionalCard from "./HomePromotionalCard";
import QuickActionsGrid from "./QuickActionsGrid";
import PortfolioCard from "./PortfolioCard";
import ReferralCard from "./ReferralCard";
import PopularFeaturesSection from "./PopularFeaturesSection";
import FeaturedPropertiesSection from "./FeaturedPropertiesSection";

const HomeContent = ({ balance, TeamSize, withdraw, UserData, navigate }) => {
  return (
    <div className="pb-12">
      {/* First Row: Promotional Card + Portfolio Card */}
      <div className="w-full pl-32 pr-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
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
      <div className="max-w-6xl mx-auto mb-12">
        <ReferralCard UserData={UserData} />
      </div>

      {/* Popular Features Section */}
      <div className="max-w-6xl mx-auto">
        <PopularFeaturesSection navigate={navigate} UserData={UserData} />
      </div>
    </div>
  );
};

export default HomeContent;