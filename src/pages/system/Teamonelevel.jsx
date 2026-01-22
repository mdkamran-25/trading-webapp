import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Text, Button, Badge } from "../../components";

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
      <Card className="flex justify-between items-center mb-6">
        <Text variant="h3" className="text-white">
          Team 1 Members
        </Text>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => navigate("/home")}
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
        <Text variant="body" className="font-semibold">
          Referral (Valid/Total): <span className="text-green-600">4/6</span>
        </Text>
      </div>

      {/* Members List */}
      <Card>
        <Text variant="h3" className="text-center mb-4">
          Team 1 Members List
        </Text>
        <div className="space-y-3">
          {teamMembers.map((member, idx) => (
            <Card
              key={idx}
              variant="flat"
              padding="md"
              className={`flex justify-between items-center ${
                member.status === "Active"
                  ? "border-l-4 border-green-500"
                  : "border-l-4 border-red-400 opacity-90"
              }`}
            >
              <div className="flex flex-col">
                <Text variant="body" className="font-semibold text-amber-500">
                  {member.id}
                </Text>
                <Text variant="sm" className="text-gray-600">
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
    </div>
  );
};

export default TeamOneLevel;
