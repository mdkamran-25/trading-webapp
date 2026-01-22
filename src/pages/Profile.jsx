import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  User,
  Copy,
  ArrowLeft,
  AtSign,
  Phone,
  LogOut,
  TrendingDown,
  ShoppingCart,
  DollarSign,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { VIPBadge } from "./VIP";
// --- Color and Style Constants ---
const BRIGHT_ORANGE = "#ff9900";

// Utility function for copying text using document.execCommand
const copyToClipboard = (text) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    console.log("Text copied to clipboard:", text);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
  document.body.removeChild(textarea);
};
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

// Main App component
const Profile = ({ userInfo, accountData }) => {
  const [user, setUser] = useState({
    phone: userInfo?.phone || "N/A",
    userId: userInfo?.userId || "-",
    referralCode: userInfo?.userInfo?.referralCode || "-",
    balance: userInfo?.updatedData?.balance || 0,
    pendingIncome: userInfo?.updatedData?.pendingIncome || 0,
    totalBuy: userInfo?.updatedData?.totalBuy || 0,
    withdrawal: userInfo?.updatedData?.Withdrawal || 0,
    registrationDate: userInfo?.userInfo?.registrationDate || new Date(),
  });

  const navigate = useNavigate();
  // Simple state to simulate page navigation
  const [activeScreen, setActiveScreen] = useState("home");
  const accountpaloadData = [
    { label: "Total Buy", value: accountData.totalBuy },
    { label: "Product Income", value: accountData.productIncome },

    { label: "Pending Income", value: accountData.pendingIncome },
    { label: "Tasks Reward", value: accountData.tasksReward },
  ];

  const services = [
    {
      name: "Team",
      icon: "https://img.icons8.com/color/48/group.png",
      screen: "home",
      path: "/teams",
      userInfo,
    },
    {
      name: "User Info",
      icon: "https://img.icons8.com/color/48/info.png",
      screen: "profit",
      path: "/info",
      userInfo,
    },
    {
      name: "About",
      icon: "https://img.icons8.com/color/48/user.png",
      screen: "home",
      path: "/about",
      userInfo,
    },
    {
      name: "VIP",
      icon: "https://img.icons8.com/color/48/vip.png",
      screen: "home",
      path: "/vip",
      userInfo,
    },
    {
      name: "Trade Password",
      icon: "https://img.icons8.com/color/48/lock-2.png",
      screen: "home",
      path: "/tradepassword",
      userInfo,
    },
    {
      name: "Change Password",
      icon: "https://img.icons8.com/color/48/key.png",
      screen: "home",
      path: "/ChangePassword",
      userInfo,
    },
  ];
  useEffect(() => {
    setUser({
      phone: userInfo?.phone || "N/A",
      userId: userInfo?.userId || "-",
      referralCode: userInfo?.userInfo?.referralCode || "-",
      balance: userInfo?.updatedData?.balance || 0,
      pendingIncome: userInfo?.updatedData?.pendingIncome || 0,
      totalBuy: userInfo?.updatedData?.totalBuy || 0,
      withdrawal: userInfo?.updatedData?.Withdrawal || 0,
      registrationDate: userInfo?.userInfo?.registrationDate || new Date(),
    });
  }, [
    userInfo?.phone,
    userInfo?.updatedData?.Withdrawal,
    userInfo?.updatedData?.balance,
    userInfo?.updatedData?.pendingIncome,
    userInfo?.updatedData?.totalBuy,
    userInfo?.userId,
    userInfo?.userInfo?.referralCode,
    userInfo?.userInfo?.registrationDate,
  ]);

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full">
        {activeScreen !== "profit" ? (
          <>
            <HeaderBackground />
            <div className="relative z-10 p-4 mb-20">
              <ProfileHeader userId={userInfo.userId} userInfo={userInfo} />
              <BalanceSummary accountData={accountpaloadData} />

              <section className="pb-2.5 border-t border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 mb-2.5 border-b-2 border-gray-100 pb-1.5">
                  Financial Summary
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  <div
                    className="bg-orange-50 border border-orange-200 rounded-xl p-2.5 cursor-pointer"
                    onClick={() =>
                      navigate("/RechargeHistory", {
                        state: {
                          data: userInfo.rechargeHistory,
                          totalAmount:
                            userInfo?.totalAmount?.totalRechargeAmount,
                        },
                      })
                    }
                  >
                    <p className="text-gray-600 text-xs flex items-center gap-1.5">
                      <Wallet size={16} /> Balance
                    </p>
                    <h3 className="text-lg font-bold text-gray-900 mt-1.5">
                      ₹{user.balance.toFixed(2)}
                    </h3>
                    <div className="pt-1.5">
                      <button className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition text-sm">
                        Recharge History
                      </button>
                    </div>
                  </div>
                  <div
                    className="bg-yellow-50 border border-yellow-200 rounded-xl p-2.5 cursor-pointer"
                    onClick={() =>
                      navigate("/orders", { state: userInfo?.withdrawHistory })
                    }
                  >
                    <p className="text-gray-600 text-xs flex items-center gap-1.5">
                      <ShoppingCart size={16} /> Total Orders
                    </p>
                    <h3 className="text-lg font-bold text-gray-900 mt-1.5">
                      {accountData.ordersCount}
                    </h3>
                    <div className="pt-1.5">
                      <button className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition text-sm">
                        Orders History
                      </button>
                    </div>
                  </div>
                  <div
                    className="bg-orange-50 border border-orange-200 rounded-xl p-2.5 cursor-pointer"
                    onClick={() =>
                      navigate("/orders", { state: userInfo?.withdrawHistory })
                    }
                  >
                    <p className="text-gray-600 text-xs flex items-center gap-1.5">
                      <DollarSign size={16} /> Total Buy
                    </p>
                    <h3 className="text-lg font-bold text-gray-900 mt-1.5">
                      ₹{user.totalBuy.toFixed(2)}
                    </h3>
                    <div className="pt-1.5">
                      <button className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition text-sm">
                        Orders History
                      </button>
                    </div>
                  </div>
                  <div
                    className="bg-yellow-50 border border-yellow-200 rounded-xl p-2.5 cursor-pointer"
                    onClick={() =>
                      navigate("/WithdrawHistory", {
                        state: {
                          data: userInfo?.withdrawHistory,
                          totalAmount:
                            userInfo?.totalAmount?.totalWithdrawAmount,
                        },
                      })
                    }
                  >
                    <p className="text-gray-600 text-xs flex items-center gap-1.5">
                      <TrendingDown size={16} /> Withdrawal
                    </p>
                    <h3 className="text-lg font-bold text-gray-900 mt-1.5">
                      ₹{user.withdrawal.toFixed(2)}
                    </h3>
                    <div className="pt-1.5">
                      <button className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition text-sm">
                        Withdrawal History
                      </button>
                    </div>
                  </div>
                </div>
              </section>
              <ServicesList navigate={navigate} services={services} />
              <SignOutButton navigate={navigate} />
            </div>
          </>
        ) : (
          <ProfileDetail
            userInfo={userInfo}
            setActiveScreen={setActiveScreen}
          />
        )}
      </div>
    </div>
  );
};

