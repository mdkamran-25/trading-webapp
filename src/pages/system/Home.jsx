import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import pako from "pako";
import { getUserInfo, SECRET_KEY, tokenVerify } from "../../api";
import {
  MainLayout,
  HeroSection,
  MarketingSection,
  HomeContent,
} from "../../components";

const HomePage = () => {
  const [UserData, setUserData] = useState({});
  const [balance, setBalance] = useState("0");
  const [withdraw, setWithdraw] = useState("0");
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
      const decryptedBase64 = CryptoJS.AES.decrypt(base64, SECRET_KEY).toString(
        CryptoJS.enc.Utf8,
      );
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
          setWithdraw(res?.data?.users?.Withdrawal || "0");
        } else {
          Cookies.remove("tredingWeb");
          Cookies.remove("tredingWebUser");
          localStorage.removeItem("userData");
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Token verification error:", err);

        // If token verification fails but we have user data, still set authenticated
        if (UserData?._id) {
          setIsAuthenticated(true);
          setUserData(UserData);

          const res = await getUserInfo(UserData._id);
          setTeamSize(res?.data?.activeCount || 0);
          setBalance(res?.data?.users?.balance || "0");
          setWithdraw(res?.data?.users?.Withdrawal || "0");
        } else {
          setIsAuthenticated(false);
        }
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <MainLayout>
      {/* Show Marketing Section for Unauthenticated Users */}
      {!isAuthenticated && (
        <>
          <HeroSection />
          <MarketingSection />
        </>
      )}

      {/* Show Authenticated Content for Logged-In Users */}
      {isAuthenticated && (
        <HomeContent
          balance={balance}
          TeamSize={TeamSize}
          withdraw={withdraw}
          UserData={UserData}
          navigate={navigate}
        />
      )}
    </MainLayout>
  );
};

export default HomePage;
