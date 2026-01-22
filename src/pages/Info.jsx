import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Phone, Clipboard, CalendarDays, Copy, ArrowLeft } from "lucide-react";

const UserAvatar = () => {
  return (
    <div className="avatar">
      <img
        src="/avatar.jpg"
        alt="Profile"
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "3px solid #fbbf24",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      />
    </div>
  );
};

const DetailItem = ({ icon: Icon, label, value, monetary = false }) => {
  const displayValue = monetary
    ? `₹${value?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    : value || "N/A";

  return (
    <div className="detail-item">
      <div className="detail-label">
        <Icon size={18} className="detail-icon" />
        <span>{label}</span>
      </div>
      <span className={monetary ? "detail-value money" : "detail-value"}>
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
  console.log(userData);
  userData.rechargeHistory.type = "Recharge History";
  userData.withdrawHistory.type = "Withdraw History";
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
  }, []);

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
    <div className="h-screen bg-gray-100 p-2.5">
      <div className="w-full h-full bg-white rounded-2xl shadow-2xl flex flex-col overflow-y-auto">
        {/* Header */}
        <header className="bg-gradient-to-br from-yellow-400 to-orange-400 text-white text-center p-8 relative">
          <button
            className="absolute left-4 top-4 p-2 hover:bg-yellow-500 rounded transition-colors"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft color="white" size={20} />
          </button>

          <UserAvatar />

          <p className="flex items-center justify-center gap-1 text-sm opacity-90 mt-3">
            <CalendarDays size={16} /> Member Since:{" "}
            {new Date(user.registrationDate).toLocaleDateString()}
          </p>

          <div className="border border-white/30 rounded-xl bg-black/15 p-2.5 mt-4">
            <span className="text-xs opacity-90">USER ID</span>
            <div className="flex justify-center items-center gap-1.5 mt-1.5">
              <span className="text-sm font-semibold">{user.userId}</span>
              <button
                onClick={() => handleCopy(user.userId, "userId")}
                className="bg-transparent border-none cursor-pointer relative text-white p-0.5"
              >
                <Copy size={14} />
                {copiedKey === "userId" && (
                  <span className="absolute top-6 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs py-0.5 px-1.5 rounded whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Account Details Section */}
        <section className="p-5 border-t border-gray-100">
          <h2 className="text-lg font-bold text-gray-700 mb-2.5 border-b-2 border-gray-100 pb-1.5">
            Account Details
          </h2>
          <DetailItem icon={Phone} label="Phone" value={user.phone} />

          <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
            <div className="flex items-center gap-2 text-gray-600">
              <Clipboard size={18} className="text-gray-500" />
              <span>Referral Code</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-gray-900">
                {user.referralCode}
              </span>
              <button
                onClick={() => handleCopy(user.referralCode, "referral")}
                className="bg-transparent border-none cursor-pointer relative text-gray-500 p-0.5"
              >
                <Copy size={14} />
                {copiedKey === "referral" && (
                  <span className="absolute top-6 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs py-0.5 px-1.5 rounded whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Info;