// --- Sub Components ---

// Component for the background of the header area
const HeaderBackground = () => (
  <div
    className="w-full h-48 bg-cover bg-center rounded-b-2xl overflow-hidden"
    style={{
      backgroundImage: `url('https://i.pinimg.com/736x/21/fa/e8/21fae80dd33394b8c7622e6d136f9597.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div className="p-4 flex items-center justify-start">
      <div className="bg-white p-1 rounded-full shadow-lg">
        <img src="/logo.jpg" alt="Logo" className="w-8 h-8 rounded-full" />
      </div>
    </div>
  </div>
);

// Component for the profile section (ID and New tag)
const ProfileHeader = ({ userId, userInfo }) => {
  const displayLength = 7;
  const truncatedId =
    userId.length > displayLength
      ? userId.substring(0, displayLength) + ".."
      : userId;
  const currentInvestment = userInfo?.totalAmount?.totalRechargeAmount || 0;
  let current = VIP_LEVELS[0];
  for (let i = VIP_LEVELS.length - 1; i >= 0; i--) {
    if (currentInvestment >= VIP_LEVELS[i].investment) {
      current = VIP_LEVELS[i];
      break;
    }
  }

  return (
    <div className="bg-white p-4 -mt-20 mb-4 rounded-xl shadow-2xl flex items-center justify-between">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-yellow-400 shadow-md">
            <img
              src="/avatar.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold text-gray-900">
              ID: {truncatedId}
            </span>
            <button
              onClick={() => copyToClipboard(userId)}
              className="text-gray-400 hover:text-gray-900 transition p-1 rounded-full"
              title="Copy User ID"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <h3 className="text-sm font-semibold text-gray-900">VIP Level</h3>
          <VIPBadge levelData={current} size="badge-small" isCurrent={true} />
        </div>
      </div>
    </div>
  );
};

// Component for the balance and income metrics
const BalanceSummary = ({ accountData }) => {
  const data = accountData;

  return (
    <div className="bg-white p-4 mb-6 rounded-xl shadow-md border-t-4 border-orange-500">
      <div className="flex justify-around text-center">
        {data.map((item, index) => (
          <div key={index}>
            <div className="text-xl font-bold text-gray-900">
              {item.value >= 1000000
                ? (item.value / 1000000).toFixed(1) + "M"
                : item.value >= 1000
                  ? (item.value / 1000).toFixed(1) + "K"
                  : item.value}
            </div>
            <div className="text-sm text-gray-600">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Component for the list of services
const ServicesList = ({ setActiveScreen, navigate, services }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-2">
        My Services
      </h3>
      <div className="flex flex-col gap-3">
        {services.map((service) => (
          <ServiceItem
            key={service.name}
            service={service}
            onClick={() => {
              navigate(service.path, { state: service.userInfo });
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Reusable component for a single service list item
const ServiceItem = ({ service, onClick }) => (
  <button
    onClick={onClick}
    className="w-full bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition flex items-center justify-between"
  >
    <div className="flex items-center gap-4">
      <img
        className="w-6 h-6 text-orange-500"
        src={service.icon}
        alt={service.name}
      />
      <span className="text-lg font-medium text-gray-700">{service.name}</span>
    </div>
    <ChevronRight className="w-5 h-5 text-gray-400" />
  </button>
);

// Component for the Sign Out button
const SignOutButton = ({ navigate }) => (
  <button
    className="w-full py-3 bg-orange-500 text-white font-semibold text-lg rounded-xl mt-8 hover:bg-orange-600 transition active:scale-95 flex items-center justify-center gap-2 shadow-md"
    onClick={() => {
      Cookies.remove("tredingWeb");
      Cookies.remove("tredingWebUser");
      localStorage.removeItem("userData");
      navigate("/login");
    }}
  >
    <LogOut className="w-5 h-5" />
    <span>Sign Out</span>
  </button>
);

const ProfileDetail = ({ userInfo, setActiveScreen }) => {
  return (
    <div>
      <div className="flex items-center gap-4 bg-white p-4 shadow-md">
        <button
          className="p-2 hover:bg-gray-100 rounded-full transition"
          onClick={() => setActiveScreen("home")}
        >
          <ArrowLeft className="w-5 h-5 text-gray-900" />
        </button>
        <h2 className="text-xl font-bold text-gray-900">Profile Record</h2>
      </div>
      <div className="relative z-10 p-4 mb-20">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mt-4">
          <DetailItem
            icon={AtSign}
            label="Username"
            value={userInfo.username}
          />
          <DetailItem icon={Phone} label="Number" value={userInfo.number} />
          <DetailItem
            icon={User}
            label="User ID"
            value={userInfo.userId}
            isCopyable={true}
          />
        </div>
      </div>
    </div>
  );
};

// Reusable component for a single detail item
const DetailItem = ({ icon: Icon, label, value, isCopyable = false }) => {
  return (
    <div className="flex items-center p-4 border-b border-gray-200 last:border-b-0">
      <Icon className="w-6 h-6 text-orange-500 mr-4" />
      <span className="text-sm text-gray-600 w-16">{label}:</span>
      <span className="text-base font-semibold text-gray-900 flex-grow text-right">
        {value}
      </span>
      {isCopyable && (
        <button
          onClick={() => copyToClipboard(value)}
          className="ml-2 p-1 text-orange-500 hover:text-orange-600 transition"
          title="Copy Value"
        >
          <Copy className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Profile;
