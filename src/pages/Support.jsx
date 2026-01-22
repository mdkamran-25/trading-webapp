import React, { useState, useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import { getSocialLinks } from "../api";
import { Card, Text } from "../components";

const TELEGRAM_ICON_URL =
  "https://img.icons8.com/color/48/telegram-app--v1.png";
const SUPPORT_ICON_URL =
  "https://img.icons8.com/?size=100&id=RntMFwIniVlj&format=png&color=000000";

const SupportIcon = ({ className }) => {
  const [fail, setFail] = useState(false);
  return fail ? (
    <MessageCircle className={className} />
  ) : (
    <img
      src={SUPPORT_ICON_URL}
      alt="Support"
      onError={() => setFail(true)}
      className={className}
    />
  );
};

const Support = () => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const [usernameLink, setUsernameLink] = useState("");
  const [groupLink, setGroupLink] = useState("");

  // ✅ Fetch dynamic links from backend
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const data = await getSocialLinks();
        if (data && data.length > 0) {
          setUsernameLink(data[0].telegramUsernameLink || "");
          setGroupLink(data[0].telegramGroupLink || "");
        }
      } catch (err) {
        console.error("Failed to fetch links:", err);
      }
    };
    fetchLinks();
  }, []);

  // ✅ Click-outside menu close logic
  useEffect(() => {
    const close = (e) => {
      if (
        open &&
        !btnRef.current.contains(e.target) &&
        !menuRef.current.contains(e.target)
      )
        setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div className="fixed bottom-28 right-5 z-50 flex flex-col items-center gap-1 font-sans">
      {/* Floating Support Button */}
      <button
        ref={btnRef}
        className="bg-none border-none cursor-pointer p-0 transition-transform hover:scale-95 active:scale-95"
        onClick={() => setOpen(!open)}
        title="Support Options"
      >
        <div className="flex items-center justify-center">
          <SupportIcon className="w-14 h-14" />
        </div>
        <Card className="px-2.5 py-1.5 inline-block text-black font-extrabold text-center">
          <Text variant="sm">Support</Text>
        </Card>
      </button>

      {/* Support Dropdown */}
      <Card
        ref={menuRef}
        className={`absolute right-2 bottom-24 transition-all ${open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        {/* Personal Chat */}
        <a
          href={usernameLink}
          target="_blank"
          rel="noreferrer"
          title="Chat with Support"
          className="flex items-center gap-2 px-1.5 py-2.5 no-underline text-gray-600 text-sm transition-colors hover:bg-blue-50"
        >
          <MessageCircle size={40} className="pl-2.5" />
        </a>

        {/* Telegram Group */}
        <a
          href={groupLink}
          target="_blank"
          rel="noreferrer"
          title="Join Telegram Group"
          className="flex items-center gap-2 px-1.5 py-2.5 no-underline text-gray-600 text-sm transition-colors hover:bg-blue-50"
        >
          <img src={TELEGRAM_ICON_URL} alt="Telegram" className="w-10 h-10" />
        </a>
      </Card>
    </div>
  );
};

export default Support;
