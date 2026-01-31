import React from "react";
import { useNavigate } from "react-router-dom";
import QuickActionCard from "../molecules/QuickActionCard";

const QuickActionsGrid = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Invest",
      description: "Grow your money with property investments",
      details:
        "Browse curated properties, analyze returns, and invest securely with flexible minimum amounts.",
      icon: "/Stock chart- Rupee.svg",
      onClick: () => navigate("/invest"),
    },
    {
      title: "Teams",
      description: "Manage teams and track performance",
      details:
        "Track team members, manage collaborations, and monitor shared investment performance in one place.",
      icon: "/Cashback Reward-Rupee.svg",
      onClick: () => navigate("/teams"),
    },
    {
      title: "Wallet",
      description: "Add funds and monitor returns",
      details:
        "View balances, add or withdraw funds, track transactions, and monitor returns across all investments.",
      icon: "/Wallet.svg",
      onClick: () => navigate("/orders"),
    },
    {
      title: "Account",
      description: "Manage profile and security",
      details:
        "Update personal information, complete verification, and manage security and account preferences.",
      icon: "/Face id_1.svg",
      onClick: () => navigate("/account"),
    },
  ];

  return (
    <div className="w-full pl-32 pr-8 mx-auto mb-12">
      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((action, index) => (
          <QuickActionCard
            key={index}
            title={action.title}
            description={action.description}
            details={action.details}
            icon={action.icon}
            onClick={action.onClick}
          />
        ))}
      </div>
    </div>
  );
};

export default QuickActionsGrid;
