import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { registerUser, SECRET_KEY, sendOtpNoCheck } from "../api";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import pako from "pako";
const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- State ---
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [refCode, setRefCode] = useState("");
  const [tradePassword, setTradePassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- Auto fill referral code from URL ---
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const invite = params.get("invitation_code");
    if (invite) setRefCode(invite);
  }, [location.search]);

  // --- Send OTP ---
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

  // --- Verify OTP ---
  const handleVerifyOtp = () => {
    if (!otp) return alert("Enter OTP");
    if (otp == generatedOtp) {
      setOtpVerified(true);
      alert("OTP verified successfully!");
    } else {
      alert("Invalid OTP");
    }
  };

  // --- Register ---
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

        // ✅ 2. Compress and get Uint8Array
        const compressed = pako.deflate(jsonString);

        // ✅ 3. Convert compressed binary → Base64 string
        const compressedBase64 = btoa(String.fromCharCode(...compressed));

        // ✅ 4. Encrypt compressed Base64
        const encryptedUser = CryptoJS.AES.encrypt(
          compressedBase64,
          SECRET_KEY,
        ).toString();

        // ✅ 5. Make Base64URL safe (optional)
        const base64url = encryptedUser
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "");

        // ✅ 6. Store securely
        Cookies.set("tredingWeb", response.token, { expires: 7, path: "/" });
        Cookies.set("tredingWebUser", base64url, { expires: 7, path: "/" });

        localStorage.setItem("userData", JSON.stringify(response.user));

        alert(response.message || "Registered successfully!");
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white font-sans pb-2">
      {/* Top Bar with Gradient */}
      <div className="w-full h-36 bg-gradient-to-b from-yellow-300 to-orange-400 rounded-b-3xl flex justify-center items-center pt-5">
        <div className="bg-white rounded-full p-1 shadow-lg">
          <img
            src="/logo.jpg"
            alt="Logo"
            className="w-12 h-12 object-contain"
          />
        </div>
      </div>

      {/* Hero Image */}
      <img
        src="/fe9af9f2fc1bb01a72b9e6dc233b320ba46ce7ff.png"
        alt="real estate"
        className="w-11/12 h-48 object-cover rounded-2xl mt-8 z-10"
      />

      {/* Register Card */}
      <div className="bg-gradient-to-b from-yellow-300 to-orange-400 rounded-3xl p-6 shadow-lg w-11/12 mt-10 z-10">
        <h2 className="text-2xl font-bold text-gray-700 mb-5 text-center">
          Register
        </h2>

        {/* Phone + Send OTP */}
        <div className="flex items-center bg-white rounded-full border-2 border-yellow-300 px-4 py-3 mb-4">
          <input
            type="text"
            placeholder="Please enter your number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={otpVerified}
            className="flex-1 outline-none bg-transparent text-gray-800 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSendOtp}
            disabled={loading || otpSent || otpVerified}
            className={`ml-2 px-3.5 py-1.5 rounded text-xs font-semibold text-white transition-all ${
              otpVerified
                ? "bg-yellow-500 cursor-not-allowed opacity-60"
                : otpSent
                  ? "bg-amber-500 cursor-not-allowed opacity-60"
                  : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading ? "Sending..." : otpVerified ? "Verified" : "Send OTP"}
          </button>
        </div>

        {/* OTP Input */}
        {otpSent && !otpVerified && (
          <div className="flex items-center bg-white rounded-full border-2 border-yellow-300 px-4 py-3 mb-4">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="flex-1 outline-none bg-transparent text-gray-800"
            />
            <button
              onClick={handleVerifyOtp}
              className="ml-2 px-3.5 py-1.5 rounded text-xs font-semibold text-white bg-yellow-500 hover:bg-yellow-600 transition-colors"
            >
              Verify
            </button>
          </div>
        )}

        {/* Password Field */}
        <div className="bg-white rounded-full border-2 border-yellow-300 px-4 py-3 mb-4">
          <input
            type="password"
            placeholder="Please enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!otpVerified}
            className="w-full outline-none bg-transparent text-gray-800 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        {/* Trade Password Field */}
        <div className="bg-white rounded-full border-2 border-yellow-300 px-4 py-3 mb-4">
          <input
            type="password"
            placeholder="Please enter your trade password"
            value={tradePassword}
            onChange={(e) => setTradePassword(e.target.value)}
            disabled={!otpVerified}
            className="w-full outline-none bg-transparent text-gray-800 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        {/* Invitation Code Field */}
        <div className="bg-white rounded-full border-2 border-yellow-300 px-4 py-3 mb-6">
          <input
            type="text"
            placeholder="Enter Invitation Code"
            value={refCode}
            onChange={(e) => setRefCode(e.target.value)}
            disabled={!otpVerified}
            className="w-full outline-none bg-transparent text-gray-800 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        {/* Login Redirect */}
        <p className="text-sm text-gray-700 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-black font-semibold underline cursor-pointer hover:opacity-80 transition"
          >
            Login
          </span>
        </p>
      </div>

      {/* Register Button */}
      <button
        onClick={handleRegister}
        disabled={!otpVerified || loading}
        className="w-1/2 py-3.5 mt-6 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold rounded-full hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all z-10"
      >
        {loading ? "Please wait..." : "Register"}
      </button>
    </div>
  );
};

export default Register;
