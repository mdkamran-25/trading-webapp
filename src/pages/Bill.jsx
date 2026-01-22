import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
const transactions = [
  {
    type: "task rewards",
    date: "2025-09-05 09:54:37",
    amount: "+ ₹10.00",
    category: "recharge",
  },
  {
    type: "withdrawal return",
    date: "2025-09-02 09:00:37",
    amount: "+ ₹7000.00",
    category: "withdrawal",
  },
  {
    type: "buy product",
    date: "2025-08-23 15:55:47",
    amount: "- ₹45",
    category: "recharge",
  },
  {
    type: "recharge",
    date: "2025-08-23 15:54:50",
    amount: "+ ₹500.00",
    category: "recharge",
  },
  {
    type: "task rewards",
    date: "2025-08-20 17:13:19",
    amount: "+ ₹10.00",
    category: "recharge",
  },
  {
    type: "buy product",
    date: "2025-08-20 17:11:35",
    amount: "- ₹200",
    category: "recharge",
  },
  {
    type: "recharge",
    date: "2025-08-20 05:24:18",
    amount: "+ ₹100.00",
    category: "recharge",
  },
  {
    type: "withdrawal return",
    date: "2025-09-02 09:05:32",
    amount: "+ ₹2000.00",
    category: "withdrawal",
  },
];

function Bill() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const filteredTransactions =
    activeTab === "all"
      ? transactions
      : transactions.filter((t) => t.category === activeTab);

  return (
    <div className="flex flex-col max-w-lg min-h-screen mx-auto font-sans bg-gradient-to-br from-white via-yellow-50 to-yellow-100">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between p-3 border-b-2 shadow-md bg-amber-400 border-amber-500">
        <button
          className="p-2 transition-colors rounded-full hover:bg-amber-500"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft color="black" size={20} />
        </button>
        <h1 className="flex-1 text-lg font-semibold text-center text-gray-900">
          Balance Details
        </h1>
        <div className="w-9"></div>
      </div>

      {/* Tabs */}
      <div className="flex justify-around gap-2.5 mx-2.5 my-5">
        <button
          className={`flex-1 py-2.5 border-none font-semibold rounded-2xl cursor-pointer transition-all ${
            activeTab === "all"
              ? "bg-amber-500 text-white shadow-md"
              : "bg-yellow-100 text-yellow-900"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All
        </button>
        <button
          className={`flex-1 py-2.5 border-none font-semibold rounded-2xl cursor-pointer transition-all ${
            activeTab === "recharge"
              ? "bg-amber-500 text-white shadow-md"
              : "bg-yellow-100 text-yellow-900"
          }`}
          onClick={() => setActiveTab("recharge")}
        >
          Recharge
        </button>
        <button
          className={`flex-1 py-2.5 border-none font-semibold rounded-2xl cursor-pointer transition-all ${
            activeTab === "withdrawal"
              ? "bg-amber-500 text-white shadow-md"
              : "bg-yellow-100 text-yellow-900"
          }`}
          onClick={() => setActiveTab("withdrawal")}
        >
          Withdrawal
        </button>
      </div>

      {/* Transactions */}
      <div className="flex flex-col flex-1 gap-4 p-4 pb-5">
        {filteredTransactions.map((tx, index) => (
          <div
            key={index}
            className="bg-white border border-amber-200 rounded-2xl p-4 flex justify-between items-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all animate-slideUp"
          >
            <div className="flex-1">
              <h2 className="text-base font-semibold text-gray-800">
                {tx.type}
              </h2>
              <p className="mt-1 text-xs text-gray-500">{tx.date}</p>
            </div>
            <div
              className={`text-base font-bold ${
                tx.amount.includes("+") ? "text-green-500" : "text-orange-600"
              }`}
            >
              {tx.amount}
            </div>
          </div>
        ))}
        <p className="my-5 text-sm text-center text-gray-500">No more</p>
      </div>
    </div>
  );
}

export default Bill;
