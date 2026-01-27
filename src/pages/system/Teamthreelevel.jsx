import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Text, Button, Badge } from "../../components";

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
      <Card className="flex justify-between items-center mb-6">
        <Text variant="h3" className="text-white">
          Team 3 Members
        </Text>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => navigate("/")
            className="text-sm"
          >
            Home
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/teams")}
            className="text-sm"
          >
            Teams
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/account")}
            className="text-sm"
          >
            Account
          </Button>
        </div>
      </Card>

      {/* Header */}
      <div className="text-center mb-6">
        <Text variant="body" className="font-semibold text-amber-900">
          Referral (Valid/Total): <span className="text-green-600">0/3</span>
        </Text>
      </div>

      {/* Members List */}
      <Card className="animate-slideUp">
        <Text variant="h3" className="text-amber-900 mb-4 text-center">
          Team 3 Members List
        </Text>
        <div className="flex flex-col gap-3">
          {teamMembers.map((member, idx) => (
            <Card
              key={idx}
              variant="flat"
              padding="md"
              className={`flex justify-between items-center ${
                member.status === "Active"
                  ? "border-l-4 border-green-500"
                  : "border-l-4 border-red-400"
              }`}
            >
              <div className="flex flex-col">
                <Text
                  variant="body"
                  className="font-semibold text-sm text-amber-900"
                >
                  {member.id}
                </Text>
                <Text variant="sm" className="text-gray-500">
                  {member.date}
                </Text>
              </div>
              <Badge
                variant={member.status === "Active" ? "success" : "danger"}
              >
                {member.status}
              </Badge>
            </Card>
          ))}
        </div>
      </Card>

      {/* Footer */}
      <footer className="text-center mt-8 text-xs text-gray-600">
        <p>© 2025 Vivo Trading Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TeamThreeLevel;
