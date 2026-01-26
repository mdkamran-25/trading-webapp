import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, SECRET_KEY, sendOtp } from "../../api";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import pako from "pako";
import { Card, Input, Button, Text, Label } from "../../components";
import { colors } from "../../utils/colors";
function Password() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNew, setShowNew] = useState(false);

  // Store OTP in a state variable
  const [generatedOtp, setGeneratedOtp] = useState(0);

  // Step 1: Send OTP
  const handleSendOtp = async () => {
    if (!phone) return alert("Please enter phone number");

    try {
      const data = await sendOtp(phone);

      if (data.success) {
        setOtpSent(true);
        setGeneratedOtp(data?.data?.otp || "123456"); // store OTP from API response
        alert("OTP sent successfully!");
      } else {
        alert(data?.data?.data?.message[0] || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending OTP");
    }
  };

  // Step 2: Verify OTP (match with generatedOtp)
  const handleVerifyOtp = () => {
    if (!otp) return alert("Enter OTP");
    console.log(generatedOtp);
    if (otp == generatedOtp) {
      setOtpVerified(true);
      alert("OTP verified! You can now set new password.");
    } else {
      alert("Invalid OTP");
    }
  };

  // Step 3: Submit new password
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword) return alert("Enter new password");

    try {
      const res = await fetch(`${API_BASE_URL}api/users/forget-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          type: "password",
          confirmPassword: newPassword,
        }),
      });
      const data = await res.json();

      if (data.token && data.user) {
        // Cookies.remove("tredingWeb");
        //             Cookies.remove("tredingWebUser");
        //             localStorage.removeItem("userData");
        //             navigate("/login");

        //   try {
        //       const response = await loginUser(credentials);

        //       if (response.token && response.user) {
        //         // ✅ Encrypt user info

        const jsonString = JSON.stringify(data.user);

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
        Cookies.set("tredingWeb", data.token, { expires: 7, path: "/" });
        Cookies.set("tredingWebUser", base64url, { expires: 7, path: "/" });

        //        // ✅ Store cookies globally (fixes redirect issue)

        //         // ✅ Save in localStorage
        localStorage.setItem("userData", JSON.stringify(base64url));

        alert(data.message || "Login successful");

        //         // ✅ Wait a bit before navigating (ensures cookie save)
        setTimeout(() => {
          navigate("/home");
        }, 200);

        //     } catch (err) {
        //       alert(err.response?.data?.message || "Login failed");
        //     }
      } else {
        alert(data.message || "Failed to update password");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating password");
    }
  };

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md space-y-4 sm:space-y-5">
      {/* Heading */}
      <div className="mb-6 sm:mb-8">
        <h2
          className="text-2xl sm:text-3xl font-extrabold"
          style={{ color: colors.darkPurple }}
        >
          {!otpSent
            ? "Forgot Password"
            : otpVerified
              ? "Set Password"
              : "Verify OTP"}
        </h2>
        <p
          className="mt-1 sm:mt-2 text-xs sm:text-sm"
          style={{ color: colors.mediumPurple }}
        >
          {!otpSent
            ? "Enter your phone to reset password"
            : otpVerified
              ? "Create your new password"
              : "Enter OTP sent to your phone"}
        </p>
      </div>

      {/* Phone Number Input */}
      {!otpSent && (
        <div className="space-y-4 sm:space-y-5">
          <div>
            <label
              className="block mb-2 text-xs sm:text-sm font-medium"
              style={{ color: colors.darkPurple }}
            >
              Phone Number
            </label>
            <div
              className="flex overflow-hidden border-2 rounded-xl"
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your number"
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-800 outline-none"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSendOtp}
            className="w-full py-2.5 sm:py-3 mt-4 sm:mt-6 font-semibold text-white text-sm sm:text-base transition rounded-xl hover:opacity-90 disabled:opacity-60 active:scale-95"
            style={{ backgroundColor: colors.darkPurple }}
          >
            Send OTP
          </button>
        </div>
      )}

      {/* OTP Verification */}
      {otpSent && !otpVerified && (
        <div className="space-y-4 sm:space-y-5">
          <div>
            <label
              className="block mb-2 text-xs sm:text-sm font-medium"
              style={{ color: colors.darkPurple }}
            >
              Enter OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP code"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition border-2 outline-none rounded-xl"
              style={{ borderColor: colors.lightPurple }}
            />
          </div>

          <button
            type="button"
            onClick={handleVerifyOtp}
            className="w-full py-2.5 sm:py-3 mt-4 sm:mt-6 font-semibold text-white text-sm sm:text-base transition rounded-xl hover:opacity-90 disabled:opacity-60 active:scale-95"
            style={{ backgroundColor: colors.darkPurple }}
          >
            Verify OTP
          </button>
        </div>
      )}

      {/* New Password Input */}
      {otpVerified && (
        <div className="space-y-4 sm:space-y-5">
          <div>
            <label
              className="block mb-2 text-xs sm:text-sm font-medium"
              style={{ color: colors.darkPurple }}
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base transition border-2 outline-none rounded-xl"
                style={{ borderColor: colors.lightPurple }}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-lg sm:text-xl hover:opacity-70 transition"
              >
                {showNew ? "👁" : "👁‍🗨"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-2.5 sm:py-3 mt-4 sm:mt-6 font-semibold text-white text-sm sm:text-base transition rounded-xl hover:opacity-90 disabled:opacity-60 active:scale-95"
            style={{ backgroundColor: colors.darkPurple }}
          >
            Update Password
          </button>
        </div>
      )}
    </div>
  );
}

export default Password;
