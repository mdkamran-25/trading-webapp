import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Recharge = () => {
  const navigate = useNavigate();

  const quickAmounts = [
    100, 200, 300, 500, 1000, 1200, 1500, 2000, 2500, 3000, 4000, 5000,
  ];

  const explanations = [
    "Please do not modify the deposit amount unauthorized modification of the deposit amount will result in the deposit not being credited.",
    "Each deposit requires payment to be initiated through this page, please do not save the payment.",
    "Deposit received within 5 minutes, if not received within 5 minutes, please contact online customer service for processing.",
    "Due to too many deposit users, please try multiple times to obtain the deposit link or try again after a period of time.",
  ];

  // state for input amount & selected channel
  const [amount, setAmount] = useState("");

  const handleQuickAmount = (amt) => {
    setAmount(amt);
  };

  const handleRecharge = () => {
    if (!amount) {
      alert("Please select an amount and a channel.");
      return;
    }
    navigate("/pay", { state: amount });
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white overflow-y-auto animate-bgFlow flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex items-center justify-center gap-3 mb-6 relative py-3">
        <button
          className="absolute left-4 p-2 hover:bg-gray-100 rounded transition-transform hover:-translate-x-1"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft color="black" size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Recharge</h1>
      </div>

      {/* Recharge Box */}
      <div className="w-full max-h-85vh min-h-80vh bg-white rounded-3xl p-6 shadow-lg mx-auto overflow-y-scroll">
        {/* Recharge Amount */}
        <label className="block font-semibold mb-3 text-base text-gray-800">
          Recharge Amount
        </label>
        <input
          type="number"
          placeholder="Recharge Amount"
          className="w-full px-4 py-4 border border-gray-300 rounded-2xl text-base mb-6 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Quick Amounts */}
        <div className="grid grid-cols-3 gap-3 mb-8 bg-gray-100 p-5 rounded-2xl">
          {quickAmounts.map((amt) => (
            <button
              key={amt}
              className={`px-2 py-3 rounded-lg font-medium text-sm transition-all ${
                amount == amt
                  ? "bg-orange-400 text-white shadow-md"
                  : "bg-white border border-gray-200 text-gray-800 hover:bg-gray-50"
              }`}
              onClick={() => handleQuickAmount(amt)}
            >
              ₹{amt}
            </button>
          ))}
        </div>

        {/* Recharge Button */}
        <button
          className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 text-gray-800 font-bold py-3 rounded-2xl hover:shadow-lg transition-shadow mb-6"
          onClick={handleRecharge}
        >
          Recharge Now
        </button>

        {/* Explanations */}
        <div className="bg-gray-50 p-4 rounded-2xl">
          <h3 className="font-semibold text-gray-800 mb-3">Explain</h3>
          <ol className="space-y-3 text-sm text-gray-700">
            {explanations.map((text, i) => (
              <li key={i} className="flex gap-2">
                <span className="font-semibold text-orange-500 flex-shrink-0">
                  {i + 1}.
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Recharge;
