import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Card, Button, Text, PageHeader } from "../../components";

const Recharge = () => {
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const token = Cookies.get("tredingWeb");
    const encryptedUser = Cookies.get("tredingWebUser");
    if (!token || !encryptedUser) {
      navigate("/register");
    }
  }, [navigate]);

  const quickAmounts = [
    100, 200, 300, 500, 1000, 1200, 1500, 2000, 2500, 3000, 4000, 5000,
  ];

  const explanations = [
    "Please do not modify the deposit amount unauthorized modification of the deposit amount will result in the deposit not being credited.",
    "Each deposit requires payment to be initiated through this page, please do not save the payment.",
    "Deposit received within 5 minutes, if not received within 5 minutes, please contact online customer service for processing.",
    "Due to too many deposit users, please try multiple times to obtain the deposit link or try again after a period of time.",
  ];

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
    <div className="w-full max-w-md mx-auto min-h-screen bg-white overflow-y-auto flex flex-col items-center">
      {/* Header */}
      <PageHeader
        title="Recharge"
        onBack={() => navigate(-1)}
        showBackButton={true}
        className="w-full mb-6"
      />

      {/* Recharge Card */}
      <Card variant="default" padding="lg" className="w-11/12 mx-auto">
        <div>
          <Text variant="label" weight="semibold" className="mb-3">
            Recharge Amount
          </Text>
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
                  amount === amt
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
          <Button
            variant="gradient"
            fullWidth
            onClick={handleRecharge}
            className="mb-6"
          >
            Recharge Now
          </Button>

          {/* Explanations */}
          <Card variant="flat" padding="md" className="bg-gray-50">
            <Text variant="label" weight="semibold" className="mb-3">
              Explain
            </Text>
            <ol className="space-y-3 text-sm text-gray-700">
              {explanations.map((text, i) => (
                <li key={i} className="flex gap-2">
                  <Text
                    variant="small"
                    weight="semibold"
                    color="primary"
                    className="flex-shrink-0 text-orange-500"
                  >
                    {i + 1}.
                  </Text>
                  <Text variant="small">{text}</Text>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default Recharge;
