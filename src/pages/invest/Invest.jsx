import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import LoadingScreen from "../../components/atoms/LoadingScreen";
import ProductCard from "./prod";
import { TabButton, MainLayout, Card } from "../../components";
import { colors } from "../../utils/colors";

const Invest = ({ products }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Basic");

  // Check if user is authenticated
  useEffect(() => {
    setIsLoading(true);
    const token = Cookies.get("tredingWeb");
    const encryptedUser = Cookies.get("tredingWebUser");
    if (!token || !encryptedUser) {
      // Show loading screen for 500ms then redirect
      setTimeout(() => {
        navigate("/register");
      }, 500);
      return;
    }
    setIsLoading(false);
  }, [navigate]);

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
    <MainLayout>
      {isLoading && <LoadingScreen />}
      <div
        className="min-h-screen pb-6 sm:pb-8 md:pb-10 lg:pb-12"
        style={{ backgroundColor: colors.lightBgContent }}
      >
        {/* Header Section */}
        <div className="w-full px-3 pt-6 pb-4 mx-auto sm:px-4 sm:pt-8 sm:pb-6 md:px-6 md:pt-10 lg:pl-24 lg:pr-24 xl:pl-32 xl:pr-8">
          <div className="flex flex-col gap-2 sm:gap-3">
            <h1
              className="text-2xl font-bold sm:text-3xl md:text-4xl"
              style={{ color: colors.darkPurple }}
            >
              Investment Products
            </h1>
            <p
              className="text-sm sm:text-base"
              style={{ color: colors.mediumPurple }}
            >
              Choose the perfect investment plan for your financial goals
            </p>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="w-full px-3 mx-auto mb-6 sm:px-4 md:px-6 sm:mb-8 lg:pl-24 lg:pr-24 xl:pl-32 xl:pr-8">
          <div className="flex justify-center items-center bg-white rounded-full shadow-sm p-1.5 sm:p-2 gap-1 sm:gap-2 max-w-md mx-auto">
            {["Basic", "Normal", "Vip"].map((tab) => (
              <TabButton
                key={tab}
                label={tab}
                isActive={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              />
            ))}
          </div>
        </div>

        {/* Products Grid Section */}
        <div className="w-full px-3 mx-auto sm:px-4 md:px-6 lg:pl-24 lg:pr-24 xl:pl-32 xl:pr-8">
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {getProducts().map((product, index) => (
              <motion.div
                key={product._id}
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Invest;
