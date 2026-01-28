import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { MessageCircle, Send, Headphones } from "lucide-react";
import { PageHeader, Card, Text } from "../../components";

export default function HelpCenter() {
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const token = Cookies.get("tredingWeb");
    const encryptedUser = Cookies.get("tredingWebUser");
    if (!token || !encryptedUser) {
      navigate("/register");
    }
  }, [navigate]);
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
      <PageHeader title="Help Center" onBack={() => navigate(-1)} />

      {/* Options */}
      <div className="p-4 flex flex-col gap-4">
        {helpOptions.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ x: index % 2 === 0 ? -80 : 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.03 }}
          >
            <Card
              variant="flat"
              padding="md"
              className="flex gap-3.5 items-start"
            >
              <div className="bg-amber-500 text-white p-2.5 rounded-full flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div className="flex-1">
                <Text variant="body" className="font-semibold text-gray-900">
                  {item.title}
                </Text>
                <Text
                  variant="sm"
                  className="text-gray-600 mt-1 leading-relaxed"
                >
                  {item.description}
                </Text>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
