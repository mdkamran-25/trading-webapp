import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, SECRET_KEY, sendOtp } from "../../api";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import pako from "pako";
import { Card, Input, Button, Text, Label } from "../../components";
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
    <div className="w-full max-w-md mx-auto min-h-screen bg-gradient-to-br from-white via-yellow-50 to-yellow-100 p-5">
      <Card className="p-5 animate-fadeIn space-y-3.5">
        {!otpSent && (
          <>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
            />
            <Button
              type="button"
              onClick={handleSendOtp}
              variant="primary"
              className="w-full mt-2"
            >
              Send OTP
            </Button>
          </>
        )}

        {otpSent && !otpVerified && (
          <>
            <Label htmlFor="otp">Enter OTP</Label>
            <Input
              id="otp"
              type="tel"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
            <Button
              type="button"
              onClick={handleVerifyOtp}
              variant="primary"
              className="w-full mt-2"
            >
              Verify OTP
            </Button>
          </>
        )}

        {otpVerified && (
          <>
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-2.5 p-1 hover:bg-gray-100 rounded transition-colors"
              >
                {showNew ? "👁" : "👁‍🗨"}
              </button>
            </div>
            <Button
              type="submit"
              onClick={handleSubmit}
              variant="primary"
              className="w-full mt-2"
            >
              Update Password
            </Button>
          </>
        )}
      </Card>
    </div>
  );
}

export default Password;
