import React from "react";
import HomePromotionalCard from "./HomePromotionalCard";
import QuickActionsGrid from "./QuickActionsGrid";
import ReferralCard from "./ReferralCard";
import PopularFeaturesSection from "./PopularFeaturesSection";

const HomeContent = ({ balance, TeamSize, withdraw, UserData, navigate }) => {
  return (
    <div className="pb-12">
      {/* Promotional Card */}
      <HomePromotionalCard />

      {/* Quick Actions Grid with Portfolio Card */}
      <QuickActionsGrid
        balance={balance}
        TeamSize={TeamSize}
        withdraw={withdraw}
        UserData={UserData}
      />

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
