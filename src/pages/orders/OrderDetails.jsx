import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageHeader, Card, Text, Badge } from "../../components";

export default function OrderDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  if (!order) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-white via-yellow-50 to-yellow-100 p-5">
        <PageHeader title="Order Details" onBack={() => navigate(-1)} />
        <Text variant="body" className="text-center mt-12 text-gray-600">
          No order data available.
        </Text>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-white via-yellow-50 to-yellow-100 p-5">
      {/* Header */}
      <PageHeader title={order.title} onBack={() => navigate(-1)} />

      {/* Order Summary */}
      <Card className="mb-5">
        <div className="flex justify-between py-2 border-b border-gray-200">
          <Text variant="body" className="font-semibold text-black">
            Buy Share:
          </Text>
          <Text variant="body" className="text-amber-500 font-medium">
            {order.buyShare}
          </Text>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <Text variant="body" className="font-semibold text-black">
            Days:
          </Text>
          <Text variant="body" className="text-amber-500 font-medium">
            {order.days}
          </Text>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <Text variant="body" className="font-semibold text-black">
            Daily Income:
          </Text>
          <Text variant="body" className="text-amber-500 font-medium">
            {order.dailyIncome}
          </Text>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <Text variant="body" className="font-semibold text-black">
            Total Income:
          </Text>
          <Text variant="body" className="text-amber-500 font-medium">
            {order.totalIncome}
          </Text>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <Text variant="body" className="font-semibold text-black">
            Price:
          </Text>
          <Text variant="body" className="text-amber-500 font-medium">
            {order.price}
          </Text>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <Text variant="body" className="font-semibold text-black">
            Revenue Period:
          </Text>
          <Text variant="body" className="text-amber-500 font-medium">
            {order.revenue}
          </Text>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <Text variant="body" className="font-semibold text-black">
            Generated Income:
          </Text>
          <Text variant="body" className="text-amber-500 font-medium">
            {order.generatedIncome}
          </Text>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-200">
          <Text variant="body" className="font-semibold text-black">
            Estimate Income:
          </Text>
          <Text variant="body" className="text-amber-500 font-medium">
            {order.estimateIncome}
          </Text>
        </div>
        <div className="flex justify-between py-2">
          <Text variant="body" className="font-semibold text-black">
            Status:
          </Text>
          <Badge variant={order.status === "finish" ? "success" : "warning"}>
            {order.status}
          </Badge>
        </div>
      </Card>

      {/* Settlement History */}
      <Card>
        <Text variant="h3" className="text-black mb-3">
          Settlement History
        </Text>
        {order.settlements && order.settlements.length > 0 ? (
          <ul className="space-y-2">
            {order.settlements.map((s, index) => (
              <li
                key={index}
                className="flex justify-between py-2 border-b border-gray-200"
              >
                <Text variant="sm" className="text-gray-600">
                  {s.date}
                </Text>
                <Text variant="sm" className="font-semibold text-amber-500">
                  {s.amount}
                </Text>
              </li>
            ))}
          </ul>
        ) : (
          <Text variant="sm" className="text-center text-gray-500">
            No settlements yet.
          </Text>
        )}
      </Card>
    </div>
  );
}
