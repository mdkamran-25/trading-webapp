import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BankCardInfo() {
  const navigate = useNavigate();
  const [showBanks, setShowBanks] = useState(false);
  const [selectedBank, setSelectedBank] = useState("State Bank of India");

  const banks = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Canara Bank",
    "Union Bank of India",
    "IDBI Bank",
    "Kotak Mahindra Bank",
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-white via-yellow-50 to-yellow-100 font-sans overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-center bg-yellow-200 text-black p-3.5 shadow-md sticky top-0 z-10">
        <button
          className="absolute left-3.5 p-2 hover:bg-yellow-300 rounded transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft color="black" size={20} />
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold">
          Bank Card Info
        </h1>
      </div>

      {/* Card Info Section */}
      <div className="p-5 flex flex-col gap-3.5 animate-slideUp">
        {/* Bank Dropdown */}
        <div className="relative">
          <button
            className="w-full p-3 border border-yellow-300 rounded-lg bg-yellow-50 flex justify-between items-center hover:bg-yellow-100 transition-colors"
            onClick={() => setShowBanks(!showBanks)}
          >
            {selectedBank} <span>▼</span>
          </button>

          {showBanks && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-yellow-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
              {banks.map((bank, i) => (
                <button
                  key={i}
                  className="block w-full text-left p-2.5 hover:bg-yellow-200 hover:text-black transition-colors whitespace-nowrap"
                  onClick={() => {
                    setSelectedBank(bank);
                    setShowBanks(false);
                  }}
                >
                  {bank}
                </button>
              ))}
            </div>
          )}
        </div>

        <input
          type="text"
          defaultValue="SBIN0004542"
          placeholder="IFSC Code"
          className="p-3 border border-yellow-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm"
        />
        <input
          type="text"
          defaultValue="Maghvendra Singh Parmar"
          placeholder="Account Holder Name"
          className="p-3 border border-yellow-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm"
        />
        <input
          type="text"
          defaultValue="39068760192"
          placeholder="Account Number"
          className="p-3 border border-yellow-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm"
        />
        <input
          type="password"
          placeholder="Trade Password"
          className="p-3 border border-yellow-300 rounded-lg focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 outline-none transition-all text-sm"
        />

        <button className="bg-yellow-200 text-black border-none rounded-lg p-3.5 font-semibold text-sm cursor-pointer hover:bg-yellow-100 transition-all active:scale-95 animate-bounce">
          Edit Bank Card
        </button>
      </div>

      {/* Info Section */}
      <div className="bg-yellow-50 p-5 m-4 rounded-xl shadow-inner animate-slideIn">
        <h2 className="text-yellow-700 font-semibold mb-2 text-base">
          Explain
        </h2>
        <p className="text-sm text-gray-700 mt-1.5">
          1 - You can only add a bank card for withdrawals
        </p>
        <p className="text-sm text-gray-700 mt-1.5">
          2 - Please ensure that the bank accounts are correct and functioning
          properly
        </p>
      </div>
    </div>
  );
}
