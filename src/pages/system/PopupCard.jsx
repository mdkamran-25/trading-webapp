import React, { useState, useEffect } from "react";
import {
  X,
  ShieldCheck,
  Zap,
  TrendingUp,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Card, Button, Text, Badge } from "../../components";

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
      <Card className="w-full max-w-sm p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 transition"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-orange-600 mb-3">
          <ShieldCheck size={14} />
          <Text variant="sm">Verified Platform</Text>
        </div>

        <Text variant="h3" className="mb-1 text-gray-900">
          Realstate Investment
        </Text>
        <Text variant="sm" className="text-gray-600 mb-4">
          Professional property asset management.
        </Text>

        <div className="flex justify-center gap-2 mb-4">
          <Badge className="flex items-center gap-2 px-3 py-1 bg-orange-50 text-xs font-semibold text-orange-600">
            <TrendingUp size={14} />
            <span>Founded 2022</span>
          </Badge>
          <Badge className="flex items-center gap-2 px-3 py-1 bg-orange-50 text-xs font-semibold text-orange-600">
            <ExternalLink size={14} />
            <span>Early Access</span>
          </Badge>
        </div>

        <div className="space-y-2 mb-5">
          <Card variant="flat" padding="sm" className="flex items-center gap-2">
            <Zap size={16} className="fill-orange-600 text-orange-600" />
            <Text variant="sm" className="font-medium text-gray-900">
              Instant Deposit Processing
            </Text>
          </Card>
          <Card variant="flat" padding="sm" className="flex items-center gap-2">
            <Zap size={16} className="fill-orange-600 text-orange-600" />
            <Text variant="sm" className="font-medium text-gray-900">
              Instant Withdrawal Processing
            </Text>
          </Card>
        </div>

        <Button
          onClick={() => window.open(groupLink || "https://t.me/", "_blank")}
          variant="primary"
          className="w-full flex items-center justify-center gap-2 mb-3"
        >
          Join Telegram Portal
          <ChevronRight size={18} />
        </Button>

        <Text variant="sm" className="text-center text-gray-500 italic">
          Secure community for real-time market updates.
        </Text>
      </Card>
    </div>
  );
};

export default PopupCard;
