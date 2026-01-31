import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import LoadingScreen from "../../components/atoms/LoadingScreen";
import ProductCard from "./prod";
import { TabButton, MainLayout, Card } from "../../components";

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
      <div className="relative flex flex-col w-full max-h-screen min-h-screen mx-auto mb-56 bg-gradient-to-br from-orange-300 via-yellow-100 to-yellow-200 animate-bgFlow">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <h1 className="flex-1 text-xl font-semibold text-center">My Order</h1>
          <div className="w-10"></div>
        </div>

        {/* Tabs section */}
        <div className="flex justify-between items-center bg-white rounded-full shadow-lg p-2 mx-2.5 my-4 gap-1">
          {["Basic", "Normal", "Vip"].map((tab) => (
            <TabButton
              key={tab}
              label={tab}
              isActive={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>

        {/* Product list section */}
        <Card className="mx-4 mb-32 flex-1 flex flex-col gap-4 overflow-y-auto">
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
        </Card>
      </div>
    </MainLayout>
  );
};

export default Invest;
