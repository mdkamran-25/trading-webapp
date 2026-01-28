import React, { useState } from "react";
import { colors } from "../../utils/colors";

const ReferralCard = ({ UserData = {} }) => {
  const [copied, setCopied] = useState(false);
  const referralCode = UserData?.referralCode || "";

  const copyLink = () => {
    const link = `http://realstateinvest.in/register?invitation_code=${referralCode}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="p-6 mb-8 rounded-lg"
      style={{
        backgroundColor: colors.lightPurpleOverlay10,
        border: `1px solid ${colors.lightPurpleOverlay40}`,
      }}
    >
      <h3
        style={{ color: colors.darkPurple }}
        className="mb-4 text-lg font-semibold"
      >
        🎁 Invite Friends & Earn
      </h3>
      <p style={{ color: colors.mediumPurple }} className="mb-4 text-sm">
        Share your referral link and get rewards when they join!
      </p>
      <div
        className="p-3 mb-4 font-mono text-xs break-all rounded-lg md:text-sm"
        style={{
          backgroundColor: colors.lightPurpleOverlay20,
          color: colors.darkPurple,
          border: `1px solid ${colors.lightPurpleOverlay30}`,
        }}
      >
        http://realstateinvest.in/register?invitation_code=
        {referralCode}
      </div>
      <button
        onClick={copyLink}
        className="w-full px-4 py-2.5 rounded-lg font-medium transition-all text-sm"
        style={{
          backgroundColor: colors.lightPurple,
          color: colors.darkPurple,
        }}
      >
        {copied ? "✅ Copied!" : "📋 Copy Link"}
      </button>
    </div>
  );
};

export default ReferralCard;
