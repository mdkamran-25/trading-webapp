import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getTeamLevel } from "../../api";
import { Card, Text, Button, Badge, PageHeader } from "../../components";

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
      <PageHeader title={`Team ${level} Members`} onBack={() => navigate(-1)} />

      {/* Header */}
      <div className="text-center mb-6">
        <Text variant="body" className="font-semibold text-amber-900">
          Referral (Valid/Total):{" "}
          <span className="text-green-600">
            {teamMembers.filter((m) => m.status === "Active").length}/
            {teamMembers.length}
          </span>
        </Text>
      </div>

      {/* Members List */}
      <Card className="animate-slideUp">
        <Text variant="h3" className="text-amber-900 mb-4 text-center">
          Team {level} Members List
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
                  {member.id.slice(0, 5)}****
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

export default TeamTwoLevel;
