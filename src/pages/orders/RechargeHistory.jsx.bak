import React from "react";
import { Clock, CheckCircle, XCircle, Copy } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageHeader, Card, Text, Button } from "../../components";

// Utility function for copying text (standard practice in these projects)
const copyToClipboard = (text) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    console.log("Text copied to clipboard:", text);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
  document.body.removeChild(textarea);
};

// Component for a single Recharge List Item
const RechargeItem = ({ record }) => {
  console.log(record.approved);

  // Format ISO date string into a readable format
  const formatDate = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return "Invalid Date";
    }
  };

  // Determine status colors and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case "Approved":
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          bg: "bg-green-500",
        };
      case "Rejected":
        return {
          icon: <XCircle className="w-4 h-4" />,
          bg: "bg-red-500",
        };
      case "Pending":
      default:
        return {
          icon: <Clock className="w-4 h-4" />,
          bg: "bg-amber-500",
        };
    }
  };

  const statusInfo = getStatusInfo(record.approved);

  return (
    <Card className="flex flex-col gap-2 p-4 border-l-4 border-orange-400">
      <div className="flex items-start justify-between pb-2 border-b border-gray-200 border-dashed">
        {/* Amount */}
        <Text variant="h2" className="text-gray-800">
          ₹{record.amount.toLocaleString("en-IN")}
        </Text>

        {/* Status Badge */}
        <button
          className={`${statusInfo.bg} text-white font-bold px-3 py-1 rounded-full text-xs uppercase flex items-center gap-1 shadow-sm`}
        >
          {statusInfo.icon} {record.approved}
        </button>
      </div>

      {/* Date Row */}
      <div className="flex justify-between text-sm text-gray-600">
        <span>Date:</span>
        <Text variant="sm" className="font-medium text-gray-800">
          {formatDate(record.date)}
        </Text>
      </div>

      {/* UTR/Reference Number Row with Copy Button */}
      <div className="flex justify-between text-sm text-gray-600">
        <span>UTR/Ref No:</span>
        <div className="flex items-center gap-2">
          <Text variant="sm" className="font-semibold text-gray-800">
            {record.utr}
          </Text>
          <button
            onClick={() => copyToClipboard(record.utr)}
            className="p-1 transition-colors rounded hover:bg-orange-100"
            title="Copy UTR"
          >
            <Copy className="w-3.5 h-3.5 text-orange-500" />
          </button>
        </div>
      </div>
    </Card>
  );
};

// Component for the Recharge History list view
const RechargeHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.data || [];
  console.log(data);
  //   const Recharge = location.type || {};
  const totalAmount = location.state.totalAmount ?? 0;
  return (
    <div className="w-full max-w-md min-h-screen mx-auto bg-gray-50">
      {/* Header */}
      <PageHeader
        title={data.type || "Recharge History"}
        onBack={() => navigate(-1)}
      />

      {/* Amount Total */}
      <div className="px-4 py-2 text-center border-b border-gray-200">
        <Text variant="body" className="text-gray-600">
          Total Amount:
          <span className="ml-1 font-bold text-orange-500">
            ₹{totalAmount.toLocaleString("en-IN")}
          </span>
        </Text>
      </div>

      {/* List of Records */}
      <div className="p-4 pb-12 space-y-3">
        {data.length > 0 ? (
          data.map((record, index) => (
            <RechargeItem key={index} record={record} />
          ))
        ) : (
          <Text variant="body" className="mt-8 text-center text-gray-500">
            No recharge records found.
          </Text>
        )}
      </div>
    </div>
  );
};

export default RechargeHistory;
