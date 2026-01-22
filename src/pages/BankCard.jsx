import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader, Card, Text, Input, Button } from "../components";

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
      <PageHeader title="Bank Card Info" onBack={() => navigate(-1)} />

      {/* Card Info Section */}
      <Card className="m-5 flex flex-col gap-3.5 animate-slideUp">
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

        <Input type="text" defaultValue="SBIN0004542" placeholder="IFSC Code" />
        <Input
          type="text"
          defaultValue="Maghvendra Singh Parmar"
          placeholder="Account Holder Name"
        />
        <Input
          type="text"
          defaultValue="39068760192"
          placeholder="Account Number"
        />
        <Input type="password" placeholder="Trade Password" />

        <Button variant="primary" className="w-full animate-bounce">
          Edit Bank Card
        </Button>
      </Card>

      {/* Info Section */}
      <Card className="m-4 p-5 bg-yellow-50 shadow-inner animate-slideIn">
        <Text variant="h3" className="text-yellow-700 mb-2">
          Explain
        </Text>
        <Text variant="sm" className="text-gray-700 mt-1.5">
          1 - You can only add a bank card for withdrawals
        </Text>
        <Text variant="sm" className="text-gray-700 mt-1.5">
          2 - Please ensure that the bank accounts are correct and functioning
          properly
        </Text>
      </Card>
    </div>
  );
}
