import React, { useEffect, useState } from "react";
import {
  Home,
  DollarSign,
  User,
  Users,
  ShoppingBag,
  ArrowRight,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { getUserInfo, SECRET_KEY, tokenVerify } from "../../api";
import Support from "../support/Support";
import pako from "pako";
import PopupCard from "./PopupCard";
import LiveProof from "../invest/LiveProofList";
import { colors } from "../../utils/colors";
import {
  Card,
  Text,
  Button,
  BottomNavigation,
  Badge,
  Sidebar,
  Navbar,
} from "../../components";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [UserData, setUserData] = useState({});
  const [copied, setCopied] = useState(false);
  const [balance, setBalance] = useState("0");
  const [withdraw, setwithdraw] = useState("0");
  const [TeamSize, setTeamSize] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const encryptedUser = Cookies.get("tredingWebUser");
    const token = Cookies.get("tredingWeb");
    
    // No token/user - show unauthenticated view
    if (!encryptedUser || !token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const base64 = encryptedUser.replace(/-/g, "+").replace(/_/g, "/");

      // 🔹 AES decrypt (gives compressed Base64 string)
      const decryptedBase64 = CryptoJS.AES.decrypt(
        base64,
        SECRET_KEY,
      ).toString(CryptoJS.enc.Utf8);
      if (!decryptedBase64) {
        setIsAuthenticated(false);
        return;
      }

      // 🔹 Convert Base64 → Uint8Array (binary bytes)
      const binaryString = atob(decryptedBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // 🔹 Decompress (restore JSON string)
      const decompressed = pako.inflate(bytes, { to: "string" });
      const UserData = await JSON.parse(decompressed);

      if (!UserData?._id) {
        setIsAuthenticated(false);
        return;
      }

      const res1 = await tokenVerify(token, UserData?.phone);
      try {
        if (res1.status === 200 && res1.data.success) {
          // ✅ Token valid, user data in res.data.data
          setIsAuthenticated(true);
          setUserData(UserData);

          const res = await getUserInfo(UserData._id); // fetch user info
          setTeamSize(res?.data?.activeCount || 0);
          setBalance(res?.data?.users?.balance || "0");
          setwithdraw(res?.data?.users?.Withdrawal || "0");
        } else {
          Cookies.remove("tredingWeb");
          Cookies.remove("tredingWebUser");
          localStorage.removeItem("userData");
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error(err);

        // 🔹 If server returns 403 → token mismatch
        if (err.response?.status === 403) {
          // Clear cookies and local storage
          Cookies.remove("tredingWeb");
          Cookies.remove("tredingWebUser");
          localStorage.removeItem("userData");
          setIsAuthenticated(false);
        } else {
          // Optional: handle other errors
          console.log("Session error");
          setIsAuthenticated(false);
        }
      }
    } catch (err) {
      console.error("Failed to fetch user info:", err);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); // ✅ empty array ensures it runs only once

  const copyLink = () => {
    const link = `http://realstateinvest.in/register?invitation_code=${UserData.referralCode}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const tabs = [
    { name: "Home", icon: <Home size={22} />, path: "/" },
    { name: "invest", icon: <DollarSign size={22} />, path: "/invest" },
    { name: "Teams", icon: <Users size={22} />, path: "/teams" },
    { name: "Profile", icon: <User size={22} />, path: "/account" },
  ];

  const questRewards = [
    {
      id: 1,
      text: "Inviting activation of 20",
      reward: "₹ 1600.00",
      progress: { current: 4, total: 20 },
    },
    {
      id: 2,
      text: "Inviting activation of 70",
      reward: "₹ 5000.00",
      progress: { current: 4, total: 70 },
    },
    {
      id: 3,
      text: "Inviting activation of 200",
      reward: "₹ 13000.00",
      progress: { current: 4, total: 200 },
    },
    {
      id: 4,
      text: "Inviting activation of 500",
      reward: "₹ 50000.00",
      progress: { current: 4, total: 500 },
    },
    {
      id: 5,
      text: "Inviting activation of 2000",
      reward: "₹ 180000.00",
      progress: { current: 4, total: 2000 },
    },
    {
      id: 6,
      text: "Inviting activation of 5000",
      reward: "₹ 500000.00",
      progress: { current: 4, total: 5000 },
    },
    {
      id: 7,
      text: "Inviting activation of 10000",
      reward: "₹ 1000000.00",
      progress: { current: 4, total: 10000 },
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Navbar - Fixed Top */}
      <Navbar />

      <div className="flex flex-1 w-full">
        {/* Sidebar - Only show when authenticated */}
        {isAuthenticated && (
          <div className="fixed inset-0 lg:relative lg:inset-auto">
            <Sidebar />
          </div>
        )}

        {/* Main Content */}
        <div className="flex flex-col flex-1 w-full lg:ml-0">
          <div
            className={`flex-1 px-4 pt-20 pb-28 sm:pt-20 sm:pb-8 sm:px-6 lg:px-8 lg:pb-8 ${
              isAuthenticated ? "lg:pt-20" : "lg:pt-20"
            }`}
            style={{ backgroundColor: colors.lightBgContent }}
          >
            {isAuthenticated ? (
              /* Authenticated Content */
              <>
                {/* Welcome Section - ChatGPT Style */}
                <div className="max-w-4xl mx-auto mb-8">
              {/* Quick Action Cards - Grid */}
              <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2">
                {/* Invest Card */}
                <div
                  onClick={() => navigate("/invest")}
                  className="p-6 transition-all rounded-lg cursor-pointer hover:scale-105 hover:shadow-lg"
                  style={{
                    backgroundColor: colors.lightBgCard,
                    border: `1px solid ${colors.lightPurpleOverlay50}`,
                    boxShadow: `0 2px 8px ${colors.lightPurpleOverlay15}`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: colors.lightPurple }}
                    >
                      <DollarSign
                        size={24}
                        style={{ color: colors.darkPurple }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        style={{ color: colors.darkPurple }}
                        className="mb-1 font-semibold"
                      >
                        Start Investing
                      </h3>
                      <p
                        style={{ color: colors.mediumPurple }}
                        className="text-sm"
                      >
                        Browse investment opportunities
                      </p>
                    </div>
                  </div>
                </div>

                {/* Teams Card */}
                <div
                  onClick={() => navigate("/teams")}
                  className="p-6 transition-all rounded-lg cursor-pointer hover:scale-105 hover:shadow-lg"
                  style={{
                    backgroundColor: colors.lightBgCard,
                    border: `1px solid ${colors.lightPurpleOverlay50}`,
                    boxShadow: `0 2px 8px ${colors.lightPurpleOverlay15}`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: colors.lightPurple }}
                    >
                      <Users size={24} style={{ color: colors.darkPurple }} />
                    </div>
                    <div className="flex-1">
                      <h3
                        style={{ color: colors.darkPurple }}
                        className="mb-1 font-semibold"
                      >
                        My Team
                      </h3>
                      <p
                        style={{ color: colors.mediumPurple }}
                        className="text-sm"
                      >
                        Manage your team members
                      </p>
                    </div>
                  </div>
                </div>

                {/* Wallet Card */}
                <div
                  onClick={() => navigate("/wallet")}
                  className="p-6 transition-all rounded-lg cursor-pointer hover:scale-105 hover:shadow-lg"
                  style={{
                    backgroundColor: colors.lightBgCard,
                    border: `1px solid ${colors.lightPurpleOverlay50}`,
                    boxShadow: `0 2px 8px ${colors.lightPurpleOverlay15}`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: colors.lightPurple }}
                    >
                      <Wallet size={24} style={{ color: colors.darkPurple }} />
                    </div>
                    <div className="flex-1">
                      <h3
                        style={{ color: colors.darkPurple }}
                        className="mb-1 font-semibold"
                      >
                        My Wallet
                      </h3>
                      <p
                        style={{ color: colors.mediumPurple }}
                        className="text-sm"
                      >
                        View balance & transactions
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account Card */}
                <div
                  onClick={() => navigate("/account")}
                  className="p-6 transition-all rounded-lg cursor-pointer hover:scale-105 hover:shadow-lg"
                  style={{
                    backgroundColor: colors.lightBgCard,
                    border: `1px solid ${colors.lightPurpleOverlay50}`,
                    boxShadow: `0 2px 8px ${colors.lightPurpleOverlay15}`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: colors.lightPurple }}
                    >
                      <User size={24} style={{ color: colors.darkPurple }} />
                    </div>
                    <div className="flex-1">
                      <h3
                        style={{ color: colors.darkPurple }}
                        className="mb-1 font-semibold"
                      >
                        My Account
                      </h3>
                      <p
                        style={{ color: colors.mediumPurple }}
                        className="text-sm"
                      >
                        Update your profile
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-4 mb-12">
                <div
                  className="p-4 text-center rounded-lg"
                  style={{ backgroundColor: colors.lightPurpleOverlay15 }}
                >
                  <p
                    style={{ color: colors.darkPurple }}
                    className="mb-1 text-2xl font-bold md:text-3xl"
                  >
                    ₹{balance}
                  </p>
                  <p
                    style={{ color: colors.mediumPurple }}
                    className="text-xs md:text-sm"
                  >
                    Balance
                  </p>
                </div>
                <div
                  className="p-4 text-center rounded-lg"
                  style={{ backgroundColor: `${colors.lightPurple}15` }}
                >
                  <p
                    style={{ color: colors.darkPurple }}
                    className="mb-1 text-2xl font-bold md:text-3xl"
                  >
                    {TeamSize}
                  </p>
                  <p
                    style={{ color: colors.mediumPurple }}
                    className="text-xs md:text-sm"
                  >
                    Team Members
                  </p>
                </div>
                <div
                  className="p-4 text-center rounded-lg"
                  style={{ backgroundColor: colors.lightPurpleOverlay15 }}
                >
                  <p
                    style={{ color: colors.darkPurple }}
                    className="mb-1 text-2xl font-bold md:text-3xl"
                  >
                    ₹{withdraw}
                  </p>
                  <p
                    style={{ color: colors.mediumPurple }}
                    className="text-xs md:text-sm"
                  >
                    Withdrawable
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Sections */}
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Invitation Card */}
              <div
                className="p-6 mb-8 rounded-lg"
                style={{
                  backgroundColor: colors.lightPurpleOverlay10,
                  border: `1px solid ${colors.lightPurpleOverlay40}`,
                }}
              >
                <h3
                  style={{ color: colors.darkPurple }}
                  className="mb-4 text-lg font-semibold"
                >
                  🎁 Invite Friends & Earn
                </h3>
                <p
                  style={{ color: colors.mediumPurple }}
                  className="mb-4 text-sm"
                >
                  Share your referral link and get rewards when they join!
                </p>
                <div
                  className="p-3 mb-4 font-mono text-xs break-all rounded-lg md:text-sm"
                  style={{
                    backgroundColor: colors.lightPurpleOverlay20,
                    color: colors.darkPurple,
                    border: `1px solid ${colors.lightPurpleOverlay30}`,
                  }}
                >
                  http://realstateinvest.in/register?invitation_code=
                  {UserData.referralCode}
                </div>
                <button
                  onClick={copyLink}
                  className="w-full px-4 py-2.5 rounded-lg font-medium transition-all text-sm"
                  style={{
                    backgroundColor: colors.lightPurple,
                    color: colors.darkPurple,
                  }}
                >
                  {copied ? "✅ Copied!" : "📋 Copy Link"}
                </button>
              </div>

              {/* Popular Features */}
              <div>
                <h2
                  style={{ color: colors.darkPurple }}
                  className="mb-4 text-lg font-semibold"
                >
                  Popular Features
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Lucky Draw */}
                  <div
                    onClick={() =>
                      navigate("/luckydraw", { state: UserData?._id })
                    }
                    className="p-6 transition-all rounded-lg cursor-pointer hover:scale-105 hover:shadow-lg"
                    style={{
                      backgroundColor: colors.lightBgCard,
                      border: `1px solid ${colors.lightPurpleOverlay50}`,
                      boxShadow: `0 2px 8px ${colors.lightPurpleOverlay15}`,
                    }}
                  >
                    <h4
                      style={{ color: colors.darkPurple }}
                      className="mb-2 font-semibold"
                    >
                      🍡 Lucky Draw
                    </h4>
                    <p
                      style={{ color: colors.mediumPurple }}
                      className="text-sm"
                    >
                      Win amazing prizes daily
                    </p>
                  </div>

                  {/* Help & Support */}
                  <div
                    onClick={() => navigate("/support")}
                    className="p-6 transition-all rounded-lg cursor-pointer hover:scale-105 hover:shadow-lg"
                    style={{
                      backgroundColor: colors.lightBgCard,
                      border: `1px solid ${colors.lightPurpleOverlay50}`,
                      boxShadow: `0 2px 8px ${colors.lightPurpleOverlay15}`,
                    }}
                  >
                    <h4
                      style={{ color: colors.darkPurple }}
                      className="mb-2 font-semibold"
                    >
                      💬 Support
                    </h4>
                    <p
                      style={{ color: colors.mediumPurple }}
                      className="text-sm"
                    >
                      Get help anytime
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* <Support /> */}
              </>
            ) : (
              /* Unauthenticated Content */
              <div className="max-w-4xl mx-auto">
                <div className="text-center py-16">
                  <h1
                    style={{ color: colors.darkPurple }}
                    className="text-3xl md:text-4xl font-bold mb-4"
                  >
                    Welcome to Real Estate Investment
                  </h1>
                  <p
                    style={{ color: colors.mediumPurple }}
                    className="text-lg mb-8"
                  >
                    Start building wealth with smart investment opportunities
                  </p>
                  <div className="flex gap-4 justify-center flex-wrap">
                    <button
                      onClick={() => navigate("/login")}
                      className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-80"
                      style={{
                        color: colors.darkPurple,
                        backgroundColor: colors.lightPurpleOverlay15,
                        border: `2px solid ${colors.lightPurple}`,
                      }}
                    >
                      Login
                    </button>
                    <button
                      onClick={() => navigate("/register")}
                      className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:opacity-80"
                      style={{
                        color: "white",
                        backgroundColor: colors.lightPurple,
                      }}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Navigation - Mobile Only - Only for authenticated users */}
          {isAuthenticated && (
            <div className="lg:hidden">
              <BottomNavigation activeId="home" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
