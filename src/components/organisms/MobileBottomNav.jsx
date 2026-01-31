import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, TrendingUp, Users, Wallet, User } from "lucide-react";
import { colors } from "../../utils/colors";

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: "home",
      icon: Home,
      label: "Home",
      path: "/",
    },
    {
      id: "invest",
      icon: TrendingUp,
      label: "Invest",
      path: "/invest",
    },
    {
      id: "team",
      icon: Users,
      label: "Team",
      path: "/teams",
    },
    {
      id: "wallet",
      icon: Wallet,
      label: "Wallet",
      path: "/wallet",
    },
    {
      id: "account",
      icon: User,
      label: "Account",
      path: "/account",
    },
  ];

  const handleNavClick = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div
        className="px-2 py-2 mx-2 mb-2 shadow-2xl backdrop-blur-lg rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${colors.lightPurpleOverlay20} 0%, ${colors.lightPurpleOverlay30} 100%)`,
          border: `1px solid ${colors.lightPurpleOverlay50}`,
        }}
      >
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                className="flex flex-col items-center justify-center px-3 py-2 transition-all duration-200 rounded-xl"
                style={{
                  backgroundColor: active
                    ? colors.lightPurpleOverlay30
                    : "transparent",
                }}
              >
                <Icon
                  size={22}
                  style={{
                    color: active ? colors.darkPurple : colors.mediumPurple,
                  }}
                />
                <span
                  className="mt-1 text-xs font-medium"
                  style={{
                    color: active ? colors.darkPurple : colors.mediumPurple,
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileBottomNav;
