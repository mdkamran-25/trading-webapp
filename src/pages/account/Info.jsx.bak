import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Phone, Clipboard, CalendarDays, Copy } from "lucide-react";
import { Card, Text, PageHeader } from "../../components";

const UserAvatar = () => {
  return (
    <img
      src="/avatar.jpg"
      alt="Profile"
      className="w-32 h-32 object-cover rounded-full border-4 border-yellow-400 shadow-lg"
    />
  );
};

const DetailItem = ({ icon: Icon, label, value, monetary = false }) => {
  const displayValue = monetary
    ? `₹${value?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    : value || "N/A";

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
      <div className="flex items-center gap-3 text-gray-600">
        <Icon size={18} className="text-gray-500" />
        <span>{label}</span>
      </div>
      <span
        className={`font-medium ${monetary ? "text-green-600" : "text-gray-900"}`}
      >
        {displayValue}
      </span>
    </div>
  );
};

function Info() {
  const navigate = useNavigate();
  const [copiedKey, setCopiedKey] = useState(null);

  const [user, setUser] = useState({
    name: "",
    phone: "",
    userId: "",
    referralCode: "",
    balance: 0,
    pendingIncome: 0,
    totalBuy: 0,
    withdrawal: 0,
    registrationDate: "",
  });

  const location = useLocation();
  const userData = location.state || {};

  useEffect(() => {
    if (userData) {
      setUser({
        phone: userData?.phone || "N/A",
        userId: userData?.userId || "-",
        referralCode: userData?.UserData?.referralCode || "-",
        balance: userData?.updatedData?.balance || 0,
        pendingIncome: userData?.updatedData?.pendingIncome || 0,
        totalBuy: userData?.updatedData?.totalBuy || 0,
        withdrawal: userData?.updatedData?.withdrawal || 0,
        registrationDate: userData?.UserData?.registrationDate || new Date(),
      });
    }
  }, [userData]);

  const handleCopy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4">
      <PageHeader
        title="Account Information"
        onBack={() => navigate(-1)}
        showBackButton={true}
      />

      {/* Header Card with Avatar */}
      <Card
        variant="gradient"
        padding="lg"
        className="w-full mx-auto mt-6 text-center"
      >
        <UserAvatar />
        <Text variant="body" className="mt-3 opacity-90">
          <CalendarDays className="inline mr-1" size={16} />
          Member Since: {new Date(user.registrationDate).toLocaleDateString()}
        </Text>

        {/* User ID Card */}
        <Card variant="flat" padding="md" className="mt-4 bg-black/10">
          <Text variant="small" className="opacity-90">
            USER ID
          </Text>
          <div className="flex justify-center items-center gap-2 mt-2">
            <Text variant="body" weight="semibold">
              {user.userId}
            </Text>
            <button
              onClick={() => handleCopy(user.userId, "userId")}
              className="bg-transparent border-none cursor-pointer relative text-gray-600 hover:text-gray-900 p-1"
            >
              <Copy size={14} />
              {copiedKey === "userId" && (
                <span className="absolute top-6 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>
          </div>
        </Card>
      </Card>

      {/* Account Details Section */}
      <Card variant="default" padding="lg" className="w-full mx-auto mt-6">
        <Text
          variant="h3"
          weight="bold"
          className="mb-4 pb-2 border-b-2 border-gray-200"
        >
          Account Details
        </Text>

        <DetailItem icon={Phone} label="Phone" value={user.phone} />

        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div className="flex items-center gap-3 text-gray-600">
            <Clipboard size={18} className="text-gray-500" />
            <span>Referral Code</span>
          </div>
          <div className="flex items-center gap-2">
            <Text variant="body" weight="semibold">
              {user.referralCode}
            </Text>
            <button
              onClick={() => handleCopy(user.referralCode, "referral")}
              className="bg-transparent border-none cursor-pointer relative text-gray-500 hover:text-gray-700 p-1"
            >
              <Copy size={14} />
              {copiedKey === "referral" && (
                <span className="absolute top-6 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Info;
