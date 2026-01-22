import React from "react";
import { useNavigate } from "react-router-dom";

const TeamThreeLevel = () => {
  const navigate = useNavigate();

  const teamMembers = [
    { id: "62******08", date: "2025-08-25 23:05:05", status: "Not Active" },
    { id: "70******51", date: "2025-08-25 22:45:04", status: "Not Active" },
    { id: "85******80", date: "2025-08-23 01:19:12", status: "Not Active" },
  ];

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-gradient-to-br from-white via-yellow-50 to-yellow-100 animate-bgFlow p-5">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-amber-400 text-white rounded-2xl mb-6 shadow-md">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">Team 3 Members</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/home")}
            className="text-white hover:text-yellow-100 transition text-sm font-medium"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/teams")}
            className="text-white hover:text-yellow-100 transition text-sm font-medium"
          >
            Teams
          </button>
          <button
            onClick={() => navigate("/account")}
            className="text-white hover:text-yellow-100 transition text-sm font-medium"
          >
            Account
          </button>
        </div>
      </nav>

      {/* Header */}
      <header className="text-center mb-6">
        <h3 className="text-sm font-semibold text-amber-900">
          Referral (Valid/Total): <span className="text-green-600">0/3</span>
        </h3>
      </header>

      {/* Members List */}
      <section className="bg-white rounded-3xl p-5 shadow-lg animate-slideUp">
        <h2 className="text-lg font-semibold text-amber-900 mb-4 text-center">
          Team 3 Members List
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
                  {member.id}
                </p>
                <p className="text-xs text-gray-500">{member.date}</p>
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

      {/* Footer */}
      <footer className="text-center mt-8 text-xs text-gray-600">
        <p>© 2025 Vivo Trading Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TeamThreeLevel;
