import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, Send, Headphones } from "lucide-react";

export default function HelpCenter() {
  const navigate = useNavigate();
  const helpOptions = [
    {
      id: 1,
      icon: <Headphones size={28} />,
      title: "Online service",
      description: "Working hours: 09:00-20:00",
    },
    {
      id: 2,
      icon: <Send size={28} />,
      title: "Telegram",
      description:
        "Follow our official telegram channel for the latest news and discounts.",
    },
    {
      id: 3,
      icon: <MessageCircle size={28} />,
      title: "Your deposit has not been received yet?",
      description:
        "After successfully charging your account, if the balance has not been entered into your account, please provide it here and customer service personnel will assist you in handling it!",
    },
  ];

  return (
    <div className="max-w-md mx-auto font-sans bg-gradient-to-br from-white via-yellow-50 to-yellow-100 animate-bgFlow text-gray-900 min-h-screen flex flex-col relative pb-20">
      {/* Header */}
      <motion.header
        className="flex items-center justify-between bg-amber-400 p-3.5 shadow-md sticky top-0 z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <button
          className="p-2 hover:bg-amber-500 rounded-full transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft color="black" size={20} />
        </button>
        <h1 className="flex-1 text-center text-xl font-semibold">
          Help Center
        </h1>
        <div className="w-10"></div>
      </motion.header>

      {/* Options */}
      <div className="p-4 flex flex-col gap-4">
        {helpOptions.map((item, index) => (
          <motion.div
            key={item.id}
            className="flex gap-3.5 items-start p-4.5 rounded-2xl bg-white border border-amber-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer"
            initial={{ x: index % 2 === 0 ? -80 : 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="bg-amber-500 text-white p-2.5 rounded-full flex items-center justify-center flex-shrink-0">
              {item.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 m-0">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
