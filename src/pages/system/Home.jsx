import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import pako from "pako";
import { getUserInfo, SECRET_KEY, tokenVerify } from "../../api";
import { colors } from "../../utils/colors";
import { SidebarProvider } from "../../context/SidebarContext";
import {
  BottomNavigation,
  MobileBottomNav,
  Sidebar,
  Navbar,
  HeroSection,
  MarketingSection,
  HomeContent,
  Footer,
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
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - Hidden on mobile devices */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1">
          <Navbar />
          <div
            className="flex-1 overflow-y-auto"
            style={{ backgroundColor: colors.lightBgContent }}
          >
            <div className="flex-1 pt-14 pb-20 sm:pt-16 sm:pb-24 md:pt-20 md:pb-12 lg:pl-4 lg:pr-8 lg:pt-20 lg:pb-8">
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
            </div>

            {/* Footer */}
            <Footer />

            {/* Mobile Bottom Navigation - Always visible on mobile */}
            <MobileBottomNav />

            {/* Bottom Navigation - Mobile Only - Only for authenticated users */}
            {isAuthenticated && (
              <div className="hidden lg:hidden">
                <BottomNavigation activeId="home" />
              </div>
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default HomePage;
