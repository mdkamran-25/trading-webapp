import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Notice() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-gradient-to-br from-white via-yellow-50 to-yellow-100 animate-bgFlow flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center bg-purple-900 p-3 shadow-md relative">
        <button
          className="absolute left-3 p-2 hover:bg-purple-800 rounded transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft color="white" size={20} />
        </button>
        <h1 className="text-white text-lg font-semibold">Notice</h1>
      </div>

      {/* Notice Content */}
      <div className="flex-1 flex justify-center items-center animate-slideUp">
        <p className="text-xl font-medium text-black text-center">
          No Notice yet
        </p>
      </div>
    </div>
  );
}
