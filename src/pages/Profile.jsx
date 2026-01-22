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
import {
  Card,
  Text,
  PageHeader,
  StatCard,
  Button,
  InfoRow,
} from "../components";
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
              <div className="grid grid-cols-2 gap-2 mb-4">
                {accountpaloadData.map((item, index) => (
                  <StatCard
                    key={index}
                    label={item.label}
                    value={
                      item.value >= 1000000
                        ? (item.value / 1000000).toFixed(1) + "M"
                        : item.value >= 1000
                          ? (item.value / 1000).toFixed(1) + "K"
                          : item.value
                    }
                    icon={<DollarSign size={16} />}
                  />
                ))}
              </div>

              <section className="pb-2.5 border-t border-gray-200">
                <Text
                  variant="h2"
                  className="mb-4 border-l-4 border-orange-500 pl-2"
                >
                  Financial Summary
                </Text>
                <div className="grid grid-cols-2 gap-2">
                  <Card
                    variant="default"
                    padding="lg"
                    className="bg-orange-50 border border-orange-200 cursor-pointer hover:shadow-md transition"
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
                    <Text
                      variant="sm"
                      className="text-gray-600 flex items-center gap-1.5"
                    >
                      <Wallet size={16} /> Balance
                    </Text>
                    <Text
                      variant="h3"
                      className="text-lg font-bold text-gray-900 mt-1.5"
                    >
                      ₹{user.balance.toFixed(2)}
                    </Text>
                    <Button variant="primary" className="w-full mt-3 text-sm">
                      Recharge History
                    </Button>
                  </Card>
                  <Card
                    variant="default"
                    padding="lg"
                    className="bg-yellow-50 border border-yellow-200 cursor-pointer hover:shadow-md transition"
                    onClick={() =>
                      navigate("/orders", { state: userInfo?.withdrawHistory })
                    }
                  >
                    <Text
                      variant="sm"
                      className="text-gray-600 flex items-center gap-1.5"
                    >
                      <ShoppingCart size={16} /> Total Orders
                    </Text>
                    <Text
                      variant="h3"
                      className="text-lg font-bold text-gray-900 mt-1.5"
                    >
                      {accountData.ordersCount}
                    </Text>
                    <Button variant="primary" className="w-full mt-3 text-sm">
                      Orders History
                    </Button>
                  </Card>
                  <Card
                    variant="default"
                    padding="lg"
                    className="bg-orange-50 border border-orange-200 cursor-pointer hover:shadow-md transition"
                    onClick={() =>
                      navigate("/orders", { state: userInfo?.withdrawHistory })
                    }
                  >
                    <Text
                      variant="sm"
                      className="text-gray-600 flex items-center gap-1.5"
                    >
                      <DollarSign size={16} /> Total Buy
                    </Text>
                    <Text
                      variant="h3"
                      className="text-lg font-bold text-gray-900 mt-1.5"
                    >
                      ₹{user.totalBuy.toFixed(2)}
                    </Text>
                    <Button variant="primary" className="w-full mt-3 text-sm">
                      Orders History
                    </Button>
                  </Card>
                  <Card
                    variant="default"
                    padding="lg"
                    className="bg-yellow-50 border border-yellow-200 cursor-pointer hover:shadow-md transition"
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
                    <Text
                      variant="sm"
                      className="text-gray-600 flex items-center gap-1.5"
                    >
                      <TrendingDown size={16} /> Withdrawal
                    </Text>
                    <Text
                      variant="h3"
                      className="text-lg font-bold text-gray-900 mt-1.5"
                    >
                      ₹{user.withdrawal.toFixed(2)}
                    </Text>
                    <Button variant="primary" className="w-full mt-3 text-sm">
                      Withdrawal History
                    </Button>
                  </Card>
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
    <div className="grid grid-cols-4 gap-2">
      {data.map((item, index) => (
        <div key={index} className="text-center">
          <Text variant="h4" className="font-bold text-gray-900">
            {item.value >= 1000000
              ? (item.value / 1000000).toFixed(1) + "M"
              : item.value >= 1000
                ? (item.value / 1000).toFixed(1) + "K"
                : item.value}
          </Text>
          <Text variant="sm" className="text-gray-600">
            {item.label}
          </Text>
        </div>
      ))}
    </div>
  );
};

// Component for the list of services
const ServicesList = ({ setActiveScreen, navigate, services }) => {
  return (
    <div className="mb-8">
      <Text variant="h3" className="mb-4 border-l-4 border-orange-500 pl-2">
        My Services
      </Text>
      <div className="flex flex-col gap-3">
        {services.map((service) => (
          <button
            key={service.name}
            onClick={() => navigate(service.path, { state: service.userInfo })}
            className="w-full bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                className="w-6 h-6 text-orange-500"
                src={service.icon}
                alt={service.name}
              />
              <Text
                variant="body"
                className="text-lg font-medium text-gray-700"
              >
                {service.name}
              </Text>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
};

// Component for the Sign Out button
const SignOutButton = ({ navigate }) => (
  <Button
    variant="primary"
    onClick={() => {
      Cookies.remove("tredingWeb");
      Cookies.remove("tredingWebUser");
      localStorage.removeItem("userData");
      navigate("/login");
    }}
    className="w-full mt-8 flex items-center justify-center gap-2"
  >
    <LogOut className="w-5 h-5" />
    Sign Out
  </Button>
);

const ProfileDetail = ({ userInfo, setActiveScreen }) => {
  return (
    <div>
      <PageHeader
        title="Profile Record"
        onBack={() => setActiveScreen("home")}
      />
      <div className="relative z-10 p-4 mb-20">
        <Card
          variant="default"
          padding="lg"
          className="border border-gray-100 mt-4"
        >
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
        </Card>
      </div>
    </div>
  );
};

// Reusable component for a single detail item
const DetailItem = ({ icon: Icon, label, value, isCopyable = false }) => {
  return (
    <div className="flex items-center p-4 border-b border-gray-200 last:border-b-0">
      <Icon className="w-6 h-6 text-orange-500 mr-4" />
      <Text variant="sm" className="text-gray-600 w-16">
        {label}:
      </Text>
      <Text
        variant="body"
        className="text-base font-semibold text-gray-900 flex-grow text-right"
      >
        {value}
      </Text>
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
