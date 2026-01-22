import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

import {
  addBankDetails,
  GetBankDetails,
  SECRET_KEY,
  updateBankDetails,
  withdrawReq,
} from "../../api";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import pako from "pako";
import { Card, PageHeader, Text, Button, Input } from "../../components";

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
    <div className="w-full min-h-screen bg-gray-100 pb-8">
      <PageHeader title="Withdraw" onBack={() => navigate(-1)} />

      <div className="relative z-10 mx-4 mt-4">
        <Card
          variant="default"
          padding="lg"
          className="border border-yellow-300 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4 text-sm">
            <Text variant="body" className="text-gray-600">
              Withdrawal Balance:
            </Text>
            <Text variant="h3" className="text-lg font-bold text-gray-900">
              ₹ {balance || 0}
            </Text>
          </div>

          <div className="flex flex-col gap-4">
            {responseMessage && (
              <Card
                variant={
                  responseMessage.type === "success" ? "default" : "default"
                }
                padding="md"
                className={`rounded-2xl font-semibold text-center border ${
                  responseMessage.type === "success"
                    ? "bg-green-50 border-green-500"
                    : "bg-red-50 border-red-500"
                }`}
              >
                <Text
                  variant="body"
                  className={
                    responseMessage.type === "success"
                      ? "text-green-800"
                      : "text-red-800"
                  }
                >
                  {responseMessage.message}
                </Text>
              </Card>
            )}

            {/* Bank Details */}
            {!hasBankDetails ? (
              <>
                {!isAdding ? (
                  <Button
                    variant="primary"
                    onClick={() => setIsAdding(true)}
                    className="w-full"
                  >
                    + Add Bank Details
                  </Button>
                ) : (
                  <>
                    <Input
                      type="text"
                      placeholder="Account Holder Name"
                      value={holderName}
                      onChange={(e) => setHolderName(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Account Number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="IFSC Code"
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Bank Name"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="UPI ID (Optional)"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                    <div className="flex gap-3">
                      <Button
                        variant="primary"
                        onClick={handleAddBank}
                        className="flex-1"
                      >
                        Save
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setIsAdding(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div>
                <Text variant="sm" className="text-gray-600 font-medium">
                  My Bank Details
                </Text>
                {isEditing ? (
                  <>
                    <Input
                      type="text"
                      value={holderName}
                      onChange={(e) => setHolderName(e.target.value)}
                      placeholder="Holder Name"
                      className="mt-2"
                    />
                    <Input
                      type="number"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="Account Number"
                      className="mt-2"
                    />
                    <Input
                      type="text"
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value)}
                      placeholder="IFSC Code"
                      className="mt-2"
                    />
                    <Input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="Bank Name"
                      className="mt-2"
                    />
                    <Input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="UPI ID (Optional)"
                      className="mt-2"
                    />
                    <Input
                      type="password"
                      placeholder="Trade Password"
                      value={BUpTRadePassword}
                      onChange={(e) => setBUpTRadePassword(e.target.value)}
                      className="mt-2"
                    />
                    <div className="flex gap-3 mt-3">
                      <Button
                        variant="primary"
                        onClick={handleUpdateBank}
                        className="flex-1"
                      >
                        Save
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setIsEditing(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Card
                      variant="flat"
                      padding="md"
                      className="mt-3 space-y-2 text-sm"
                    >
                      <Text variant="sm">
                        <b>Holder:</b> {bankDetails.holderName ?? ""}
                      </Text>
                      <Text variant="sm">
                        <b>Account:</b> {bankDetails.accountNumber ?? ""}
                      </Text>
                      <Text variant="sm">
                        <b>IFSC:</b> {bankDetails.ifscCode ?? ""}
                      </Text>
                      <Text variant="sm">
                        <b>Bank:</b> {bankDetails.bankName ?? ""}
                      </Text>
                      {bankDetails.upiId && (
                        <Text variant="sm">
                          <b>UPI:</b> {bankDetails.upiId ?? ""}
                        </Text>
                      )}
                    </Card>
                    <Button
                      variant="primary"
                      onClick={() => setIsEditing(true)}
                      className="w-full mt-3"
                    >
                      Edit
                    </Button>
                  </>
                )}
              </div>
            )}

            {/* Withdrawal */}
            {hasBankDetails && (
              <>
                <Input
                  type="number"
                  placeholder="Withdrawal Amount"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Trade Password"
                  value={tradePassword}
                  onChange={(e) => setTradePassword(e.target.value)}
                />
                <Button
                  variant="primary"
                  onClick={handleWithdrawal}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <Loader2 className="inline animate-spin" />
                  ) : (
                    "Apply Withdrawal"
                  )}
                </Button>
              </>
            )}

            {/* Rules */}
            <Card
              variant="default"
              padding="lg"
              className="mt-6 border-t border-gray-300 pt-4"
            >
              <Text variant="h3" className="text-gray-900 font-bold mb-2">
                Explain
              </Text>
              <ol className="text-xs text-gray-600 space-y-2 list-decimal list-inside">
                <li>Daily marketing from 00:00:00 to 23:59:59.</li>
                <li>Withdraw amount between 300 to 500000.</li>
                <li>Only one withdrawal per day.</li>
                <li>Withdrawal rate 5%.</li>
              </ol>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Withdraw;
