import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { API_BASE_URL, sendOtp } from "../../api";
import { Card, Button, Text, PageHeader } from "../../components";

function TradePassword() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  const [tradePassword, setTradePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showTradePass, setShowTradePass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

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
        setGeneratedOtp(data?.data?.otp || "123456");
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

  const handleVerifyOtp = () => {
    if (!otp) return alert("Enter OTP");

    if (otp === generatedOtp) {
      setOtpVerified(true);
      alert("OTP verified! You can now set new password.");
    } else {
      alert("Invalid OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tradePassword !== confirmPassword)
      return alert("Passwords do not match!");
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}api/users/Change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, type: "tradePassword", confirmPassword }),
      });
      const data = await res.json();

      if (data.success) {
        alert("Trade password updated successfully!");
        navigate(-1);
      } else {
        alert(data.message || "Failed to update trade password");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating trade password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <PageHeader
        title="Update Trade Password"
        onBack={() => navigate(-1)}
        showBackButton={true}
      />

      <Card variant="default" padding="lg" className="w-11/12 mx-auto mt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {!otpSent && (
            <>
              <Text variant="label" weight="semibold" className="mb-2">
                Phone Number
              </Text>
              <div className="flex gap-2">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your number"
                  className="flex-1 px-3 py-3 text-sm border-2 border-yellow-300 rounded-2xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition"
                  required
                />
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleSendOtp}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send"}
                </Button>
              </div>
            </>
          )}

          {otpSent && !otpVerified && (
            <>
              <Text variant="label" weight="semibold" className="mb-2">
                Verification Code (OTP)
              </Text>
              <div className="flex gap-2">
                <input
                  type="tel"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="flex-1 px-3 py-3 text-sm border-2 border-yellow-300 rounded-2xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition"
                  required
                />
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleVerifyOtp}
                >
                  Verify
                </Button>
              </div>
            </>
          )}

          {otpVerified && (
            <>
              <Text variant="label" weight="semibold" className="mb-2">
                New Trade Password
              </Text>
              <div className="relative mb-4">
                <input
                  type={showTradePass ? "text" : "password"}
                  value={tradePassword}
                  onChange={(e) => setTradePassword(e.target.value)}
                  placeholder="Enter new trade password"
                  className="w-full px-4 py-3 border-2 border-yellow-300 rounded-2xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 transition"
                  onClick={() => setShowTradePass(!showTradePass)}
                >
                  {showTradePass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <Text variant="label" weight="semibold" className="mb-2">
                Confirm Trade Password
              </Text>
              <div className="relative mb-4">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm trade password"
                  className="w-full px-4 py-3 border-2 border-yellow-300 rounded-2xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 transition"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                >
                  {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <Button
                type="submit"
                variant="gradient"
                fullWidth
                disabled={
                  loading || !tradePassword || tradePassword !== confirmPassword
                }
              >
                {loading ? "Updating..." : "Update Trade Password"}
              </Button>
            </>
          )}
        </form>
      </Card>
    </div>
  );
}

export default TradePassword;
