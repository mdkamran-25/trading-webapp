import React, { useState, useEffect } from "react";
import { Home, Users, User, DollarSign, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { getTeamOverview, SECRET_KEY } from "../api"; // Your API function & key
import pako from "pako";
const Teams = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Teams");
  const [teamData, setTeamData] = useState([]);

  const [totalTeams, settotalTeams] = useState(0);

  const styles = {
    appContainer: {
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f5f5f5",
      minHeight: "130vh",
      maxHeight: "130vh",
      overview: "scroll",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    header: {
      width: "100%",
      background: "linear-gradient(to bottom, #ffc900, #ff9900)", // Stronger yellow to orange gradient
      paddingTop: "20px",
      paddingBottom: "34px",
      alignItems: "center",
      textAlign: "center",
      display: "flex",
      justifyContent: "space-evenly",

      borderBottomLeftRadius: "60% 30px",
      borderBottomRightRadius: "60% 30px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      zIndex: 1,
    },
    headerContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 20px",
      color: "#444",

      position: "relative",
      zIndex: 2,
    },
    vivoLogo: {
      width: "50px",
      height: "50px",
      backgroundColor: "white",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
    },
    bellIcon: {
      color: "#fff", // White icon for better contrast
      cursor: "pointer",
    },
    headerText: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#fff", // White text for better contrast
    },
    commissionRate: {
      fontSize: "15px",
      color: "#fff", // White text
    },
    card: {
      background: "linear-gradient(to bottom, #ffffff, #fffdf8)", // Distinct white to off-white gradient
      borderRadius: "15px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      margin: "15px 15px",
      padding: "20px",
      width: "84%",
      maxWidth: "84%",

      zIndex: 2,
    },
    cardHeader: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "15px",
    },
    cardContent: {
      display: "flex",
      alignItems: "center",

      gap: "15px",
      overflow: "hidden",
    },
    teamInfo: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      gap: "37px",
    },
    teamDetail: {
      display: "flex",

      fontSize: "14px",
      color: "#555",
      marginBottom: "8px",
      maxWidth: "221px",
      gap: "20px",
    },
    goldImage: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    },
    rateContainer: {
      textAlign: "center",
      marginTop: "15px",
    },
    rateValue: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#ffc900",
    },
    rateLabel: {
      fontSize: "12px",
      color: "#666",
    },
    arrowIcon: {
      color: "#bbb",
      cursor: "pointer",
      alignSelf: "center",
    },
    coloredValue: {
      color: "#ffc900", // Yellow color for the values
      fontWeight: "bold",
    },
  };

  useEffect(() => {
    const fetchUserTeam = async () => {
      const encryptedUser = Cookies.get("tredingWebUser");
      if (!encryptedUser) return navigate("/login");

      const base64 = encryptedUser.replace(/-/g, "+").replace(/_/g, "/");

      // 🔹 3. AES decrypt (gives compressed Base64 string)
      const decryptedBase64 = CryptoJS.AES.decrypt(base64, SECRET_KEY).toString(
        CryptoJS.enc.Utf8,
      );
      if (!decryptedBase64) return null;

      // 🔹 4. Convert Base64 → Uint8Array (binary bytes)
      const binaryString = atob(decryptedBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // 🔹 5. Decompress (restore JSON string)
      const decompressed = pako.inflate(bytes, { to: "string" });
      const userData = await JSON.parse(decompressed);
      if (!userData?._id) return navigate("/login");

      const res = await getTeamOverview(userData._id);
      console.log(res.success);
      const levels = [1, 2, 3];
      const teamResults = levels.map((level) => {
        const teamKey = `team${level}`;
        const team = res.success ? res?.overview[teamKey] || {} : {};
        settotalTeams(res?.overview?.totalTeams);
        return {
          level,
          userid: userData?._id,
          totalRecharge: team.totalRecharge || 0,
          myCommission: team.totalCommission || 0,

          commissionRate: team.commissionRate
            ? `${team.commissionRate}%`
            : "0%",
          path:
            level === 1
              ? "/teamonelevel"
              : level === 2
                ? "/teamtwolevel"
                : "/teamthreelevel",
        };
      });

      setTeamData(teamResults);
    };

    fetchUserTeam();
  }, [navigate]);

  const tabs = [
    { name: "Home", icon: <Home size={22} />, path: "/home" },
    { name: "Invest", icon: <DollarSign size={22} />, path: "/invest" },
    { name: "Teams", icon: <Users size={22} />, path: "/teams" },
    { name: "Profile", icon: <User size={22} />, path: "/account" },
  ];

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-gray-100 overflow-y-auto pb-24 font-sans">
      {/* Header */}
      <div className="w-full bg-gradient-to-b from-yellow-400 to-orange-400 pt-5 pb-8 rounded-b-3xl shadow-md">
        <div className="mx-auto px-5 flex justify-between items-center text-gray-700">
          <img
            src="/logo.jpg"
            alt="logo"
            className="w-12 h-12 bg-white rounded-full p-1 shadow-md cursor-pointer"
          />
          <div className="text-center flex-1">
            <div className="text-xl font-bold text-gray-800">Team</div>
            <div className="text-sm text-gray-700">
              Total Team Member: {totalTeams}
            </div>
          </div>
        </div>
      </div>

      {/* Team Cards */}
      <div className="px-4 py-6 space-y-4">
        {teamData.map((team, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-white to-yellow-50 rounded-2xl shadow-lg p-5 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() =>
              navigate(team.path, {
                state: { userid: team.userid, level: team.level },
              })
            }
          >
            <div className="text-lg font-bold text-gray-800 mb-4">
              Level {team.level} Teams
            </div>
            <div className="flex items-center gap-4">
              {/* Gold Image */}
              <div className="flex flex-col items-center">
                <div
                  className="w-20 h-20 rounded-full shadow-md bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://img.freepik.com/free-vector/gradient-gold-coin_78370-4508.jpg?semt=ais_incoming&w=740&q=80')",
                  }}
                ></div>
                <div className="text-center mt-2">
                  <div className="text-2xl font-bold text-yellow-500">
                    {team.level === 1 ? "25" : team.level === 2 ? "8" : "2"}
                  </div>
                  <div className="text-xs text-gray-600">Commission Rate</div>
                </div>
              </div>

              {/* Team Info */}
              <div className="flex-1 space-y-6">
                <div className="flex gap-5 text-sm text-gray-700">
                  <span>Total Recharge:</span>
                  <span className="font-bold text-yellow-500">
                    ₹ {team.totalRecharge}
                  </span>
                </div>
                <div className="flex gap-5 text-sm text-gray-700">
                  <span>My Commission:</span>
                  <span className="font-bold text-yellow-500">
                    ₹ {team.myCommission}
                  </span>
                </div>
              </div>

              <ChevronRight className="text-gray-400 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-2 flex justify-around items-center border-t border-gray-200 z-50">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded transition-colors ${
              activeTab === tab.name ? "text-amber-400" : "text-gray-400"
            } hover:text-gray-600`}
            onClick={() => {
              setActiveTab(tab.name);
              navigate(tab.path);
            }}
          >
            {tab.icon}
            <span className="text-xs">{tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Teams;
