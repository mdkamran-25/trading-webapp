import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { loginUser, SECRET_KEY } from "../api";
import Password from "./Password";
import pako from "pako";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState(false);
  const navigate = useNavigate();

  const handleRegisterRedirect = () => navigate("/register");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!mobileNumber || !password) {
      alert("Phone and password are required");
      return;
    }

    const credentials = { phone: mobileNumber, password };

    try {
      Cookies.remove("tredingWeb");
      Cookies.remove("tredingWebUser");
      const response = await loginUser(credentials);

      if (response.token && response.user) {
        // ✅ 1. Convert to JSON string
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

        alert(response.message || "Login successful");

        setTimeout(() => navigate("/"), 200);
      } else {
        alert("Invalid response from server");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
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
      <div className="bg-gradient-to-b from-yellow-300 to-orange-400 border-2 border-yellow-300 rounded-2xl p-8 w-11/12 shadow-lg mt-6 z-10">
        {password1 === false ? (
          <>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold text-gray-700">Login</h2>
              <button
                onClick={handleRegisterRedirect}
                className="text-gray-800 font-semibold text-sm hover:opacity-80 transition"
              >
                Register
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="flex flex-col gap-6">
              <div>
                <label
                  htmlFor="mobileNumber"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Mobile Number
                </label>
                <div className="flex border border-white">
                  <span className="bg-white text-gray-800 px-3 py-2 font-semibold flex items-center">
                    +91
                  </span>
                  <input
                    type="text"
                    id="mobileNumber"
                    placeholder="Please enter your number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white text-gray-800 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Please enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-white text-gray-800 rounded outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-white text-gray-800 font-bold py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Login
              </button>
            </form>

            <div className="flex justify-end mt-3">
              <button
                onClick={() => setPassword1(true)}
                className="text-black text-sm font-semibold underline hover:opacity-80 transition"
              >
                Forget Password
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => setPassword1(false)}
              className="bg-white text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-100 transition w-full mb-4"
            >
              Back To Login
            </button>
            <Password />
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
