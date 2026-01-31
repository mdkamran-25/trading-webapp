import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import pako from "pako";
import { getUserInfo, SECRET_KEY, tokenVerify } from "../../api";
import { MainLayout, PageHeader } from "../../components";
import PortfolioCard from "../../components/organisms/PortfolioCard";
import { colors } from "../../utils/colors";

const Wallet = () => {
  const [balance, setBalance] = useState("0");
  const [withdraw, setWithdraw] = useState("0");
  const [teamSize, setTeamSize] = useState(0);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const encryptedUser = Cookies.get("tredingWebUser");
    const token = Cookies.get("tredingWeb");

    if (!encryptedUser || !token) {
      navigate("/login");
      return;
    }

    try {
      const base64 = encryptedUser.replace(/-/g, "+").replace(/_/g, "/");
      const decryptedBase64 = CryptoJS.AES.decrypt(base64, SECRET_KEY).toString(
        CryptoJS.enc.Utf8,
      );
      if (!decryptedBase64) {
        navigate("/login");
        return;
      }

      const binaryString = atob(decryptedBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const decompressed = pako.inflate(bytes, { to: "string" });
      const UserData = await JSON.parse(decompressed);

      if (!UserData?._id) {
        navigate("/login");
        return;
      }

      const res1 = await tokenVerify(token, UserData?.phone);
      try {
        if (res1.status === 200 && res1.data.success) {
          const res = await getUserInfo(UserData._id);
          setTeamSize(res?.data?.activeCount || 0);
          setBalance(res?.data?.users?.balance || "0");
          setWithdraw(res?.data?.users?.Withdrawal || "0");
        } else {
          Cookies.remove("tredingWeb");
          Cookies.remove("tredingWebUser");
          navigate("/login");
        }
      } catch (err) {
        console.error("Token verification error:", err);
        if (UserData?._id) {
          const res = await getUserInfo(UserData._id);
          setTeamSize(res?.data?.activeCount || 0);
          setBalance(res?.data?.users?.balance || "0");
          setWithdraw(res?.data?.users?.Withdrawal || "0");
        }
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout>
      <div
        className="min-h-screen pb-6 sm:pb-8 md:pb-10 lg:pb-12"
        style={{ backgroundColor: colors.lightBgContent }}
      >
        {/* Header Section */}
        <PageHeader title="My Wallet" onBack={() => navigate(-1)} />

        {/* Portfolio Card */}
        <div className="w-full px-3 mx-auto mt-6 sm:px-4 md:px-6 lg:pl-24 lg:pr-24 xl:pl-32 xl:pr-8">
          <div className="max-w-md mx-auto">
            <PortfolioCard
              balance={balance}
              teamSize={teamSize}
              withdraw={withdraw}
            />
          </div>
        </div>

        {/* Transaction History Section */}
        <div className="w-full px-3 mx-auto mt-8 sm:px-4 md:px-6 lg:pl-24 lg:pr-24 xl:pl-32 xl:pr-8">
          <div className="max-w-md mx-auto">
            <h3
              className="mb-4 text-xl font-bold"
              style={{ color: colors.darkPurple }}
            >
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => navigate("/recharge")}
                className="p-4 text-white transition-all duration-300 rounded-xl hover:opacity-90 hover:scale-105 active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${colors.darkPurple} 0%, ${colors.mediumPurple} 100%)`,
                }}
              >
                <div className="text-lg font-bold">Recharge</div>
                <div className="mt-1 text-xs opacity-90">Add Balance</div>
              </button>
              <button
                onClick={() => navigate("/withdraw")}
                className="p-4 transition-all duration-300 bg-white rounded-xl hover:shadow-lg hover:scale-105 active:scale-95"
                style={{
                  color: colors.darkPurple,
                  border: `2px solid ${colors.lightPurpleOverlay20}`,
                }}
              >
                <div className="text-lg font-bold">Withdraw</div>
                <div className="mt-1 text-xs opacity-70">Cash Out</div>
              </button>
              <button
                onClick={() => navigate("/bill")}
                className="p-4 transition-all duration-300 bg-white rounded-xl hover:shadow-lg hover:scale-105 active:scale-95"
                style={{
                  color: colors.darkPurple,
                  border: `2px solid ${colors.lightPurpleOverlay20}`,
                }}
              >
                <div className="text-lg font-bold">Transactions</div>
                <div className="mt-1 text-xs opacity-70">View History</div>
              </button>
              <button
                onClick={() => navigate("/orders")}
                className="p-4 transition-all duration-300 bg-white rounded-xl hover:shadow-lg hover:scale-105 active:scale-95"
                style={{
                  color: colors.darkPurple,
                  border: `2px solid ${colors.lightPurpleOverlay20}`,
                }}
              >
                <div className="text-lg font-bold">Orders</div>
                <div className="mt-1 text-xs opacity-70">My Orders</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Wallet;
