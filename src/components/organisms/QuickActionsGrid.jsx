import React from "react";
import { useNavigate } from "react-router-dom";
import QuickActionCard from "../molecules/QuickActionCard";

const QuickActionsGrid = () => {
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
  );
};

export default QuickActionsGrid;
