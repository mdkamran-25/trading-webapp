import React, { useState } from "react";
import { colors } from "../../utils/colors";
import {
  Share,
  MessageCircle,
  Mail,
  Copy,
  Check,
  Download,
  QrCode,
} from "lucide-react";

const ReferralCard = ({ UserData = {} }) => {
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const referralCode = UserData?.referralCode || "";

  const referralLink = `http://realstateinvest.in/register?invitation_code=${referralCode}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const downloadQrCode = () => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(referralLink)}`;
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = `referral-qr-${referralCode}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareOnWhatsApp = () => {
    const message = `Join me on this amazing real estate investment platform! Use my referral code: ${referralCode}. ${referralLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const shareViaEmail = () => {
    const subject = "Join me in Real Estate Investment!";
    const body = `Hi there!\n\nI've been using this amazing real estate investment platform and thought you might be interested.\n\nUse my referral code: ${referralCode}\nSign up here: ${referralLink}\n\nHappy investing!`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

  const shareGeneric = () => {
    const shareData = {
      title: "Join Real Estate Investment Platform",
      text: `Use my referral code: ${referralCode}`,
      url: referralLink,
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      copyLink();
    }
  };

  return (
    <div className="w-full pl-32 pr-8 mx-auto mb-12">
      <div
        className="relative p-8 transition-all duration-300 border-0 shadow-lg rounded-xl hover:shadow-xl"
        style={{
          background: `linear-gradient(135deg, ${colors.lightPurpleOverlay10} 0%, ${colors.lightPurpleOverlay20} 100%)`,
          backdropFilter: "blur(10px)",
        }}
      >
        {/* QR Code Section - Top Right */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left side - Content */}
          <div className="flex-1">
            <h3
              style={{ color: colors.darkPurple }}
              className="flex items-center gap-3 mb-4 text-xl font-bold"
            >
              <img src="/UPI-Rupee.svg" alt="Money bag" className="w-8 h-8" />
              Invite Friends & Earn Rewards
            </h3>
            <p
              style={{ color: colors.mediumPurple }}
              className="mb-6 text-sm leading-relaxed"
            >
              Share your referral link and get exclusive rewards when your
              friends join our investment platform!
            </p>

            {/* Referral Link Display */}
            <div
              className="p-4 mb-6 font-mono text-sm break-all border rounded-lg"
              style={{
                backgroundColor: colors.lightPurpleOverlay30,
                color: colors.darkPurple,
                border: `1px solid ${colors.lightPurpleOverlay50}`,
              }}
            >
              http://realstateinvest.in/register?invitation_code=
              <span className="font-bold text-purple-600">{referralCode}</span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={copyLink}
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all rounded-lg hover:scale-105 hover:shadow-md"
                style={{
                  background: `linear-gradient(135deg, ${colors.darkPurple} 0%, ${colors.mediumPurple} 100%)`,
                  color: "white",
                }}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied!" : "Copy Link"}
              </button>

              <button
                onClick={shareGeneric}
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all border rounded-lg hover:scale-105 hover:shadow-md"
                style={{
                  backgroundColor: "white",
                  color: colors.darkPurple,
                  border: `1px solid ${colors.lightPurpleOverlay50}`,
                }}
              >
                <Share size={16} />
                Share
              </button>
            </div>

            {/* Social Media Share Options */}
            <div className="flex gap-3">
              <button
                onClick={shareOnWhatsApp}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all text-xs hover:scale-105 flex-1"
                style={{
                  backgroundColor: "#25D366",
                  color: "white",
                }}
              >
                <MessageCircle size={14} />
                WhatsApp
              </button>

              <button
                onClick={shareViaEmail}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all text-xs hover:scale-105 flex-1"
                style={{
                  backgroundColor: "#EA4335",
                  color: "white",
                }}
              >
                <Mail size={14} />
                Email
              </button>
            </div>
          </div>

          {/* Right side - Large Visible QR Code */}
          <div className="flex flex-col items-center gap-3 lg:min-w-[220px]">
            <div
              className="p-4 bg-white rounded-xl shadow-lg border-2"
              style={{ borderColor: colors.lightPurpleOverlay50 }}
            >
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(referralLink)}`}
                alt="QR Code for Referral Link"
                className="w-52 h-52 rounded-lg"
              />
            </div>
            <button
              onClick={downloadQrCode}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all hover:scale-105 hover:shadow-md"
              style={{
                background: `linear-gradient(135deg, ${colors.darkPurple} 0%, ${colors.mediumPurple} 100%)`,
                color: "white",
              }}
            >
              <Download size={16} />
              Download QR Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralCard;
