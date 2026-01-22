import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

import {
  addBankDetails,
  GetBankDetails,
  SECRET_KEY,
  updateBankDetails,
  withdrawReq,
} from "../api";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import pako from "pako";
import { Card, PageHeader, Text, Button, Input } from "../components";

const encryptedUser = Cookies.get("tredingWebUser");

const Withdraw = () => {
  const navigate = useNavigate();

  const [bankDetails, setBankDetails] = useState(null);
  const [hasBankDetails, setHasBankDetails] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // ✅ edit mode

  const [userId, setUserId] = useState("");
  const [holderName, setHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [upiId, setUpiId] = useState("");

  const [tradePassword, setTradePassword] = useState(""); // For withdrawal
  const [BUpTRadePassword, setBUpTRadePassword] = useState(""); // For bank update
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [balance, setBalance] = useState(0);
  const [responseMessage, setResponseMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const getUserId = async () => {
    if (encryptedUser) {
      const base64 = encryptedUser.replace(/-/g, "+").replace(/_/g, "/");

      // 🔹 3. AES decrypt (gives compressed Base64 string)
      const decryptedBase64 = CryptoJS.AES.decrypt(base64, SECRET_KEY).toString(
        CryptoJS.enc.Utf8,
      );
      if (!decryptedBase64) return null;

      // 🔹 4. Convert Base64 → Uint8Array (binary bytes)
      const binaryString = atob(decryptedBase64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // 🔹 5. Decompress (restore JSON string)
      const decompressed = pako.inflate(bytes, { to: "string" });
      const UserData = await JSON.parse(decompressed);

      setUserId(UserData?._id);
      setIsLoading(false);
      return UserData?._id;
    }
    return null;
  };

  const fetchBankDetails = async () => {
    try {
      const id = await getUserId();
      const res = await GetBankDetails(id);

      if (
        res.data.bankDetails &&
        Object.keys(res.data.bankDetails).length > 0
      ) {
        setHasBankDetails(true);
        setBankDetails(res.data.bankDetails);
        setHolderName(res.data.bankDetails.holderName || "");
        setAccountNumber(res.data.bankDetails.accountNumber || "");
        setIfscCode(res.data.bankDetails.ifscCode || "");
        setBankName(res.data.bankDetails.bankName || "");
        setUpiId(res.data.bankDetails.upiId || "");
        setBalance(res.data.Withdrawal || 0);
      } else {
        setHasBankDetails(false);
        setBalance(res.data.Withdrawal || 0);
      }
    } catch (err) {
      setResponseMessage({
        type: "error",
        message: err.response?.data?.message || "Failed to fetch bank details",
      });
    }
  };

  useEffect(() => {
    getUserId();
    fetchBankDetails();
  }, []);

  const handleAddBank = async () => {
    if (!holderName || !accountNumber || !ifscCode || !bankName)
      return alert("Fill all required fields");
    try {
      const res = await addBankDetails({
        userId,
        holderName,
        accountNumber,
        ifscCode,
        bankName,
        upiId,
      });
      setHasBankDetails(true);

      setBankDetails(res?.bankDetails);
      setIsAdding(false);
      setResponseMessage({ type: "success", message: res.message });
    } catch (err) {
      setResponseMessage({
        type: "error",
        message: err.response?.message || "Failed to add bank details",
      });
    }
  };

  const handleUpdateBank = async () => {
    if (!BUpTRadePassword)
      return alert("Enter trade password to update bank details");
    try {
      const res = await updateBankDetails({
        userId,
        tradePassword: BUpTRadePassword,
        bankDetails: { holderName, accountNumber, ifscCode, bankName, upiId },
      });

      setBankDetails(res?.data?.bankDetails);
      setResponseMessage({ type: "success", message: res.data.message });
      setBUpTRadePassword("");
      setIsEditing(false); // ✅ exit edit mode
    } catch (err) {
      setResponseMessage({
        type: "error",
        message: err.response?.data?.message || "Bank update failed",
      });
    }
  };

  const handleWithdrawal = async () => {
    if (!withdrawalAmount || !tradePassword)
      return alert("Enter amount and trade password");
    try {
      const res = await withdrawReq({
        userId,
        tradePassword,
        amount: withdrawalAmount,
        bankDetails,
      });
      setBalance((prev) => prev - withdrawalAmount);
      setTradePassword("");
      setWithdrawalAmount("");
      setResponseMessage({ type: "success", message: res.data.message });
    } catch (err) {
      console.log(err.message);
      setResponseMessage({
        type: "error",
        message: err.message || "Withdrawal failed",
      });
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
        <h1 className="text-xl font-bold flex-1 text-center">Withdraw</h1>
        <div className="w-6"></div>
      </div>

      <div className="relative z-10 mx-4 mt-[-2rem]">
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 border border-yellow-300">
          <div className="flex items-center justify-between mb-4 text-sm">
            <span className="text-gray-600">Withdrawal Balance:</span>
            <span className="text-lg font-bold text-gray-900">
              ₹ {balance || 0}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {responseMessage && (
              <div
                className={`p-4 rounded-2xl font-semibold text-center ${
                  responseMessage.type === "success"
                    ? "bg-green-50 border border-green-500 text-green-800"
                    : "bg-red-50 border border-red-500 text-red-800"
                }`}
              >
                {responseMessage.message}
              </div>
            )}

            {/* Bank Details */}
            {!hasBankDetails ? (
              <>
                {!isAdding ? (
                  <button
                    className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-semibold rounded-full hover:shadow-lg transition"
                    onClick={() => setIsAdding(true)}
                  >
                    + Add Bank Details
                  </button>
                ) : (
                  <>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-yellow-400 focus:outline-none transition"
                      placeholder="Account Holder Name"
                      value={holderName}
                      onChange={(e) => setHolderName(e.target.value)}
                    />
                    <input
                      type="number"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-yellow-400 focus:outline-none transition"
                      placeholder="Account Number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-yellow-400 focus:outline-none transition"
                      placeholder="IFSC Code"
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-yellow-400 focus:outline-none transition"
                      placeholder="Bank Name"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-yellow-400 focus:outline-none transition"
                      placeholder="UPI ID (Optional)"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={handleAddBank}
                        className="flex-1 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-semibold rounded-full hover:shadow-lg transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsAdding(false)}
                        className="flex-1 py-3 bg-gray-300 text-gray-900 font-semibold rounded-full hover:bg-gray-400 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div>
                <span className="text-gray-600 text-sm font-medium">
                  My Bank Details
                </span>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-yellow-400 focus:outline-none transition mt-2"
                      value={holderName}
                      onChange={(e) => setHolderName(e.target.value)}
                      placeholder="Holder Name"
                    />
                    <input
                      type="number"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-yellow-400 focus:outline-none transition mt-2"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="Account Number"
                    />
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-yellow-400 focus:outline-none transition mt-2"
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value)}
                      placeholder="IFSC Code"
                    />
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-yellow-400 focus:outline-none transition mt-2"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="Bank Name"
                    />
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-yellow-400 focus:outline-none transition mt-2"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="UPI ID (Optional)"
                    />
                    <input
                      type="password"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-yellow-400 focus:outline-none transition mt-2"
                      placeholder="Trade Password"
                      value={BUpTRadePassword}
                      onChange={(e) => setBUpTRadePassword(e.target.value)}
                    />
                    <div className="flex gap-3 mt-3">
                      <button
                        onClick={handleUpdateBank}
                        className="flex-1 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-semibold rounded-full hover:shadow-lg transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex-1 py-3 bg-gray-300 text-gray-900 font-semibold rounded-full hover:bg-gray-400 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mt-3 space-y-2 text-sm">
                      <p>
                        <b>Holder:</b> {bankDetails.holderName ?? ""}
                      </p>
                      <p>
                        <b>Account:</b> {bankDetails.accountNumber ?? ""}
                      </p>
                      <p>
                        <b>IFSC:</b> {bankDetails.ifscCode ?? ""}
                      </p>
                      <p>
                        <b>Bank:</b> {bankDetails.bankName ?? ""}
                      </p>
                      {bankDetails.upiId && (
                        <p>
                          <b>UPI:</b> {bankDetails.upiId ?? ""}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-semibold rounded-full hover:shadow-lg transition mt-3"
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Withdrawal */}
            {hasBankDetails && (
              <>
                <input
                  type="number"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-yellow-400 focus:outline-none transition"
                  placeholder="Withdrawal Amount"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                />
                <input
                  type="password"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-2xl focus:border-yellow-400 focus:outline-none transition"
                  placeholder="Trade Password"
                  value={tradePassword}
                  onChange={(e) => setTradePassword(e.target.value)}
                />
                <button
                  onClick={handleWithdrawal}
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-semibold rounded-full hover:shadow-lg transition disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="inline animate-spin" />
                  ) : (
                    "Apply Withdrawal"
                  )}{" "}
                </button>
              </>
            )}

            {/* Rules */}
            <div className="mt-6 pt-4 border-t border-gray-300">
              <h2 className="text-gray-900 font-bold mb-2">Explain</h2>
              <ol className="text-xs text-gray-600 space-y-2 list-decimal list-inside">
                <li>Daily marketing from 00:00:00 to 23:59:59.</li>
                <li>Withdraw amount between 300 to 500000.</li>
                <li>Only one withdrawal per day.</li>
                <li>Withdrawal rate 5%.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
