import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function OrderDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  if (!order) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-white via-yellow-50 to-yellow-100 p-5">
        <header className="flex items-center justify-center bg-amber-400 p-4 rounded-lg mb-5 relative">
          <button
            className="absolute left-4 p-2 hover:bg-amber-500 rounded transition-colors"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft color="black" size={20} />
          </button>
          <h1 className="text-xl font-bold text-black">Order Details</h1>
        </header>
        <p className="text-center mt-12 text-gray-600">
          No order data available.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-white via-yellow-50 to-yellow-100 p-5">
      {/* Header */}
      <header className="flex items-center justify-center bg-amber-400 p-4 rounded-lg mb-5 relative">
        <button
          className="absolute left-4 p-2 hover:bg-amber-500 rounded transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft color="black" size={20} />
        </button>
        <h1 className="text-xl font-bold text-black">{order.title}</h1>
      </header>

      {/* Order Summary */}
      <div className="bg-white rounded-2xl p-5 shadow-md mb-5">
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="font-semibold text-black">Buy Share:</span>
          <span className="text-amber-500 font-medium">{order.buyShare}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="font-semibold text-black">Days:</span>
          <span className="text-amber-500 font-medium">{order.days}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="font-semibold text-black">Daily Income:</span>
          <span className="text-amber-500 font-medium">
            {order.dailyIncome}
          </span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="font-semibold text-black">Total Income:</span>
          <span className="text-amber-500 font-medium">
            {order.totalIncome}
          </span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="font-semibold text-black">Price:</span>
          <span className="text-amber-500 font-medium">{order.price}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="font-semibold text-black">Revenue Period:</span>
          <span className="text-amber-500 font-medium">{order.revenue}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="font-semibold text-black">Generated Income:</span>
          <span className="text-amber-500 font-medium">
            {order.generatedIncome}
          </span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <span className="font-semibold text-black">Estimate Income:</span>
          <span className="text-amber-500 font-medium">
            {order.estimateIncome}
          </span>
        </div>
        <div className="flex justify-between py-2">
          <span className="font-semibold text-black">Status:</span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              order.status === "finish"
                ? "bg-green-100 text-green-700 border border-green-700"
                : "bg-yellow-100 text-amber-500 border border-amber-500"
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>

      {/* Settlement History */}
      <div className="bg-white rounded-2xl p-5 shadow-md">
        <h2 className="text-lg font-bold text-black mb-3">
          Settlement History
        </h2>
        {order.settlements && order.settlements.length > 0 ? (
          <ul className="space-y-2">
            {order.settlements.map((s, index) => (
              <li
                key={index}
                className="flex justify-between py-2 border-b border-gray-200"
              >
                <span className="text-gray-600">{s.date}</span>
                <span className="font-semibold text-amber-500">{s.amount}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No settlements yet.</p>
        )}
      </div>
    </div>
  );
}
