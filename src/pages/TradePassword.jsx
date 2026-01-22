import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

import { API_BASE_URL, sendOtp } from "../api";

function TradePassword() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(""); // store OTP
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  const [tradePassword, setTradePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showTradePass, setShowTradePass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Timer countdown
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = async () => {
    if (!phone) return alert("Please enter phone number");
    setLoading(true);
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
    setLoading(false);
  };
  // ✅ Verify OTP (match with generatedOtp)
  const handleVerifyOtp = () => {
    if (!otp) return alert("Enter OTP");

    // eslint-disable-next-line eqeqeq
    if (otp == generatedOtp) {
      setOtpVerified(true);
      alert("OTP verified! You can now set new password.");
    } else {
      alert("Invalid OTP");
    }
  };

  // ✅ Update Trade Password
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tradePassword !== confirmPassword)
      return alert("⚠️ Passwords do not match!");
    try {
      const res = await fetch(`${API_BASE_URL}api/users/Change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, type: "tradePassword", confirmPassword }),
      });
      const data = await res.json();

      if (data.success) {
        alert("tradePassword updated successfully!");
        navigate(-1);
      } else {
        alert(data.message || "Failed to update tradePassword");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating tradePassword");
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md min-h-screen p-5 mx-auto bg-gradient-to-br from-yellow-200 via-yellow-100 to-yellow-50 animate-bgFlow">
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-orange-400 to-yellow-300 p-3.5 rounded-2xl mb-5 shadow-md animate-slideDown">
          <button
            className="text-2xl text-black transition border-none cursor-pointer bg-none hover:opacity-70"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft color="white" size={22} />
          </button>
          <h2 className="flex-1 text-lg font-semibold text-center text-black">
            Update Trade Password
          </h2>
        </div>

        {/* Form */}
        <form className="flex flex-col flex-1 p-4 space-y-3 bg-white shadow-lg rounded-2xl animate-fadeIn">
          {!otpSent && (
            <>
              <label className="text-xs font-medium text-black">Number</label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter Your number.."
                  className="flex-1 px-3 py-3 text-sm transition border-2 border-yellow-300 outline-none rounded-2xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
                  required
                />
                <button
                  type="button"
                  className="px-3.5 py-3 bg-yellow-300 text-black border-none rounded-2xl text-xs font-semibold cursor-pointer transition-colors hover:bg-yellow-400 disabled:opacity-50"
                  onClick={handleSendOtp}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </div>
            </>
          )}

          {otpSent && !otpVerified && (
            <>
              <label className="text-xs font-medium text-black">
                Verification Code (OTP)
              </label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="flex-1 px-3 py-3 text-sm transition border-2 border-yellow-300 outline-none rounded-2xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
                />
                <button
                  type="button"
                  className="px-3.5 py-3 bg-yellow-300 text-black border-none rounded-2xl text-xs font-semibold cursor-pointer transition-colors hover:bg-yellow-400"
                  onClick={handleVerifyOtp}
                >
                  Verify
                </button>
              </div>
            </>
          )}

          {otpVerified && (
            <>
              <label className="text-xs font-medium text-black">
                New Trade Password
              </label>
              <div className="relative">
                <input
                  type={showTradePass ? "text" : "password"}
                  value={tradePassword}
                  onChange={(e) => setTradePassword(e.target.value)}
                  placeholder="Enter new trade password"
                  className="w-full px-3 py-3 text-sm transition border-2 border-yellow-300 outline-none rounded-2xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
                  required
                />
                <span
                  className="absolute text-black transition-opacity -translate-y-1/2 cursor-pointer right-3 top-1/2 hover:opacity-70"
                  onClick={() => setShowTradePass(!showTradePass)}
                >
                  {showTradePass ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              <label className="text-xs font-medium text-black">
                Confirm Trade Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm trade password"
                  className="w-full px-3 py-3 text-sm transition border-2 border-yellow-300 outline-none rounded-2xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
                  required
                />
                <span
                  className="absolute text-black transition-opacity -translate-y-1/2 cursor-pointer right-3 top-1/2 hover:opacity-70"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                >
                  {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              <button
                type="submit"
                className="mt-2 py-3 bg-yellow-300 text-black border-none rounded-2xl text-base font-semibold cursor-pointer transition-all hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                disabled={!tradePassword || tradePassword !== confirmPassword}
              >
                Update Trade Password
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default TradePassword;
