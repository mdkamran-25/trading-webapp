import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function BuyUpgradeVIP1() {
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto font-sans bg-pink-300 p-4 min-h-screen">
      {/* Header */}
      <header className="flex items-center gap-2.5 bg-gradient-to-r from-purple-900 to-purple-800 p-3 rounded-xl text-white font-semibold">
        <button
          className="p-2 hover:bg-purple-700 rounded transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft color="white" size={20} />
        </button>
        <h1 className="flex-1 text-center text-xl">My Products</h1>
      </header>

      {/* Product Card */}
      <section className="bg-gradient-to-b from-white to-yellow-50 p-4.5 rounded-3xl my-5 shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Buy & Upgrade VIP 1</h2>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="gold-icon"
            className="w-16 h-16"
          />
        </div>

        <div className="bg-white mt-3 rounded-lg p-3 shadow-inner">
          <p className="flex justify-between my-2">
            <span className="font-semibold text-gray-700">Price</span>{" "}
            <span>₹280.00</span>
          </p>
          <p className="flex justify-between my-2">
            <span className="font-semibold text-gray-700">Revenue</span>{" "}
            <span>42 Days</span>
          </p>
          <p className="flex justify-between my-2">
            <span className="font-semibold text-gray-700">Buy Share</span>{" "}
            <span>1</span>
          </p>
          <p className="flex justify-between my-2">
            <span className="font-semibold text-gray-700">
              Generated Income
            </span>{" "}
            <span>₹4132.80</span>
          </p>
          <p className="flex justify-between my-2">
            <span className="font-semibold text-gray-700">Estimate Income</span>{" "}
            <span>₹9643.20</span>
          </p>
        </div>
      </section>

      {/* Settlement Records */}
      <section className="bg-pink-200 p-4 rounded-2xl shadow-md">
        <h3 className="mb-2.5 text-base font-semibold">Settlement Records</h3>
        <div className="flex justify-between border-b border-gray-300 py-1.5 text-sm">
          <p>2025-08-19</p>
          <p className="font-semibold text-purple-900">₹229.60</p>
        </div>
        <div className="flex justify-between border-b border-gray-300 py-1.5 text-sm">
          <p>2025-08-20</p>
          <p className="font-semibold text-purple-900">₹229.60</p>
        </div>
        <div className="flex justify-between border-b border-gray-300 py-1.5 text-sm">
          <p>2025-08-21</p>
          <p className="font-semibold text-purple-900">₹229.60</p>
        </div>
        <div className="flex justify-between border-b border-gray-300 py-1.5 text-sm">
          <p>2025-08-22</p>
          <p className="font-semibold text-purple-900">₹229.60</p>
        </div>
        <div className="flex justify-between border-b border-gray-300 py-1.5 text-sm">
          <p>2025-08-23</p>
          <p className="font-semibold text-purple-900">₹229.60</p>
        </div>
        <div className="flex justify-between py-1.5 text-sm">
          <p>2025-08-24</p>
          <p className="font-semibold text-purple-900">₹229.60</p>
        </div>

        <div className="flex justify-between items-center mt-3 text-sm">
          <p>
            ₹4132.80 <small className="text-gray-600">Total Income</small>
          </p>
          <button className="bg-purple-900 border-none py-1.5 px-3.5 rounded-2xl text-xs font-semibold text-white cursor-pointer hover:scale-105 transition-transform">
            Normal
          </button>
        </div>
      </section>
    </div>
  );
}
