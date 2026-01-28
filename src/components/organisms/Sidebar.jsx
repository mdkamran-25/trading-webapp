import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  DollarSign,
  Users,
  Wallet,
  User,
  Bell,
  Settings,
  HelpCircle,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { colors } from "../../utils/colors";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { SECRET_KEY } from "../../api";
import pako from "pako";
import { SidebarContext } from "../../context/SidebarContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen } =
    useContext(SidebarContext);
  const [userData, setUserData] = useState({
    name: "User",
    phone: "",
    email: "",
    title: "Investor",
    profileImage: "/default-profile.png",
    vipLevel: "V₀",
  });

  // Fetch user data from cookies
  useEffect(() => {
    const encryptedUser = Cookies.get("tredingWebUser");
    if (encryptedUser) {
      try {
        const base64 = encryptedUser.replace(/-/g, "+").replace(/_/g, "/");
        const decryptedBase64 = CryptoJS.AES.decrypt(
          base64,
          SECRET_KEY,
        ).toString(CryptoJS.enc.Utf8);

        if (decryptedBase64) {
          const binaryString = atob(decryptedBase64);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }

          const decompressed = pako.inflate(bytes, { to: "string" });
          const userObj = JSON.parse(decompressed);
          setUserData({
            name: userObj.name || "User",
            phone: userObj.phone || "",
            email: userObj.email || "",
            title: userObj.title || "Investor",
            profileImage: userObj.profileImage || "/default-profile.png",
            vipLevel: userObj.vipLevel || "V₀",
          });
        }
      } catch (err) {
        console.error("Failed to decode user data:", err);
      }
    }
  }, []);

  const menuItems = [
    { name: "Home", icon: Home, path: "/", badge: null },
    { name: "Invest", icon: DollarSign, path: "/invest", badge: null },
    { name: "Teams", icon: Users, path: "/teams", badge: "3" },
    { name: "My Wallet", icon: Wallet, path: "/wallet", badge: null },
    { name: "Account", icon: User, path: "/account", badge: null },
    {
      name: "Notifications",
      icon: Bell,
      path: "/notifications",
      badge: "5",
    },
    { name: "Settings", icon: Settings, path: "/settings", badge: null },
  ];

  const isActive = (path) => location.pathname === path;

  // Close mobile menu when navigating
  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed z-50 p-2 transition-colors rounded-lg top-4 left-4 lg:hidden hover:bg-gray-700"
      >
        {isMobileOpen ? (
          <X size={24} style={{ color: "white" }} />
        ) : (
          <Menu size={24} style={{ color: "white" }} />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar - ChatGPT Style */}
      <div
        className={`fixed left-0 top-0 h-screen transition-all duration-500 z-40 flex flex-col ${
          isCollapsed ? "w-0 lg:w-20" : "w-64"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{
          backgroundColor: colors.lightBg,
          borderRight: `1px solid ${colors.lightPurpleOverlay33}`,
        }}
      >
        {/* Header - Collapse/Expand Toggle */}
        <div
          className={`flex items-center transition-all duration-500 ${
            isCollapsed
              ? "justify-center px-2 py-3"
              : "justify-between px-4 py-2.5"
          }`}
        >
          {!isCollapsed && (
            <span
              style={{ color: colors.darkPurple }}
              className="text-xs font-semibold tracking-wider"
            >
              MENU
            </span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="items-center justify-center hidden px-2 py-1.5 rounded-lg lg:flex hover:opacity-80 transition-all duration-500"
            style={{
              color: colors.lightBg,
              backgroundColor: colors.darkPurple,
            }}
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            <ChevronDown
              size={18}
              className={`transition-transform duration-500 ${isCollapsed ? "rotate-90" : "-rotate-90"}`}
            />
          </button>
        </div>

        {/* Navigation Items - Vertically Centered */}
        <nav className="flex-1 flex flex-col items-center justify-center px-2 py-1 space-y-0.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <div key={item.name} className="relative w-full group">
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center transition-all duration-300 text-sm relative rounded-lg py-2 ${
                    isCollapsed ? "justify-center px-1.5" : "gap-2.5 px-2.5"
                  }`}
                  style={{
                    backgroundColor: active
                      ? `${colors.lightPurple}30`
                      : "transparent",
                    color: active ? colors.darkPurple : colors.mediumPurple,
                  }}
                  title={isCollapsed ? item.name : ""}
                >
                  <Icon
                    size={20}
                    className="flex-shrink-0 transition-all duration-300"
                  />
                  {!isCollapsed && (
                    <span className="flex-1 font-medium text-left truncate transition-all duration-300">
                      {item.name}
                    </span>
                  )}

                  {/* Badge */}
                  {item.badge && !isCollapsed && (
                    <span
                      className="px-2 py-0.5 text-xs font-bold text-white rounded-full flex-shrink-0"
                      style={{
                        backgroundColor:
                          item.badge === "3" ? "#ff6b35" : "#16a34a",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div
                    className="absolute z-50 hidden px-3 py-2 ml-2 text-xs transition-all duration-300 -translate-y-1/2 rounded-lg left-full top-1/2 group-hover:block whitespace-nowrap"
                    style={{
                      backgroundColor: colors.lightPurple,
                      color: colors.darkPurple,
                      fontWeight: "600",
                    }}
                  >
                    {item.name}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer Items - Fixed at Bottom */}
        <div
          className="px-2 py-1 space-y-0.5 border-t transition-all duration-500"
          style={{ borderColor: colors.lightPurpleOverlay33 }}
        >
          {/* Help & Support */}
          <button
            onClick={() => handleNavigation("/support")}
            className={`w-full flex items-center transition-all duration-300 text-sm relative rounded-lg py-2 ${
              isCollapsed ? "justify-center px-1.5" : "gap-2.5 px-2.5"
            } group`}
            style={{
              backgroundColor: isActive("/support")
                ? colors.lightPurpleOverlay30
                : "transparent",
              color: isActive("/support")
                ? colors.darkPurple
                : colors.mediumPurple,
            }}
            title={isCollapsed ? "Help & Support" : ""}
          >
            <HelpCircle
              size={20}
              className="flex-shrink-0 transition-all duration-300"
            />
            {!isCollapsed && (
              <span className="flex-1 font-medium text-left truncate transition-all duration-300">
                Help & Support
              </span>
            )}

            {isCollapsed && (
              <div
                className="absolute z-50 hidden px-3 py-2 ml-2 text-xs transition-all duration-300 -translate-y-1/2 rounded-lg left-full top-1/2 group-hover:block whitespace-nowrap"
                style={{
                  backgroundColor: colors.lightPurple,
                  color: colors.darkPurple,
                  fontWeight: "600",
                }}
              >
                Support
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
