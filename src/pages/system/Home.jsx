import React, { useEffect, useState } from "react";
import {
  Home,
  DollarSign,
  User,
  Users,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { getUserInfo, SECRET_KEY, tokenVerify } from "../../api";
import Support from "../support/Support";
import pako from "pako";
import PopupCard from "./PopupCard";
import LiveProof from "../invest/LiveProofList";
import { Card, Text, Button, BottomNavigation, Badge } from "../../components";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const [UserData, setUserData] = useState({});
  const [copied, setCopied] = useState(false);
  const [balance, setBalance] = useState("0");
  const [withdraw, setwithdraw] = useState("0");
  const [TeamSize, setTeamSize] = useState(0);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const encryptedUser = Cookies.get("tredingWebUser");
    const token = Cookies.get("tredingWeb");
    if (encryptedUser) {
      try {
        const base64 = encryptedUser.replace(/-/g, "+").replace(/_/g, "/");

        // 🔹 3. AES decrypt (gives compressed Base64 string)
        const decryptedBase64 = CryptoJS.AES.decrypt(
          base64,
          SECRET_KEY,
        ).toString(CryptoJS.enc.Utf8);
        if (!decryptedBase64) return null;

        // 🔹 4. Convert Base64 → Uint8Array (binary bytes)
        const binaryString = atob(decryptedBase64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // 🔹 5. Decompress (restore JSON string)
        const decompressed = pako.inflate(bytes, { to: "string" });
        const UserData = await JSON.parse(decompressed);

        if (!UserData?._id) {
          navigate("/login");
        }
        const res1 = await tokenVerify(token, UserData?.phone);
        try {
          console.log(res1);
          if (res1.status === 200 && res1.data.success) {
            // ✅ Token valid, user data in res.data.data
          } else {
            Cookies.remove("tredingWeb");
            Cookies.remove("tredingWebUser");
            localStorage.removeItem("userData");
            navigate("/login");
          }
        } catch (err) {
          console.error(err);

          // 🔹 If server returns 403 → token mismatch
          if (err.response?.status === 403) {
            // Clear cookies and local storage
            Cookies.remove("tredingWeb");
            Cookies.remove("tredingWebUser");
            localStorage.removeItem("userData");

            // Redirect to login
            navigate("/login");
          } else {
            // Optional: handle other errors
            alert("Session expired or server error.");
          }
        }

        setUserData(UserData);

        const res = await getUserInfo(UserData._id); // fetch user info
        console.log(res?.data?.users?.team1);
        setTeamSize(res?.data?.activeCount || 0);
        setBalance(res?.data?.users?.balance || "0");
        setwithdraw(res?.data?.users?.Withdrawal || "0");
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    } else {
      navigate("/login");
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
    { name: "Home", icon: <Home size={22} />, path: "/home" },
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
    <>
      {/* --- Top Navigation (Desktop Only) --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 hidden border-b-2 shadow-lg bg-gradient-to-b from-white to-white/95 backdrop-blur-md border-purple-300/30 md:block">
        <div className="flex items-center justify-between gap-2 px-4 py-3 md:px-6 md:py-4">
          {/* Logo */}
          <div className="flex-shrink-0 min-w-[50px]">
            <img
              src="/Sub Container1.svg"
              alt="Real Estate Logo"
              className="object-cover w-12 h-12 border-2 rounded-full shadow-lg md:w-12 md:h-12"
            />
          </div>

          {/* Nav Items */}
          <div className="flex items-center justify-around flex-1 gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className={`flex flex-col items-center gap-1 px-2 md:px-3 py-2 rounded-lg transition-all flex-1 justify-center min-w-[60px] md:min-w-[80px] font-semibold text-xs md:text-sm whitespace-nowrap ${
                  activeTab === tab.name
                    ? "text-purple-600 bg-gradient-to-b from-purple-100 to-purple-50 border-b-3 border-purple-600"
                    : "text-gray-400 hover:text-purple-600 hover:bg-purple-50"
                }`}
                onClick={() => {
                  setActiveTab(tab.name);
                  navigate(tab.path);
                }}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* --- Bottom Navigation (Mobile & Tablet) --- */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t-2 shadow-lg bg-gradient-to-t from-white to-white/95 backdrop-blur-md border-purple-300/30 md:hidden">
        <div className="flex items-center justify-around gap-0 px-2 py-3">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-all flex-1 justify-center min-w-[50px] font-semibold text-xs ${
                activeTab === tab.name
                  ? "text-purple-600 bg-gradient-to-b from-purple-100 to-purple-50 border-t-3 border-purple-600"
                  : "text-gray-400 hover:text-purple-600 hover:bg-purple-50"
              }`}
              onClick={() => {
                setActiveTab(tab.name);
                navigate(tab.path);
              }}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="min-h-screen px-4 pt-4 pb-28 md:pt-28 md:pb-8 md:px-6 bg-gradient-to-br from-white via-purple-50/50 to-purple-100/30">
        {/* --- Wallet Card --- */}
        <Card
          variant="default"
          padding="lg"
          className="relative mb-5 overflow-hidden text-white bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl md:p-6 shadow-xl"
        >
          {/* Image on Right */}
          <div className="absolute top-0 bottom-0 w-40 -right-8 md:-right-6 md:w-48 opacity-40 md:opacity-50">
            <img
              src="/Image.png"
              alt="Wallet Decoration"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Content on Left */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full ring-2 ring-white/30">
                <img
                  src="/logo.svg"
                  alt="Logo"
                  className="object-contain w-14 h-14"
                />
              </div>
              <Text
                variant="h2"
                className="text-2xl font-bold md:text-xl text-white"
              >
                Main Wallet
              </Text>
            </div>

            <div className="grid grid-cols-2 gap-3 pr-4 mb-4 md:gap-4">
              <div>
                <Text
                  variant="sm"
                  className="font-extrabold text-md md:text-sm text-white/90"
                >
                  Your Balance
                </Text>
                <Text
                  variant="h2"
                  className="mt-1 text-xl font-bold text-white md:text-2xl"
                >
                  ₹{balance}
                </Text>
              </div>
              <div>
                <Text
                  variant="sm"
                  className="font-extrabold text-md md:text-sm text-white/90"
                >
                  Total Profit
                </Text>
                <Text
                  variant="h2"
                  className="mt-1 text-xl font-bold text-white md:text-2xl"
                >
                  ₹{withdraw}
                </Text>
              </div>
            </div>

            <div className="flex gap-3 pr-4">
              <Button
                variant="primary"
                onClick={() => navigate("/recharge")}
                className="flex-1 text-sm md:text-base"
              >
                Recharge
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate("/withdraw")}
                className="flex-1 text-sm md:text-base"
              >
                Withdraw
              </Button>
            </div>
          </div>
        </Card>

        {/* --- Icon Grid --- */}
        <div className="grid grid-cols-1 gap-4 mb-5 md:grid-cols-2">
          <Card
            variant="default"
            padding="lg"
            className="text-center cursor-pointer bg-gradient-to-br from-white to-purple-50 border border-purple-200/50 hover:border-purple-500 hover:shadow-lg transition-all"
            onClick={() => navigate("/teams")}
          >
            <Users size={28} className="mx-auto mb-2 text-purple-600" />
            <Text
              variant="sm"
              className="text-xs font-semibold text-gray-800 md:text-sm"
            >
              Teams
            </Text>
          </Card>

          <Card
            variant="default"
            padding="lg"
            className="text-center cursor-pointer bg-gradient-to-br from-white to-purple-50 border border-purple-200/50 hover:border-purple-500 hover:shadow-lg transition-all"
            onClick={() => navigate("/orders")}
          >
            <ShoppingBag size={28} className="mx-auto mb-2 text-purple-600" />
            <Text
              variant="sm"
              className="text-xs font-semibold text-gray-800 md:text-sm"
            >
              Orders
            </Text>
          </Card>
        </div>

        <PopupCard />

        {/* --- Invitation Card --- */}
        <Card
          variant="default"
          padding="lg"
          className="mb-5 border border-purple-200/50 hover:shadow-xl transition-all"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <Text
              variant="h3"
              className="text-lg font-bold text-gray-800 md:text-xl"
            >
              🎁 Invitation
            </Text>
            <Button
              variant="secondary"
              onClick={() => navigate("/teams")}
              className="flex items-center gap-1 text-xs md:gap-2 md:text-sm hover:gap-3"
            >
              My team{" "}
              <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
            </Button>
          </div>

          <div className="flex flex-wrap items-start gap-3 mb-4 md:gap-4 md:flex-nowrap">
            <div className="flex-shrink-0 w-16 h-16 overflow-hidden border-2 border-purple-500 rounded-full md:w-20 md:h-20 bg-gradient-to-br from-purple-50 to-purple-100">
              <img
                src="https://img.freepik.com/free-vector/contact-concept-landing-page_52683-21298.jpg?semt=ais_hybrid&w=740"
                alt="Invitation Icon"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1">
              <Text
                variant="sm"
                className="mb-2 text-xs font-medium text-gray-600 md:text-sm"
              >
                📱 Promotional Links
              </Text>
              <Text
                variant="sm"
                className="text-xs font-semibold text-gray-700 bg-purple-50 p-2 md:p-3 rounded border-l-4 border-purple-500 break-all max-h-[80px] overflow-y-auto"
              >
                http://realstateinvest.in/register?invitation_code=
                {UserData.referralCode}
              </Text>
            </div>
          </div>

          <Button variant="primary" onClick={copyLink} className="w-full">
            {copied ? "✅ Copied!" : "📋 Copy Invitation Link"}
          </Button>
        </Card>

        {/* --- Lucky Draw --- */}
        <Card
          variant="default"
          padding="lg"
          className="relative mb-5 overflow-hidden text-white bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl md:p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
        >
          <div className="relative z-10">
            <Text variant="h3" className="mb-2 text-lg font-bold md:text-xl">
              🎡 Lucky Draw
            </Text>
            <Text
              variant="body"
              className="mb-4 text-xs md:text-sm text-white/90"
            >
              🎯 The lucky wheel keeps spinning with great gifts!
            </Text>
            <Button
              variant="primary"
              onClick={() => navigate("/luckydraw", { state: UserData?._id })}
              className="w-full"
            >
              Try Your Luck →
            </Button>
          </div>
        </Card>

        <LiveProof />

        {/* --- Quest Rewards --- */}
        <Card
          variant="default"
          padding="lg"
          className="mb-8 border border-purple-200/50 bg-gradient-to-br from-white to-purple-50/50"
        >
          <Text
            variant="h3"
            className="mb-4 text-lg font-bold text-gray-800 md:text-xl"
          >
            🏆 Quest Rewards
          </Text>

          <div className="space-y-3 md:space-y-4">
            {questRewards.map((quest) => (
              <Card
                key={quest.id}
                variant="default"
                padding="md"
                className="flex items-center gap-3 border border-purple-200/50 hover:border-purple-500 hover:shadow-md transition-all md:gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 overflow-hidden rounded-lg md:w-14 md:h-14 bg-gradient-to-br from-purple-50 to-purple-100">
                  <img
                    src="https://img.freepik.com/free-vector/young-couple-using-tablet_603843-987.jpg?semt=ais_hybrid&w=740&q=80"
                    alt="Quest Icon"
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <Text
                    variant="sm"
                    className="text-xs font-semibold text-gray-800 truncate md:text-sm"
                  >
                    {quest.text}
                  </Text>
                  <div className="w-full h-1.5 md:h-2 bg-gray-200 rounded-full overflow-hidden mt-2 border border-purple-200/50">
                    <div
                      className="h-full transition-all duration-300 rounded-full bg-gradient-to-r from-purple-600 to-purple-700"
                      style={{
                        width: `${(TeamSize / quest.progress.total) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="flex-shrink-0 text-right">
                  <Text
                    variant="sm"
                    className="text-xs font-bold text-purple-600 md:text-sm"
                  >
                    💰{quest.reward}
                  </Text>
                  <Text
                    variant="sm"
                    className="text-xs font-medium text-gray-500"
                  >
                    {TeamSize}/{quest.progress.total}
                  </Text>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>

      <Support />
    </>
  );
};

export default HomePage;
