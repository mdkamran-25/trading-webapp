import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { registerUser, SECRET_KEY, sendOtpNoCheck } from "../../api";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import pako from "pako";
import { colors } from "../../utils/colors";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [refCode, setRefCode] = useState("");
  const [tradePassword, setTradePassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showTradePassword, setShowTradePassword] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const invite = params.get("invitation_code");
    if (invite) setRefCode(invite);
  }, [location.search]);

  const handleSendOtp = async () => {
    if (!phone) return alert("Please enter your phone number");

    try {
      setLoading(true);
      const data = await sendOtpNoCheck(phone);
      console.log("OTP Response:", data);

      if (data.success) {
        setOtpSent(true);
        setGeneratedOtp(data?.data?.otp || "123456");
        alert("OTP sent successfully!");
      } else {
        alert(data?.data?.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = () => {
    if (!otp) return alert("Enter OTP");
    if (otp === generatedOtp) {
      setOtpVerified(true);
      alert("OTP verified successfully!");
    } else {
      alert("Invalid OTP");
    }
  };

  const handleRegister = async () => {
    if (!otpVerified) return alert("Please verify OTP first");
    if (!password || !tradePassword)
      return alert("Password and Trade Password are required");

    const userData = {
      phone,
      password,
      tradePassword,
      refCode: refCode || null,
      otp,
    };

    try {
      setLoading(true);
      const response = await registerUser(userData);

      if (response.token) {
        const jsonString = JSON.stringify(response.user);
        const compressed = pako.deflate(jsonString);
        const compressedBase64 = btoa(String.fromCharCode(...compressed));
        const encryptedUser = CryptoJS.AES.encrypt(
          compressedBase64,
          SECRET_KEY,
        ).toString();
        const base64url = encryptedUser
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "");

        Cookies.set("tredingWeb", response.token, { expires: 7, path: "/" });
        Cookies.set("tredingWebUser", base64url, { expires: 7, path: "/" });
        localStorage.setItem("userData", JSON.stringify(response.user));

        alert(response.message || "Registered successfully!");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden font-sans lg:flex-row">
      {/* Left Column - Register Form */}
      <div
        className="relative flex flex-col items-center justify-center w-full min-h-screen px-4 py-8 overflow-hidden sm:px-6 md:px-8 lg:w-1/2 lg:px-12 lg:py-0 lg:min-h-0"
        style={{ backgroundColor: "#F5F7FF" }}
      >
        {/* Decorative curved shape - bottom left */}
        <div
          className="absolute bottom-0 left-0 -mb-48 -ml-48 rounded-full w-96 h-96 opacity-20"
          style={{ backgroundColor: colors.mediumPurple }}
        />
        <div
          className="absolute top-0 right-0 w-40 h-40 -mt-20 -mr-20 rounded-full opacity-10"
          style={{ backgroundColor: colors.lightPurple }}
        />

        {/* Logo */}
        <div className="relative z-10 w-full max-w-xs mb-6 text-center sm:max-w-sm sm:text-left md:max-w-md sm:mb-12">
          <img
            src="/MainLogo.svg"
            alt="Logo"
            className="inline-block object-contain h-12"
          />
        </div>

        {/* Register Heading */}
        <div className="relative z-10 w-full max-w-md mb-6 text-center sm:mb-8 sm:text-left">
          <h1
            className="text-3xl font-extrabold sm:text-4xl"
            style={{ color: colors.darkPurple }}
          >
            Register
          </h1>
          <p
            className="mt-1 text-xs sm:mt-2 sm:text-sm"
            style={{ color: colors.mediumPurple }}
          >
            Create your trading account
          </p>
        </div>

        {/* Register Form */}
        <form className="relative z-10 w-full max-w-xs space-y-4 sm:max-w-sm md:max-w-md sm:space-y-5">
          {/* Phone Number Input */}
          <div>
            <label
              className="block mb-2 text-xs font-medium sm:text-sm"
              style={{ color: colors.darkPurple }}
            >
              Phone Number
            </label>
            <div className="flex gap-2">
              <div
                className="flex flex-1 overflow-hidden border-2 rounded-xl"
                style={{ borderColor: colors.lightPurple }}
              >
                <span
                  className="flex items-center px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-xs sm:text-sm"
                  style={{
                    backgroundColor: colors.lightPurple,
                    color: colors.darkPurple,
                  }}
                >
                  +91
                </span>
                <input
                  type="text"
                  placeholder="Enter your number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={otpVerified}
                  className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-800 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading || otpSent || otpVerified}
                className="px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-white text-xs sm:text-sm rounded-xl transition hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: colors.darkPurple }}
              >
                {loading ? "Sending..." : otpVerified ? "✓" : "Send"}
              </button>
            </div>
          </div>

          {/* OTP Input */}
          {otpSent && !otpVerified && (
            <div>
              <label
                className="block mb-2 text-xs font-medium sm:text-sm"
                style={{ color: colors.darkPurple }}
              >
                Enter OTP
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter OTP code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition border-2 outline-none rounded-xl"
                  style={{ borderColor: colors.lightPurple }}
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="px-3 sm:px-4 py-2.5 sm:py-3 font-semibold text-white text-xs sm:text-sm rounded-xl transition hover:opacity-90"
                  style={{ backgroundColor: colors.darkPurple }}
                >
                  Verify
                </button>
              </div>
            </div>
          )}

          {/* Password Field */}
          <div>
            <label
              className="block mb-2 text-xs font-medium sm:text-sm"
              style={{ color: colors.darkPurple }}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!otpVerified}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 text-sm sm:text-base transition border-2 outline-none rounded-xl disabled:bg-gray-100 disabled:cursor-not-allowed"
                style={{ borderColor: colors.lightPurple }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={!otpVerified}
                className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 transition-opacity hover:opacity-70 disabled:opacity-40"
              >
                {showPassword ? (
                  <EyeOff size={18} style={{ color: colors.mediumPurple }} />
                ) : (
                  <Eye size={18} style={{ color: colors.mediumPurple }} />
                )}
              </button>
            </div>
          </div>

          {/* Trade Password Field */}
          <div>
            <label
              className="block mb-2 text-xs font-medium sm:text-sm"
              style={{ color: colors.darkPurple }}
            >
              Trade Password
            </label>
            <div className="relative">
              <input
                type={showTradePassword ? "text" : "password"}
                placeholder="Enter your trade password"
                value={tradePassword}
                onChange={(e) => setTradePassword(e.target.value)}
                disabled={!otpVerified}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 text-sm sm:text-base transition border-2 outline-none rounded-xl disabled:bg-gray-100 disabled:cursor-not-allowed"
                style={{ borderColor: colors.lightPurple }}
              />
              <button
                type="button"
                onClick={() => setShowTradePassword(!showTradePassword)}
                disabled={!otpVerified}
                className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 transition-opacity hover:opacity-70 disabled:opacity-40"
              >
                {showTradePassword ? (
                  <EyeOff size={18} style={{ color: colors.mediumPurple }} />
                ) : (
                  <Eye size={18} style={{ color: colors.mediumPurple }} />
                )}
              </button>
            </div>
          </div>

          {/* Invitation Code Field */}
          <div>
            <label
              className="block mb-2 text-xs font-medium sm:text-sm"
              style={{ color: colors.darkPurple }}
            >
              Invitation Code (Optional)
            </label>
            <input
              type="text"
              placeholder="Enter invitation code"
              value={refCode}
              onChange={(e) => setRefCode(e.target.value)}
              disabled={!otpVerified}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition border-2 outline-none rounded-xl disabled:bg-gray-100 disabled:cursor-not-allowed"
              style={{ borderColor: colors.lightPurple }}
            />
          </div>

          {/* Register Button */}
          <button
            type="button"
            onClick={handleRegister}
            disabled={!otpVerified || loading}
            className="w-full py-2.5 sm:py-3 mt-4 sm:mt-6 font-semibold text-white text-sm sm:text-base transition rounded-xl hover:opacity-90 disabled:opacity-60 active:scale-95"
            style={{ backgroundColor: colors.darkPurple }}
          >
            {loading ? "Please wait..." : "Register"}
          </button>
        </form>

        {/* Login Link */}
        <div className="relative z-10 flex items-center justify-center w-full max-w-md mt-4 text-xs sm:mt-6 sm:text-sm">
          <p style={{ color: colors.darkPurple }}>
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-semibold transition hover:opacity-70"
              style={{ color: colors.mediumPurple }}
            >
              Login
            </button>
          </p>
        </div>
      </div>

      {/* Right Column - Illustration & Messaging */}
      <div
        className="relative flex-col items-center justify-between hidden w-1/2 p-12 overflow-hidden lg:flex"
        style={{
          background: `linear-gradient(135deg, ${colors.darkPurple} 0%, ${colors.mediumPurple} 100%)`,
        }}
      >
        {/* Decorative circles background */}
        <div
          className="absolute w-40 h-40 rounded-full top-10 right-10 opacity-10"
          style={{ backgroundColor: colors.lightPurple }}
        />
        <div
          className="absolute w-56 h-56 rounded-full bottom-10 left-10 opacity-10"
          style={{ backgroundColor: colors.lightPurple }}
        />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          {/* Illustration */}
          <img
            src="/kindpng_2190956 1.png"
            alt="Trading Illustration"
            className="object-contain h-64 mb-8"
          />

          {/* Tagline */}
          <h2 className="mb-3 text-xl font-bold leading-tight sm:mb-4 sm:text-3xl lg:text-4xl">
            Start Your Investment Journey
          </h2>

          {/* Sub-message */}
          <p
            className="px-2 text-sm sm:text-base lg:text-lg"
            style={{ color: colors.lightPurple }}
          >
            Join thousands of successful investors today
          </p>

          {/* Investment Features Icons */}
          <div className="w-full max-w-2xl px-4 py-6 mt-8 bg-white sm:px-6 lg:px-8 sm:py-8 sm:mt-12 rounded-2xl">
            <div className="flex justify-center gap-6 sm:gap-16 lg:gap-28">
              {/* Real Estate Investment */}
              <div className="flex flex-col items-center gap-2">
                <img
                  src="/Real Estate Investment_-Euro.svg"
                  alt="Real Estate Investment"
                  className="w-10 h-10 sm:w-14 sm:h-14"
                />
                <p
                  className="text-xs font-semibold text-center sm:text-sm"
                  style={{ color: colors.darkPurple }}
                >
                  Real Estate
                </p>
              </div>

              {/* Stock Chart */}
              <div className="flex flex-col items-center gap-2">
                <img
                  src="/Stock chart- Rupee.svg"
                  alt="Stock Chart"
                  className="w-10 h-10 sm:w-14 sm:h-14"
                />
                <p
                  className="text-xs font-semibold text-center sm:text-sm"
                  style={{ color: colors.darkPurple }}
                >
                  Stocks
                </p>
              </div>

              {/* ROI */}
              <div className="flex flex-col items-center gap-2">
                <img
                  src="/Roi-Rupee.svg"
                  alt="ROI"
                  className="w-10 h-10 sm:w-14 sm:h-14"
                />
                <p
                  className="text-xs font-semibold text-center sm:text-sm"
                  style={{ color: colors.darkPurple }}
                >
                  High Returns
                </p>
              </div>
            </div>
          </div>

          {/* CTA Hint */}
          <div
            className="max-w-sm px-4 py-2 mt-6 rounded-lg sm:px-6 sm:py-3 sm:mt-8"
            style={{ backgroundColor: colors.darkPurple }}
          >
            <p className="text-sm font-semibold text-center sm:text-base">
              Get started in minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
