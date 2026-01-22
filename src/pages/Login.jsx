import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { loginUser, SECRET_KEY } from "../api";
import Password from "./Password";
import pako from "pako";
import { Card, Text, Button } from "../components";

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
    <div className="flex flex-col items-center min-h-screen bg-orange-100 overflow-y-auto font-sans">
      {/* Top Bar with Gradient */}
      <div className="w-full h-32 bg-gradient-to-b from-yellow-300 to-orange-400 rounded-b-3xl flex justify-center items-center">
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
        src="https://i.pinimg.com/736x/21/fa/e8/21fae80dd33394b8c7622e6d136f9597.jpg"
        alt="real state"
        className="w-11/12 h-48 object-cover rounded-2xl mt-4 z-10"
      />

      {/* Login Card */}
      <Card variant="gradient" padding="lg" className="w-11/12 mt-6 z-10">
        {!showPassword ? (
          <>
            <div className="flex justify-between items-center mb-5">
              <Text variant="h2" weight="bold" color="primary">
                Login
              </Text>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRegisterRedirect}
              >
                Register
              </Button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Mobile Number
                </label>
                <div className="flex border border-white rounded">
                  <span className="bg-white text-gray-800 px-3 py-2 font-semibold flex items-center">
                    +91
                  </span>
                  <input
                    type="text"
                    placeholder="Please enter your number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white text-gray-800 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Please enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-white text-gray-800 rounded outline-none"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="flex justify-end mt-3">
              <button
                onClick={() => setShowPassword(true)}
                className="text-black text-sm font-semibold underline hover:opacity-80 transition"
              >
                Forget Password
              </button>
            </div>
          </>
        ) : (
          <>
            <Button
              variant="primary"
              fullWidth
              onClick={() => setShowPassword(false)}
              className="mb-4"
            >
              Back To Login
            </Button>
            <Password />
          </>
        )}
      </Card>
    </div>
  );
};

export default Login;
