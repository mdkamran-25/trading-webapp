import React, { useMemo } from "react";
import { TrendingUp, Lock, CheckCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Text, PageHeader, Badge } from "../../components";
// --- VIP Tiers Data ---
// Updated to include the 'invites' requirement (currently 0 for all levels)
const VIP_LEVELS = [
  {
    level: 0,
    name: "V₀",
    investment: 0,
    invites: 0,
    badgeText: "FREE",
    color: "gray",
  },
  {
    level: 1,
    name: "V₁",
    investment: 5000,
    invites: 0,
    badgeText: "V1",
    color: "slate",
  },
  {
    level: 2,
    name: "V₂",
    investment: 10000,
    invites: 0,
    badgeText: "V2",
    color: "amber",
  },
  {
    level: 3,
    name: "V₃",
    investment: 15000,
    invites: 0,
    badgeText: "V3",
    color: "blue",
  },
  {
    level: 4,
    name: "V₄",
    investment: 19440,
    invites: 0,
    badgeText: "V4",
    color: "purple",
  },
  {
    level: 5,
    name: "V₅",
    investment: 34440,
    invites: 0,
    badgeText: "V5",
    color: "pink",
  },
  {
    level: 6,
    name: "V₆",
    investment: 64440,
    invites: 0,
    badgeText: "V6",
    color: "emerald",
  },
  {
    level: 7,
    name: "V₇",
    investment: 144400,
    invites: 0,
    badgeText: "V7",
    color: "red",
  },
  {
    level: 8,
    name: "V₈",
    investment: 180000,
    invites: 0,
    badgeText: "V8",
    color: "yellow",
  },
];

// Helper to format currency
const formatCurrency = (amount) => {
  return `₹${new Intl.NumberFormat("en-IN").format(amount)}`;
};

// --- Component for the Dynamic VIP Badge (Used as the 'Image') ---
export const VIPBadge = ({
  levelData,
  size = "large",
  isCurrent = false,
  isUnlocked = true,
}) => {
  const getBadgeColors = (color) => {
    const colorMap = {
      gray: "from-gray-400 to-gray-600 text-gray-900",
      slate: "from-slate-400 to-slate-600 text-white",
      amber: "from-yellow-400 to-yellow-600 text-yellow-900",
      blue: "from-blue-400 to-blue-600 text-blue-900",
      purple: "from-purple-400 to-purple-600 text-white",
      pink: "from-pink-400 to-pink-600 text-white",
      emerald: "from-emerald-400 to-emerald-600 text-emerald-900",
      red: "from-red-400 to-red-600 text-white",
      yellow: "from-yellow-300 to-yellow-500 text-yellow-900",
    };
    return colorMap[color] || colorMap.gray;
  };

  const getRingClass = () => {
    if (isCurrent) return "ring-4 ring-orange-600 shadow-2xl scale-110";
    if (isUnlocked) return "ring-2 ring-green-400 shadow-lg";
    return "border border-gray-300 shadow-sm";
  };

  return (
    <div
      className={`rounded-full flex flex-col items-center justify-center transition-all ${
        size === "large"
          ? "w-32 h-32 md:w-40 md:h-40 text-2xl"
          : "w-10 h-10 md:w-12 md:h-12 text-lg"
      } bg-gradient-to-br ${getBadgeColors(levelData.color)} font-bold italic text-shadow ${getRingClass()}`}
    >
      <span className="font-extrabold tracking-wide">
        {levelData.badgeText}
      </span>
      {size === "large" && (
        <span className="absolute opacity-20 text-6xl font-black">★</span>
      )}
    </div>
  );
};

