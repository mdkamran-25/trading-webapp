import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Card, Button, Text } from "../components";

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
      <Card className="max-w-sm w-full text-center p-8">
        {/* Image */}
        <img
          src="/splash.png"
          alt="Building Wealth"
          className="w-full max-w-sm h-auto mx-auto mb-8 rounded-2xl object-contain"
        />

        {/* Title */}
        <Text variant="h2" className="text-gray-900 leading-tight mb-4">
          Building Wealth
          <br />
          Together
        </Text>

        {/* Subtitle */}
        <Text variant="body" className="text-gray-600 mb-8 leading-relaxed">
          A smarter way to invest – gain confidence, track progress and build
          wealth over time with tailored insights and expert guidance.
        </Text>

        {/* Continue Button */}
        <Button onClick={handleContinue} className="w-full" variant="primary">
          Continue
        </Button>
      </Card>
    </div>
  );
}

export default Splash;
