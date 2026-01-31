import React from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader, Text } from "../../components";

export default function Notice() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-gradient-to-br from-white via-yellow-50 to-yellow-100 animate-bgFlow flex flex-col">
      {/* Header */}
      <PageHeader title="Notice" onBack={() => navigate(-1)} />

      {/* Notice Content */}
      <div className="flex-1 flex justify-center items-center animate-slideUp">
        <Text variant="h3" className="text-center">
          No Notice yet
        </Text>
      </div>
    </div>
  );
}
