import React from "react";
import { Clock, CheckCircle, XCircle, Copy, ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

// --- END MOCKS ---

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

// --- Mock Data (Aligned with the user's Mongoose Schema structure) ---

// Component for a single Withdrawal List Item
const WithdrawalItem = ({ record }) => {
  // Use record.status, and capitalize it for display
  const statusDisplay =
    record.status.charAt(0).toUpperCase() + record.status.slice(1);

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

  // Determine which icon to show based on the status (now using lowercase record.status)
  const getStatusIcon = (status) => {
    console.log(record);
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      case "pending":
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColors = (status) => {
    switch (status) {
      case "approved":
        return "bg-emerald-400 text-white";
      case "rejected":
        return "bg-red-400 text-white";
      case "pending":
      default:
        return "bg-amber-400 text-white";
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md border-l-4 border-orange-500 hover:shadow-lg hover:-translate-y-0.5 transition">
      <div className="flex justify-between items-start pb-3 border-b border-dashed border-gray-200 mb-3">
        {/* Amount */}
        <div className="text-2xl font-bold text-gray-900">
          ₹{record.amount.toLocaleString("en-IN")}
        </div>

        {/* Status Badge - uses capitalized status for the class names */}
        <div
          className={`px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1 uppercase ${getStatusColors(record.status)}`}
        >
          {getStatusIcon(record.status)} {statusDisplay}
        </div>
      </div>

      {/* Date Row */}
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Create Date:</span>
        <span className="text-gray-900 font-medium">
          {formatDate(record.timestamp)}
        </span>
      </div>

      {/* Reference Number Row with Copy Button (using mock refId now) */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>Transection ID:</span>
        <div className="flex items-center gap-2">
          <span className="text-gray-900 font-semibold font-mono">
            {record._id.slice(0, 5)}...
          </span>
          <button
            onClick={() => copyToClipboard(record._id)}
            className="p-1 rounded-full hover:bg-yellow-100 transition"
            title="Copy Reference ID"
          >
            <Copy className="w-3 h-3 text-orange-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Component for the Withdrawal History list view
const WithdrawalHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.data || [];
  console.log(data);
  //   const Recharge = location.type || {};
  const totalAmount = location.state.totalAmount ?? 0;
  // The component expects the header type to be present on location object (mocked above)
  const type = "Withdraw History";

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="w-full bg-white border-b border-gray-300 sticky top-0 z-10 p-4">
        {/* Back Button */}
        <button
          className="hover:bg-gray-200 rounded-lg p-2 transition mb-3"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5 text-gray-900" />
        </button>
        <div className="flex-1 text-center mr-10">
          <h2 className="text-xl font-bold text-gray-900 mb-1">{type}</h2>
          <p className="text-sm text-gray-600">
            Total Amount:
            <span className="text-orange-600 font-bold ml-1">
              ₹{totalAmount}
            </span>
          </p>
        </div>
      </div>
      {/* List of Records */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-100">
        {data.length > 0 ? (
          data.map((record, index) => (
            <WithdrawalItem key={index} record={record} />
          ))
        ) : (
          <p className="text-center text-gray-400 italic py-8">
            No withdrawal records found.
          </p>
        )}
      </div>
    </div>
  );
};

export default WithdrawalHistory;
