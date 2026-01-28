import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, LogOut, User, ChevronDown } from "lucide-react";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import pako from "pako";
import { colors } from "../../utils/colors";
import { SECRET_KEY } from "../../api";
import { SidebarContext } from "../../context/SidebarContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isCollapsed } = useContext(SidebarContext);
  const [userData, setUserData] = useState({ name: "", profileImage: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationBadge, setNotificationBadge] = useState(3);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get("tredingWeb");
      const encryptedData = Cookies.get("tredingWebUser");

      setIsAuthenticated(!!token && !!encryptedData);

      if (token && encryptedData) {
        try {
          const base64 = encryptedData.replace(/-/g, "+").replace(/_/g, "/");
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
            const data = JSON.parse(decompressed);
            setUserData({
              name: data.name || "User",
              profileImage: data.profileImage || "",
              email: data.email || "",
              phone: data.phone || "",
            });
          }
        } catch (error) {
          console.log("Navbar: Unable to decrypt user data");
          setUserData({ name: "User", profileImage: "" });
        }
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    setIsLoggingOut(true);

    // Show logout screen for 1.5 seconds, then clear data and navigate
    setTimeout(() => {
      Cookies.remove("tredingWeb");
      Cookies.remove("tredingWebUser");
      localStorage.removeItem("userData");
      setIsAuthenticated(false);
      setUserData({ name: "", profileImage: "" });
      setDropdownOpen(false);
      navigate("/");
      setIsLoggingOut(false);
    }, 1500);
  };

  const handleNotificationClick = () => {
    setNotificationBadge(0);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    return (parts[0]?.[0] + (parts[1]?.[0] || "")).toUpperCase();
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-30 flex items-center justify-between h-16 px-4 transition-all duration-500 border-b sm:px-6 lg:px-8 ${
        isCollapsed ? "lg:pl-24" : "lg:pl-80"
      }`}
      style={{
        backgroundColor: colors.lightBg,
        borderColor: colors.lightPurpleOverlay33,
      }}
    >
      {/* Left Side - Logo and App Name */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-3 transition-all duration-300 hover:opacity-80"
      >
        <img src="/MainLogo.svg" alt="InvestPro" className="w-auto h-8" />
        <span
          style={{ color: colors.darkPurple }}
          className="hidden text-lg font-bold sm:inline"
        >
          InvestPro
        </span>
      </button>

      <div className="flex-1" />

      {/* Right Side - Actions & Auth Buttons */}
      <div className="flex items-center gap-3 sm:gap-4">
        {isAuthenticated ? (
          <>
            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={handleNotificationClick}
                className="p-2 transition-all duration-300 rounded-lg hover:opacity-80"
                style={{
                  color: colors.darkPurple,
                  backgroundColor: colors.lightPurpleOverlay15,
                }}
                title="Notifications"
              >
                <Bell size={20} />
                {notificationBadge > 0 && (
                  <span
                    className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full"
                    style={{ backgroundColor: "#ef4444" }}
                  >
                    {notificationBadge}
                  </span>
                )}
              </button>
            </div>

            {/* Divider */}
            <div
              className="w-px h-6"
              style={{ backgroundColor: colors.lightPurpleOverlay33 }}
            />

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all duration-300 hover:opacity-80"
                style={{
                  backgroundColor: colors.lightPurpleOverlay15,
                  border: `1px solid ${colors.lightPurpleOverlay33}`,
                }}
              >
                {/* Avatar */}
                <div
                  className="flex items-center justify-center w-8 h-8 text-xs font-bold border-2 rounded-full"
                  style={{
                    backgroundColor: colors.lightPurple,
                    borderColor: colors.mediumPurple,
                    color: colors.darkPurple,
                  }}
                >
                  {userData.profileImage ? (
                    <img
                      src={userData.profileImage}
                      alt="Profile"
                      className="object-cover w-full h-full rounded-full"
                    />
                  ) : (
                    getInitials(userData.name)
                  )}
                </div>

                {/* Username */}
                <span
                  className="hidden text-sm font-medium sm:inline"
                  style={{ color: colors.darkPurple }}
                >
                  {userData.name?.split(" ")[0]}
                </span>

                {/* Chevron */}
                <ChevronDown
                  size={16}
                  className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  style={{ color: colors.mediumPurple }}
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div
                  className="absolute right-0 z-40 w-48 py-2 mt-2 rounded-lg shadow-lg"
                  style={{
                    backgroundColor: colors.lightBg,
                    border: `1px solid ${colors.lightPurpleOverlay33}`,
                  }}
                >
                  {/* My Profile */}
                  <button
                    onClick={() => {
                      navigate("/account");
                      setDropdownOpen(false);
                    }}
                    className="flex items-center w-full gap-3 px-4 py-2 text-sm transition-all duration-300 hover:opacity-70"
                    style={{ color: colors.darkPurple }}
                  >
                    <User size={18} />
                    <span>My Profile</span>
                  </button>

                  {/* Divider */}
                  <div
                    className="h-px my-2"
                    style={{ backgroundColor: colors.lightPurpleOverlay33 }}
                  />

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full gap-3 px-4 py-2 text-sm transition-all duration-300 hover:opacity-70"
                    style={{ color: "#ef4444" }}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Login Button */}
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:opacity-80"
              style={{
                color: colors.darkPurple,
                backgroundColor: colors.lightPurpleOverlay15,
                border: `1px solid ${colors.lightPurpleOverlay33}`,
              }}
            >
              Login
            </button>

            {/* Signup Button */}
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:opacity-80"
              style={{
                color: "white",
                backgroundColor: colors.darkPurple,
              }}
            >
              Sign Up
            </button>
          </>
        )}
      </div>

      {/* Logout Modal */}
      {isLoggingOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center">
            <div className="mb-4 animate-spin">
              <div
                className="w-16 h-16 border-4 border-transparent rounded-full"
                style={{
                  borderTopColor: colors.lightPurple,
                }}
              ></div>
            </div>
            <h2
              style={{ color: colors.darkPurple }}
              className="text-2xl font-bold mb-2"
            >
              Logging Out
            </h2>
            <p style={{ color: colors.mediumPurple }} className="text-sm">
              See you next time!
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
