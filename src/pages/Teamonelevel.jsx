import React from "react";
import { useNavigate } from "react-router-dom";

const TeamOneLevel = () => {
  const navigate = useNavigate();

  const teamMembers = [
    { id: "91******85", date: "2025-02-09 14:26:36", status: "Not Active" },
    { id: "62******19", date: "2025-08-29 19:18:27", status: "Active" },
    { id: "96******10", date: "2025-08-28 17:31:36", status: "Not Active" },
    { id: "77******53", date: "2025-08-24 22:22:02", status: "Active" },
    { id: "70******23", date: "2025-08-20 23:39:34", status: "Active" },
    { id: "87******43", date: "2025-08-19 19:14:50", status: "Active" },
  ];

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-gradient-to-br from-white via-yellow-50 to-yellow-100 animate-bgFlow p-5">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-amber-400 text-white rounded-2xl mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">Team 1 Members</h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/home")}
            className="text-sm font-medium hover:text-yellow-100 transition"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/teams")}
            className="text-sm font-medium hover:text-yellow-100 transition"
          >
            Teams
          </button>
          <button
            onClick={() => navigate("/account")}
            className="text-sm font-medium hover:text-yellow-100 transition"
          >
            Account
          </button>
        </div>
      </nav>

      {/* Header */}
      <header className="text-center mb-6">
        <h3 className="text-amber-400 font-semibold">
          Referral (Valid/Total): <span className="text-green-600">4/6</span>
        </h3>
      </header>

      {/* Members List */}
      <section>
        <h2 className="text-center text-amber-400 font-semibold mb-4">
          Team 1 Members List
        </h2>
        <div className="bg-white rounded-2xl p-5 shadow-lg space-y-3">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className={`flex justify-between items-center p-4 rounded-2xl shadow-sm transition-all ${
                member.status === "Active"
                  ? "bg-gray-50 border-l-4 border-green-500"
                  : "bg-red-50 border-l-4 border-red-400 opacity-90"
              }`}
            >
              <div className="flex flex-col">
                <p className="font-semibold text-amber-500">{member.id}</p>
                <p className="text-xs text-gray-600">{member.date}</p>
              </div>
              <div
                className={`px-4 py-2 rounded-full text-xs font-semibold ${
                  member.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
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

export default TeamOneLevel;
