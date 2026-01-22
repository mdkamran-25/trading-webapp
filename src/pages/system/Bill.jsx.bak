import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader, Card, Text, Button, TabButton } from "../../components";
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
      <PageHeader title="Balance Details" onBack={() => navigate(-1)} />

      {/* Tabs */}
      <div className="flex justify-around gap-2.5 mx-2.5 my-5">
        <TabButton
          label="All"
          isActive={activeTab === "all"}
          onClick={() => setActiveTab("all")}
        />
        <TabButton
          label="Recharge"
          isActive={activeTab === "recharge"}
          onClick={() => setActiveTab("recharge")}
        />
        <TabButton
          label="Withdrawal"
          isActive={activeTab === "withdrawal"}
          onClick={() => setActiveTab("withdrawal")}
        />
      </div>

      {/* Transactions */}
      <div className="flex flex-col flex-1 gap-4 p-4 pb-5">
        {filteredTransactions.map((tx, index) => (
          <Card
            key={index}
            variant="flat"
            padding="md"
            className="flex justify-between items-center"
          >
            <div className="flex-1">
              <Text variant="body" className="font-semibold text-gray-800">
                {tx.type}
              </Text>
              <Text variant="sm" className="mt-1 text-gray-500">
                {tx.date}
              </Text>
            </div>
            <Text
              variant="body"
              className={`font-bold ${
                tx.amount.includes("+") ? "text-green-500" : "text-orange-600"
              }`}
            >
              {tx.amount}
            </Text>
          </Card>
        ))}
        <Text variant="sm" className="my-5 text-center text-gray-500">
          No more
        </Text>
      </div>
    </div>
  );
}

export default Bill;
