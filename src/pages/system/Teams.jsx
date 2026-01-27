import React, { useState, useEffect } from "react";
import { Home, Users, User, DollarSign, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { getTeamOverview, SECRET_KEY } from "../../api";
import pako from "pako";
import {
  PageHeader,
  Card,
  Text,
  Button,
  BottomNavigation,
} from "../../components";
const Teams = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Teams");
  const [teamData, setTeamData] = useState([]);
  const [totalTeams, settotalTeams] = useState(0);

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

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-gray-100 overflow-y-auto pb-24 font-sans">
      {/* Header */}
      <div className="w-full bg-gradient-to-b from-yellow-400 to-orange-400 pt-5 pb-8 rounded-b-3xl shadow-md">
        <div className="mx-auto px-5 flex justify-between items-center">
          <img
            src="/logo.jpg"
            alt="logo"
            className="w-12 h-12 bg-white rounded-full p-1 shadow-md cursor-pointer"
          />
          <div className="text-center flex-1">
            <Text variant="h3" className="text-xl font-bold text-gray-800">
              Team
            </Text>
            <Text variant="sm" className="text-sm text-gray-700">
              Total Team Member: {totalTeams}
            </Text>
          </div>
        </div>
      </div>

      {/* Team Cards */}
      <div className="px-4 py-6 space-y-4">
        {teamData.map((team, index) => (
          <Card
            key={index}
            variant="default"
            padding="lg"
            className="bg-gradient-to-b from-white to-yellow-50 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() =>
              navigate(team.path, {
                state: { userid: team.userid, level: team.level },
              })
            }
          >
            <Text variant="h3" className="text-lg font-bold text-gray-800 mb-4">
              Level {team.level} Teams
            </Text>
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
                  <Text
                    variant="h2"
                    className="text-2xl font-bold text-yellow-500"
                  >
                    {team.level === 1 ? "25" : team.level === 2 ? "8" : "2"}
                  </Text>
                  <Text variant="sm" className="text-xs text-gray-600">
                    Commission Rate
                  </Text>
                </div>
              </div>

              {/* Team Info */}
              <div className="flex-1 space-y-6">
                <div className="flex gap-5 text-sm text-gray-700">
                  <span>Total Recharge:</span>
                  <Text variant="sm" className="font-bold text-yellow-500">
                    ₹ {team.totalRecharge}
                  </Text>
                </div>
                <div className="flex gap-5 text-sm text-gray-700">
                  <span>My Commission:</span>
                  <Text variant="sm" className="font-bold text-yellow-500">
                    ₹ {team.myCommission}
                  </Text>
                </div>
              </div>

              <ChevronRight className="text-gray-400 cursor-pointer" />
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-2 flex justify-around items-center border-t border-gray-200 z-50">
        {[
          { name: "Home", icon: <Home size={22} />, path: "/" },
          { name: "Invest", icon: <DollarSign size={22} />, path: "/invest" },
          { name: "Teams", icon: <Users size={22} />, path: "/teams" },
          { name: "Profile", icon: <User size={22} />, path: "/account" },
        ].map((tab) => (
          <Button
            key={tab.name}
            variant={activeTab === tab.name ? "primary" : "secondary"}
            onClick={() => {
              setActiveTab(tab.name);
              navigate(tab.path);
            }}
            className="flex flex-col items-center gap-1 px-3 py-2"
          >
            {tab.icon}
            <Text variant="xs" className="text-xs">
              {tab.name}
            </Text>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Teams;
