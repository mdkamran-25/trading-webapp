import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { API_BASE_URL } from "../api";
import Cookies from "js-cookie";

function ChangePassword() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone || !currentPassword || !newPassword) {
      return alert("Please fill all fields");
    }

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
        alert("Password updated successfully! Pleas login");

        Cookies.remove("tredingWeb");

        Cookies.set("tredingWeb", data.token, { expires: 7, path: "/" });

        //         // ✅ Save in localStorage
        localStorage.setItem("userData", JSON.stringify(data.User));
        navigate("/login");
      } else {
        alert(data.message || "Failed to update password");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating password");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="relative w-full py-3 px-4 bg-gradient-to-b from-yellow-400 to-orange-400 text-gray-900 flex items-center justify-between rounded-b-3xl">
        <button
          className="hover:opacity-70 transition"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft color="black" size={22} />
        </button>
        <h2 className="text-xl font-bold flex-1 text-center">
          Change Password
        </h2>
        <div className="w-6"></div>
      </div>

      <form className="relative z-10 mx-4 mt-[-2rem]" onSubmit={handleSubmit}>
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <label className="text-gray-600 text-sm font-medium">
            Phone Number
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-yellow-400 focus:outline-none transition mt-2 mb-4"
          />

          <label className="text-gray-600 text-sm font-medium">
            Current Password
          </label>
          <div className="relative mt-2 mb-4">
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-yellow-400 focus:outline-none transition"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 transition"
              onClick={() => setShowCurrent(!showCurrent)}
            >
              {showCurrent ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>

          <label className="text-gray-600 text-sm font-medium">
            New Password
          </label>
          <div className="relative mt-2 mb-6">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-yellow-400 focus:outline-none transition"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700 transition"
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? "👁️" : "👁️‍🗨️"}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-semibold rounded-full hover:shadow-lg transition"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
