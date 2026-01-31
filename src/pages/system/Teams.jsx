import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { getTeamOverview, SECRET_KEY } from "../../api";
import pako from "pako";
import LoadingScreen from "../../components/atoms/LoadingScreen";
import { Card, Text, MainLayout } from "../../components";
import { colors } from "../../utils/colors";

const Teams = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [teamData, setTeamData] = useState([]);
  const [totalTeams, settotalTeams] = useState(0);

  useEffect(() => {
    const fetchUserTeam = async () => {
      setIsLoading(true);
      const encryptedUser = Cookies.get("tredingWebUser");
      const token = Cookies.get("tredingWeb");
      if (!encryptedUser || !token) {
        // Show loading screen for 500ms then redirect
        setTimeout(() => {
          navigate("/register");
        }, 500);
        return;
      }
      setIsLoading(false);

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
    <MainLayout>
      {isLoading && <LoadingScreen />}
      <div
        className="w-full max-w-md min-h-screen pb-24 mx-auto overflow-y-auto font-sans"
        style={{ backgroundColor: colors.lightBgContent }}
      >
        {/* Header */}
        <div
          className="w-full pt-5 pb-8 shadow-md rounded-b-3xl"
          style={{
            background: `linear-gradient(135deg, ${colors.darkPurple} 0%, ${colors.mediumPurple} 100%)`,
          }}
        >
          <div className="flex items-center justify-between px-5 mx-auto">
            <div className="flex-1 text-center">
              <Text variant="h3" className="text-xl font-bold text-white">
                Team
              </Text>
              <Text variant="sm" className="text-sm text-white opacity-90">
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
              className="transition-all duration-300 cursor-pointer hover:shadow-xl"
              style={{
                backgroundColor: colors.background,
                border: `1px solid ${colors.lightPurpleOverlay20}`,
              }}
              onClick={() =>
                navigate(team.path, {
                  state: { userid: team.userid, level: team.level },
                })
              }
            >
              <Text
                variant="h3"
                className="mb-4 text-lg font-bold"
                style={{ color: colors.darkPurple }}
              >
                Level {team.level} Teams
              </Text>
              <div className="flex items-center gap-4">
                {/* Gold Image */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-20 h-20 bg-center bg-cover rounded-full shadow-md"
                    style={{
                      backgroundImage:
                        "url('https://img.freepik.com/free-vector/gradient-gold-coin_78370-4508.jpg?semt=ais_incoming&w=740&q=80')",
                    }}
                  ></div>
                  <div className="mt-2 text-center">
                    <Text
                      variant="h2"
                      className="text-2xl font-bold"
                      style={{ color: colors.mediumPurple }}
                    >
                      {team.level === 1 ? "25" : team.level === 2 ? "8" : "2"}
                    </Text>
                    <Text
                      variant="sm"
                      className="text-xs"
                      style={{ color: colors.textLight }}
                    >
                      Commission Rate
                    </Text>
                  </div>
                </div>

                {/* Team Info */}
                <div className="flex-1 space-y-6">
                  <div
                    className="flex gap-5 text-sm"
                    style={{ color: colors.textLight }}
                  >
                    <span>Total Recharge:</span>
                    <Text
                      variant="sm"
                      className="font-bold"
                      style={{ color: colors.darkPurple }}
                    >
                      ₹ {team.totalRecharge}
                    </Text>
                  </div>
                  <div
                    className="flex gap-5 text-sm"
                    style={{ color: colors.textLight }}
                  >
                    <span>My Commission:</span>
                    <Text
                      variant="sm"
                      className="font-bold"
                      style={{ color: colors.success }}
                    >
                      ₹ {team.myCommission}
                    </Text>
                  </div>
                </div>

                <ChevronRight
                  style={{ color: colors.mediumPurple }}
                  className="cursor-pointer"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Teams;