// --- VIP Tier Gallery Component (Replaces the Table) ---
const VIPTierGallery = ({ currentInvestment, currentLevel }) => {
  return (
    <Card variant="default" padding="lg" className="mb-6 shadow-lg">
      <Text variant="h2" className="text-2xl font-bold text-gray-800 mb-6">
        VIP Tier Roadmap
      </Text>

      {/* Vertical list of VIP Levels (Column Layout) */}
      <div className="flex flex-col gap-4">
        {VIP_LEVELS.filter((v) => v.level > 0).map((levelData) => {
          const isCurrent = levelData.level === currentLevel.level;
          const isUnlocked = currentInvestment >= levelData.investment;

          return (
            <div
              key={levelData.level}
              className={`flex items-center justify-between p-4 rounded-xl transition-all border ${isCurrent ? "border-orange-500 bg-orange-50 shadow-md" : "border-gray-200 bg-white"}`}
            >
              {/* LEFT: Badge and Name */}
              <div className="flex items-center gap-4">
                <VIPBadge
                  levelData={levelData}
                  size="small"
                  isCurrent={isCurrent}
                  isUnlocked={isUnlocked}
                />
                <Text variant="h3" className="text-xl font-bold text-gray-900">
                  {levelData.name}
                </Text>
              </div>

              {/* RIGHT: Investment and Status */}
              <div className="flex flex-col items-end">
                <div className="text-right mb-2">
                  <Text
                    variant="sm"
                    className="text-gray-500 font-semibold uppercase"
                  >
                    Required Investment
                  </Text>
                  <Text
                    variant="body"
                    className="text-lg font-semibold text-gray-700"
                  >
                    {formatCurrency(levelData.investment)}
                  </Text>
                </div>

                {/* Status Indicator */}
                <div>
                  {isCurrent ? (
                    <Badge
                      variant="success"
                      className="flex items-center gap-1"
                    >
                      <CheckCircle className="w-4 h-4" /> CURRENT LEVEL
                    </Badge>
                  ) : isUnlocked ? (
                    <Badge
                      variant="success"
                      className="flex items-center gap-1"
                    >
                      <CheckCircle className="w-4 h-4" /> UNLOCKED
                    </Badge>
                  ) : (
                    <Badge
                      variant="warning"
                      className="flex items-center gap-1"
                    >
                      <Lock className="w-4 h-4" /> LOCKED
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

// --- Main App Component ---
const VIP = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const userData = location.state || {};
  const currentInvestment = userData?.totalAmount?.totalRechargeAmount || 0;
  console.log(userData);
  // Memoize the calculation of current and next VIP level
  const { currentLevel, nextLevel } = useMemo(() => {
    let current = VIP_LEVELS[0];
    let next = VIP_LEVELS[1];

    // Find the current level
    for (let i = VIP_LEVELS.length - 1; i >= 0; i--) {
      if (currentInvestment >= VIP_LEVELS[i].investment) {
        current = VIP_LEVELS[i];
        // Determine the next level
        next = i < VIP_LEVELS.length - 1 ? VIP_LEVELS[i + 1] : null;
        break;
      }
    }
    return { currentLevel: current, nextLevel: next };
  }, [currentInvestment]);

  // Calculate progress for the progress bar
  const progressData = useMemo(() => {
    if (!nextLevel) {
      return {
        percentage: 100,
        remaining: 0,
        baseInvestment: 0,
        targetInvestment: 0,
      }; // Max level reached
    }

    const prevInvestment = currentLevel.investment;
    const targetInvestment = nextLevel.investment;
    const requiredToNext = targetInvestment - prevInvestment;
    const investedSinceLast = currentInvestment - prevInvestment;
    const remaining = targetInvestment - currentInvestment;

    const percentage =
      requiredToNext > 0
        ? Math.min(100, (investedSinceLast / requiredToNext) * 100)
        : 100;

    return {
      percentage,
      remaining,
      baseInvestment: prevInvestment,
      targetInvestment,
    };
  }, [currentInvestment, currentLevel, nextLevel]);

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-b from-yellow-100 to-gray-100">
        <PageHeader title="VIP" onBack={() => navigate(-1)} />

        {/* --- MAIN CONTENT WRAPPER --- */}
        <div className="w-full max-w-md mx-auto p-4 pb-20">
          {/* --- Current Status Card --- */}
          <Card
            variant="default"
            padding="lg"
            className="mb-6 border-t-4 border-orange-400 flex flex-col md:flex-row items-center md:items-start gap-4 shadow-2xl"
          >
            <div className="flex-shrink-0">
              {/* The primary, large VIP badge */}
              <VIPBadge
                levelData={currentLevel}
                size="large"
                isCurrent={true}
              />
            </div>

            <div className="text-center md:text-left flex-grow">
              <Text variant="h3" className="text-2xl font-bold text-gray-700">
                Current VIP Level:{" "}
                <span className="text-orange-700">{currentLevel.name}</span>
              </Text>
              <Text variant="h2" className="text-4xl font-extrabold mt-2">
                {formatCurrency(currentInvestment)}
              </Text>
              <Text variant="body" className="text-lg text-gray-500">
                Total Account Investment
              </Text>
            </div>
          </Card>

          {/* --- Progress Bar Section --- */}
          <Card variant="default" padding="lg" className="mb-6 shadow-lg">
            <Text
              variant="h3"
              className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"
            >
              <TrendingUp className="w-6 h-6 text-green-500" />
              {nextLevel
                ? `Progress to ${nextLevel.name}`
                : "Maximum VIP Level Reached!"}
            </Text>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Badge
                  variant="primary"
                  className="text-xs font-bold uppercase"
                >
                  {currentLevel.name}
                </Badge>
                <Badge
                  variant="success"
                  className="text-xs font-bold uppercase"
                >
                  {nextLevel ? nextLevel.name : "MAX"}
                </Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                {/* NOTE: Progress bar width must remain an inline style due to dynamic calculation */}
                <div
                  style={{ width: `${progressData.percentage}%` }}
                  className={`h-full transition-all ${nextLevel ? "bg-orange-500" : "bg-green-500"}`}
                ></div>
              </div>
            </div>

            {nextLevel ? (
              <div className="text-center p-4 border-t border-gray-100 mt-4">
                <Text variant="body" className="text-base text-gray-600">
                  You need to invest{" "}
                  <span className="font-bold text-red-600">
                    {formatCurrency(progressData.remaining)}
                  </span>{" "}
                  more to unlock{" "}
                  <span className="font-bold text-orange-700">
                    {nextLevel.name}
                  </span>
                  !
                </Text>
              </div>
            ) : (
              <Text
                variant="body"
                className="text-center text-lg font-bold text-green-600 mt-4"
              >
                Congratulations! You've reached the highest VIP tier.
              </Text>
            )}
          </Card>

          {/* --- VIP Tier Gallery (Now a vertical list/column) --- */}
          <VIPTierGallery
            currentInvestment={currentInvestment}
            currentLevel={currentLevel}
          />
        </div>
      </div>
    </>
  );
};

export default VIP;
