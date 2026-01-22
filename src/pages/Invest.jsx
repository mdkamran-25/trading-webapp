import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, Users, User, DollarSign } from "lucide-react";
import ProductCard from "./prod";

const Invest = ({ products }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Basic");

  const tabs = [
    { name: "Home", icon: <Home size={22} />, path: "/home" },
    { name: "invest", icon: <DollarSign size={22} />, path: "/invest" },

    { name: "Teams", icon: <Users size={22} />, path: "/teams" },
    { name: "Profile", icon: <User size={22} />, path: "/account" },
  ];
  const [activeTab1, setActiveTab1] = useState("invest");

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const getProducts = () => {
    switch (activeTab) {
      case "Basic":
        return products.filter(
          (item) => item.badge === "popular" || item.badge === "non",
        );

      case "Normal":
        return products.filter((item) => item.badge === "new");

      case "Vip":
        return products.filter((item) => item.badge === "limited");

      default:
        return products.filter(
          (item) => item.badge === "popular" || item.badge === "non",
        );
    }
  };
  const buyitem = async (product) => {
    navigate("/ProductInfo", { state: product });
    return;
  };
  console.log(products);
  return (
    <>
      <div className="relative flex flex-col w-full max-h-screen min-h-screen mx-auto mb-56 bg-gradient-to-br from-orange-300 via-yellow-100 to-yellow-200 animate-bgFlow">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <h1 className="flex-1 text-xl font-semibold text-center">My Order</h1>
          <div className="w-10"></div>
        </div>

        {/* Tabs section */}
        <div className="flex justify-between items-center bg-white rounded-full shadow-lg p-2 mx-2.5 my-4">
          {["Basic", "Normal", "Vip"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 text-center py-2 rounded-full transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-b from-yellow-400 to-orange-400 text-white shadow-md"
                  : "text-gray-700 hover:text-orange-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product list section */}
        <div className="bg-white rounded-lg shadow-2xl mx-4 p-2.5 pb-8 flex flex-col gap-4 overflow-y-auto flex-1 mb-32">
          {getProducts().map((product, index) => (
            <motion.div
              key={product._id}
              className="flex items-center"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex-1">
                <ProductCard
                  productData={{
                    img: product.imageUrl,
                    title: product.productName,
                    price: product.price,
                    dailyEarnings:
                      product.cycleType === "hour"
                        ? product.hour
                        : product.daily,
                    totalGain:
                      product.cycleType === "hour"
                        ? product.totalIncomeHour
                        : product.totalIncomeDay,
                    durationDays: product.cycleValue,
                    cycleType: product.cycleType,
                    Claim: product.claim,
                    isdailyClaim: product.isdailyClaim,
                  }}
                  onBuy={() => buyitem(product)}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-around max-w-md px-4 py-3 mx-auto bg-white border-t-2 border-gray-200 shadow-lg">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
              activeTab1 === tab.name
                ? "text-orange-600 bg-orange-100"
                : "text-gray-500 hover:text-orange-600"
            }`}
            onClick={() => {
              setActiveTab1(tab.name);
              navigate(tab.path);
            }}
          >
            {tab.icon}
            <span className="text-xs">{tab.name}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default Invest;
