import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { loginUser, SECRET_KEY } from "../../api";
import Password from "./Password";
import pako from "pako";
import { Card, Text, Button } from "../../components";
import { colors } from "../../utils/colors";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegisterRedirect = () => navigate("/register");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!mobileNumber || !password) {
      alert("Phone and password are required");
      setLoading(false);
      return;
    }

    const credentials = { phone: mobileNumber, password };

    try {
      Cookies.remove("tredingWeb");
      Cookies.remove("tredingWebUser");
      const response = await loginUser(credentials);

      if (response.token && response.user) {
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

        alert(response.message || "Login successful");
        setTimeout(() => navigate("/"), 200);
      } else {
        alert("Invalid response from server");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden font-sans lg:flex-row">
      {/* Left Column - Login Form */}
      <div
        className="relative flex flex-col items-center justify-center w-full px-4 py-8 overflow-hidden lg:w-1/2 lg:px-12 lg:py-0"
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
        {!showPassword ? (
          <>
            {/* Login Heading */}
            <div className="w-full max-w-md mb-8">
              <h1
                className="text-4xl font-extrabold"
                style={{ color: colors.darkPurple }}
              >
                Login
              </h1>
              <p
                className="mt-2 text-sm"
                style={{ color: colors.mediumPurple }}
              >
                Access your trading account
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="w-full max-w-md space-y-5">
              {/* Mobile Number Input */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium"
                  style={{ color: colors.darkPurple }}
                >
                  Mobile Number
                </label>
                <div
                  className="flex overflow-hidden border-2 rounded-xl"
                  style={{ borderColor: colors.lightPurple }}
                >
                  <span
                    className="flex items-center px-4 py-3 font-semibold"
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
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="flex-1 px-4 py-3 text-gray-800 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label
                  className="block mb-2 text-sm font-medium"
                  style={{ color: colors.darkPurple }}
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 transition border-2 outline-none rounded-xl"
                  style={{ borderColor: colors.lightPurple }}
                  required
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-6 font-semibold text-white transition rounded-xl hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: colors.darkPurple }}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Footer Links */}
            <div className="flex items-center justify-between w-full max-w-md mt-6 text-sm">
              <button
                onClick={() => setShowPassword(true)}
                className="font-semibold transition hover:opacity-70"
                style={{ color: colors.mediumPurple }}
              >
                Forgot Password?
              </button>
              <button
                onClick={handleRegisterRedirect}
                className="font-semibold transition hover:opacity-70"
                style={{ color: colors.mediumPurple }}
              >
                Register
              </button>
            </div>

            {/* Social Media Icons */}
            <div className="relative z-10 flex gap-4 mt-10">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:opacity-70"
              >
                <img src="/Facebook.svg" alt="Facebook" className="w-16 h-16" />
              </a>
              <a
                href="https://wa.me"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:opacity-70"
              >
                <img src="/Whatsapp.svg" alt="WhatsApp" className="w-16 h-16" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:opacity-70"
              >
                <img src="/Telegram.svg" alt="Telegram" className="w-16 h-16" />
              </a>
            </div>
          </>
        ) : (
          <div className="w-full max-w-md">
            <button
              onClick={() => setShowPassword(false)}
              className="px-4 py-2 mb-6 font-semibold text-white transition rounded-xl hover:opacity-90"
              style={{ backgroundColor: colors.mediumPurple }}
            >
              ← Back To Login
            </button>
            <Password />
          </div>
        )}
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
          <h2 className="mb-4 text-3xl font-bold leading-tight lg:text-4xl">
            Begin Your Investment Journey
          </h2>

          {/* Sub-message */}
          <p className="text-lg" style={{ color: colors.lightPurple }}>
            Access your portfolio, track gains, and grow your wealth
          </p>

          {/* Investment Features Icons */}
          <div className="w-full max-w-2xl p-8 mt-12 bg-white rounded-2xl">
            <div className="flex justify-center gap-28">
              {/* Real Estate Investment */}
              <div className="flex flex-col items-center gap-2">
                <img
                  src="/Real Estate Investment_-Euro.svg"
                  alt="Real Estate Investment"
                  className="w-14 h-14"
                />
                <p
                  className="text-sm font-semibold"
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
                  className="w-14 h-14"
                />
                <p
                  className="text-sm font-semibold"
                  style={{ color: colors.darkPurple }}
                >
                  Stocks
                </p>
              </div>

              {/* ROI */}
              <div className="flex flex-col items-center gap-2">
                <img src="/Roi-Rupee.svg" alt="ROI" className="w-14 h-14" />
                <p
                  className="text-sm font-semibold"
                  style={{ color: colors.darkPurple }}
                >
                  High Returns
                </p>
              </div>
            </div>
          </div>

          {/* CTA Hint */}
          <div
            className="px-6 py-3 mt-8 rounded-lg"
            style={{ backgroundColor: colors.darkPurple }}
          >
            <p className="font-semibold">Don't have an account? Register now</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
