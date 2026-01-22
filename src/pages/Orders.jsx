import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";

import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { getUserInfo, SECRET_KEY, sendClaim } from "../api";
import pako from "pako";
export default function Orders() {
  const isApiLocked = useRef(false);
  const [filter, setFilter] = useState("all");
  const [orders, setOrders] = useState([]);
  const [modalOrder, setModalOrder] = useState(null);
  const [UserData, setUserData] = useState(null);
  const [claimStatus, setClaimStatus] = useState(null);
  const [timer, setTimer] = useState(0); // For countdown updates
  const navigate = useNavigate();

  const fetchUser = async () => {
    const encryptedUser = Cookies.get("tredingWebUser");
    if (!encryptedUser) return navigate("/login");

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
    const Data = await JSON.parse(decompressed);
    setUserData(Data);

    if (!Data?._id) return navigate("/login");

    try {
      const res = await getUserInfo(Data._id);
      const userPurchases = (res?.data?.users?.purchases || [])
        .slice()
        .reverse();
      setOrders(userPurchases);
    } catch (err) {
      console.error("Failed to fetch user info:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Refresh every second for countdown
  useEffect(() => {
    const interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) => o.cycleType?.toLowerCase() === filter);

  const renderTimeLeft = (order, i) => {
    const now = Date.now();
    const msPerDay = 24 * 60 * 60 * 1000;
    const startTime =
      new Date(order.createdAt).getTime() +
      i * (order.cycleType === "day" ? msPerDay : 0);
    let leftTime = 0;

    if (order.cycleType === "hour") {
      leftTime =
        new Date(order.createdAt).getTime() + (i + 1) * 60 * 60 * 1000 - now;
      if (leftTime <= 0) return "Time Slot Completed";
    } else {
      const endTime = startTime + msPerDay;
      if (now >= endTime) return "Time Slot Completed";
      if (now >= startTime && now < endTime) leftTime = endTime - now;
      else if (now < startTime)
        return `${Math.ceil((startTime - now) / msPerDay)} day(s) left`;
    }

    const totalSeconds = Math.floor(leftTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleClaim = async (
    purchaseId,
    cycleIndex,
    claimAmount,
    isCycleComplete,
  ) => {
    if (isApiLocked.current) return;

    isApiLocked.current = true;
    if (!UserData?._id) return;
    try {
      const res = await sendClaim(
        UserData._id,
        purchaseId,
        cycleIndex,
        claimAmount,
        isCycleComplete,
      );

      if (res.data.success) {
        setClaimStatus({
          type: "success",
          message: `Claimed ₹${cycleIndex === -1 ? res.data.claimAmount : claimAmount} successfully!`,
        });

        // Update orders
        setOrders((prevOrders) =>
          prevOrders.map((p) => {
            if (p.purchaseId === purchaseId) {
              const newClaimed = [...(p.claimedCycles || []), cycleIndex];
              return { ...p, claimedCycles: newClaimed };
            }
            return p;
          }),
        );

        // Update modalOrder if it's open
        setModalOrder((prev) => {
          if (prev && prev.purchaseId === purchaseId) {
            const newClaimed = [...(prev.claimedCycles || []), cycleIndex];
            return { ...prev, claimedCycles: newClaimed };
          }
          return prev;
        });
        fetchUser();
      } else {
        setClaimStatus({
          type: "fail",
          message: res.data.message || "Claim failed!",
        });
      }

      setTimeout(() => setClaimStatus(null), 2000);
    } catch (err) {
      console.error(err);
      setClaimStatus({ type: "fail", message: "Claim failed!" });
      setTimeout(() => setClaimStatus(null), 2000);
    } finally {
      setTimeout(() => {
        isApiLocked.current = false;
      }, 2000);
    }
  };
  // const handleClaimRecord = async (
  //     purchaseId,
  //     cycleIndex,
  //     claimAmount,
  //     isCycleComplete
  //   ) => {
  //     if (!UserData?._id) return;

  //     try {
  //       const res = await handleClaimRecordDB(
  //         UserData._id,
  //         purchaseId,
  //         cycleIndex,
  //         claimAmount,
  //         isCycleComplete
  //       );

  //       if (res.data.success) {
  //         setClaimStatus({
  //           type: "success",
  //           message: `Claimed ₹${cycleIndex===-1?res.data.claimAmount: claimAmount} successfully!`,
  //         });

  //         // Update orders
  //         setOrders((prevOrders) =>
  //           prevOrders.map((p) => {
  //             if (p.purchaseId === purchaseId) {
  //               const newClaimed = [...(p.claimedCycles || []), cycleIndex];
  //               return { ...p, claimedCycles: newClaimed };
  //             }
  //             return p;
  //           })
  //         );

  //         // Update modalOrder if it's open
  //         setModalOrder((prev) => {
  //           if (prev && prev.purchaseId === purchaseId) {
  //             const newClaimed = [...(prev.claimedCycles || []), cycleIndex];
  //             return { ...prev, claimedCycles: newClaimed };
  //           }
  //           return prev;
  //         });
  //         fetchUser();
  //       } else {
  //         setClaimStatus({
  //           type: "fail",
  //           message: res.data.message || "Claim failed!",
  //         });
  //       }

  //       setTimeout(() => setClaimStatus(null), 2000);
  //     } catch (err) {
  //       console.error(err);
  //       setClaimStatus({ type: "fail", message: "Claim failed!" });
  //       setTimeout(() => setClaimStatus(null), 2000);
  //     }
  //   };
  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-gradient-to-br from-white via-yellow-50 to-yellow-100 animate-bgFlow overflow-y-auto overflow-x-hidden pb-12">
      {/* Header */}
      <div className="flex items-center justify-center bg-orange-400 p-4 rounded-lg m-5 relative">
        <button
          className="absolute left-4 p-2 hover:bg-orange-500 rounded transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft color="black" size={20} />
        </button>
        <h1 className="text-xl font-bold text-black">My Order</h1>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mt-6 mb-6 w-full px-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-11 py-2.5 border-2 border-orange-400 rounded-full font-semibold transition-all ${
            filter === "all"
              ? "bg-yellow-300 text-white"
              : "bg-transparent text-yellow-300 hover:bg-yellow-100"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("day")}
          className={`px-11 py-2.5 border-2 border-orange-400 rounded-full font-semibold transition-all ${
            filter === "day"
              ? "bg-yellow-300 text-white"
              : "bg-transparent text-yellow-300 hover:bg-yellow-100"
          }`}
        >
          Day
        </button>
        <button
          onClick={() => setFilter("hour")}
          className={`px-11 py-2.5 border-2 border-orange-400 rounded-full font-semibold transition-all ${
            filter === "hour"
              ? "bg-yellow-300 text-white"
              : "bg-transparent text-yellow-300 hover:bg-yellow-100"
          }`}
        >
          Hour
        </button>
      </div>

      {/* Orders List */}
      <div className="flex flex-col gap-5 w-full px-4 mb-11">
        {filteredOrders.length === 0 ? (
          <p className="text-center text-gray-600 mt-10">No orders found.</p>
        ) : (
          filteredOrders.map((order, index) => {
            const totalCycles = Number(order.cycleValue);
            const elapsed =
              order.cycleType === "hour"
                ? Math.floor(
                    (Date.now() - new Date(order.createdAt)) / (1000 * 60 * 60),
                  )
                : Math.floor(
                    (Date.now() - new Date(order.createdAt)) /
                      (1000 * 60 * 60 * 24),
                  );
            const claimableCount = Math.min(elapsed, totalCycles);
            const claimaCount = order.claimedCycles.length;

            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-5 border border-orange-400 shadow-lg hover:shadow-xl transition-all"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-3">
                  <b className="text-sm text-purple-900">{order.productName}</b>
                </div>

                <div className="flex items-center justify-between gap-2.5 mb-4 flex-wrap">
                  <button
                    className={`px-2.5 py-1.5 rounded-2xl text-xs font-semibold text-white transition-colors ${
                      claimableCount === totalCycles
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {claimableCount === totalCycles ? "Expired" : "Active"}
                  </button>

                  <button
                    className={`px-2.5 py-1.5 rounded-2xl text-xs font-semibold text-white transition-colors ${
                      claimaCount === totalCycles
                        ? "hidden"
                        : "bg-orange-400 hover:bg-orange-500"
                    }`}
                    onClick={() => setModalOrder(order)}
                    disabled={claimaCount === totalCycles}
                  >
                    Records Info ({claimableCount}/{totalCycles})
                  </button>

                  <button
                    className={`px-2.5 py-1.5 rounded-2xl text-xs font-semibold text-white transition-colors ${
                      (order.claim === "waiting" &&
                        claimableCount === totalCycles) ||
                      order.exp
                        ? "bg-black hover:bg-gray-800"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={
                      (order.claim === "claimed" &&
                        claimableCount === totalCycles) ||
                      order.exp
                    }
                    onClick={() => handleClaim(order.purchaseId, -1, 0, true)}
                  >
                    {order.claim === "claimed" ? (
                      <>Claimed ✅</>
                    ) : order.claim === "waiting" &&
                      claimableCount === totalCycles ? (
                      <>
                        Claim ₹
                        {(
                          order.cycleValue *
                          order.dailyIncome *
                          order.quantity
                        ).toFixed(2)}{" "}
                        ({claimableCount}/{totalCycles})
                      </>
                    ) : (
                      <>
                        Claim Locked ₹
                        {(
                          order.cycleValue *
                          order.dailyIncome *
                          order.quantity
                        ).toFixed(2)}
                        ({claimableCount}/{totalCycles})
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm space-y-2">
                  <div className="flex justify-between py-1.5 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">
                      Buy Share
                    </span>
                    <span className="text-blue-500 font-medium">
                      {order.quantity}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">Cycle</span>
                    <span className="text-blue-500 font-medium">
                      {order.cycleValue} {order.cycleType}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">
                      {order.cycleType === "hour"
                        ? "Hourly Income"
                        : "Daily Income"}
                    </span>
                    <span className="text-blue-500 font-medium">
                      ₹{order.dailyIncome}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">
                      Item Price
                    </span>
                    <span className="text-blue-500 font-medium">
                      ₹{(order.TotalAmount / order.quantity).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="font-semibold text-gray-700">
                      Total Amount
                    </span>
                    <span className="text-blue-500 font-medium">
                      ₹{order.TotalAmount}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
      {claimStatus && (
        <motion.div
          className={`fixed top-5 left-1/2 -translate-x-1/2 px-5 py-3 rounded-lg text-white font-semibold z-50 shadow-lg ${
            claimStatus.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {claimStatus.message}
        </motion.div>
      )}

      {modalOrder && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={() => setModalOrder(null)}
        >
          <motion.div
            className="bg-yellow-50 p-6 rounded-2xl w-11/12 max-w-md shadow-2xl max-h-80 overflow-y-auto relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-purple-900 mb-4 text-center">
              {modalOrder.productName} - Claim List
            </h3>

            <ul className="space-y-2.5">
              {Array.from({ length: Number(modalOrder.cycleValue) }).map(
                (_, i) => {
                  const incomePerCycle =
                    modalOrder.dailyIncome * modalOrder.quantity;
                  const isAvailable = (modalOrder.claimedCycles || []).includes(
                    i,
                  )
                    ? false
                    : renderTimeLeft(modalOrder, i) === "Ready to Claim";

                  return (
                    <li
                      key={i}
                      className={`flex justify-between items-center py-2.5 px-3 rounded-2xl border-2 transition-all ${
                        isAvailable
                          ? "border-green-500 bg-green-50"
                          : "border-red-400 bg-red-50 opacity-80"
                      }`}
                    >
                      <span className="font-medium text-gray-800">
                        {modalOrder.cycleType === "hour"
                          ? `Hour ${i + 1}`
                          : `Day ${i + 1}`}
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        ₹{incomePerCycle.toFixed(2)} -{" "}
                        {renderTimeLeft(modalOrder, i) ===
                          "Time Slot Completed" && !isAvailable
                          ? "Time Slot Completed ✅"
                          : renderTimeLeft(modalOrder, i)}
                      </span>
                    </li>
                  );
                },
              )}
            </ul>

            <button
              className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center transition-colors"
              onClick={() => setModalOrder(null)}
            >
              <X size={18} />
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
