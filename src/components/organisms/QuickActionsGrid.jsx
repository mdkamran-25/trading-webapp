import React from "react";
import { useNavigate } from "react-router-dom";
import QuickActionCard from "../molecules/QuickActionCard";
import PortfolioCard from "./PortfolioCard";

const QuickActionsGrid = ({ balance, TeamSize, withdraw, UserData }) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Invest",
      description: "Start your investment",
      icon: "💰",
      onClick: () => navigate("/invest"),
    },
    {
      title: "Teams",
      description: "View your team",
      icon: "👥",
      onClick: () => navigate("/teams"),
    },
    {
      title: "Wallet",
      description: "Manage funds",
      icon: "💳",
      onClick: () => navigate("/orders"),
    },
    {
      title: "Account",
      description: "View profile",
      icon: "👤",
      onClick: () => navigate("/account"),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mb-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left side - Quick Actions Grid (4 cards in 2x2) */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <QuickActionCard
                key={index}
                title={action.title}
                description={action.description}
                icon={action.icon}
                onClick={action.onClick}
              />
            ))}
          </div>
        </div>

        {/* Right side - Portfolio Card */}
        <div className="lg:col-span-1">
          <PortfolioCard
            balance={balance}
            TeamSize={TeamSize}
            withdraw={withdraw}
            navigate={navigate}
          />
        </div>
      </div>
    </div>
  );
};

export default QuickActionsGrid;
