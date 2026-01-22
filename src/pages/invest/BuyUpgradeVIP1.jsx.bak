import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, PageHeader, Text, Button, InfoRow } from "../../components";

export default function BuyUpgradeVIP1() {
  const navigate = useNavigate();

  const productDetails = [
    { label: "Price", value: "₹280.00" },
    { label: "Revenue", value: "42 Days" },
    { label: "Buy Share", value: "1" },
    { label: "Generated Income", value: "₹4132.80" },
    { label: "Estimate Income", value: "₹9643.20" },
  ];

  const settlementRecords = [
    { date: "2025-08-19", amount: "₹229.60" },
    { date: "2025-08-20", amount: "₹229.60" },
    { date: "2025-08-21", amount: "₹229.60" },
    { date: "2025-08-22", amount: "₹229.60" },
    { date: "2025-08-23", amount: "₹229.60" },
    { date: "2025-08-24", amount: "₹229.60" },
  ];

  return (
    <div className="max-w-md mx-auto font-sans bg-pink-300 p-4 min-h-screen pb-8">
      <PageHeader title="My Products" onBack={() => navigate(-1)} />

      {/* Product Card */}
      <Card
        variant="default"
        padding="lg"
        className="bg-gradient-to-b from-white to-yellow-50 rounded-3xl my-5 shadow-md"
      >
        <div className="flex justify-between items-center mb-4">
          <Text variant="h3" className="text-lg font-semibold">
            Buy & Upgrade VIP 1
          </Text>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="gold-icon"
            className="w-16 h-16"
          />
        </div>

        <Card variant="flat" padding="md" className="bg-white shadow-inner">
          {productDetails.map((detail, index) => (
            <div
              key={index}
              className="flex justify-between py-2 border-b border-gray-200 last:border-b-0"
            >
              <Text variant="sm" className="font-semibold text-gray-700">
                {detail.label}
              </Text>
              <Text variant="sm">{detail.value}</Text>
            </div>
          ))}
        </Card>
      </Card>

      {/* Settlement Records */}
      <Card
        variant="default"
        padding="lg"
        className="bg-pink-200 rounded-2xl shadow-md"
      >
        <Text variant="h3" className="mb-4 text-base font-semibold">
          Settlement Records
        </Text>
        {settlementRecords.map((record, index) => (
          <div
            key={index}
            className="flex justify-between border-b border-gray-300 py-2 text-sm last:border-b-0"
          >
            <Text variant="sm">{record.date}</Text>
            <Text variant="sm" className="font-semibold text-purple-900">
              {record.amount}
            </Text>
          </div>
        ))}

        <div className="flex justify-between items-center mt-4 text-sm pt-3 border-t border-gray-300">
          <div>
            <Text variant="body" className="font-semibold">
              ₹4132.80
            </Text>
            <Text variant="sm" className="text-gray-600">
              Total Income
            </Text>
          </div>
          <Button variant="primary" className="px-3.5 text-xs">
            Normal
          </Button>
        </div>
      </Card>
    </div>
  );
}
