import React, { useState, useEffect } from "react";
import {
  X,
  ShieldCheck,
  Zap,
  TrendingUp,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

// Import from your actual API file
// import { getSocialLinks } from "../api";

const PopupCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [groupLink, setGroupLink] = useState("");

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        // Replace with actual API call: const data = await getSocialLinks();
        const data = [{ telegramGroupLink: "https://t.me/example" }];
        if (data && data.length > 0) {
          setGroupLink(data[0].telegramGroupLink || "");
        }
      } catch (err) {
        console.error("Failed to fetch links:", err);
      }
    };
    fetchLinks();

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
      <div className="bg-gray-50 rounded-2xl border border-gray-300 shadow-2xl w-full max-w-sm p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 transition"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-orange-600 mb-3">
          <ShieldCheck size={14} />
          Verified Platform
        </div>

        <h2 className="text-2xl font-extrabold mb-1 text-gray-900">
          Realstate Investment
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Professional property asset management.
        </p>

        <div className="flex justify-center gap-2 mb-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-xs font-semibold text-orange-600">
            <TrendingUp size={14} />
            <span>Founded 2022</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-xs font-semibold text-orange-600">
            <ExternalLink size={14} />
            <span>Early Access</span>
          </div>
        </div>

        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-orange-200">
            <Zap size={16} className="fill-orange-600 text-orange-600" />
            <span className="text-sm font-medium text-gray-900">
              Instant Deposit Processing
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-orange-200">
            <Zap size={16} className="fill-orange-600 text-orange-600" />
            <span className="text-sm font-medium text-gray-900">
              Instant Withdrawal Processing
            </span>
          </div>
        </div>

        <button
          onClick={() => window.open(groupLink || "https://t.me/", "_blank")}
          className="w-full py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition flex items-center justify-center gap-2 mb-3"
        >
          Join Telegram Portal
          <ChevronRight size={18} />
        </button>

        <p className="text-center text-xs text-gray-500 italic">
          Secure community for real-time market updates.
        </p>
      </div>
    </div>
  );
};

export default PopupCard;
