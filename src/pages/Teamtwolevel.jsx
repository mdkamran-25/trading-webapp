import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getTeamLevel } from "../api"; // your API function
import { ArrowLeft } from "lucide-react";

const TeamTwoLevel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userid, level } = location.state || {}; // get state data

  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    if (!userid || !level) return;

    const fetchTeam = async () => {
      const res = await getTeamLevel(userid, level);
      if (res.success && res.team) {
        // Flatten ids and attach status based on totalCommission
        const members = res.team.flatMap((t) =>
          t.ids.map((id) => ({
            id: id.phone,
            date: id.date || "", // or any placeholder if date not available
            status: t.totalCommission > 0 ? "Active" : "Not Active",
          })),
        );
        setTeamMembers(members);
      }
    };

    fetchTeam();
  }, [userid, level]);

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-gradient-to-br from-white via-yellow-50 to-yellow-100 animate-bgFlow p-5">
      {/* Navbar */}
      <nav className="flex items-center gap-3 p-4 bg-amber-400 text-white rounded-2xl mb-6 shadow-md">
        <button
          className="text-white hover:opacity-70 transition"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft color="white" size={22} />
        </button>
        <h3 className="text-lg font-semibold">Team {level} Members</h3>
      </nav>

      {/* Header */}
      <header className="text-center mb-6">
        <h3 className="text-sm font-semibold text-amber-900">
          Referral (Valid/Total):{" "}
          <span className="text-green-600">
            {teamMembers.filter((m) => m.status === "Active").length}/
            {teamMembers.length}
          </span>
        </h3>
      </header>

      {/* Members List */}
      <section className="bg-white rounded-3xl p-5 shadow-lg animate-slideUp">
        <h2 className="text-lg font-semibold text-amber-900 mb-4 text-center">
          Team {level} Members List
        </h2>
        <div className="flex flex-col gap-3">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className={`flex justify-between items-center p-4 rounded-2xl shadow-md transition-all ${
                member.status === "Active"
                  ? "bg-gray-50 border-l-4 border-green-500"
                  : "bg-red-50 border-l-4 border-red-400"
              }`}
            >
              <div className="flex flex-col">
                <p className="font-semibold text-sm text-amber-900">
                  {member.id.slice(0, 5)}****
                </p>
              </div>
              <div
                className={`px-4 py-2 rounded-full text-xs font-semibold min-w-max ${
                  member.status === "Active"
                    ? "bg-green-100 text-green-600 border-2 border-green-600"
                    : "bg-red-100 text-red-600 border-2 border-red-600"
                }`}
              >
                {member.status}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TeamTwoLevel;
