import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api";
import Cookies from "js-cookie";
import { Card, Button, Text, PageHeader } from "../components";

function ChangePassword() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone || !currentPassword || !newPassword) {
      return alert("Please fill all fields");
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}api/users/Change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          type: "password",
          currentPassword,
          confirmPassword: newPassword,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Password updated successfully! Please login");
        Cookies.remove("tredingWeb");
        Cookies.set("tredingWeb", data.token, { expires: 7, path: "/" });
        localStorage.setItem("userData", JSON.stringify(data.User));
        navigate("/login");
      } else {
        alert(data.message || "Failed to update password");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <PageHeader
        title="Change Password"
        onBack={() => navigate(-1)}
        showBackButton={true}
      />

      <Card variant="default" padding="lg" className="w-11/12 mx-auto mt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Text variant="label" weight="semibold" className="mb-2">
              Phone Number
            </Text>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-yellow-400 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <Text variant="label" weight="semibold" className="mb-2">
              Current Password
            </Text>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-yellow-400 focus:outline-none transition"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                onClick={() => setShowCurrent(!showCurrent)}
              >
                {showCurrent ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div>
            <Text variant="label" weight="semibold" className="mb-2">
              New Password
            </Text>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-yellow-400 focus:outline-none transition"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="gradient"
            fullWidth
            disabled={loading}
            className="mt-6"
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default ChangePassword;
