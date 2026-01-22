import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // <-- install with: npm install js-cookie

function Splash() {
  const navigate = useNavigate();

  // Auto-check for token in cookies
  useEffect(() => {
    const token = Cookies.get("tredingWeb");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleContinue = () => {
    navigate("/register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-white font-sans">
      <div className="max-w-sm w-full bg-white rounded-3xl shadow-lg overflow-hidden text-center p-8">
        {/* Image */}
        <img
          src="/splash.png"
          alt="Building Wealth"
          className="w-full max-w-sm h-auto mx-auto mb-8 rounded-2xl object-contain"
        />

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
          Building Wealth
          <br />
          Together
        </h1>

        {/* Subtitle */}
        <p className="text-base text-gray-600 mb-8 leading-relaxed">
          A smarter way to invest – gain confidence, track progress and build
          wealth over time with tailored insights and expert guidance.
        </p>

        {/* Continue Button */}
        <button
          className="w-full py-3 bg-yellow-400 text-white font-semibold rounded-2xl hover:bg-amber-500 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default Splash;
